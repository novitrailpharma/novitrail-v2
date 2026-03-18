"use client";

import { Globe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const regions = [
  { name: "Africa", desc: "Primary focus region with growing demand for quality pharmaceuticals and long-term supply partnerships.", countries: "Kenya, Tanzania, Uganda, Nigeria & more" },
  { name: "South America", desc: "Supporting distributors and importers with reliable manufacturing and export support.", countries: "Brazil, Peru, Colombia & more" },
  { name: "Middle East", desc: "Supplying select markets with customized pharmaceutical solutions.", countries: "UAE, Iraq, Yemen & more" },
  { name: "South-East Asia", desc: "Serving emerging markets with cost-effective and scalable manufacturing capabilities.", countries: "Myanmar, Cambodia, Vietnam & more" },
];

export default function ExportRegions() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-dark-surface dark:to-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">Global Reach</span>
            <h2 className="mt-3">Export Markets We Serve</h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {regions.map((r, i) => (
            <ScrollReveal key={r.name} delay={i * 0.1}>
              <div className="group bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-7 hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden h-full">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-novitrail-orange to-novitrail-blue rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-novitrail-blue-light dark:bg-slate-800 rounded-lg shrink-0 group-hover:bg-novitrail-orange/10 transition-colors duration-300">
                    <Globe size={22} className="text-novitrail-blue dark:text-blue-300 group-hover:text-novitrail-orange transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-novitrail-orange mb-2">{r.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">{r.desc}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{r.countries}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
