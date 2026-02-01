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
    "Learn about Novitrail Pharmaceuticals, our vision, leadership, and global pharmaceutical export operations.",
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
