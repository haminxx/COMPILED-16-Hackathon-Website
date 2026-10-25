export type DemoEnv = {
  VAPI_API_KEY?: string;
  VAPI_ASSISTANT_ID?: string;
  VAPI_PHONE_NUMBER_ID?: string;
  FREQ_BACKEND_URL?: string;
};

export type TranscriptLine = {
  role: "agent" | "caller";
  text: string;
  partial?: boolean;
};

const REQUIRED = ["VAPI_API_KEY", "VAPI_ASSISTANT_ID", "VAPI_PHONE_NUMBER_ID"] as const;
const LIVE_MESSAGES = ["tool-calls", "status-update", "end-of-call-report", "transcript", "conversation-update"];

export function missingDemoEnv(env: DemoEnv): string[] {
  return REQUIRED.filter((key) => !env[key]?.trim());
}

export function toE164(input: string): string | null {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+") && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function asLines(raw: unknown): TranscriptLine[] {
  if (!Array.isArray(raw)) return [];
  const lines: TranscriptLine[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const message = item as { role?: string; message?: string; content?: string; text?: string; partial?: boolean };
    const text = (message.message ?? message.content ?? message.text ?? "").trim();
    if (!text) continue;
    const role = message.role === "bot" || message.role === "assistant" || message.role === "agent" ? "agent" : message.role === "user" || message.role === "caller" ? "caller" : null;
    if (!role) continue;
    lines.push({ role, text, ...(message.partial ? { partial: true } : {}) });
  }
  return lines;
}

function linesFromCall(call: Record<string, unknown>): TranscriptLine[] {
  const artifact = call.artifact as { messages?: unknown } | undefined;
  const fromArtifact = asLines(artifact?.messages);
  const fromCall = asLines(call.messages);
  return score(fromCall) > score(fromArtifact) ? fromCall : fromArtifact;
}

function score(lines: TranscriptLine[]): number {
  return lines.reduce((total, line) => total + line.text.length, 0) + lines.length * 8;
}

function richer(a: TranscriptLine[], b: TranscriptLine[]): TranscriptLine[] {
  return score(b) > score(a) ? b : a;
}

