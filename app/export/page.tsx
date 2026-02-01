import type { Metadata } from "next";
import ExportHero from "@/components/export/ExportHero";
import ExportWhy from "@/components/export/ExportWhy";
import ExportRegions from "@/components/export/ExportRegions";
import ExportCapabilities from "@/components/export/ExportCapabilities";
import ExportProcess from "@/components/export/ExportProcess";
import ExportCTA from "@/components/export/ExportCTA";

export const metadata: Metadata = {
  title: "Export",
  description:
    "Pharmaceutical export services including contract manufacturing, bulk supply, and global distribution.",
};

export default function ExportPage() {
  return (
    <>
      <ExportHero />
      <ExportWhy />
      <ExportRegions />
      <ExportCapabilities />
      <ExportProcess />
      <ExportCTA />
    </>
  );
}
