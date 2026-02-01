export default function ExportCapabilities() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center mb-12">
          What We Export
        </h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Novitrail Pharmaceuticals supports international markets through export-oriented
          pharmaceutical manufacturing, focusing on bulk supply, contract manufacturing,
          and long-term partnerships.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="mb-4 text-novitrail-orange">
              Manufactured Products
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Injectables
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Oral Liquids & Syrups
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Solid Oral Dosage Forms
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Sachets & Nutritional Products
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Specialty & Custom Formulations
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-novitrail-orange">
              Manufacturing Capabilities
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Third-party / Contract Manufacturing
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Bulk Production & Supply
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Private Label Manufacturing
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Tender-based Manufacturing Support
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-novitrail-orange rounded-full" />
                Market-specific Customization
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
