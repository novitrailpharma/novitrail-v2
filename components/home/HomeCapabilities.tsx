const caps = [
  "Injectables",
  "Oral Liquids & Syrups",
  "Solid Oral Dosage Forms",
  "Sachets & Nutritional Products",
  "Custom & Contract Manufacturing"
];

export default function HomeCapabilities() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center mb-12">
          Manufacturing & Export Capabilities
        </h2>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-sm">
          {caps.map((c) => (
            <li
              key={c}
              className="border border-slate-200 rounded-xl p-6 bg-white hover:border-slate-300 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                <span>{c}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
