const services = [
  "Pharmaceutical Manufacturing",
  "Third-Party & Contract Manufacturing",
  "Bulk Production for Export Markets",
  "Private Label Manufacturing",
  "Market-Specific Product Customization"
];


export default function AboutWhat() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center mb-12">
          What We Do
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition text-sm text-gray-700"
            >
              {service}
            </div>
          ))}
        </div>

        <p className="mt-10 text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
          Our manufacturing operations are designed to support export-focused supply,
          enabling scalable production, consistent quality, and flexible customization
          aligned with market-specific requirements.
        </p>

      </div>
    </section>
  );
}
