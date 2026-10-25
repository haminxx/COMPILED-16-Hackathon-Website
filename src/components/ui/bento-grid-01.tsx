import { motion } from "motion/react";

const card =
  "flex flex-col overflow-hidden rounded-xl border border-[#e6e8ee] bg-white p-6 shadow-sm transition duration-300 hover:border-[#0040FF]/40 md:p-8";

const places = ["La Jolla", "Torrey Pines", "Mission Bay", "SAN", "Miramar", "North Island"];

export default function BentoGrid() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28" aria-labelledby="features-heading">
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          className="mb-3 text-sm tracking-widest text-[#5c6570] uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          On the call
        </motion.p>
        <h2 id="features-heading" className="mb-8 max-w-xl text-3xl font-medium tracking-tight text-[#121417] sm:text-4xl">
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
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">Altitude ceiling</p>
            <div className="flex flex-1 flex-col justify-end pt-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">Demo · La Jolla Cove</p>
              <p className="mt-2 text-5xl font-light tracking-tight text-[#121417]">
                400<span className="ml-2 text-lg text-[#5c6570]">ft</span>
              </p>
              <h3 className="mt-4 text-xl font-medium text-[#121417]">For where you stand</h3>
              <p className="mt-1 text-sm text-[#5c6570]">FAA UAS Facility Map and Class airspace. Class G.</p>
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
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">Manned traffic</p>
            <div className="mt-4">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">Demo call</p>
              <p className="mt-1 text-4xl font-light tracking-tight text-[#121417]">
                2.1<span className="ml-2 text-base text-[#5c6570]">NM</span>
              </p>
              <h3 className="mt-3 text-lg font-medium text-[#121417]">ADS-B advisories</h3>
              <p className="mt-1 text-sm text-[#5c6570]">Live advisories for ADS-B–equipped traffic. West · 900 ft · closing.</p>
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
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">Coverage</p>
            <h3 className="mt-3 text-xl font-medium text-[#121417]">San Diego demo</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {places.map((place) => (
                <li key={place} className="rounded-full border border-[#d7dbe3] px-3 py-1 font-mono text-xs text-[#121417]/80">
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
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">Ask</p>
            <h3 className="mt-3 text-lg font-medium text-[#121417]">Ask by voice</h3>
            <p className="mt-3 text-2xl font-light tracking-tight text-[#121417]">“How high can I fly here?”</p>
          </motion.div>

          <motion.div
            className={`${card} md:col-span-3`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 0.98 }}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">Rules</p>
            <h3 className="mt-3 text-xl font-medium text-[#121417]">Set rules by voice</h3>
            <p className="mt-4 font-mono text-lg text-[#0040FF]">“Warn me under 200 ft”</p>
          </motion.div>

          <motion.div
            className={`${card} md:col-span-3`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 0.98 }}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#5c6570] uppercase">Weather</p>
            <h3 className="mt-3 text-xl font-medium text-[#121417]">Weather check</h3>
            <p className="mt-2 text-sm text-[#5c6570]">Asked on the call. Source: NWS.</p>
            <p className="mt-6 text-4xl font-light tracking-tight text-[#121417]">NWS</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
