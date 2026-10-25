import { motion } from "motion/react";
import { SignInButton } from "@/components/SignInButton";
import FooterSection from "@/components/ui/footer";
import { Navbar1 } from "@/components/ui/navbar-1";
import { ADVISORY, HERO_SUB, HERO_TITLE } from "@/lib/copy";
import { useDemo } from "@/lib/demo";

const ease = [0.22, 1, 0.36, 1] as const;

const heroBreak = HERO_TITLE.indexOf(" is ");
const heroLead = heroBreak > 0 ? HERO_TITLE.slice(0, heroBreak) : HERO_TITLE;
const heroRest = heroBreak > 0 ? HERO_TITLE.slice(heroBreak + 1) : "";

const LINES = [
  ["00:12", "Freq", "You're in Class G. Ceiling 400 ft."],
  ["00:41", "You", "How high can I fly here?"],
  ["00:44", "Freq", "400 ft. La Jolla Cove, Class G."],
  ["01:18", "Freq", "Helicopter 2.1 NM west, 900 ft, closing. Descend to 100 ft and hold."],
] as const;

const FACTS = [
  {
    kicker: "FAA",
    figure: "100",
    suffix: "+",
    body: "The FAA gets 100+ reports of drones near airports every month — 601 in Q2 2026.",
  },
  {
    kicker: "Palisades",
    figure: "$146,765",
    suffix: "",
    body: "During the 2025 Palisades fire, a hobby drone hit a firefighting aircraft. The pilot owed $146,765 in restitution.",
  },
  {
    kicker: "Receivers",
    figure: "$399–$499",
    suffix: "",
    body: "DJI warnings only show on a screen you have to look at. Separate receivers cost $399–$499.",
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Sign in once",
    body: "Continue with Google. One time. After that, the pilot’s interface is the phone call.",
    lines: [] as const,
  },
  {
    n: "02",
    title: "Tap call before takeoff",
    body: "Stay on the line. The call is the interface, so your eyes never leave the sky.",
    lines: [
      ["Freq", "You're in Class G. Ceiling 400 ft."],
      ["You", "How high can I fly here?"],
    ],
  },
  {
    n: "03",
    title: "Fly hands-free",
    body: "Freq speaks up when it matters — how high you may fly, and when to come down.",
    lines: [["Freq", "Helicopter 2.1 NM west, 900 ft, closing. Descend to 100 ft and hold."]],
  },
] as const;

const PLACES = ["La Jolla", "Torrey Pines", "Mission Bay", "SAN", "Miramar", "North Island"] as const;

const AIRSPACE = [
  { place: "La Jolla Cove", rule: "Class G", detail: "Up to 400 ft" },
  { place: "Near UTC/Miramar", rule: "Class B", detail: "LAANC approval required" },
  { place: "Next to the base", rule: "Do not fly", detail: "Do not fly" },
] as const;

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Transcript() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[#E7E9EE] bg-white shadow-[0_30px_80px_-30px_rgba(10,11,16,0.18)]">
      <figcaption className="flex h-11 items-center justify-between border-b border-[#E7E9EE] bg-[#F7F8FA] px-4 font-mono text-[12px] text-[#6B7280]">
        <span className="inline-flex items-center gap-2">
          <span className="pulse-dot inline-flex h-2 w-2 rounded-full bg-[#0040FF]" aria-hidden />
          Sample call
        </span>
        <span>La Jolla Cove</span>
      </figcaption>
      <ol className="space-y-3 px-5 py-5 font-mono text-[12.5px] leading-relaxed">
        {LINES.map(([time, who, text]) => (
          <li key={time} className="grid grid-cols-[3.25rem_1fr] gap-3">
            <time className="text-[#6B7280]">{time}</time>
            <p className="text-[#0A0B10]">
              <span className={who === "Freq" ? "text-[#0040FF]" : "text-[#0A0B10]"}>{who}</span>
              {": "}
              {text}
            </p>
          </li>
        ))}
      </ol>
      <p className="border-t border-[#E7E9EE] px-5 py-3 text-xs leading-relaxed text-[#6B7280]">Scripted demo. Not a live feed.</p>
    </figure>
  );
}

