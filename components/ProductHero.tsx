"use client";

import { motion } from "framer-motion";

export default function ProductsHero() {
  return (
    <section className="relative h-[65vh] min-h-[520px] flex items-center overflow-hidden bg-white">
      {/* Background Image - Kept bright */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/products/all.png')" }}
      />

      {/* LIGHT MODE OVERLAY:
          - 'from-white': Solid white behind the text.
          - 'via-white/75': Strong fog in the middle to cover busy image parts.
          - 'via-40%': Fades out early to show product images on the right.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-white from-10% via-white/75 via-40% to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl pt-10 md:pt-0"
        >
          {/* Accent Line */}
          <div className="w-12 h-1 bg-novitrail-orange mb-6" />

          {/* Headline - Dark Slate for contrast */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            Our Pharmaceutical <br className="hidden md:block" />
            <span className="text-blue-700">Products</span>
          </h1>

          {/* Paragraph - Dark Gray */}
          <p className="mt-6 text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl">
            A curated portfolio of export-ready pharmaceutical formulations,
            manufactured and supplied for regulated domestic and international
            markets.
          </p>
        </motion.div>
      </div>

      {/* Bottom Fade - Fades to White to blend into the grid section */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}