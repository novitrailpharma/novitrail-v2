"use client";

import { useState } from "react";
import { getAllFormulations } from "@/lib/formulation";
import FormulationTable from "@/components/FormulationTable";

export default function FormulationsPage() {

  const formulations = getAllFormulations();

  const [query, setQuery] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [route, setRoute] = useState("");
  const [therapeutic, setTherapeutic] = useState("");
  const dosageForms = Array.from(
    new Set(formulations.map(f => f.type))
  ).sort();

  const routes = Array.from(
    new Set(formulations.map(f => f.formulation.route))
  ).sort();

  const therapeuticClasses = Array.from(
    new Set(formulations.map(f => f.therapeutic_class))
  ).sort();

  const filtered = formulations.filter(item => {
    const matchesQuery =
      item.formulation.drug
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesDosage =
      !dosageForm || item.type === dosageForm;

    const matchesRoute =
      !route || item.formulation.route === route;

    const matchesTherapeutic =
      !therapeutic || item.therapeutic_class === therapeutic;

    return (
      matchesQuery &&
      matchesDosage &&
      matchesRoute &&
      matchesTherapeutic
    );
  });

  return (
    <div className="p-10">
      <h1 className="text-2xl">
        Complete Formulation Portfolio
      </h1>

      <p className="text-sm text-gray-600 max-w-4xl mb-8">
        The following formulations are available for contract manufacturing and export
        supply. Product availability and specifications can be aligned based on market
        requirements.
      </p>

      <div className="mt-6 mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by drug / formulation"
          className="border px-3 py-2 rounded-md w-full max-w-xs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded-md"
          value={dosageForm}
          onChange={(e) => setDosageForm(e.target.value)}
        >
          <option value="">All Dosage Forms</option>
          {dosageForms.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded-md"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        >
          <option value="">All Routes</option>
          {routes.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded-md"
          value={therapeutic}
          onChange={(e) => setTherapeutic(e.target.value)}
        >
          <option value="">All Therapeutic Classes</option>
          {therapeuticClasses.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <FormulationTable data={filtered} />

      <div className="mt-4 text-sm text-gray-500">
        Showing {filtered.length} of {formulations.length} formulations
      </div>

    </div>
  );
}