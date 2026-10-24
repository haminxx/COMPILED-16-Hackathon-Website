import { motion } from "motion/react";

const card =
  "flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700 md:p-8";

const places = ["La Jolla", "Torrey Pines", "Mission Bay", "SAN", "Miramar", "North Island"];

export default function BentoGrid() {
  return (
    <section className="bg-zinc-950 px-6 py-20 sm:py-28" aria-labelledby="features-heading">
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          className="mb-3 text-sm tracking-widest text-gray-400 uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          On the call
        </motion.p>
        <h2 id="features-heading" className="mb-8 max-w-xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
          What Freq tells you
        </h2>

        <div className="grid grid-cols-1 gap-4 md:auto-rows-[minmax(200px,auto)] md:grid-cols-6">
          <motion.div
            className={`${card} md:col-span-2 md:row-span-2`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Altitude ceiling</p>
            <div className="flex flex-1 flex-col justify-end pt-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">Demo · La Jolla Cove</p>
              <p className="mt-2 text-5xl font-light tracking-tight text-white">
                400<span className="ml-2 text-lg text-white/45">ft</span>
              </p>
              <h3 className="mt-4 text-xl font-medium text-white">For where you stand</h3>
              <p className="mt-1 text-sm text-gray-400">FAA UAS Facility Map and Class airspace. Class G.</p>
            </div>
          </motion.div>

          <motion.div
            className={`${card} md:col-span-2`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.98 }}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Manned traffic</p>
            <div className="mt-4">
              <p className="font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">Demo call</p>
              <p className="mt-1 text-4xl font-light tracking-tight text-white">
                2.1<span className="ml-2 text-base text-white/45">NM</span>
              </p>
              <h3 className="mt-3 text-lg font-medium text-white">ADS-B advisories</h3>
              <p className="mt-1 text-sm text-gray-400">Live advisories for ADS-B–equipped traffic. West · 900 ft · closing.</p>
            </div>
          </motion.div>

          <motion.div
            className={`${card} md:col-span-2 md:row-span-2`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Coverage</p>
            <h3 className="mt-3 text-xl font-medium text-white">San Diego demo</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {places.map((place) => (
                <li key={place} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/80">
                  {place}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={`${card} md:col-span-2`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 0.98 }}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Ask</p>
            <h3 className="mt-3 text-lg font-medium text-white">Ask by voice</h3>
            <p className="mt-3 text-2xl font-light tracking-tight text-white/90">“How high can I fly here?”</p>
          </motion.div>

          <motion.div
            className={`${card} md:col-span-3`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 0.98 }}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Rules</p>
            <h3 className="mt-3 text-xl font-medium text-white">Set rules by voice</h3>
            <p className="mt-4 font-mono text-lg text-[#e8ff1f]">“Warn me under 200 ft”</p>
          </motion.div>

          <motion.div
            className={`${card} md:col-span-3`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 0.98 }}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Weather</p>
            <h3 className="mt-3 text-xl font-medium text-white">Weather check</h3>
            <p className="mt-2 text-sm text-gray-400">Asked on the call. Source: NWS.</p>
            <p className="mt-6 text-4xl font-light tracking-tight text-white">NWS</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
