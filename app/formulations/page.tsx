import type { Metadata } from "next";
import { getAllFormulations } from "@/lib/formulation";
import FormulationTable from "@/components/FormulationTable";

export const metadata: Metadata = {
  title: "Formulations",
  description:
    "Browse a comprehensive list of pharmaceutical formulations available for manufacturing and export from Novitrail Pharmaceuticals.",
  keywords: [
    "pharmaceutical formulations",
    "drug formulations list",
    "pharma contract manufacturing",
    "export formulations India",
    "generic drug formulations",
  ],
};

export default function FormulationsPage() {
  const formulations = getAllFormulations() || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <div className="mb-10">
        {/* Accent line */}
        <div className="w-12 h-1 bg-gradient-to-r from-novitrail-orange to-novitrail-blue mb-6 rounded-full" />

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Complete Formulation Portfolio
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
          The following formulations are available for contract manufacturing and export
          supply. Product availability and specifications can be aligned based on market
          requirements.
        </p>
      </div>

      <FormulationTable data={formulations} />
    </div>
  );
}