function AirspaceSketch() {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-[#E7E9EE] bg-white p-5">
      <div className="airspace-grid absolute inset-5" aria-hidden />
      <svg className="relative h-full w-full" viewBox="0 0 400 320" fill="none" role="img" aria-label="La Jolla Cove, Miramar, and the base">
        <circle cx="118" cy="168" r="78" fill="#0040FF" fillOpacity="0.06" stroke="#0040FF" strokeOpacity="0.45" strokeDasharray="4 4" />
        <text x="118" y="78" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="#0040FF">
          LA JOLLA COVE
        </text>
        <text x="118" y="92" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="#6B7280">
          CLASS G · 400 FT
        </text>
        <circle cx="286" cy="128" r="70" fill="#0040FF" fillOpacity="0.1" stroke="#0040FF" strokeOpacity="0.7" />
        <text x="286" y="48" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="#0040FF">
          UTC / MIRAMAR
        </text>
        <text x="286" y="62" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="#6B7280">
          CLASS B · LAANC
        </text>
        <rect x="168" y="214" width="132" height="52" rx="8" fill="white" stroke="#E7E9EE" />
        <text x="234" y="236" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="#0A0B10">
          NEXT TO THE BASE
        </text>
        <text x="234" y="252" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="#0040FF">
          DO NOT FLY
        </text>
      </svg>
    </div>
  );
}

