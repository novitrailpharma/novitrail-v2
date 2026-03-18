"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] min-h-130 flex items-center overflow-hidden bg-white dark:bg-dark-bg">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero/about-pharma.png')" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-dark-bg from-10% via-white/75 dark:via-dark-bg/80 via-40% to-transparent" />
      <div className="absolute top-16 right-[20%] w-56 h-56 bg-novitrail-orange/6 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-24 right-[30%] w-40 h-40 bg-novitrail-blue/6 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="max-w-3xl pt-10 md:pt-0">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="inline-flex items-center gap-2 bg-novitrail-blue-light dark:bg-slate-800 border border-novitrail-blue/10 dark:border-slate-700 px-4 py-2 rounded-full mb-5">
            <span className="w-2 h-2 bg-novitrail-orange rounded-full animate-pulse" />
            <span className="text-sm font-medium text-novitrail-blue dark:text-blue-300">Our Story</span>
          </motion.div>
          <div className="w-12 h-1 bg-gradient-to-r from-novitrail-orange to-novitrail-blue mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">About Us</h1>
          <p className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
            We are a professionally managed pharmaceutical manufacturer and exporter, dedicated to delivering regulated, export-ready medicines to healthcare markets worldwide.
          </p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-dark-bg to-transparent" />
    </section>
  );
}