async function vapi(env: DemoEnv, path: string, init?: RequestInit): Promise<Response> {
  return fetch(`https://api.vapi.ai${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.VAPI_API_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

function coords(body: { lat?: number; lon?: number; accuracy?: number }): { lat: number; lon: number; accuracy: number | null } | null {
  const lat = Number(body.lat);
  const lon = Number(body.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  const accuracy = Number(body.accuracy);
  return { lat, lon, accuracy: Number.isFinite(accuracy) ? accuracy : null };
}

async function saveLocation(env: DemoEnv, phone: string, point: { lat: number; lon: number; accuracy: number | null }): Promise<string | null> {
  const base = env.FREQ_BACKEND_URL?.trim().replace(/\/$/, "");
  if (!base) return "Phone location server is not configured.";
  try {
    const response = await fetch(`${base}/api/loc`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phone, lat: point.lat, lon: point.lon, accuracy: point.accuracy }),
    });
    if (!response.ok) return "Freq couldn't save this phone's location.";
  } catch {
    return "Freq couldn't reach the location server.";
  }
  return null;
}

async function liveLines(env: DemoEnv, callId: string): Promise<TranscriptLine[]> {
  const base = env.FREQ_BACKEND_URL?.trim().replace(/\/$/, "");
  if (!base) return [];
  try {
    const response = await fetch(`${base}/api/live?id=${encodeURIComponent(callId)}`);
    const data = (await response.json().catch(() => null)) as { lines?: unknown } | null;
    if (!response.ok || !data) return [];
    return asLines(data.lines);
  } catch {
    return [];
  }
}

const ACTIVITY_TOOL = {
  type: "function",
  function: {
    name: "get_nearby_activities",
    description: "Official scheduled activity near the pilot: TFRs, military or restricted airspace, and stadiums. Call this when asked what is scheduled or happening nearby.",
    parameters: { type: "object", properties: {}, required: [] },
  },
};

async function enableLiveTranscripts(env: DemoEnv): Promise<void> {
  if (!env.VAPI_ASSISTANT_ID) return;
  try {
    const currentRes = await vapi(env, `/assistant/${env.VAPI_ASSISTANT_ID}`);
    const current = (await currentRes.json().catch(() => null)) as { model?: { provider?: string; model?: string; messages?: unknown[]; tools?: { function?: { name?: string } }[]; temperature?: number } } | null;
    const model = current?.model;
    const tools = Array.isArray(model?.tools) ? model.tools.slice() : [];
    if (!tools.some((tool) => tool?.function?.name === "get_nearby_activities")) tools.push(ACTIVITY_TOOL);
    const kept = (Array.isArray(model?.messages) ? model.messages : []).filter(
      (item) => (item as { role?: string })?.role !== "system",
    );
    const messages = [
      {
        role: "system",
        content:
          "You are Freq, on a phone call with a drone pilot. Speak in at most two short sentences. Use feet and statute miles. Lead with nearby aircraft: type, distance, direction, altitude, and how long until one reaches the pilot's area when the tool includes a time. Do not say you are advisory, unofficial, not air traffic control, or that you do not replace a visual observer. Call get_situation first and speak its aircraft lines. The phone location is already saved. Mention the ceiling only if they ask how high they can fly. If they ask what is scheduled nearby, call get_nearby_activities.",
      },
      ...kept,
    ];
    const patch: Record<string, unknown> = {
      serverMessages: LIVE_MESSAGES,
      firstMessage: "Freq on. Checking the aircraft near you.",
    };
    if (model?.provider && model.model) {
      patch.model = {
        provider: model.provider,
        model: model.model,
        messages,
        tools,
        ...(typeof model.temperature === "number" ? { temperature: model.temperature } : {}),
      };
    }
    await vapi(env, `/assistant/${env.VAPI_ASSISTANT_ID}`, { method: "PATCH", body: JSON.stringify(patch) });
  } catch {
    // The call can still be placed. Location was already saved.
  }
}

export async function handleDemoLoc(request: Request, env: DemoEnv): Promise<Response> {
  if (request.method !== "POST") return json({ ok: false, error: "POST only" }, 405);
  let body: { to?: string; lat?: number; lon?: number; accuracy?: number };
  try {
    body = (await request.json()) as { to?: string; lat?: number; lon?: number; accuracy?: number };
  } catch {
    return json({ ok: false, error: "Send the phone number and location." }, 400);
  }
  const to = toE164(body.to ?? "");
  const point = coords(body);
  if (!to) return json({ ok: false, error: "Enter a phone number, with country code or a 10-digit US number." }, 400);
  if (!point) return json({ ok: false, error: "Phone location is missing." }, 400);
  const error = await saveLocation(env, to, point);
  if (error) return json({ ok: false, error }, 502);
  return json({ ok: true });
}

export async function handleDemoCall(request: Request, env: DemoEnv): Promise<Response> {
  const missing = missingDemoEnv(env);
  if (missing.length > 0) {
    return json(
      {
        ok: false,
        error: `Missing server env: ${missing.join(", ")}. Set them on Cloudflare Pages (not in git) to place the outbound call.`,
      },
      503,
    );
  }

  if (request.method === "POST") {
    let body: { to?: string; lat?: number; lon?: number; accuracy?: number };
    try {
      body = (await request.json()) as { to?: string; lat?: number; lon?: number; accuracy?: number };
    } catch {
      return json({ ok: false, error: "Send a JSON body with the visitor’s phone number." }, 400);
    }
    const to = toE164(body.to ?? "");
    const point = coords(body);
    if (!to) {
      return json({ ok: false, error: "Enter a phone number, with country code or a 10-digit US number." }, 400);
    }
    if (!point) {
      return json({ ok: false, error: "Allow location so Freq knows where this phone is." }, 400);
    }
    const saved = await saveLocation(env, to, point);
    if (saved) return json({ ok: false, error: saved }, 502);
    await enableLiveTranscripts(env);
    const created = await vapi(env, "/call", {
      method: "POST",
      body: JSON.stringify({
        assistantId: env.VAPI_ASSISTANT_ID,
        phoneNumberId: env.VAPI_PHONE_NUMBER_ID,
        customer: { number: to },
        metadata: {
          lat: String(point.lat),
          lon: String(point.lon),
          accuracy: point.accuracy == null ? "" : String(point.accuracy),
          source: "phone",
        },
      }),
    });
    const payload = (await created.json().catch(() => ({}))) as { id?: string; message?: string; status?: string };
    if (!created.ok || !payload.id) {
      return json(
        { ok: false, error: payload.message || "Vapi did not start the call. Check the assistant and phone number ids." },
        created.status || 502,
      );
    }
    return json({ ok: true, callId: payload.id, status: payload.status ?? "queued", lines: [] });
  }

  if (request.method === "GET") {
    const id = new URL(request.url).searchParams.get("id") ?? "";
    if (!/^[A-Za-z0-9-]{8,80}$/.test(id)) return json({ ok: false, error: "Missing call id." }, 400);
    const [read, live] = await Promise.all([vapi(env, `/call/${id}`), liveLines(env, id)]);
    const call = (await read.json().catch(() => ({}))) as Record<string, unknown>;
    if (!read.ok && live.length === 0) {
      const message = typeof call.message === "string" ? call.message : "Could not read the call.";
      return json({ ok: false, error: message }, read.status || 502);
    }
    return json({
      ok: true,
      callId: id,
      status: typeof call.status === "string" ? call.status : "",
      lines: richer(linesFromCall(call), live),
    });
  }

  return json({ ok: false, error: "Use POST to start a call or GET to read it." }, 405);
}
