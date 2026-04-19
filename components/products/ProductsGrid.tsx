"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import type { OurProduct } from "@/types/product";
import {
  mergeUniqueValues,
  readEnquiryDraft,
  writeEnquiryDraft,
} from "@/lib/enquiry";
import { trackAnalyticsEvent } from "@/lib/analytics";

type Props = {
  products: OurProduct[];
};

export default function ProductsGrid({ products }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    const draft = readEnquiryDraft(sessionStorage);
    setSelectedProducts(draft.products);
  }, []);

  const toggleProduct = (productName: string) => {
    setSelectedProducts((current) => {
      const isRemoving = current.includes(productName);
      const next = isRemoving
        ? current.filter((item) => item !== productName)
        : [...current, productName];

      trackAnalyticsEvent(
        isRemoving ? "product_deselected" : "product_selected",
        {
          product_name: productName,
          total_selected: next.length,
          source: "products_grid",
        }
      );

      const draft = readEnquiryDraft(sessionStorage);
      writeEnquiryDraft(sessionStorage, {
        ...draft,
        products: next,
      });

      return next;
    });
  };

  const saveSelectedProducts = () => {
    const draft = readEnquiryDraft(sessionStorage);
    writeEnquiryDraft(sessionStorage, {
      ...draft,
      products: mergeUniqueValues(draft.products, selectedProducts),
    });
  };

  return (
    <>
      <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const slug = product.name.toLowerCase().replace(/\s+/g, "-");
          const isSelected = selectedProducts.includes(product.name);

          return (
            <div
              key={product.name}
              className={`group rounded-2xl border p-4 transition-all ${
                isSelected
                  ? "border-novitrail-orange bg-orange-50/40 shadow-lg shadow-orange-100/30"
                  : "border-transparent"
              }`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => toggleProduct(product.name)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? "border-novitrail-orange bg-novitrail-orange text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <Check size={14} />
                  {isSelected ? "Selected" : "Select"}
                </button>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {product.type}
                </span>
              </div>

              <Link
                href={`/products/${slug}`}
                className="block"
                onClick={() => {
                  trackAnalyticsEvent("product_specification_viewed", {
                    product_name: product.name,
                    source: "products_grid",
                  });
                  saveSelectedProducts();
                }}
              >
                <div className="relative w-full aspect-[4/3] bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-slate-200 dark:group-hover:border-slate-600">
                  <Image
                    src={`/products/${slug}.png`}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 transition-colors duration-300 group-hover:bg-blue-900/5" />
                </div>

                <div className="mt-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>

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
            </div>
          );
        })}
      </div>
    </>
  );
}
