"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomeFormulationsPromo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 dark:bg-slate-900/20 rounded-l-[100px] pointer-events-none -mr-12 md:mr-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="max-w-xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-novitrail-blue/10 dark:bg-blue-900/30 text-novitrail-blue dark:text-blue-300 text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-novitrail-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-novitrail-orange"></span>
                </span>
                Streamlined Sourcing
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-[1.15]">
                Build Your Enquiry in <span className="text-novitrail-orange">Seconds</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Browse our comprehensive portfolio of over 100+ formulations. Simply select what you need, review your list, and send a unified quote request directly to our team. No friction, no delays.
              </p>
              
              <Link
                href="/formulations"
                className="group inline-flex items-center justify-center gap-3 bg-novitrail-blue hover:bg-novitrail-blue-dark dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-95"
              >
                Explore Formulations
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Column: Looping Flow Animation Mockup */}
          <div className="relative h-[500px] lg:h-[420px] w-full mx-auto lg:ml-auto flex flex-col items-center lg:items-end justify-center pointer-events-none mt-12 lg:mt-0">
            {/* The fixed-size animation stage. This ensures cursor coordinates are perfectly accurate regardless of screen stretching. */}
            <div className="relative w-[340px] h-[400px] shrink-0">
              
              {/* --- 1. Fake Table UI --- */}
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1] }}
                transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="h-12 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center px-4 gap-4">
                  <div className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600" />
                  <div className="w-24 h-3 bg-slate-200 dark:bg-slate-700 rounded-sm" />
                  <div className="w-16 h-3 bg-slate-200 dark:bg-slate-700 rounded-sm ml-auto" />
                </div>
                
                {/* Rows */}
                <div className="flex-1 p-2 space-y-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`flex items-center px-2 py-3 gap-4 rounded-lg relative overflow-hidden transition-colors`}>
                      {/* Background highlighting for row 2 */}
                      {i === 2 && (
                        <motion.div 
                          className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] }}
                          transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}

                      {/* Checkbox */}
                      <div className="relative z-10 w-4 h-4 flex-shrink-0">
                        <div className={`absolute inset-0 rounded border border-slate-300 dark:border-slate-600`} />
                        
                        {i === 2 && (
                          <motion.div 
                            className="absolute inset-0 rounded border border-novitrail-orange bg-novitrail-orange flex items-center justify-center text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] }}
                            transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Check size={10} strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="relative z-10 flex-1 space-y-2">
                        <div className={`h-2.5 rounded-sm ${i === 2 ? 'w-3/4 bg-slate-800 dark:bg-slate-200' : 'w-2/3 bg-slate-300 dark:bg-slate-600'}`} />
                        <div className={`h-2 rounded-sm ${i === 2 ? 'w-1/3 bg-slate-500 dark:bg-slate-400' : 'w-1/4 bg-slate-200 dark:bg-slate-700'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* --- Action Bar --- */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ 
                  y:       [40, 40, 40, 20, 0, 0, 0, 0, 40, 40, 40, 40, 40, 40, 40, 40], 
                  opacity: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] 
                }}
                transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-3 right-3 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between z-10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-novitrail-orange flex items-center justify-center text-white">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold truncate">1 selected</span>
                </div>
                <motion.div 
                  animate={{ 
                    scale:           [1, 1, 1, 1, 1, 1, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    backgroundColor: ["#f37021", "#f37021", "#f37021", "#f37021", "#f37021", "#f37021", "#ea580c", "#f37021", "#f37021", "#f37021", "#f37021", "#f37021", "#f37021", "#f37021", "#f37021", "#f37021"] 
                  }}
                  transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                  className="h-8 px-4 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg"
                >
                  Enquire
                </motion.div>
              </motion.div>
              
              {/* --- 2. Fake Contact Form UI --- */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], 
                  scale:   [0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 1, 1, 1, 1, 0.95, 0.95, 0.95, 0.95] 
                }}
                transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col overflow-hidden p-6 z-10"
              >
                <div className="w-1/2 h-5 bg-slate-800 dark:bg-white rounded-md mb-6" />
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="h-10 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50" />
                  <div className="h-10 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50" />
                </div>
                
                {/* Prefilled Textarea */}
                <div className="flex-1 border border-novitrail-orange/50 ring-1 ring-novitrail-orange/20 rounded-lg bg-orange-50/30 dark:bg-orange-900/10 p-4 space-y-3">
                  <div className="w-full h-2 rounded bg-slate-600 dark:bg-slate-300" />
                  <div className="flex items-center gap-2 pl-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />    
                    <div className="w-3/4 h-2 rounded bg-novitrail-orange/80 dark:bg-novitrail-orange" />
                  </div>
                  <div className="w-5/6 h-2 rounded bg-slate-600 dark:bg-slate-300 mt-4" />
                  <div className="w-1/2 h-2 rounded bg-slate-600 dark:bg-slate-300" />
                </div>

                <motion.div 
                  animate={{ 
                    scale:           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.95, 1, 1, 1, 1, 1],
                    backgroundColor: ["#0b4f8a", "#0b4f8a", "#0b4f8a", "#0b4f8a", "#0b4f8a", "#0b4f8a", "#0b4f8a", "#0b4f8a", "#0b4f8a", "#0b4f8a", "#1e3a8a", "#0b4f8a", "#0b4f8a", "#0b4f8a", "#0b4f8a", "#0b4f8a"] 
                  }}
                  transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                  className="mt-4 h-10 w-full rounded-lg flex items-center justify-center text-white text-xs font-semibold shadow-md"
                >
                  Send Enquiry
                </motion.div>
              </motion.div>

              {/* --- 3. Fake Email Client Window --- */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0], 
                  scale:   [0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 1, 1, 1, 0.95] 
                }}
                transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm shadow-2xl flex flex-col overflow-hidden z-20"
              >
                {/* Browser/Window Header */}
                <div className="h-8 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="mx-auto w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded-md" />
                </div>
                
                {/* Email Content Area */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-xs w-8">To:</span>
                      <div className="h-6 w-fit min-w-[12rem] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 rounded text-xs flex items-center pr-3">novitrailpharma1@gmail.com</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-xs w-8">Subj:</span>
                      <div className="h-4 w-64 bg-slate-100 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                  
                  {/* Body Fake Text */}
                  <div className="flex-1 space-y-3 pt-2">
                    <div className="w-1/4 h-3 rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="w-full h-3 rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="w-5/6 h-3 rounded bg-slate-200 dark:bg-slate-700" />
                    
                    {/* Fake sending animation overlay */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0] }}
                      transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-x-8 bottom-8 flex justify-end"
                    >
                      <div className="px-6 py-2 bg-blue-600 text-white font-medium rounded shadow flex items-center gap-2">
                        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full" />
                        Sending...
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* --- Cursor moving and clicking --- */}
              <motion.div
                initial={{ opacity: 0, x: 100, y: 200, scale: 1 }}
                animate={{ 
                  x:       [100, 24, 24, 24, 24, 280, 280, 280, 280, 170, 170, 170, 170, 170, 100, 100],
                  y:       [200, 137, 137, 137, 137, 350, 350, 350, 350, 350, 350, 350, 350, 350, 200, 200],
                  scale:   [1, 1, 0.8, 1, 1, 1, 0.8, 1, 1, 1, 0.8, 1, 1, 1, 1, 1],
                  opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
                }}
                transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-30 w-6 h-6 text-slate-800 dark:text-slate-200 drop-shadow-xl flex items-center justify-center pointer-events-none"
              >
                {/* Click Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-novitrail-orange/40 rounded-full blur-sm"
                  animate={{ 
                    scale:   [0, 0, 2.5, 0, 0, 0, 2.5, 0, 0, 0, 2.5, 0, 0, 0, 0, 0],
                    opacity: [0, 0, 1,   0, 0, 0, 1,   0, 0, 0, 1,   0, 0, 0, 0, 0]
                  }}
                  transition={{ duration: 12, times: [0, 0.08, 0.10, 0.12, 0.16, 0.24, 0.26, 0.28, 0.34, 0.40, 0.42, 0.44, 0.50, 0.60, 0.90, 1], repeat: Infinity, ease: "linear" }}
                />
                <svg className="relative z-10 w-full h-full" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3L21 16L15 17L19 24L17 25L13 18L8 23V3Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
