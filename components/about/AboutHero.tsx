"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative h-[70vh] min-h-130 flex items-center overflow-hidden bg-white">
      {/* Background Image - Kept bright */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero/about-pharma.png')" }}
      />

      {/* LIGHT MODE OVERLAY:
          - 'from-white': Solid white behind the text area.
          - 'via-white/75': A strong white fog in the middle to ensure readability.
          - 'via-40%': Forces the fade to happen earlier, revealing the image on the right.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-white from-10% via-white/75 via-40% to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl pt-10 md:pt-0" // Added top padding for mobile breathing room
        >
          {/* Accent Line */}
          <div className="w-12 h-1 bg-novitrail-orange mb-6" />

          {/* Headline - Dark Slate for Light Mode impact */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            About Us
          </h1>

          {/* Paragraph - Darker Gray for better contrast */}
          <p className="mt-6 text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl">
            We are a professionally managed pharmaceutical manufacturer and exporter, 
            dedicated to delivering regulated, export-ready medicines to 
            healthcare markets worldwide.
          </p>
        </motion.div>
      </div>

      {/* Bottom Fade - Fades to White to blend smoothly into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}