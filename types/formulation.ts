export interface FormulationItem {
  sno: string;
  formulation: {
    drug: string;
    strength: string[];
    route: string;
    pack: string;
  };
  type: string;
  therapeutic_class: string;
  prod: string;
}
