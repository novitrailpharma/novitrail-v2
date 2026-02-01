const steps = [
  "Product or Formulation Selection",
  "Documentation & Regulatory Alignment",
  "Manufacturing & Quality Checks",
  "Packaging & Global Dispatch"
];

export default function ExportProcess() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center mb-12">
          Our Export Process
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition text-center"
            >
              <div className="text-novitrail-orange font-bold text-xl mb-2">
                {i + 1}
              </div>
              <p className="text-gray-600 text-sm">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
