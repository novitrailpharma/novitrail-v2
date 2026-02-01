const regions = [
  {
    name: "Africa",
    desc: "Primary focus region with growing demand for quality pharmaceuticals and long-term supply partnerships."
  },
  {
    name: "South America",
    desc: "Supporting distributors and importers with reliable manufacturing and export support."
  },
  {
    name: "Middle East",
    desc: "Supplying select markets with customized pharmaceutical solutions."
  },
  {
    name: "South-East Asia",
    desc: "Serving emerging markets with cost-effective and scalable manufacturing capabilities."
  }
];

export default function ExportRegions() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center mb-12">
          Export Markets We Serve
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {regions.map((r) => (
            <div
              key={r.name}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition"
            >
              <h3 className="text-novitrail-orange mb-2">
                {r.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
