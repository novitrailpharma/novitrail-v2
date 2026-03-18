"use client";

import { Shield, Target, CheckCircle2, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const values = [
  { title: "Integrity", desc: "Ethical business practices and transparent partnerships.", icon: Shield },
  { title: "Quality Focus", desc: "Consistent quality standards across manufacturing and supply.", icon: Target },
  { title: "Reliability", desc: "Dependable execution of manufacturing and export commitments.", icon: CheckCircle2 },
  { title: "Growth-Oriented", desc: "Building long-term relationships and scalable solutions.", icon: TrendingUp },
];

export default function AboutValues() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-dark-surface dark:to-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">What We Stand For</span>
            <h2 className="mt-3">Our Values</h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="group bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden h-full">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-novitrail-orange to-novitrail-blue rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg w-fit mb-4 group-hover:bg-novitrail-orange/10 transition-colors duration-300">
                  <v.icon size={22} className="text-slate-400 dark:text-slate-500 group-hover:text-novitrail-orange transition-colors duration-300" />
                </div>
                <h3 className="text-base font-semibold text-novitrail-blue dark:text-blue-300 mb-2">{v.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
