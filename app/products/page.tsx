import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getOurProducts } from "@/lib/ourProducts";
import ProductsHero from "@/components/ProductHero";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Novitrail Pharmaceuticals’ portfolio of export-ready pharmaceutical products supplied to global markets.",
  keywords: [
    "Novitrail products",
    "pharmaceutical products India",
    "export-ready medicines",
    "generic pharma products",
    "injectable products",
    "oral liquid formulations",
  ],
};

export default function ProductsPage() {
  const products = getOurProducts();

  return (
    <main className="bg-white dark:bg-dark-bg min-h-screen">
      <ProductsHero />
      
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Header (Optional, adds context between Hero and Grid) */}
        <div className="mb-12 border-b border-slate-100 dark:border-slate-700 pb-6">
           <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">All Products</h2>
           <p className="text-slate-500 dark:text-slate-400 mt-1">Browse our complete list of available formulations.</p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const slug = product.name.toLowerCase().replace(/\s+/g, "-");

            return (
              <Link
                key={product.name}
                href={`/products/${slug}`}
                className="group block"
              >
                {/* Image Card - Added a border for better definition on white bg */}
                <div className="relative w-full aspect-[4/3] bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-slate-200 dark:group-hover:border-slate-600">
                  <Image
                    src={`/products/${slug}.png`}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay Effect */}
                  <div className="absolute inset-0 bg-blue-900/0 transition-colors duration-300 group-hover:bg-blue-900/5" />
                </div>

                {/* Text Content */}
                <div className="mt-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {product.type}
                  </p>

                  {product.therapeutic_class && (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {product.therapeutic_class}
                    </p>
                  )}

                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-novitrail-blue dark:text-blue-300 group-hover:underline underline-offset-4">
                    View specification 
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}