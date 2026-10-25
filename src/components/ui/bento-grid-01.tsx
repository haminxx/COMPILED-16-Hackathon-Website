import { motion } from "motion/react";
import { CloudSun, MapPin, MessageCircle, Radio, Ruler, SlidersHorizontal } from "lucide-react";

const tiles = [
  {
    icon: Ruler,
    label: "Altitude ceiling",
    body: "For where you stand. FAA UAS Facility Map and Class airspace.",
  },
  {
    icon: Radio,
    label: "Manned traffic",
    body: "Live advisories for ADS-B–equipped traffic.",
  },
  {
    icon: MessageCircle,
    label: "Ask by voice",
    body: "“How high can I fly here?”",
  },
  {
    icon: SlidersHorizontal,
    label: "Set rules by voice",
    body: "“Warn me under 200 ft.”",
  },
  {
    icon: CloudSun,
    label: "Weather check",
    body: "Asked on the call. Source: NWS.",
  },
  {
    icon: MapPin,
    label: "San Diego demo",
    body: "La Jolla, Torrey Pines, Mission Bay, SAN, Miramar, and North Island.",
  },
];

export default function BentoGrid() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28" aria-labelledby="features-heading">
      <div className="mx-auto max-w-5xl sm:px-4">
        <div className="mb-12 max-w-lg">
          <span className="font-mono text-[11px] tracking-[0.18em] text-[#6B6B70] uppercase">On the call</span>
          <h2 id="features-heading" className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            What Freq tells you
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tiles.map(({ icon: Icon, label, body }, index) => (
            <motion.article
              key={label}
              className="flex flex-col gap-5 rounded-2xl border border-[#E6E6E8] bg-white p-6 transition-colors duration-300 hover:border-[#121417] sm:p-8"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid size-10 place-items-center rounded-xl border border-[#E6E6E8] bg-[#f7f8fb] text-[#0040FF]">
                <Icon className="size-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#121417]">{label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty text-[#5c6570]">{body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
