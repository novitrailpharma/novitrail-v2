"use client";

import { useRouter } from "next/navigation";
import { ENQUIRY_STORAGE_KEY, type EnquiryDraft } from "@/lib/enquiry";

type Props = {
  productName: string;
};

export default function ProductEnquiryButton({ productName }: Props) {
  const router = useRouter();

  const handleClick = () => {
    const draft: EnquiryDraft = {
      source: "product",
      products: [productName],
    };

    sessionStorage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(draft));
    router.push("/contact");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center bg-novitrail-orange text-white px-8 py-4 rounded-md font-semibold text-base shadow-lg shadow-orange-900/20 hover:bg-orange-600 hover:shadow-orange-900/30 transition-all transform hover:-translate-y-0.5"
    >
      Request Quotation
    </button>
  );
}
