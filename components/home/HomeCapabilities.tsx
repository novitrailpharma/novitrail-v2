"use client";

import { Syringe, Droplets, Pill, Package, Wrench } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const caps = [
  { label: "Injectables", icon: Syringe },
  { label: "Oral Liquids & Syrups", icon: Droplets },
  { label: "Solid Oral Dosage Forms", icon: Pill },
  { label: "Sachets & Nutritional Products", icon: Package },
  { label: "Custom & Contract Manufacturing", icon: Wrench },
];

export default function HomeCapabilities() {
  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 section-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">Our Expertise</span>
            <h2 className="mt-3">Manufacturing & Export Capabilities</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caps.map((c, i) => (
            <ScrollReveal key={c.label} delay={i * 0.1}>
              <div className="group border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-6 bg-white dark:bg-dark-card hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-novitrail-orange to-novitrail-blue rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-novitrail-orange/10 transition-colors duration-300">
                    <c.icon size={22} className="text-slate-400 dark:text-slate-500 group-hover:text-novitrail-orange transition-colors duration-300" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{c.label}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
