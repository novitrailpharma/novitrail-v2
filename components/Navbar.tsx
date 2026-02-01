"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Our Products" },
  { href: "/formulations", label: "Formulations" },
  { href: "/export", label: "Export" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60">
        <div className="mx-auto flex h-20 max-w-[85rem] items-center justify-between px-6 md:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 z-50">
            <Image
              src="/logo.png"
              alt="Novitrail Pharmaceuticals"
              width={160}
              height={45}
              className="w-auto h-9 md:h-11"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav 
            className="hidden md:flex items-center gap-2"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_LINKS.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`relative px-5 py-2.5 text-base transition-colors duration-300 ${
                    isActive ? "text-slate-900 font-semibold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {/* Hover Layer */}
                  {hoveredIndex === index && !isActive && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-slate-100 rounded-md -z-20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Active Layer */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-border"
                      className="absolute inset-0 border border-novitrail-orange rounded-md -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS GROUP (Desktop CTA + Mobile CTA + Menu Toggle) */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* 1. Desktop CTA (Hidden on Mobile) */}
            <motion.div 
              className="hidden md:block" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="bg-novitrail-orange text-white px-8 py-3 rounded-md font-medium text-base shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors"
              >
                Request Quote
              </Link>
            </motion.div>

            {/* 2. Mobile CTA (Visible ONLY on Mobile) */}
            {/* Smaller, punchy button for mobile users */}
            <motion.div 
              className="md:hidden" 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="bg-novitrail-orange text-white text-xs font-bold px-4 py-2.5 rounded-md shadow-md hover:bg-orange-600 transition-colors uppercase tracking-wide"
              >
                Get Quote
              </Link>
            </motion.div>

            {/* 3. Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative z-50 p-1 text-slate-600 hover:text-novitrail-blue transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
               <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-20 left-0 right-0 bg-white border-b border-slate-100 shadow-2xl overflow-hidden z-40"
          >
            <div className="flex flex-col p-6 space-y-2">
              {NAV_LINKS.map((link, i) => {
                 const isActive = pathname === link.href;
                 return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between p-3 rounded-lg text-base font-medium transition-colors ${
                        isActive 
                        ? "bg-white border border-novitrail-orange text-slate-900"
                        : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight 
                        size={18} 
                        className={`transition-all ${
                          isActive ? "text-novitrail-orange" : "text-slate-300 group-hover:text-novitrail-blue group-hover:translate-x-1"
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Optional: We keep a larger button in the menu too, 
                  in case they missed the top one or want a larger tap target */}
              <div className="pt-4 border-t border-slate-100 mt-2">
                 <Link 
                   href="/contact" 
                   onClick={() => setOpen(false)}
                   className="block w-full text-center bg-slate-100 text-slate-600 py-4 rounded-md font-medium hover:bg-slate-200 transition-colors"
                 >
                   Contact Support
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}