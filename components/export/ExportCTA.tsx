export default function ExportCTA() {
  return (
    <section className="relative py-20 bg-novitrail-blue text-white border-b border-slate-100">
      <div className="absolute inset-0 bg-gradient-to-r from-novitrail-orange/10 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="mb-6">
          Discuss Your Export Requirements
        </h2>

        <p className="text-blue-100 mb-10">
          Contact Novitrail Pharmaceuticals to explore manufacturing, bulk
          supply, and export opportunities tailored to your market.
        </p>

        <a
          href="/contact"
          className="inline-block bg-novitrail-orange text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-all"
        >
          Contact Export Team
        </a>
      </div>
    </section>
  );
}
