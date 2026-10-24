import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SignInButton } from "@/components/SignInButton";
import { HERO_SUB } from "@/lib/copy";

const primaryClass =
  "inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-md bg-white px-6 text-sm font-medium text-black transition-all hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-60 sm:w-auto";

export const Component = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const phone = (import.meta.env.VITE_FREQ_PHONE ?? "").trim();
  const snippet = phone || "Call Freq";

  const handleCopy = () => {
    void navigator.clipboard?.writeText(snippet).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  return (
    <section className="w-full bg-black py-24 font-sans selection:bg-white selection:text-black sm:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="relative flex flex-col items-center overflow-hidden rounded-xl border border-white/[0.12] bg-[#050505] px-6 py-20 text-center sm:px-16 sm:py-24">
          <div className="absolute top-0 left-0 h-[1px] w-full bg-white/[0.15]" />

          <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">Before takeoff</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-tighter text-balance text-white sm:text-5xl md:text-6xl">
            Sign in once. Then it’s a phone call.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-balance text-neutral-400 sm:text-lg">
            {HERO_SUB}
          </p>

          <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <SignInButton intent="primary" className={primaryClass} />
            <a
              href="#demo"
              className="flex h-11 w-full items-center justify-center rounded-md border border-white/[0.12] bg-transparent px-6 text-sm font-medium text-white transition-all hover:bg-white/[0.05] active:scale-[0.98] sm:w-auto"
            >
              Hear a demo call
            </a>
          </div>

          <div className="mt-12 flex items-center justify-between rounded-md border border-white/[0.08] bg-black p-1.5 pl-4 transition-colors hover:border-white/[0.15]">
            <code className="mr-6 font-mono text-[13px] text-white">
              {phone ? <span className="text-neutral-500">tel: </span> : null}
              {snippet}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-8 w-8 items-center justify-center rounded bg-white/[0.04] text-neutral-400 transition-colors hover:bg-white/[0.1] hover:text-white"
              aria-label={phone ? "Copy phone number" : "Copy Call Freq"}
            >
              {hasCopied ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
