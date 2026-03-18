"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function HomeIntro() {
  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 section-glow pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-novitrail-blue dark:text-blue-300 bg-novitrail-blue-light dark:bg-slate-800 px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-novitrail-orange rounded-full" />
            Since 2017
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mb-6">
            Trusted Pharmaceutical Partner Since 2017
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="w-16 h-1 bg-gradient-to-r from-novitrail-orange to-novitrail-blue mx-auto mb-8 rounded-full" />

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg max-w-3xl mx-auto">
            We work with distributors, importers, and healthcare partners across
            emerging and international markets, offering pharmaceutical
            manufacturing, bulk supply, and export-oriented solutions tailored to
            market needs.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
