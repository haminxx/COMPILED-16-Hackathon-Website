import { ADVISORY, HERO_SUB, HERO_TITLE } from "@/lib/copy";
import { GridBeam } from "@/components/ui/background-grid-beam";
import BentoGrid from "@/components/ui/bento-grid-01";
import { Component as CallToAction } from "@/components/ui/call-to-action";
import FooterSection from "@/components/ui/footer";
import HowItWorks01 from "@/components/ui/how-it-works-01";
import Login16 from "@/components/ui/login-16";
import { Navbar1 } from "@/components/ui/navbar-1";
import { Spotlight } from "@/components/ui/spotlight";

const LINES = [
  ["00:12", "Freq", "You're in Class G. Ceiling 400 ft."],
  ["00:41", "You", "How high can I fly here?"],
  ["00:44", "Freq", "400 ft. La Jolla Cove, Class G."],
  ["01:18", "Freq", "Helicopter 2.1 NM west, 900 ft, closing. Descend to 100 ft and hold."],
] as const;

const AIRSPACE = [
  ["La Jolla Cove", "Class G", "Up to 400 ft"],
  ["Near UTC/Miramar", "Class B", "LAANC approval required"],
  ["Next to the base", "Do not fly", ""],
] as const;

function Transcript() {
  return (
    <figure
      id="demo"
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_40px_120px_-48px_rgba(232,255,31,0.45)]"
    >
      <figcaption className="flex items-center gap-2 border-b border-white/10 px-4 py-3 font-mono text-[11px] tracking-[0.16em] text-white/50 uppercase">
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e8ff1f] opacity-60 motion-reduce:hidden" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-[#e8ff1f]" />
        </span>
        Sample call
        <span className="ml-auto">La Jolla Cove</span>
      </figcaption>
      <ol className="space-y-3 px-4 py-5 font-mono text-[13px] leading-relaxed sm:px-5">
        {LINES.map(([time, who, text]) => (
          <li key={time} className="grid grid-cols-[3.25rem_1fr] gap-3">
            <time className="text-white/40">{time}</time>
            <p className="text-white/85">
              <span className={who === "Freq" ? "text-[#e8ff1f]" : "text-white"}>{who}</span>
              {": "}
              {text}
            </p>
          </li>
        ))}
      </ol>
      <p className="border-t border-white/10 px-4 py-3 text-xs leading-relaxed text-white/45 sm:px-5">
        Scripted demo. Not a live feed.
      </p>
    </figure>
  );
}

export default function Landing() {
  return (
    <div id="top" className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      <Navbar1 />
      <main id="main">
        <section className="relative overflow-hidden">
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
          <GridBeam>
            <div className="relative z-10 mx-auto grid max-w-6xl items-end gap-12 px-5 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20 lg:pb-28">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">Hands-free AI radio</p>
                <h1 className="mt-4 max-w-xl text-[2.6rem] leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
                  {HERO_TITLE}
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">{HERO_SUB}</p>
                <div className="mt-8 flex max-w-sm flex-col gap-3">
                  <Login16 />
                  <a
                    href="#demo"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm text-white transition hover:bg-white/5"
                  >
                    Hear a demo call
                  </a>
                </div>
                <p className="mt-5 max-w-md text-xs leading-relaxed text-white/45">Advisory only.</p>
              </div>
              <Transcript />
            </div>
          </GridBeam>
        </section>

        <section aria-label="Why this exists" className="border-y border-white/10">
          <div className="mx-auto grid max-w-6xl gap-4 px-5 py-10 md:grid-cols-3 md:px-6">
            <p className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-sm leading-relaxed text-white/70">
              The FAA gets <span className="font-medium text-white">100+</span> reports of drones near airports every
              month — <span className="font-medium text-white">601</span> in Q2 2026.
            </p>
            <p className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-sm leading-relaxed text-white/70">
              During the 2025 Palisades fire, a hobby drone hit a firefighting aircraft. The pilot owed{" "}
              <span className="font-medium text-white">$146,765</span> in restitution.
            </p>
            <p className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-sm leading-relaxed text-white/70">
              DJI warnings only show on a screen you have to look at. Separate receivers cost{" "}
              <span className="font-medium text-white">$399–$499</span>.
            </p>
          </div>
        </section>

        <HowItWorks01 />
        <BentoGrid />

        <section id="airspace" className="scroll-mt-28 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">Airspace</p>
            <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">Same city. Different rules.</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {AIRSPACE.map(([place, klass, detail]) => (
                <article key={place} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <h3 className="text-sm text-white/55">{place}</h3>
                  <p className="mt-4 text-3xl font-medium tracking-tight">{klass}</p>
                  {detail ? (
                    <p className="mt-3 font-mono text-xs tracking-wide text-white/50 uppercase">{detail}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="safety" className="scroll-mt-28 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">Safety</p>
            <div className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
              <p className="text-2xl leading-snug font-medium tracking-tight sm:text-3xl">{ADVISORY}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
                The pilot’s interface is the phone call. This site is for the explanation, the one-time sign-in, and
                the call button.
              </p>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <FooterSection />
    </div>
  );
}
