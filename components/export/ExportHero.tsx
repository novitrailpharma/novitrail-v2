"use client";

import { motion } from "framer-motion";

export default function ExportHero() {
  return (
    <section className="relative h-[75vh] min-h-[560px] flex items-center overflow-hidden bg-white">
      {/* Background Image - Kept bright */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center"
        style={{ backgroundImage: "url('/hero/export-logistics.png')" }}
      />

      {/* LIGHT MODE OVERLAY:
          - 'from-white': Solid white behind text.
          - 'via-white/70': Soft fog in the middle.
          - 'via-45%': Controls how far the white stretches before revealing the image.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-white from-10% via-white/70 via-45% to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl pt-12 md:pt-0"
        >
          {/* Accent Line */}
          <div className="w-12 h-1 bg-novitrail-orange mb-6" />

          {/* Headline - Dark Slate for impact */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            Global Pharmaceutical <br className="hidden md:block" />
            <span className="text-blue-700">Export & Logistics</span>
          </h1>

          {/* Paragraph - Dark Gray for readability */}
          <p className="mt-6 text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl">
            We manufacture and supply pharmaceutical formulations for regulated
            export markets, supporting bulk supply, contract manufacturing, and
            long-term distribution partnerships.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            {/* Primary Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/formulations"
              className="bg-novitrail-orange text-white px-8 py-4 rounded-sm font-semibold shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition text-center min-w-[180px]"
            >
              View Formulations
            </motion.a>

            {/* Secondary Button - Dark Outline for Light Mode */}
            <motion.a
              whileHover={{ backgroundColor: "rgba(15, 23, 42, 0.05)" }}
              href="/contact"
              className="bg-white/40 backdrop-blur-sm border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-sm font-semibold hover:border-slate-500 hover:text-slate-900 transition text-center min-w-[180px]"
            >
              Enquire Now
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade - Fades to White to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}