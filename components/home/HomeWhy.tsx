const reasons = [
  "Export-focused manufacturing approach",
  "Flexible bulk and contract supply",
  "Market-specific documentation support",
  "Long-term partnership mindset"
];

export default function HomeWhy() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center mb-12">
          Why Partner With Novitrail
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(r => (
            <div key={r} className="border border-slate-200 rounded-xl p-6 bg-white hover:border-slate-300 transition text-sm text-gray-700">
              {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
