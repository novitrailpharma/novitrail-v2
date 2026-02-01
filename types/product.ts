export interface OurProduct {
  name: string;
  type: string;

  formulation: {
    // Common optional fields
    drug?: string;
    strength?: string | string[];
    route?: string;
    pack?: string;
    volume?: string;
    form?: string;

    // Marketing-style fields
    notes?: string;
    additional?: string;
    composition?: string[];
  };

  // Optional for future expansion
  therapeutic_class?: string;
  prod?: string;
}
