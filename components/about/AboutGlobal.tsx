"use client";

import { Globe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutGlobal() {
  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-novitrail-blue-light dark:bg-slate-800 rounded-lg">
              <Globe size={22} className="text-novitrail-blue dark:text-blue-300" />
            </div>
            <h2 className="mb-0!">Global Presence</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            <p>Novitrail Pharmaceuticals actively supports pharmaceutical supply and manufacturing requirements for international markets, with a primary focus on <strong className="text-slate-900 dark:text-white">Africa</strong>, <strong className="text-slate-900 dark:text-white">South America</strong>, the <strong className="text-slate-900 dark:text-white">Middle East</strong>, and <strong className="text-slate-900 dark:text-white">South-East Asia</strong>.</p>
            <p>Our global experience enables us to adapt products, packaging, and documentation to align with country-specific regulations and market expectations.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
