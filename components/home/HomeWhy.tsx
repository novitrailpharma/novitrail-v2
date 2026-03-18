"use client";

import { Globe2, Handshake, FileCheck, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const reasons = [
  { num: "01", title: "Export-Focused Manufacturing", desc: "Our manufacturing approach is aligned with international standards and export market requirements.", icon: Globe2 },
  { num: "02", title: "Flexible Bulk & Contract Supply", desc: "Scalable solutions for bulk production, private label, and third-party manufacturing.", icon: Handshake },
  { num: "03", title: "Market-Specific Documentation", desc: "Full documentation support tailored to country-specific regulatory frameworks.", icon: FileCheck },
  { num: "04", title: "Long-Term Partnership Mindset", desc: "We prioritize sustained relationships and reliable supply over one-off transactions.", icon: TrendingUp },
];

export default function HomeWhy() {
  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">The Novitrail Advantage</span>
            <h2 className="mt-3">Why Partner With Novitrail</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.num} delay={i * 0.1}>
              <div className="group border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-6 bg-white dark:bg-dark-card hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden h-full">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-novitrail-orange to-novitrail-blue rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 right-4 text-5xl font-black text-slate-100 dark:text-slate-800 group-hover:text-novitrail-orange/10 transition-colors duration-300 select-none">{r.num}</span>
                <div className="relative">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg w-fit mb-4 group-hover:bg-novitrail-orange/10 transition-colors duration-300">
                    <r.icon size={22} className="text-slate-400 dark:text-slate-500 group-hover:text-novitrail-orange transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
