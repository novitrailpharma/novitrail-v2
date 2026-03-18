"use client";

import { ClipboardList, FileCheck, FlaskConical, Truck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  { label: "Product or Formulation Selection", icon: ClipboardList },
  { label: "Documentation & Regulatory Alignment", icon: FileCheck },
  { label: "Manufacturing & Quality Checks", icon: FlaskConical },
  { label: "Packaging & Global Dispatch", icon: Truck },
];

export default function ExportProcess() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-dark-surface dark:to-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">How It Works</span>
            <h2 className="mt-3">Our Export Process</h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.label} delay={i * 0.12}>
              <div className="group bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 text-center relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-novitrail-orange to-novitrail-blue rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-10 h-10 mx-auto mb-4 bg-novitrail-blue-light dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-novitrail-orange/10 transition-colors duration-300">
                  <span className="text-novitrail-blue dark:text-blue-300 font-bold text-lg group-hover:text-novitrail-orange transition-colors duration-300">{i + 1}</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg w-fit mx-auto mb-4 group-hover:bg-novitrail-orange/10 transition-colors duration-300">
                  <step.icon size={22} className="text-slate-400 dark:text-slate-500 group-hover:text-novitrail-orange transition-colors duration-300" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{step.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
