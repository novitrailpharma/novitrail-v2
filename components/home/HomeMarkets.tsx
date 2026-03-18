"use client";

import { Globe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const regions = [
  { name: "Africa", countries: "Kenya, Tanzania, Uganda, Nigeria & more" },
  { name: "South America", countries: "Brazil, Peru, Colombia & more" },
  { name: "Middle East", countries: "UAE, Iraq, Yemen & more" },
  { name: "South-East Asia", countries: "Myanmar, Cambodia, Vietnam & more" },
];

export default function HomeMarkets() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-dark-surface dark:to-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">Global Reach</span>
            <h2 className="mt-3">Markets We Serve</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mt-4">
              Our primary export focus includes Africa and South America, with
              additional support for markets in the Middle East and South-East Asia.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {regions.map((r, i) => (
            <ScrollReveal key={r.name} delay={i * 0.1}>
              <div className="group bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 text-center">
                <div className="mx-auto w-12 h-12 bg-novitrail-blue-light dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-novitrail-orange/10 transition-colors duration-300">
                  <Globe size={22} className="text-novitrail-blue dark:text-blue-300 group-hover:text-novitrail-orange transition-colors duration-300" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">{r.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{r.countries}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
