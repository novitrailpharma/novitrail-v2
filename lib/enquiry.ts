export const ENQUIRY_STORAGE_KEY = "novitrail_enquiry_draft";

export type EnquirySource = "formulations" | "product";

export type EnquiryDraft = {
  products: string[];
  source: EnquirySource;
};

export function buildEnquiryMessage(products: string[], source: EnquirySource) {
  if (products.length === 0) {
    return "";
  }

  const title =
    source === "product" && products.length === 1
      ? "Selected Product"
      : "Selected Formulations";

  const productLines = products.map((product) => `- ${product}`).join("\n");

  return `${title}:\n${productLines}\n\nEnquiry Details:\nPlease provide quotation and minimum order quantity (MOQ) details.`;
}
