import { ADVISORY, HERO_SUB, HERO_TITLE } from "@/lib/copy";
import { SignInButton } from "@/components/SignInButton";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const PLACES = [
  ["La Jolla", "Class G"],
  ["Torrey Pines", "Demo"],
  ["Mission Bay", "Demo"],
  ["SAN", "Demo"],
  ["Miramar", "Class B"],
  ["North Island", "Demo"],
] as const;

function Transcript() {
  const lines = [
    ["00:12", "Freq", "You're in Class G. Ceiling 400 ft."],
    ["00:41", "You", "How high can I fly here?"],
    ["00:44", "Freq", "400 ft. La Jolla Cove, Class G."],
    ["01:18", "Freq", "Helicopter 2.1 NM west, 900 ft, closing. Descend to 100 ft and hold."],
  ] as const;

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
        {lines.map(([time, who, text]) => (
          <li key={time} className="grid grid-cols-[3.25rem_1fr] gap-3 sm:grid-cols-[3.5rem_1fr]">
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
    <div id="top" className="min-h-dvh bg-[#070708] text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 70% 45% at 50% -10%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(ellipse 40% 30% at 85% 10%, rgba(232,255,31,0.07), transparent 60%)",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl items-end gap-12 px-5 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-28 lg:pb-28">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">
                Hands-free AI radio
              </p>
              <h1 className="mt-4 max-w-xl text-[2.6rem] leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
                {HERO_TITLE}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">{HERO_SUB}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <SignInButton intent="primary" />
                <a
                  href="#demo"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-5 text-sm text-white transition hover:bg-white/5"
                >
                  Hear a demo call
                </a>
              </div>
              <p className="mt-5 max-w-md text-xs leading-relaxed text-white/45">Advisory only.</p>
            </div>
            <Transcript />
          </div>
        </section>

        <section aria-label="Why this exists" className="border-y border-white/10">
          <div className="mx-auto grid max-w-6xl md:grid-cols-3">
            <p className="px-5 py-8 text-sm leading-relaxed text-white/65 md:px-6">
              The FAA gets <span className="font-medium text-white">100+</span> reports of drones near airports every
              month — <span className="font-medium text-white">601</span> in Q2 2026.
            </p>
            <p className="border-white/10 px-5 py-8 text-sm leading-relaxed text-white/65 md:border-l md:px-6">
              During the 2025 Palisades fire, a hobby drone hit a firefighting aircraft. The pilot owed{" "}
              <span className="font-medium text-white">$146,765</span> in restitution.
            </p>
            <p className="border-white/10 px-5 py-8 text-sm leading-relaxed text-white/65 md:border-l md:px-6">
              DJI warnings only show on a screen you have to look at. Separate receivers cost{" "}
              <span className="font-medium text-white">$399–$499</span>.
            </p>
          </div>
        </section>

        <section id="how" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">How it works</p>
            <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
              Three steps. Then your eyes stay on the sky.
            </h2>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
              {[
                ["01", "Sign in once", "Google, on this site. One time."],
                ["02", "Tap call before takeoff", "Freq stays on the line like a co-pilot radio."],
                ["03", "Fly hands-free", "Freq speaks up when it matters."],
              ].map(([index, title, body]) => (
                <li key={index} className="bg-[#070708] p-6 sm:p-8">
                  <p className="font-mono text-xs text-[#e8ff1f]">{index}</p>
                  <h3 className="mt-4 text-xl font-medium tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="features-heading" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">On the call</p>
            <h2 id="features-heading" className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
              What Freq tells you
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-6">
              <article className="bg-[#070708] p-6 sm:col-span-2 sm:p-8 lg:col-span-4">
                <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Altitude ceiling</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">For where you stand</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
                  FAA UAS Facility Map and Class airspace. Freq says how high you may fly before it is an emergency.
                </p>
                <div className="mt-8 flex items-end justify-between gap-6">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">Demo · La Jolla Cove</p>
                    <p className="mt-2 text-5xl font-light tracking-tight">
                      400<span className="ml-2 text-lg text-white/45">ft</span>
                    </p>
                    <p className="mt-2 font-mono text-xs text-white/55">Class G</p>
                  </div>
                  <div className="flex h-24 items-end gap-1.5" aria-hidden>
                    {Array.from({ length: 10 }, (_, i) => (
                      <span
                        key={i}
                        className="w-px bg-white/25"
                        style={{ height: `${18 + ((i * 17) % 82)}%` }}
                      />
                    ))}
                  </div>
                </div>
              </article>

              <article className="bg-[#070708] p-6 sm:col-span-2 sm:p-8 lg:col-span-2">
                <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Manned traffic</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">ADS-B advisories</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Live advisories for ADS-B–equipped traffic.
                </p>
                <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">Demo call</p>
                <p className="mt-2 text-4xl font-light tracking-tight">
                  2.1<span className="ml-2 text-base text-white/45">NM</span>
                </p>
                <p className="mt-2 font-mono text-xs text-white/55">West · 900 ft · closing</p>
              </article>

              <article className="bg-[#070708] p-6 sm:p-8 lg:col-span-2">
                <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Ask</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">Ask by voice</h3>
                <p className="mt-6 text-2xl leading-snug font-light tracking-tight text-white/90">
                  “How high can I fly here?”
                </p>
              </article>

              <article className="bg-[#070708] p-6 sm:p-8 lg:col-span-2">
                <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Rules</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">Set rules by voice</h3>
                <p className="mt-6 font-mono text-lg leading-snug text-[#e8ff1f]">“Warn me under 200 ft”</p>
              </article>

              <article className="bg-[#070708] p-6 sm:col-span-2 sm:p-8 lg:col-span-2">
                <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Weather</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">Weather check</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">Asked on the call. Source: NWS.</p>
                <p className="mt-8 text-4xl font-light tracking-tight">NWS</p>
              </article>

              <article className="bg-[#070708] p-6 sm:col-span-2 sm:p-8 lg:col-span-6">
                <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Coverage</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">San Diego demo</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">
                  La Jolla, Torrey Pines, Mission Bay, SAN, Miramar, and North Island.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {PLACES.map(([name, note]) => (
                    <li
                      key={name}
                      className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-white/80"
                    >
                      {name}
                      <span className="text-white/40"> · {note}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="airspace" className="scroll-mt-24 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
            <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">Airspace</p>
            <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
              Same city. Different rules.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
              {[
                ["La Jolla Cove", "Class G", "Up to 400 ft"],
                ["Near UTC/Miramar", "Class B", "LAANC approval required"],
                ["Next to the base", "Do not fly", ""],
              ].map(([place, klass, detail]) => (
                <article key={place} className="bg-[#070708] p-6 sm:p-8">
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

        <section id="safety" className="scroll-mt-24 border-t border-white/10">
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

        <section className="border-t border-white/10">
          <div className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:py-28">
            <div
              className="pointer-events-none absolute top-0 left-1/2 h-64 w-[36rem] -translate-x-1/2"
              aria-hidden
              style={{
                background: "radial-gradient(ellipse at center, rgba(232,255,31,0.08), transparent 70%)",
              }}
            />
            <div className="relative max-w-xl">
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">Before takeoff</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-5xl">Sign in once. Then it’s a phone call.</h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">{HERO_SUB}</p>
              <div className="mt-8">
                <SignInButton intent="primary" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
