"use client";

import { Factory, Handshake, Boxes, Tag, Settings } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  { label: "Pharmaceutical Manufacturing", icon: Factory },
  { label: "Third-Party & Contract Manufacturing", icon: Handshake },
  { label: "Bulk Production for Export Markets", icon: Boxes },
  { label: "Private Label Manufacturing", icon: Tag },
  { label: "Market-Specific Product Customization", icon: Settings },
];

export default function AboutWhat() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-dark-surface dark:to-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">Our Services</span>
            <h2 className="mt-3">What We Do</h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.label} delay={i * 0.1}>
              <div className="group bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-novitrail-orange to-novitrail-blue rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:bg-novitrail-orange/10 transition-colors duration-300">
                    <service.icon size={22} className="text-slate-400 dark:text-slate-500 group-hover:text-novitrail-orange transition-colors duration-300" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{service.label}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.4}>
          <p className="mt-12 text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl mx-auto text-center text-lg">
            Our manufacturing operations are designed to support export-focused supply, enabling scalable production, consistent quality, and flexible customization aligned with market-specific requirements.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
