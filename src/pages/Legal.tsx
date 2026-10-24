import { useEffect, type ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ADVISORY } from "@/lib/copy";

function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} · Freq`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <div className="min-h-dvh bg-[#070708] text-white">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
        <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">Freq</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">{title}</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/70">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        Freq is a website for the c0mpiled-16 hackathon at UCSD (Invisible Interfaces). It explains the product, signs
        you in once, and gives you a button to call Freq. The voice line is a separate phone call. This site does not
        record it.
      </p>
      <p>
        If you choose Continue with Google, sign-in is handled by Supabase Auth. Supabase receives the Google profile
        used for that sign-in: your name, email address, and profile photo. The dashboard shows your name and photo.
        The session stays in this browser until you sign out.
      </p>
      <p>
        This site does not ask you to create a password. It does not sell personal information. It does not run
        advertising trackers. The pages are hosted on Cloudflare Pages.
      </p>
      <p>Signing out on the dashboard clears the session in this browser.</p>
    </LegalPage>
  );
}

export function TermsPage() {
  return (
    <LegalPage title="Terms">
      <p>{ADVISORY}</p>
      <p>
        Freq is an advisory for drone pilots. The website is for the explanation, a one-time Google sign-in, and the
        call button. The pilot’s interface is the phone call.
      </p>
      <p>
        You still have to keep your drone in visual line of sight, and you still need LAANC authorization where the
        airspace requires it. La Jolla Cove in the San Diego demo is Class G, up to 400 ft. Near UTC/Miramar is Class
        B, and LAANC approval is required. Next to the base, do not fly.
      </p>
      <p>
        This is a hackathon project. The site and the phone line can be unavailable. You are responsible for the flight.
      </p>
    </LegalPage>
  );
}
