export default function ExportHero() {
  return (
    <section className="py-20 bg-linear-to-br from-white to-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="md:text-5xl">
          Pharmaceutical Manufacturing & Export Partner
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Novitrail Pharmaceuticals supports global markets with reliable
          pharmaceutical manufacturing, bulk supply, and export-ready solutions
          tailored for Africa, South America, and emerging regions.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/contact"
            className="bg-novitrail-orange text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all"
          >
            Start Export Enquiry
          </a>
          <a
            href="/products"
            className="border border-novitrail-blue text-novitrail-blue px-8 py-3 rounded-md font-medium hover:bg-novitrail-blue hover:text-white transition-all"
          >
            View Products
          </a>
        </div>
      </div>
    </section>
  );
}
