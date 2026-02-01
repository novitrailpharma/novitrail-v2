import dietary from "@/data/formulations/dietary-supplement.json";
import external from "@/data/formulations/external-preparation.json";
import injectables from "@/data/formulations/injectables.json";
import liquid from "@/data/formulations/liquid-oral.json";
import ophthalmic from "@/data/formulations/ophthalmic.json";
import solid from "@/data/formulations/solid-oral.json";
import speciality from "@/data/formulations/speciality-product.json";

import { FormulationItem } from "@/types/formulation";

export const getAllFormulations = (): FormulationItem[] => [
  ...dietary,
  ...external,
  ...injectables,
  ...liquid,
  ...ophthalmic,
  ...solid,
  ...speciality,
];
