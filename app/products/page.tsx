import Image from "next/image";
import Link from "next/link";
import { getOurProducts } from "@/lib/ourProducts";

export default function ProductsPage() {
  const products = getOurProducts();

  return (
    <div className="p-10">
      <h1 className="text-2xl">Our Products</h1>

      <p className="text-sm text-gray-600 max-w-3xl mb-8">
        Our products are manufactured and supplied for domestic and export markets.
        Additional formulations can be manufactured based on specific market
        requirements.
      </p>


      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => {
          const slug = product.name.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link
              key={product.name}
              href={`/products/${slug}`}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="relative h-40 w-full bg-gray-50 rounded-md">
                <Image
                  src={`/products/${slug}.png`}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <h3 className="mt-4 text-lg">
                {product.name}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {product.therapeutic_class}
              </p>

              <p className="mt-2 text-sm text-blue-600">
                View details →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
