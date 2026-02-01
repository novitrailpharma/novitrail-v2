import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "Novitrail Pharmaceuticals",
    template: "Novitrail Pharmaceuticals | %s",
  },
  description:
    "Novitrail Pharmaceuticals is a pharmaceutical manufacturer and exporter supplying quality, export-ready formulations to global healthcare markets.",
  keywords: [
    "Novitrail Pharmaceuticals",
    "pharmaceutical manufacturer",
    "pharma exporter",
    "bulk drug supplier",
    "contract manufacturing",
  ],
  metadataBase: new URL("https://www.novitrail.com"),
  openGraph: {
    type: "website",
    siteName: "Novitrail Pharmaceuticals",
    title: "Novitrail Pharmaceuticals",
    description:
      "Export-ready pharmaceutical products manufactured and supplied for global markets.",
    url: "https://www.novitrail.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Novitrail Pharmaceuticals",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
