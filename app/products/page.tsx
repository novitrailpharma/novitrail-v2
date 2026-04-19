import type { Metadata } from "next";
import { getOurProducts } from "@/lib/ourProducts";
import ProductsHero from "@/components/ProductHero";
import ProductsGrid from "@/components/products/ProductsGrid";

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

        <ProductsGrid products={products} />
      </div>
    </main>
  );
}
