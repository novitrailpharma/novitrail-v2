const values = [
  {
    title: "Integrity",
    desc: "Ethical business practices and transparent partnerships."
  },
  {
    title: "Quality Focus",
    desc: "Consistent quality standards across manufacturing and supply."
  },
  {
    title: "Reliability",
    desc: "Dependable execution of manufacturing and export commitments."
  },
  {
    title: "Growth-Oriented",
    desc: "Building long-term relationships and scalable solutions."
  }
];

export default function AboutValues() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center mb-12">
          Our Values
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition"
            >
                <h3 className="text-novitrail-orange mb-2">
                {v.title}
              </h3>
              <p className="text-gray-600 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
