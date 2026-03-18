"use client";

import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="relative min-h-screen md:h-[90vh] flex items-center overflow-hidden bg-white dark:bg-dark-bg pb-24 md:pb-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center"
        style={{ backgroundImage: "url('/hero/pharma-export.png')" }}
      />

      {/* Light gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-dark-bg from-10% via-white/60 dark:via-dark-bg/80 via-40% to-transparent" />
      <div className="absolute inset-0 bg-slate-50/20 dark:bg-dark-bg/40 mix-blend-overlay" />

      {/* Floating decorative blobs */}
      <div className="absolute top-20 right-[15%] w-72 h-72 bg-novitrail-orange/8 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-32 right-[25%] w-56 h-56 bg-novitrail-blue/8 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl pt-12 md:pt-0"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-novitrail-blue-light dark:bg-slate-800 border border-novitrail-blue/10 dark:border-slate-700 px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-novitrail-orange rounded-full animate-pulse" />
            <span className="text-sm font-medium text-novitrail-blue dark:text-blue-300">
              Trusted by 20+ countries worldwide
            </span>
          </motion.div>

          {/* Accent line */}
          <div className="w-12 h-1 bg-gradient-to-r from-novitrail-orange to-novitrail-blue mb-6" />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            Pharmaceutical{" "}
            <span className="gradient-text">Manufacturing</span>{" "}
            & Export Partner
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium max-w-2xl leading-relaxed">
            Supporting global healthcare markets with export-ready pharmaceutical
            manufacturing, bulk supply, and contract solutions.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="/products"
              className="bg-novitrail-orange text-white px-8 py-4 rounded-lg font-semibold shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/30 transition-all text-center min-w-[180px]"
            >
              View Products
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              href="/export"
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-8 py-4 rounded-lg font-semibold hover:border-novitrail-blue/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all text-center min-w-[180px]"
            >
              Export Capabilities
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-0 left-0 w-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-center md:justify-start gap-8 md:gap-16">
          <StatItem value="8+" label="Years" />
          <div className="w-px bg-slate-200 dark:bg-slate-700" />
          <StatItem value="20+" label="Countries" />
          <div className="w-px bg-slate-200 dark:bg-slate-700" />
          <StatItem value="5000+" label="Partners" />
        </div>
      </motion.div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-xl md:text-2xl font-bold text-novitrail-blue dark:text-blue-300">{value}</div>
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}