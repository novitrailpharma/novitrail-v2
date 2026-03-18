import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutWho from "@/components/about/AboutWho";
import AboutWhat from "@/components/about/AboutWhat";
import AboutGlobal from "@/components/about/AboutGlobal";
import AboutValues from "@/components/about/AboutValues";
import AboutCTA from "@/components/about/AboutCTA";
import AboutFounder from "@/components/about/AboutFounder";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Novitrail Pharmaceuticals, our vision, leadership, and global pharmaceutical export operations since 2017.",
  keywords: [
    "about Novitrail Pharmaceuticals",
    "pharmaceutical company India",
    "pharma manufacturer history",
    "Abhay Kumar Sen",
    "pharmaceutical export company",
  ],
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutFounder />
      <AboutWho />
      <AboutWhat />
      <AboutGlobal />
      <AboutValues />
      <AboutCTA />
    </>
  );
}
