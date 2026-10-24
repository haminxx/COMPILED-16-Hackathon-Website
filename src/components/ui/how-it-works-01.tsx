import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, LogIn, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { signInWithGoogle } from "@/lib/supabase";

const steps = [
  {
    n: "01",
    icon: LogIn,
    title: "Sign in once",
    body: "Google, on this site. One time.",
  },
  {
    n: "02",
    icon: PhoneCall,
    title: "Tap call before takeoff",
    body: "Freq stays on the line like a co-pilot radio.",
  },
  {
    n: "03",
    icon: Eye,
    title: "Fly hands-free",
    body: "Freq speaks up when it matters.",
  },
];

export default function HowItWorks01() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onStart() {
    setError(null);
    if (session) {
      navigate("/dashboard");
      return;
    }
    setPending(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setPending(false);
      setError(err instanceof Error ? err.message : "Could not start Google sign-in.");
    }
  }

  return (
    <section id="how" className="scroll-mt-28 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">How it works</span>
          <h2
            className="text-balance font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            Three steps. Then your eyes stay on the sky.
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm shadow-black/5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-foreground/5 text-foreground">
                  <s.icon className="size-5" />
                </span>
                <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  {s.n}
                </span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center gap-3">
          <Button size="lg" className="rounded-full" type="button" onClick={() => void onStart()} disabled={pending}>
            {session ? "Go to dashboard" : pending ? "Continuing…" : "Continue with Google"}
            <ArrowRight />
          </Button>
          {error ? (
            <p role="alert" className="max-w-sm text-center text-xs leading-relaxed text-muted-foreground">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
