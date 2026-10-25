import { motion } from "motion/react";
import { ADVISORY, HERO_SUB, HERO_TITLE } from "@/lib/copy";
import { GridBeam } from "@/components/ui/background-grid-beam";
import BentoGrid from "@/components/ui/bento-grid-01";
import { Component as CallToAction } from "@/components/ui/call-to-action";
import FooterSection from "@/components/ui/footer";
import HowItWorks01 from "@/components/ui/how-it-works-01";
import Login16 from "@/components/ui/login-16";
import { Navbar1 } from "@/components/ui/navbar-1";
import { Spotlight } from "@/components/ui/spotlight";

const ease = [0.22, 1, 0.36, 1] as const;

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

const FACTS = [
  <>
    The FAA gets <span className="font-medium text-[#0040FF]">100+</span> reports of drones near airports every month —{" "}
    <span className="font-medium text-[#0040FF]">601</span> in Q2 2026.
  </>,
  <>
    During the 2025 Palisades fire, a hobby drone hit a firefighting aircraft. The pilot owed{" "}
    <span className="font-medium text-[#0040FF]">$146,765</span> in restitution.
  </>,
  <>
    DJI warnings only show on a screen you have to look at. Separate receivers cost{" "}
    <span className="font-medium text-[#0040FF]">$399–$499</span>.
  </>,
];

function Transcript() {
  return (
    <motion.figure
      id="demo"
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-[#e6e8ee] bg-white shadow-[0_24px_60px_-36px_rgba(0,64,255,0.45)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12, ease }}
    >
      <figcaption className="flex items-center gap-2 border-b border-[#e6e8ee] px-4 py-3 font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0040FF] opacity-60 motion-reduce:hidden" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-[#0040FF]" />
        </span>
        Sample call
        <span className="ml-auto">La Jolla Cove</span>
      </figcaption>
      <ol className="space-y-3 px-4 py-5 font-mono text-[13px] leading-relaxed sm:px-5">
        {LINES.map(([time, who, text]) => (
          <li key={time} className="grid grid-cols-[3.25rem_1fr] gap-3">
            <time className="text-[#8b93a0]">{time}</time>
            <p className="text-[#121417]">
              <span className={who === "Freq" ? "text-[#0040FF]" : "text-[#121417]"}>{who}</span>
              {": "}
              {text}
            </p>
          </li>
        ))}
      </ol>
      <p className="border-t border-[#e6e8ee] px-4 py-3 text-xs leading-relaxed text-[#5c6570] sm:px-5">
        Scripted demo. Not a live feed.
      </p>
    </motion.figure>
  );
}

export default function Landing() {
  return (
    <div id="top" className="min-h-dvh bg-white text-[#121417]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-[#0040FF] focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar1 />
      <main id="main">
        <section className="relative overflow-hidden">
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#0040FF" />
          <GridBeam>
            <div className="relative z-10 mx-auto grid max-w-6xl items-end gap-12 px-5 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20 lg:pb-28">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
                <p className="font-mono text-[11px] tracking-[0.18em] text-[#0040FF] uppercase">Hands-free AI radio</p>
                <h1 className="mt-4 max-w-xl text-[2.6rem] leading-[1.02] font-medium tracking-tight text-balance text-[#121417] sm:text-6xl lg:text-[4.25rem]">
                  {HERO_TITLE}
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-[#5c6570] sm:text-lg">{HERO_SUB}</p>
                <div className="mt-8 flex max-w-sm flex-col gap-3">
                  <Login16 />
                  <a
                    href="#demo"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-[#d7dbe3] px-5 text-sm text-[#121417] transition hover:border-[#0040FF] hover:text-[#0040FF]"
                  >
                    Hear a demo call
                  </a>
                </div>
                <p className="mt-5 max-w-md text-xs leading-relaxed text-[#5c6570]">Advisory only.</p>
              </motion.div>
              <Transcript />
            </div>
          </GridBeam>
        </section>

        <section aria-label="Why this exists" className="border-y border-[#e6e8ee] bg-white">
          <div className="mx-auto grid max-w-6xl gap-4 px-5 py-10 md:grid-cols-3 md:px-6">
            {FACTS.map((fact, index) => (
              <motion.p
                key={index}
                className="reveal-view rounded-xl border border-[#e6e8ee] bg-white p-6 text-sm leading-relaxed text-[#3c4450] shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease }}
              >
                {fact}
              </motion.p>
            ))}
          </div>
        </section>

        <HowItWorks01 />
        <BentoGrid />

        <section id="airspace" className="scroll-mt-28 border-t border-[#e6e8ee] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <p className="font-mono text-[11px] tracking-[0.18em] text-[#0040FF] uppercase">Airspace</p>
            <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">Same city. Different rules.</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {AIRSPACE.map(([place, klass, detail], index) => (
                <motion.article
                  key={place}
                  className="reveal-view rounded-2xl border border-[#e6e8ee] bg-white p-6 shadow-sm sm:p-8"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease }}
                >
                  <h3 className="text-sm text-[#5c6570]">{place}</h3>
                  <p className="mt-4 text-3xl font-medium tracking-tight text-[#0040FF]">{klass}</p>
                  {detail ? (
                    <p className="mt-3 font-mono text-xs tracking-wide text-[#5c6570] uppercase">{detail}</p>
                  ) : null}
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="safety" className="scroll-mt-28 border-t border-[#e6e8ee]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <p className="font-mono text-[11px] tracking-[0.18em] text-[#0040FF] uppercase">Safety</p>
            <motion.div
              className="mt-6 max-w-3xl rounded-2xl border border-[#e6e8ee] bg-[#f7f8fb] p-6 sm:p-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
            >
              <p className="text-2xl leading-snug font-medium tracking-tight sm:text-3xl">{ADVISORY}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c6570]">
                The pilot’s interface is the phone call. This site is for the explanation, the one-time sign-in, and
                the call button.
              </p>
            </motion.div>
          </div>
        </section>

        <CallToAction />
      </main>
      <FooterSection />
    </div>
  );
}
