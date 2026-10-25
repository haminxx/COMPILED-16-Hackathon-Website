import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";
import { FreqWordmark } from "@/components/FreqWordmark";
import { pilotAvatar, pilotName, useAuth } from "@/lib/auth";
import { ADVISORY } from "@/lib/copy";
import { freqPhone, supabase, telHref } from "@/lib/supabase";

const CHECKLIST = [
  {
    title: "Sign in once",
    detail: "You’re signed in with Google.",
    done: true,
  },
  {
    title: "Tap call before takeoff",
    detail: "Stay on the line. The call is the interface.",
    done: false,
  },
  {
    title: "Ask by voice",
    detail: "“How high can I fly here?”",
    done: false,
  },
  {
    title: "Set a rule if you want",
    detail: "“Warn me under 200 ft.”",
    done: false,
  },
  {
    title: "Know the airspace",
    detail:
      "La Jolla Cove is Class G, up to 400 ft. Near UTC/Miramar is Class B — LAANC approval required. Next to the base, do not fly.",
    done: false,
  },
  {
    title: "Fly hands-free",
    detail: "Freq speaks up when it matters. Keep your eyes on the sky.",
    done: false,
  },
] as const;

function SessionGate({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="grid min-h-dvh place-items-center bg-white px-6 text-[#121417]">
        <p className="font-mono text-xs tracking-[0.16em] text-[#5c6570] uppercase">Checking your session</p>
      </div>
    );
  }
  if (!session) return <Navigate to="/" replace />;
  return children;
}

function Desk({ name, avatar }: { name: string; avatar?: string }) {
  const [photoOk, setPhotoOk] = useState(true);
  const href = telHref(freqPhone);

  useEffect(() => {
    const previous = document.title;
    document.title = `${name} · Freq`;
    return () => {
      document.title = previous;
    };
  }, [name]);

  return (
    <div className="min-h-dvh bg-white text-[#121417]">
      <header className="sticky top-0 z-20 border-b border-[#c8ced8] bg-white">
        <div className="mx-auto flex h-16 max-w-xl items-center gap-3 px-4 sm:px-5">
          <Link to="/" aria-label="Freq home">
            <FreqWordmark className="h-8 w-auto" />
          </Link>
          <div className="ml-auto flex items-center gap-3">
            {avatar && photoOk ? (
              <img
                src={avatar}
                alt=""
                referrerPolicy="no-referrer"
                onError={() => setPhotoOk(false)}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
              />
            ) : null}
            <span className="max-w-[9rem] truncate text-sm text-[#121417] sm:max-w-[14rem]">{name}</span>
            <button
              type="button"
              onClick={() => void supabase.auth.signOut()}
              className="inline-flex h-10 items-center justify-center border border-[#121417] bg-white px-4 text-sm font-medium transition hover:bg-[#f4f6f8]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-8 sm:px-5 sm:py-12">
        <p className="font-mono text-[11px] tracking-[0.18em] text-[#0040FF] uppercase">Before you fly</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">{name}</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#5c6570]">
          The call is the interface. Sign-in is done. Keep your eyes on the sky.
        </p>

        {href ? (
          <a
            href={href}
            className="mt-8 flex min-h-24 w-full flex-col justify-center rounded-2xl bg-[#0040FF] px-6 py-5 text-white transition hover:bg-[#0036d6]"
          >
            <span className="text-3xl font-semibold tracking-tight">Call Freq</span>
            <span className="mt-1 font-mono text-sm text-white/80">Before takeoff</span>
          </a>
        ) : (
          <div className="mt-8 w-full rounded-2xl border border-[#e6e8ee] px-6 py-5">
            <p className="text-3xl font-semibold tracking-tight">Call Freq</p>
            <p className="mt-1 font-mono text-sm text-[#5c6570]">Set VITE_FREQ_PHONE</p>
          </div>
        )}

        <h2 className="mt-12 font-mono text-[11px] tracking-[0.18em] text-[#0040FF] uppercase">Before you fly</h2>
        <ol className="mt-4 divide-y divide-[#e6e8ee] overflow-hidden rounded-2xl border border-[#e6e8ee]">
          {CHECKLIST.map((item, index) => (
            <li key={item.title} className="flex gap-4 bg-white px-4 py-4">
              <span className="pt-0.5 font-mono text-xs text-[#8b93a0]">{String(index + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#5c6570]">{item.detail}</p>
              </div>
              {item.done ? (
                <span className="font-mono text-[11px] tracking-wide text-[#0040FF] uppercase">Done</span>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-[#5c6570]">{ADVISORY}</p>
      </main>

      <footer className="mx-auto flex max-w-xl flex-wrap gap-x-4 gap-y-2 px-4 py-10 text-sm text-[#5c6570] sm:px-5">
        <Link to="/privacy" className="hover:text-[#0040FF]">
          Privacy
        </Link>
        <Link to="/terms" className="hover:text-[#0040FF]">
          Terms
        </Link>
      </footer>
    </div>
  );
}

export default function Dashboard() {
  const { session } = useAuth();
  return <SessionGate>{session ? <Desk name={pilotName(session)} avatar={pilotAvatar(session)} /> : null}</SessionGate>;
}
