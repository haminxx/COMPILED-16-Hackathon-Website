export type DemoEnv = {
  VAPI_API_KEY?: string;
  VAPI_ASSISTANT_ID?: string;
  VAPI_PHONE_NUMBER_ID?: string;
};

export type TranscriptLine = {
  role: "agent" | "caller";
  text: string;
};

const REQUIRED = ["VAPI_API_KEY", "VAPI_ASSISTANT_ID", "VAPI_PHONE_NUMBER_ID"] as const;

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

function linesFromCall(call: Record<string, unknown>): TranscriptLine[] {
  const artifact = call.artifact as { messages?: unknown } | undefined;
  const raw = (Array.isArray(artifact?.messages) ? artifact.messages : null) ?? (Array.isArray(call.messages) ? call.messages : []);
  const lines: TranscriptLine[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const message = item as { role?: string; message?: string; content?: string };
    const text = (message.message ?? message.content ?? "").trim();
    if (!text) continue;
    if (message.role === "bot" || message.role === "assistant") lines.push({ role: "agent", text });
    else if (message.role === "user") lines.push({ role: "caller", text });
  }
  return lines;
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
    let body: { to?: string };
    try {
      body = (await request.json()) as { to?: string };
    } catch {
      return json({ ok: false, error: "Send a JSON body with the visitor’s phone number." }, 400);
    }
    const to = toE164(body.to ?? "");
    if (!to) {
      return json({ ok: false, error: "Enter a phone number, with country code or a 10-digit US number." }, 400);
    }
    const created = await vapi(env, "/call", {
      method: "POST",
      body: JSON.stringify({
        assistantId: env.VAPI_ASSISTANT_ID,
        phoneNumberId: env.VAPI_PHONE_NUMBER_ID,
        customer: { number: to },
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
    const read = await vapi(env, `/call/${id}`);
    const call = (await read.json().catch(() => ({}))) as Record<string, unknown>;
    if (!read.ok) {
      const message = typeof call.message === "string" ? call.message : "Could not read the call.";
      return json({ ok: false, error: message }, read.status || 502);
    }
    return json({
      ok: true,
      callId: id,
      status: typeof call.status === "string" ? call.status : "",
      lines: linesFromCall(call),
    });
  }

  return json({ ok: false, error: "Use POST to start a call or GET to read it." }, 405);
}
