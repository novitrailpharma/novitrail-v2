import type { Metadata } from "next";
import { getAllFormulations } from "@/lib/formulation";
import FormulationTable from "@/components/FormulationTable";

export const metadata: Metadata = {
  title: "Formulations",
  description:
    "Browse a comprehensive list of pharmaceutical formulations available for manufacturing and export.",
};

export default function FormulationsPage() {
  // Fetch data on the server
  const formulations = getAllFormulations() || []; // Fallback to empty array just in case

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Complete Formulation Portfolio
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-4xl leading-relaxed">
          The following formulations are available for contract manufacturing and export
          supply. Product availability and specifications can be aligned based on market
          requirements.
        </p>
      </div>

      {/* Pass data to the Client Component */}
      <FormulationTable data={formulations} />
    </div>
  );
}