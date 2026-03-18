"use client";

import { motion } from "framer-motion";

export default function ExportHero() {
  return (
    <section className="relative h-[75vh] min-h-[560px] flex items-center overflow-hidden bg-white dark:bg-dark-bg">
      <div className="absolute inset-0 bg-cover bg-right md:bg-center" style={{ backgroundImage: "url('/hero/export-logistics.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-dark-bg from-10% via-white/70 dark:via-dark-bg/80 via-45% to-transparent" />
      <div className="absolute top-20 right-[18%] w-64 h-64 bg-novitrail-orange/6 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-28 right-[28%] w-48 h-48 bg-novitrail-blue/6 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="max-w-3xl pt-12 md:pt-0">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="inline-flex items-center gap-2 bg-novitrail-blue-light dark:bg-slate-800 border border-novitrail-blue/10 dark:border-slate-700 px-4 py-2 rounded-full mb-5">
            <span className="w-2 h-2 bg-novitrail-orange rounded-full animate-pulse" />
            <span className="text-sm font-medium text-novitrail-blue dark:text-blue-300">Global Distribution</span>
          </motion.div>
          <div className="w-12 h-1 bg-gradient-to-r from-novitrail-orange to-novitrail-blue mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            Global Pharmaceutical <br className="hidden md:block" /><span className="gradient-text">Export & Logistics</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
            We manufacture and supply pharmaceutical formulations for regulated export markets, supporting bulk supply, contract manufacturing, and long-term distribution partnerships.
          </p>
          <div className="mt-10 flex gap-4 flex-wrap">
            <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="/formulations" className="bg-novitrail-orange text-white px-8 py-4 rounded-lg font-semibold shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all text-center min-w-[180px]">View Formulations</motion.a>
            <motion.a whileHover={{ scale: 1.03 }} href="/contact" className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-lg font-semibold hover:border-novitrail-blue/30 transition-all text-center min-w-[180px]">Enquire Now</motion.a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-dark-bg to-transparent" />
    </section>
  );
}