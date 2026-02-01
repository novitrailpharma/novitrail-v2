import ExportHero from "@/components/export/ExportHero";
import ExportWhy from "@/components/export/ExportWhy";
import ExportRegions from "@/components/export/ExportRegions";
import ExportCapabilities from "@/components/export/ExportCapabilities";
import ExportProcess from "@/components/export/ExportProcess";
import ExportCTA from "@/components/export/ExportCTA";

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
