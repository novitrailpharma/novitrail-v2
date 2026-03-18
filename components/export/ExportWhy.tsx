"use client";

import { Factory, FileCheck, Boxes, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const points = [
  { title: "Manufacturing Expertise", desc: "Experienced in injectable, oral, and specialty pharmaceutical manufacturing for domestic and export markets.", icon: Factory, num: "01" },
  { title: "Export-Ready Documentation", desc: "Support for product dossiers, specifications, and market-specific documentation.", icon: FileCheck, num: "02" },
  { title: "Bulk & Contract Supply", desc: "Flexible production capacity for bulk orders, tenders, and long-term supply agreements.", icon: Boxes, num: "03" },
  { title: "Quality-Focused Operations", desc: "Controlled manufacturing processes aligned with global pharmaceutical quality practices.", icon: ShieldCheck, num: "04" },
];

export default function ExportWhy() {
  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">Our Strengths</span>
            <h2 className="mt-3">Why Choose Novitrail for Export</h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="group border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-6 bg-white dark:bg-dark-card hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden h-full">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-novitrail-orange to-novitrail-blue rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 right-4 text-5xl font-black text-slate-100 dark:text-slate-800 group-hover:text-novitrail-orange/10 transition-colors duration-300 select-none">{p.num}</span>
                <div className="relative">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg w-fit mb-4 group-hover:bg-novitrail-orange/10 transition-colors duration-300">
                    <p.icon size={22} className="text-slate-400 dark:text-slate-500 group-hover:text-novitrail-orange transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-semibold text-novitrail-blue dark:text-blue-300 mb-3">{p.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
