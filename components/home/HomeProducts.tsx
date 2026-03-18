"use client";

import { Package, FlaskConical, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const products = [
  {
    title: "Novitrail Products",
    desc: "Our branded pharmaceutical products manufactured and supplied for domestic and export markets.",
    href: "/products",
    linkText: "View Our Products",
    icon: Package,
    gradient: "from-novitrail-orange/10 to-orange-50/50 dark:from-novitrail-orange/5 dark:to-transparent",
  },
  {
    title: "Complete Formulation Range",
    desc: "A comprehensive list of formulations available for contract manufacturing and export supply.",
    href: "/formulations",
    linkText: "Browse Formulations",
    icon: FlaskConical,
    gradient: "from-novitrail-blue/10 to-blue-50/50 dark:from-novitrail-blue/5 dark:to-transparent",
  },
];

export default function HomeProducts() {
  return (
    <section className="py-24 bg-slate-50/50 dark:bg-dark-card/50 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">
              What We Offer
            </span>
            <h2 className="mt-3">Our Products</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.15}>
              <a
                href={p.href}
                className="group block bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-novitrail-orange to-novitrail-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3 bg-novitrail-orange/10 dark:bg-novitrail-orange/15 rounded-xl group-hover:bg-novitrail-orange/15 transition-colors">
                      <p.icon className="text-novitrail-orange" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-novitrail-blue dark:text-blue-300 transition-colors">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                    {p.desc}
                  </p>

                  <span className="inline-flex items-center gap-2 text-novitrail-blue dark:text-blue-300 font-semibold text-sm group-hover:gap-3 transition-all">
                    {p.linkText}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
