"use client";

import { useRouter } from "next/navigation";
import {
  mergeUniqueValues,
  readEnquiryDraft,
  writeEnquiryDraft,
} from "@/lib/enquiry";
import { trackAnalyticsEvent } from "@/lib/analytics";

type Props = {
  productName: string;
};

export default function ProductEnquiryButton({ productName }: Props) {
  const router = useRouter();

  const handleClick = () => {
    trackAnalyticsEvent("product_quotation_requested", {
      product_name: productName,
      source: "product_detail_page",
    });
    const draft = readEnquiryDraft(sessionStorage);
    writeEnquiryDraft(sessionStorage, {
      ...draft,
      products: mergeUniqueValues(draft.products, [productName]),
    });
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
