export default function HomeProducts() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-novitrail-blue text-center mb-12">
          Our Products
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 hover:border-slate-300 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-novitrail-orange rounded-full"></span>
              <h3 className="text-lg font-medium text-novitrail-orange">
                Novitrail Products
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Our branded pharmaceutical products manufactured and supplied for
              domestic and export markets.
            </p>
            <a
              href="/products"
              className="text-novitrail-blue font-medium hover:underline"
            >
              View Our Products →
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-8 hover:border-slate-300 transition">
            <h3 className="text-lg font-medium text-novitrail-orange mb-4">
              Complete Formulation Range
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              A comprehensive list of formulations available for contract
              manufacturing and export supply.
            </p>
            <a
              href="/formulations"
              className="text-novitrail-blue font-medium hover:underline"
            >
              Browse Formulations →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
