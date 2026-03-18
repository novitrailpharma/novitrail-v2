"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function ExportCTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-novitrail-blue-light via-blue-50 to-white dark:from-slate-900 dark:via-novitrail-blue-dark dark:to-slate-900">
      <div
        className="absolute inset-0 opacity-10 dark:opacity-20 animate-gradient-shift"
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(243,112,33,0.08) 30%, transparent 60%, rgba(11,79,138,0.08) 80%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
      />
      <div className="absolute top-10 left-[8%] w-28 h-28 border border-novitrail-blue/10 dark:border-white/5 rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-14 right-[12%] w-20 h-20 border border-novitrail-blue/10 dark:border-white/5 rounded-full animate-float-delayed pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-novitrail-blue dark:text-white mb-6!">Discuss Your Export Requirements</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-slate-600 dark:text-slate-300 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            Contact Novitrail Pharmaceuticals to explore manufacturing, bulk supply, and export opportunities tailored to your market.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="/contact" className="inline-block bg-novitrail-orange text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-xl shadow-orange-500/25 hover:bg-orange-500 transition-all">
            Contact Export Team
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
}
