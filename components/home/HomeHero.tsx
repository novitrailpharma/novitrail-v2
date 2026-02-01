"use client";

import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background Image - crisp and bright */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center"
        style={{ backgroundImage: "url('/hero/pharma-export.png')" }}
      />

      {/* REFINED GRADIENT:
          - 'from-10%': Keeps the far left solid for the start of the headline.
          - 'via-white/60': Drops opacity significantly in the middle.
          - 'via-40%': Forces the fade to happen earlier, keeping the right side clear.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-white from-10% via-white/60 via-40% to-transparent" />

      {/* Optional: Very subtle tint to unify colors, but kept transparent */}
      <div className="absolute inset-0 bg-slate-50/20 mix-blend-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl pt-12 md:pt-0"
        >
          {/* Accent line */}
          <div className="w-12 h-1 bg-novitrail-orange mb-6" />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Pharmaceutical{" "}
            <span className="text-blue-700">Manufacturing</span>{" "}
            & Export Partner
          </h1>

          {/* Added a slight white backdrop blur to just the text block 
              to ensure readability if the image gets busy behind it */}
          <p className="mt-6 text-lg md:text-xl text-slate-700 font-medium max-w-2xl leading-relaxed">
            Supporting global healthcare markets with export-ready pharmaceutical
            manufacturing, bulk supply, and contract solutions.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/products"
              className="bg-novitrail-orange text-white px-8 py-4 rounded-sm font-semibold shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all text-center min-w-[180px]"
            >
              View Products
            </motion.a>

            <motion.a
              whileHover={{ backgroundColor: "rgba(15, 23, 42, 0.05)" }}
              href="/export"
              className="bg-white/40 backdrop-blur-sm border-2 border-slate-300 text-slate-800 px-8 py-4 rounded-sm font-semibold hover:border-slate-500 hover:text-slate-900 transition-all text-center min-w-[180px]"
            >
              Export Capabilities
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}