import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { VoiceBeam } from "voice-glow";

const BRAND = ["#0040FF", "#3D6BFF", "#002DB3", "#7AA0FF", "#001A66"];

type Line = { role: "agent" | "caller"; text: string };

type CallState = {
  callId: string;
  status: string;
  lines: Line[];
};

export function DemoCall({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [call, setCall] = useState<CallState | null>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setPending(false);
      setError(null);
      setCall(null);
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => phoneRef.current?.focus(), 30);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !call?.callId) return;
    let stop = false;
    let timer = 0;
    const pull = async () => {
      try {
        const response = await fetch(`/api/demo-call?id=${encodeURIComponent(call.callId)}`);
        const data = (await response.json()) as { ok?: boolean; error?: string; status?: string; lines?: Line[] };
        if (stop) return;
        if (!response.ok || data.ok === false) {
          setError(data.error || "Could not read the call.");
          return;
        }
        setCall((current) =>
          current
            ? { ...current, status: data.status ?? current.status, lines: Array.isArray(data.lines) ? data.lines : [] }
            : current,
        );
        if (data.status === "ended") return;
        timer = window.setTimeout(() => void pull(), 2000);
      } catch {
        if (!stop) setError("Could not reach /api/demo-call.");
      }
    };
    timer = window.setTimeout(() => void pull(), 1200);
    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, [open, call?.callId]);

  async function placeCall(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const response = await fetch("/api/demo-call", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ to: phone }),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string; callId?: string; status?: string } | null;
      if (!response.ok || !data?.callId) {
        setError(
          data?.error ||
            (response.status === 404
              ? "Missing endpoint /api/demo-call. Outbound calls need the server env VAPI_API_KEY, VAPI_ASSISTANT_ID, and VAPI_PHONE_NUMBER_ID."
              : "The call was not placed."),
        );
        return;
      }
      setCall({ callId: data.callId, status: data.status ?? "queued", lines: [] });
    } catch {
      setError("Could not reach /api/demo-call. Outbound calls need VAPI_API_KEY, VAPI_ASSISTANT_ID, and VAPI_PHONE_NUMBER_ID on the server.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-end bg-[#121417]/40 p-4 sm:place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-title"
            className="w-full max-w-lg border border-[#E6E6E8] bg-white p-5 shadow-[0_16px_48px_rgba(18,20,23,0.16)] sm:p-6"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">Demo</p>
                <h2 id="demo-title" className="mt-1 text-2xl font-medium tracking-tight text-[#121417]">
                  {call ? "On the line" : "Call your phone"}
                </h2>
              </div>
              <button type="button" onClick={onClose} className="text-sm text-[#5c6570] hover:text-[#0040FF]">
                Close
              </button>
            </div>

            {call ? (
              <div className="mt-5">
                <p className="mb-3 text-sm text-[#5c6570]">
                  Freq is calling the number you entered. This panel only shows words that have actually arrived.
                  {call.status ? ` Status: ${call.status}.` : ""}
                </p>
                <VoiceBeam theme="light" colors={BRAND} type="default">
                  <div className="min-h-56 rounded-2xl border border-[#e6e8ee] bg-white px-4 py-4">
                    {call.lines.length === 0 ? (
                      <p className="text-sm leading-relaxed text-[#5c6570]">
                        Waiting for the call. No one has spoken yet, so there is no transcript.
                      </p>
                    ) : (
                      <ol className="space-y-3 font-mono text-[13px] leading-relaxed">
                        {call.lines.map((line, index) => (
                          <li key={`${index}-${line.text.slice(0, 24)}`}>
                            <span className={line.role === "agent" ? "text-[#0040FF]" : "text-[#121417]"}>
                              {line.role === "agent" ? "Freq" : "Caller"}
                            </span>
                            {": "}
                            <span className="text-[#121417]">{line.text}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </VoiceBeam>
                {error ? (
                  <p role="alert" className="mt-3 text-sm text-[#9b2c2c]">
                    {error}
                  </p>
                ) : null}
              </div>
            ) : (
              <form className="mt-5" onSubmit={(event) => void placeCall(event)}>
                <label htmlFor="demo-phone" className="text-sm font-medium text-[#121417]">
                  Your phone number
                </label>
                <input
                  ref={phoneRef}
                  id="demo-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Country code and number"
                  className="mt-2 h-12 w-full rounded-xl border border-[#d7dbe3] px-3 text-base text-[#121417] outline-none focus:border-[#0040FF]"
                />
                <p className="mt-2 text-xs leading-relaxed text-[#5c6570]">
                  Freq places the call to this number. The conversation stays on your phone.
                </p>
                <button
                  type="submit"
                  disabled={pending}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0040FF] text-sm font-medium text-white transition hover:bg-[#0036d6] disabled:opacity-60"
                >
                  {pending ? "Calling…" : "Call this number"}
                </button>
                {error ? (
                  <p role="alert" className="mt-3 text-sm leading-relaxed text-[#9b2c2c]">
                    {error}
                  </p>
                ) : null}
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
