import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
    "pharmaceutical export India",
    "generic medicine exporter",
    "GMP certified pharma",
    "pharma wholesaler India",
    "export-ready formulations",
  ],
  metadataBase: new URL("https://www.novitrail.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Novitrail Pharmaceuticals",
    title: "Novitrail Pharmaceuticals — Global Pharma Manufacturing & Export",
    description:
      "Export-ready pharmaceutical products manufactured and supplied for global markets. Trusted partner since 2017.",
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
  twitter: {
    card: "summary_large_image",
    title: "Novitrail Pharmaceuticals — Global Pharma Manufacturing & Export",
    description:
      "Export-ready pharmaceutical products manufactured and supplied for global markets.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Novitrail Pharmaceuticals",
  url: "https://www.novitrail.com",
  logo: "https://www.novitrail.com/logo.png",
  description:
    "A global pharmaceutical marketer, manufacturer, wholesaler, and exporter with over 10 years of expertise in pharmaceutical trade.",
  foundingDate: "2017",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "SN.123, Vardhman Crown Mall, Sector-19, Dwarka",
      addressLocality: "New Delhi",
      postalCode: "110075",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Radha Krishan Complex, Heera Ganj",
      addressLocality: "Katni",
      postalCode: "483501",
      addressCountry: "IN",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9990115992",
    contactType: "sales",
    email: "novitrailpharma1@gmail.com",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/in/abhay-kumar-sen-44aa8714/",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('novitrail-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-inter)]">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
