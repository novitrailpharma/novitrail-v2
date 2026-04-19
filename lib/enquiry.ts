export const ENQUIRY_STORAGE_KEY = "novitrail_enquiry_draft";

export type EnquiryDraft = {
  formulations: string[];
  products: string[];
};

export function getEmptyEnquiryDraft(): EnquiryDraft {
  return {
    formulations: [],
    products: [],
  };
}

export function readEnquiryDraft(storage: Storage): EnquiryDraft {
  const stored = storage.getItem(ENQUIRY_STORAGE_KEY);
  if (!stored) {
    return getEmptyEnquiryDraft();
  }

  try {
    const parsed = JSON.parse(stored) as Partial<EnquiryDraft>;
    return {
      formulations: Array.isArray(parsed.formulations)
        ? parsed.formulations.map((value) => String(value).trim()).filter(Boolean)
        : [],
      products: Array.isArray(parsed.products)
        ? parsed.products.map((value) => String(value).trim()).filter(Boolean)
        : [],
    };
  } catch {
    return getEmptyEnquiryDraft();
  }
}

export function writeEnquiryDraft(storage: Storage, draft: EnquiryDraft) {
  if (draft.formulations.length === 0 && draft.products.length === 0) {
    storage.removeItem(ENQUIRY_STORAGE_KEY);
    return;
  }

  storage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(draft));
}

export function mergeUniqueValues(existing: string[], incoming: string[]) {
  const seen = new Set(existing);
  const merged = [...existing];

  for (const value of incoming) {
    if (!seen.has(value)) {
      seen.add(value);
      merged.push(value);
    }
  }

  return merged;
}

export function buildEnquiryMessage(draft: EnquiryDraft) {
  const sections: string[] = [];

  if (draft.products.length > 0) {
    sections.push(
      `Selected Products:\n${draft.products.map((item) => `- ${item}`).join("\n")}`
    );
  }

  if (draft.formulations.length > 0) {
    sections.push(
      `Selected Formulations:\n${draft.formulations.map((item) => `- ${item}`).join("\n")}`
    );
  }

  if (sections.length === 0) {
    return "";
  }

  return `${sections.join("\n\n")}\n\nEnquiry Details:\nPlease provide quotation and minimum order quantity (MOQ) details.`;
}

export function getAllSelectedItems(draft: EnquiryDraft) {
  return [...draft.products, ...draft.formulations];
}

export function syncEnquiryDraftFromMessage(draft: EnquiryDraft, message: string): EnquiryDraft {
  const selectedLines = new Set(
    message
      .split(/\r?\n/)
      .map((line) => line.trim().match(/^-\s+(.+)$/)?.[1]?.trim())
      .filter((value): value is string => Boolean(value))
  );

  return {
    products: draft.products.filter((item) => selectedLines.has(item)),
    formulations: draft.formulations.filter((item) => selectedLines.has(item)),
  };
}