export default function Landing() {
  const { openDemo } = useDemo();

  return (
    <div id="top" className="min-h-dvh bg-white text-[#0A0B10]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[#0040FF] focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar1 />
      <main id="main">
        <section className="relative overflow-hidden">
          <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
              <p className="inline-flex h-8 items-center gap-2 rounded-full border border-[#E7E9EE] bg-white px-3 font-mono text-[12.5px] text-[#6B7280]">
                <span className="pulse-dot inline-flex h-2 w-2 rounded-full bg-[#0040FF]" aria-hidden />
                Hands-free AI radio
              </p>
              <h1 className="mt-6 text-[44px] leading-[1.02] font-semibold tracking-[-0.03em] sm:text-[64px] lg:text-[72px]">
                {heroLead}
                {heroRest ? (
                  <>
                    <br />
                    <span className="text-[#0040FF]">{heroRest}</span>
                  </>
                ) : null}
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#6B7280] sm:text-[18px]">{HERO_SUB}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={openDemo}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0040FF] px-5 text-[14.5px] font-semibold text-white shadow-[0_0_0_1px_rgba(0,64,255,0.18),0_10px_30px_-12px_rgba(0,64,255,0.35)] transition-colors hover:bg-[#0033CC]"
                >
                  Hear a demo call
                  <Arrow />
                </button>
                <SignInButton
                  intent="primary"
                  wrapClassName="relative"
                  className="inline-flex h-11 items-center justify-center gap-2.5 rounded-lg border border-[#E7E9EE] bg-white px-5 text-[14.5px] font-medium text-[#0A0B10] transition-colors hover:bg-[#F7F8FA] disabled:opacity-60"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
            >
              <Transcript />
            </motion.div>
          </div>
        </section>

        <section aria-label="Why this exists" className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-[12.5px] tracking-[0.14em] text-[#0040FF] uppercase">The problem</p>
            <h2 className="mt-3 text-[32px] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[44px]">
              Three things worth knowing first.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {FACTS.map((fact, index) => (
              <motion.article
                key={fact.kicker}
                className="rounded-2xl border border-[#E7E9EE] bg-white p-7 motion-safe:transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#D7DAE2]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease }}
              >
                <p className="font-mono text-[12px] tracking-[0.12em] text-[#0040FF] uppercase">{fact.kicker}</p>
                <p className="mt-4 text-[40px] leading-none font-semibold tracking-tight sm:text-[48px]">
                  {fact.figure}
                  {fact.suffix ? <span className="text-[#0040FF]">{fact.suffix}</span> : null}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[#6B7280]">{fact.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="how" className="scroll-mt-20 border-y border-[#E7E9EE] bg-[#F7F8FA]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="font-mono text-[12.5px] tracking-[0.14em] text-[#0040FF] uppercase">How it works</p>
                <h2 className="mt-3 text-[32px] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[44px]">
                  Sign in once. Then it’s a phone call.
                </h2>
              </div>
              <p className="max-w-sm text-[14px] leading-relaxed text-[#6B7280]">{HERO_SUB}</p>
            </div>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#E7E9EE]">
              {STEPS.map((step, index) => (
                <motion.li
                  key={step.n}
                  className={index === 0 ? "md:pr-8" : index === 1 ? "md:px-8" : "md:pl-8"}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[12px] text-[#0040FF]">{step.n}</span>
                    <span className="h-px flex-1 bg-[#E7E9EE]" />
                  </div>
                  <h3 className="mt-5 text-[22px] font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">{step.body}</p>
                  {step.lines.length > 0 ? (
                    <div className="mt-6 rounded-xl border border-[#E7E9EE] bg-white p-4 font-mono text-[12.5px] leading-relaxed">
                      {step.lines.map(([who, text]) => (
                        <p key={text}>
                          <span className={who === "Freq" ? "text-[#0040FF]" : "text-[#6B7280]"}>{who.toLowerCase()} →</span> {text}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28" aria-label="What the call covers">
          <div className="max-w-2xl">
            <p className="font-mono text-[12.5px] tracking-[0.14em] text-[#0040FF] uppercase">On the call</p>
            <h2 className="mt-3 text-[32px] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[44px]">
              Six things the line can tell you.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
            <motion.article
              className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[#E7E9EE] bg-white p-7 md:col-span-4 motion-safe:transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#D7DAE2]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="airspace-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
              <div className="relative max-w-md">
                <p className="font-mono text-[11px] text-[#0040FF]">ALTITUDE</p>
                <h3 className="mt-2 text-[22px] font-semibold tracking-tight">Altitude ceiling for where you stand</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#6B7280]">FAA UAS Facility Map + Class airspace.</p>
              </div>
              <div className="relative mt-8 flex flex-wrap gap-2 font-mono text-[12px] text-[#0040FF]">
                <span className="rounded-md border border-[#E7E9EE] bg-white px-2.5 py-1.5">Class G · 400 ft</span>
                <span className="rounded-md border border-[#E7E9EE] bg-white px-2.5 py-1.5">Class B · LAANC</span>
              </div>
            </motion.article>

            <motion.article
              className="flex min-h-[280px] flex-col rounded-2xl border border-[#E7E9EE] bg-white p-7 md:col-span-2 motion-safe:transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#D7DAE2]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.06, ease }}
            >
              <p className="font-mono text-[11px] text-[#0040FF]">WEATHER</p>
              <h3 className="mt-2 text-[22px] font-semibold tracking-tight">Weather check</h3>
              <p className="mt-auto text-[14.5px] leading-relaxed text-[#6B7280]">National Weather Service, read aloud before you look down.</p>
            </motion.article>

            <motion.article
              className="rounded-2xl border border-[#E7E9EE] bg-white p-7 md:col-span-2 motion-safe:transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#D7DAE2]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="font-mono text-[11px] text-[#0040FF]">TRAFFIC</p>
              <h3 className="mt-2 text-[20px] font-semibold tracking-tight">Live advisories for ADS-B–equipped traffic</h3>
              <p className="mt-5 font-mono text-[12.5px] leading-relaxed text-[#6B7280]">
                Helicopter 2.1 NM west, 900 ft, closing. Descend to 100 ft and hold.
              </p>
            </motion.article>

            <motion.article
              className="rounded-2xl border border-[#E7E9EE] bg-white p-7 md:col-span-2 motion-safe:transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#D7DAE2]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
            >
              <p className="font-mono text-[11px] text-[#0040FF]">ASK</p>
              <h3 className="mt-2 text-[20px] font-semibold tracking-tight">Ask by voice</h3>
              <p className="mt-4 text-[18px] leading-snug font-medium tracking-tight">“How high can I fly here?”</p>
            </motion.article>

            <motion.article
              className="rounded-2xl border border-[#E7E9EE] bg-white p-7 md:col-span-2 motion-safe:transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#D7DAE2]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
            >
              <p className="font-mono text-[11px] text-[#0040FF]">RULES</p>
              <h3 className="mt-2 text-[20px] font-semibold tracking-tight">Set rules by voice</h3>
              <p className="mt-4 text-[18px] leading-snug font-medium tracking-tight">“Warn me under 200 ft.”</p>
            </motion.article>

            <motion.article
              className="rounded-2xl border border-[#E7E9EE] bg-white p-7 md:col-span-6 motion-safe:transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#D7DAE2]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.04, ease }}
            >
              <p className="font-mono text-[11px] text-[#0040FF]">SAN DIEGO</p>
              <h3 className="mt-2 text-[20px] font-semibold tracking-tight">San Diego demo coverage</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {PLACES.map((place) => (
                  <li key={place} className="rounded-md border border-[#E7E9EE] px-2.5 py-1.5 font-mono text-[12.5px] text-[#0A0B10]">
                    {place}
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </section>

        <section id="airspace" className="scroll-mt-20 border-y border-[#E7E9EE] bg-[#F7F8FA]">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[12.5px] tracking-[0.14em] text-[#0040FF] uppercase">Airspace</p>
              <h2 className="mt-3 text-[32px] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[44px]">
                Same city. Different rules.
              </h2>
              <ul className="mt-8 space-y-4">
                {AIRSPACE.map((item) => (
                  <li key={item.place} className="rounded-xl border border-[#E7E9EE] bg-white px-5 py-4">
                    <p className="font-mono text-[12px] tracking-[0.12em] text-[#6B7280] uppercase">{item.place}</p>
                    <p className="mt-2 text-[22px] font-semibold tracking-tight text-[#0040FF]">{item.rule}</p>
                    {item.place === "Next to the base" ? null : <p className="mt-1 text-[14.5px] text-[#6B7280]">{item.detail}</p>}
                  </li>
                ))}
              </ul>
            </div>
            <AirspaceSketch />
          </div>
        </section>

        <section id="safety" className="scroll-mt-20 mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="rounded-2xl border border-[#E7E9EE] bg-white p-8 sm:p-12">
            <p className="font-mono text-[12.5px] tracking-[0.14em] text-[#0040FF] uppercase">Safety</p>
            <p className="mt-4 max-w-3xl text-[28px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[36px]">{ADVISORY}</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#6B7280]">
              This site explains the product, signs you in once, and opens the call. The call is the interface.
            </p>
          </div>
        </section>

        <section id="demo" className="scroll-mt-20 mx-auto max-w-[1240px] px-5 pb-24 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0040FF]">
            <div className="dot-bg pointer-events-none absolute inset-0 opacity-30" aria-hidden />
            <div className="relative px-6 py-16 text-white sm:px-14 sm:py-24">
              <p className="font-mono text-[12px] tracking-[0.14em] uppercase opacity-80">Before takeoff</p>
              <h2 className="mt-4 max-w-2xl text-[36px] leading-[1.02] font-semibold tracking-[-0.02em] sm:text-[56px]">
                Your next flight, with a co-pilot on the line.
              </h2>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/90 sm:text-[17px]">{HERO_SUB}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={openDemo}
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-[14.5px] font-semibold text-[#0040FF] transition-colors hover:bg-[#F7F8FA]"
                >
                  Hear a demo call
                  <Arrow />
                </button>
                <SignInButton
                  intent="primary"
                  wrapClassName="relative"
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg border border-white/30 px-6 text-[14.5px] font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-60"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
