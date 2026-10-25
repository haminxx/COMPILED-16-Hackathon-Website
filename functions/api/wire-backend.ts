interface Env {
  VAPI_API_KEY?: string;
  VAPI_ASSISTANT_ID?: string;
  WIRE_TOKEN?: string;
}

const TOOLS = [
  { type: "function", function: { name: "get_situation", description: "Ceiling, the nearest aircraft, and wind from the cached session. Call this first.", parameters: { type: "object", properties: {}, required: [] } } },
  { type: "function", function: { name: "get_ceiling", description: "Allowed ceiling, airspace class, and whether LAANC is required.", parameters: { type: "object", properties: {}, required: [] } } },
  { type: "function", function: { name: "get_nearby_traffic", description: "Aircraft Freq can see near the pilot. Omits tail numbers.", parameters: { type: "object", properties: { radius_nm: { type: "number", description: "Optional radius in nautical miles." } }, required: [] } } },
  { type: "function", function: { name: "get_weather", description: "Cached wind in knots. Gusts may be unavailable.", parameters: { type: "object", properties: {}, required: [] } } },
  { type: "function", function: { name: "set_rule", description: "Change what the pilot wants to hear. radius_nm is nautical miles.", parameters: { type: "object", properties: { radius_nm: { type: "number" }, max_alt_ft: { type: "number" }, include_types: { type: "string" }, exclude_types: { type: "string" }, quiet: { type: "boolean" } }, required: [] } } },
  { type: "function", function: { name: "link_session", description: "Attach this call to the 4-digit Freq code on the start page.", parameters: { type: "object", properties: { code: { type: "string" } }, required: ["code"] } } },
];

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  if (context.request.method !== "POST") return json({ ok: false, error: "POST only" }, 405);
  const header = context.request.headers.get("x-wire-token") ?? "";
  if (!context.env.WIRE_TOKEN || header !== context.env.WIRE_TOKEN) return json({ ok: false }, 401);
  const key = context.env.VAPI_API_KEY?.trim() ?? "";
  const id = context.env.VAPI_ASSISTANT_ID?.trim() ?? "";
  if (!key || !id) return json({ ok: false, error: "missing vapi env" }, 503);
  let body: { publicUrl?: string; webhookToken?: string };
  try {
    body = (await context.request.json()) as { publicUrl?: string; webhookToken?: string };
  } catch {
    return json({ ok: false, error: "json body" }, 400);
  }
  const base = (body.publicUrl ?? "").trim().replace(/\/$/, "");
  const token = (body.webhookToken ?? "").trim();
  if (!base.startsWith("https://") || token.length < 16) return json({ ok: false, error: "bad target" }, 400);

  const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const currentRes = await fetch(`https://api.vapi.ai/assistant/${id}`, { headers });
  const current = (await currentRes.json().catch(() => ({}))) as {
    message?: string;
    model?: { provider?: string; model?: string; messages?: { role?: string; content?: string }[]; temperature?: number };
    monitorPlan?: Record<string, unknown>;
  };
  if (!currentRes.ok) return json({ ok: false, step: "get", status: currentRes.status, message: current.message ?? "" }, 502);

  const model = current.model ?? {};
  const messages = Array.isArray(model.messages) ? model.messages.slice() : [];
  const note = "Call get_situation as soon as the call connects, then say the ceiling, traffic, and wind from that tool result. Use get_ceiling, get_nearby_traffic, get_weather, set_rule, and link_session. Never invent airspace or traffic.";
  if (!messages.some((item) => typeof item?.content === "string" && item.content.includes("get_situation"))) {
    messages.push({ role: "system", content: note });
  }
  const serverUrl = `${base}/vapi/webhook/${token}`;
  const patchBody: Record<string, unknown> = {
    server: { url: serverUrl },
    serverMessages: ["tool-calls", "status-update", "end-of-call-report"],
    monitorPlan: { ...(current.monitorPlan ?? {}), listenEnabled: false, controlEnabled: true },
  };
  if (model.provider && model.model) {
    patchBody.model = {
      provider: model.provider,
      model: model.model,
      messages,
      tools: TOOLS,
      ...(typeof model.temperature === "number" ? { temperature: model.temperature } : {}),
    };
  }
  const patched = await fetch(`https://api.vapi.ai/assistant/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(patchBody),
  });
  const result = (await patched.json().catch(() => ({}))) as {
    message?: string;
    server?: { url?: string };
    model?: { tools?: unknown[] };
    monitorPlan?: { controlEnabled?: boolean };
  };
  let host: string | null = null;
  try {
    host = result.server?.url ? new URL(result.server.url).host : null;
  } catch {
    host = null;
  }
  return json({
    ok: patched.ok,
    status: patched.status,
    serverHost: host,
    toolCount: Array.isArray(result.model?.tools) ? result.model.tools.length : 0,
    controlEnabled: result.monitorPlan?.controlEnabled === true,
    message: result.message ?? null,
  }, patched.ok ? 200 : 502);
}
