import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { SignInButton } from "@/components/SignInButton";
import { HERO_SUB } from "@/lib/copy";

const primaryClass =
  "inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-md bg-[#0040FF] px-6 text-sm font-medium text-white transition hover:bg-[#0036d6] disabled:opacity-60 sm:w-auto";

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
    <section className="w-full bg-white py-24 font-sans sm:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <motion.div
          className="relative flex flex-col items-center overflow-hidden rounded-xl border border-[#e6e8ee] bg-white px-6 py-20 text-center shadow-sm sm:px-16 sm:py-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute top-0 left-0 h-px w-full bg-[#0040FF]/30" />

          <p className="font-mono text-[11px] tracking-[0.18em] text-[#5c6570] uppercase">Before takeoff</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-tighter text-balance text-[#121417] sm:text-5xl md:text-6xl">
            Sign in once. Then it’s a phone call.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-balance text-[#5c6570] sm:text-lg">
            {HERO_SUB}
          </p>

          <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <SignInButton intent="primary" className={primaryClass} />
            <a
              href="#demo"
              className="flex h-11 w-full items-center justify-center rounded-md border border-[#d7dbe3] bg-white px-6 text-sm font-medium text-[#121417] transition hover:border-[#0040FF] hover:text-[#0040FF] sm:w-auto"
            >
              Hear a demo call
            </a>
          </div>

          <div className="mt-12 flex items-center justify-between rounded-md border border-[#e6e8ee] bg-[#f7f8fb] p-1.5 pl-4 transition-colors hover:border-[#0040FF]/40">
            <code className="mr-6 font-mono text-[13px] text-[#121417]">
              {phone ? <span className="text-[#5c6570]">tel: </span> : null}
              {snippet}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-8 w-8 items-center justify-center rounded text-[#5c6570] transition-colors hover:text-[#0040FF]"
              aria-label={phone ? "Copy phone number" : "Copy Call Freq"}
            >
              {hasCopied ? <Check className="h-3.5 w-3.5 text-[#0040FF]" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
