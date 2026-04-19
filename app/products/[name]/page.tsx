import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, FileText, CheckCircle2 } from "lucide-react";
import * as motion from "framer-motion/client"; // Next.js 14/15 client motion import style

import { getOurProducts } from "@/lib/ourProducts";
import ProductEnquiryButton from "@/components/products/ProductEnquiryButton";

interface Props {
  params: Promise<{ name: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { name } = await params;
  const products = getOurProducts();

  const product = products.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (!product) return notFound();

  const f = product.formulation;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. BREADCRUMBS & NAVIGATION */}
      <div className="border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center text-sm text-slate-500">
          <Link 
            href="/products" 
            className="flex items-center hover:text-novitrail-blue transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
          <ChevronRight size={14} className="mx-3 text-slate-300" />
          <span className="font-medium text-slate-900">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* 2. PRODUCT IMAGE (Left Column - Spans 5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative w-full aspect-[4/3] bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden flex items-center justify-center p-8 group">
              {/* Subtle radial background behind image */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 via-white to-white opacity-80" />
              
              <Image
                src={`/products/${name}.png`}
                alt={product.name}
                width={500}
                height={500}
                className="relative z-10 object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
            </div>

            {/* Optional: Trust Badges under image */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                <CheckCircle2 size={14} /> FDA Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                <CheckCircle2 size={14} /> Export Ready
              </span>
            </div>
          </motion.div>

          {/* 3. PRODUCT DETAILS (Right Column - Spans 7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            {/* Header */}
            <div className="mb-8 border-b border-slate-100 pb-8">
              <span className="inline-block mb-3 text-xs font-bold tracking-wider text-novitrail-blue uppercase bg-blue-50 px-3 py-1 rounded-sm">
                {product.type}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                {product.name}
              </h1>
              {f.notes && (
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {f.notes}
                </p>
              )}
            </div>

            {/* Specifications Grid */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <FileText size={16} className="text-novitrail-orange" />
                Technical Specifications
              </h3>
              
              <div className="grid border border-slate-200 rounded-lg divide-y divide-slate-100 bg-white overflow-hidden">
                {f.drug && <SpecRow label="Drug / API" value={f.drug} isMain />}
                {f.composition && <SpecRow label="Composition" value={f.composition.join(", ")} />}
                {f.strength && (
                  <SpecRow
                    label="Strength"
                    value={Array.isArray(f.strength) ? f.strength.join(", ") : f.strength}
                  />
                )}
                {f.route && <SpecRow label="Route of Admin" value={f.route} />}
                {f.form && <SpecRow label="Dosage Form" value={f.form} />}
                {f.volume && <SpecRow label="Volume / Size" value={f.volume} />}
                {f.pack && <SpecRow label="Packaging" value={f.pack} />}
                {f.additional && <SpecRow label="Additional Info" value={f.additional} />}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <ProductEnquiryButton productName={product.name} />
              <button
                disabled
                className="inline-flex items-center justify-center bg-white border border-slate-300 text-slate-400 px-8 py-4 rounded-md font-medium cursor-not-allowed"
              >
                Download TDS (Coming Soon)
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* ---------- IMPROVED SPEC ROW COMPONENT ---------- */

function SpecRow({ label, value, isMain = false }: { label: string; value: string; isMain?: boolean }) {
  return (
    <div className="group grid grid-cols-1 md:grid-cols-[200px_1fr] transition-colors hover:bg-slate-50/80">
      <div className={`px-5 py-4 text-sm font-medium border-b md:border-b-0 md:border-r border-slate-50 bg-slate-50/50 text-slate-500 group-hover:bg-slate-100/50 transition-colors`}>
        {label}
      </div>
      <div className={`px-5 py-4 text-sm ${isMain ? "font-semibold text-slate-900" : "text-slate-700"}`}>
        {value}
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // ✅ IMPORTANT: await params
  const { name } = await params;

  const products = getOurProducts();

  const product = products.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: `${product.name} is a pharmaceutical product manufactured and supplied by Novitrail Pharmaceuticals for domestic and export markets.`,
    openGraph: {
      title: `Novitrail Pharmaceuticals | ${product.name}`,
      description: `${product.name} – export-ready pharmaceutical formulation.`,
      images: [
        {
          url: `/products/${name}.png`,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}
