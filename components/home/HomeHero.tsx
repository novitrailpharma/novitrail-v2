export default function HomeHero() {
  return (
    <section className="py-20 bg-linear-to-br from-white to-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="md:text-5xl max-w-3xl mx-auto">
          Pharmaceutical Manufacturing & Export Partner
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Novitrail Pharmaceuticals is an India-based pharmaceutical manufacturer
          and exporter supporting global healthcare markets with quality-focused,
          export-ready solutions.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/products"
            className="bg-novitrail-orange text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all"
          >
            View Products
          </a>
          <a
            href="/export"
            className="border border-novitrail-blue text-novitrail-blue px-8 py-3 rounded-md font-medium hover:bg-novitrail-blue hover:text-white transition-all"
          >
            Export Capabilities
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Manufacturing • Export • Contract Supply
        </p>
      </div>
    </section>
  );
}
