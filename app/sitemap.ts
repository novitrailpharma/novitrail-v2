import { getOurProducts } from "@/lib/ourProducts";

export default function sitemap() {
  const baseUrl = "https://www.novitrail.com";
  const products = getOurProducts();

  return [
    { url: baseUrl },
    { url: `${baseUrl}/products` },
    { url: `${baseUrl}/about` },
    { url: `${baseUrl}/export` },
    { url: `${baseUrl}/formulations` },
    ...products.map((p) => ({
      url: `${baseUrl}/products/${p.name.toLowerCase().replace(/\s+/g, "-")}`,
    })),
  ];
}
