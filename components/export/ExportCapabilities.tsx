"use client";

import { Syringe, Droplets, Pill, Package, Sparkles, Factory, Boxes, Tag, ClipboardList, Settings } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const manufactured = [
  { label: "Injectables", icon: Syringe },
  { label: "Oral Liquids & Syrups", icon: Droplets },
  { label: "Solid Oral Dosage Forms", icon: Pill },
  { label: "Sachets & Nutritional Products", icon: Package },
  { label: "Specialty & Custom Formulations", icon: Sparkles },
];

const capabilities = [
  { label: "Third-party / Contract Manufacturing", icon: Factory },
  { label: "Bulk Production & Supply", icon: Boxes },
  { label: "Private Label Manufacturing", icon: Tag },
  { label: "Tender-based Manufacturing Support", icon: ClipboardList },
  { label: "Market-specific Customization", icon: Settings },
];

function ListCard({ title, items }: { title: string; items: typeof manufactured }) {
  return (
    <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700/60 rounded-2xl p-8">
      <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-3">
        <span className="w-8 h-0.5 bg-novitrail-orange rounded-full" />
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-novitrail-orange/10 transition-colors">
              <item.icon size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-novitrail-orange transition-colors" />
            </div>
            <span className="text-slate-600 dark:text-slate-300 text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExportCapabilities() {
  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-sm font-semibold uppercase tracking-wider text-novitrail-orange">Export Portfolio</span>
            <h2 className="mt-3">What We Export</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-4">
              Novitrail Pharmaceuticals supports international markets through export-oriented pharmaceutical manufacturing, focusing on bulk supply, contract manufacturing, and long-term partnerships.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid md:grid-cols-2 gap-6">
            <ListCard title="Manufactured Products" items={manufactured} />
            <ListCard title="Manufacturing Capabilities" items={capabilities} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
