const points = [
  {
    title: "Manufacturing Expertise",
    desc: "Experienced in injectable, oral, and specialty pharmaceutical manufacturing for domestic and export markets."
  },
  {
    title: "Export-Ready Documentation",
    desc: "Support for product dossiers, specifications, and market-specific documentation."
  },
  {
    title: "Bulk & Contract Supply",
    desc: "Flexible production capacity for bulk orders, tenders, and long-term supply agreements."
  },
  {
    title: "Quality-Focused Operations",
    desc: "Controlled manufacturing processes aligned with global pharmaceutical quality practices."
  }
];

export default function ExportWhy() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center mb-12">
          Why Choose Novitrail for Export
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="border border-slate-200 rounded-xl p-6 bg-white hover:border-slate-300 transition"
            >
              <h3 className="text-novitrail-blue mb-3">
                {p.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
