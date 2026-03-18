"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

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
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-dark-bg/85 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm shadow-slate-100/50 dark:shadow-black/20">
        <div className="mx-auto flex h-16 md:h-20 max-w-[85rem] items-center justify-between px-4 md:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 z-50">
            <Image
              src="/logo.png"
              alt="Novitrail Pharmaceuticals"
              width={160}
              height={45}
              className="w-auto h-7 sm:h-9 md:h-11"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav 
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_LINKS.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`relative px-5 py-2.5 text-[15px] transition-colors duration-300 rounded-lg ${
                    isActive ? "text-white font-semibold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {/* Hover Layer */}
                  {hoveredIndex === index && !isActive && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-slate-100/80 dark:bg-slate-800/80 rounded-lg -z-20"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}

                  {/* Active Layer */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-novitrail-blue to-novitrail-blue-dark rounded-lg -z-10"
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

          {/* RIGHT ACTIONS GROUP */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Desktop CTA */}
            <motion.div 
              className="hidden md:block" 
              whileHover={{ scale: 1.05, y: -1 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="bg-novitrail-orange text-white px-7 py-2.5 rounded-lg font-medium text-[15px] shadow-lg shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/30 transition-all"
              >
                Request Quote
              </Link>
            </motion.div>

            {/* Mobile CTA */}
            <motion.div 
              className="md:hidden" 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="bg-novitrail-orange text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg shadow-md hover:bg-orange-600 transition-colors uppercase tracking-wide whitespace-nowrap"
              >
                Request Quote
              </Link>
            </motion.div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative z-50 p-1 text-slate-600 dark:text-slate-400 hover:text-novitrail-blue dark:hover:text-white transition-colors focus:outline-none"
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
            className="md:hidden fixed top-16 md:top-20 left-0 right-0 bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-700 shadow-2xl overflow-hidden z-40"
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
                      className={`group flex items-center justify-between p-3.5 rounded-xl text-base font-medium transition-all ${
                        isActive 
                        ? "bg-gradient-to-r from-novitrail-blue to-novitrail-blue-dark text-white"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight 
                        size={18} 
                        className={`transition-all ${
                          isActive ? "text-white/70" : "text-slate-300 dark:text-slate-600 group-hover:text-novitrail-blue dark:group-hover:text-white group-hover:translate-x-1"
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 mt-2">
                 <Link 
                   href="/contact" 
                   onClick={() => setOpen(false)}
                   className="block w-full text-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-4 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
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