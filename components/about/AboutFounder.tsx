"use client";

import Image from "next/image";
import { Quote, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutFounder() {
  return (
    <section className="relative py-24 bg-white dark:bg-dark-bg overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-50/50 dark:bg-orange-900/10 rounded-full blur-3xl opacity-60" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative">
              <div className="absolute inset-0 bg-novitrail-orange/10 rounded-full translate-x-4 translate-y-4" />
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white dark:border-dark-surface shadow-2xl shadow-slate-200 dark:shadow-black/30">
                <Image src="/abhay.png" alt="Abhay Kumar Sen" fill className="object-cover" priority />
              </div>
              <a href="https://www.linkedin.com/in/abhay-kumar-sen-44aa8714/" target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 bg-white dark:bg-dark-card p-2 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 text-blue-700 dark:text-blue-400 hover:scale-110 transition-transform" aria-label="Connect on LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="mt-8 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Abhay Kumar Sen</h2>
              <p className="text-lg font-medium text-novitrail-blue dark:text-blue-300 mt-1">Founder & Director</p>
            </div>
            <div className="mt-8 relative bg-slate-50 dark:bg-dark-card p-6 rounded-xl border-l-4 border-novitrail-orange">
              <Quote className="absolute top-4 left-4 text-orange-200/50 dark:text-orange-900/30 -z-10" size={48} />
              <p className="text-slate-700 dark:text-slate-300 italic font-medium leading-relaxed relative z-10">
                &ldquo;Our goal is to make reliable, high-quality pharmaceutical products accessible across global healthcare markets.&rdquo;
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-7 space-y-10">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-8 bg-novitrail-orange" />
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Visionary Leadership</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-6 leading-tight">Building a globally trusted pharmaceutical infrastructure.</h3>
              <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-400 leading-relaxed">
                <p className="mb-4">Abhay Kumar Sen founded <strong className="dark:text-white">Novitrail Pharmaceuticals</strong> with a singular vision: to bridge the gap between high-quality Indian manufacturing and the evolving needs of the global healthcare sector.</p>
                <p>With extensive experience in pharmaceutical sourcing, manufacturing coordination, and international trade, Abhay focuses on delivering quality-driven, export-ready solutions. His leadership is defined by a commitment to long-term partnerships, regulatory compliance, and responsible business practices that empower healthcare providers worldwide.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-700">
              <StatItem label="Years Experience" value="8+" />
              <StatItem label="Countries Served" value="20+" />
              <StatItem label="Supplier Network" value="5000+" highlight />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className={`text-2xl md:text-3xl font-bold mb-1 ${highlight ? "text-novitrail-orange" : "text-slate-900 dark:text-white"}`}>{value}</div>
      <div className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</div>
    </div>
  );
}