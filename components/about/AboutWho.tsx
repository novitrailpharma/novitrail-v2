"use client";

import { Building2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutWho() {
  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-novitrail-blue-light dark:bg-slate-800 rounded-lg">
              <Building2 size={22} className="text-novitrail-blue dark:text-blue-300" />
            </div>
            <h2 className="mb-0!">Who We Are</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            <p><strong className="text-slate-900 dark:text-white">Novitrail Pharmaceuticals</strong> is an India-based pharmaceutical manufacturing and export company established in 2017. We work closely with healthcare distributors, importers, and partners across global markets.</p>
            <p>Our operations are focused on manufacturing and supplying pharmaceutical formulations that meet quality expectations while remaining commercially viable for emerging markets.</p>
            <p>With a strong understanding of export requirements, documentation, and market-specific needs, we position ourselves as a dependable long-term pharmaceutical partner.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
