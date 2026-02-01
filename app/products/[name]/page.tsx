import Image from "next/image";
import { notFound } from "next/navigation";
import { getOurProducts } from "@/lib/ourProducts";

interface Props {
  params: Promise<{
    name: string;
  }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { name } = await params;

  const products = getOurProducts();

  const product = products.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (!product) return notFound();

  const f = product.formulation;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 bg-gray-50 rounded-lg">
          <Image
            src={`/products/${name}.png`}
            alt={product.name}
            fill
            className="object-contain p-6"
            priority
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-2xl">{product.name}</h1>

          <p className="mt-2 text-gray-600">
            {product.type}
          </p>

          <div className="mt-6 space-y-3 text-sm">
            {f.drug && (
              <div>
                <span className="font-medium">Drug / Composition:</span>{" "}
                {f.drug}
              </div>
            )}

            {f.composition && (
              <div>
                <span className="font-medium">Composition:</span>{" "}
                {f.composition.join(", ")}
              </div>
            )}

            {f.strength && (
              <div>
                <span className="font-medium">Strength:</span>{" "}
                {Array.isArray(f.strength)
                  ? f.strength.join(", ")
                  : f.strength}
              </div>
            )}

            {f.route && (
              <div>
                <span className="font-medium">Route:</span>{" "}
                {f.route}
              </div>
            )}

            {f.volume && (
              <div>
                <span className="font-medium">Volume:</span>{" "}
                {f.volume}
              </div>
            )}

            {f.pack && (
              <div>
                <span className="font-medium">Packaging:</span>{" "}
                {f.pack}
              </div>
            )}

            {f.form && (
              <div>
                <span className="font-medium">Form:</span>{" "}
                {f.form}
              </div>
            )}

            {f.additional && (
              <div>
                <span className="font-medium">Additional:</span>{" "}
                {f.additional}
              </div>
            )}

            {f.notes && (
              <div>
                <span className="font-medium">Notes:</span>{" "}
                {f.notes}
              </div>
            )}
          </div>

          <div className="mt-8">
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Request Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
