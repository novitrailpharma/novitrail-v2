import HomeHero from "@/components/home/HomeHero";
import HomeIntro from "@/components/home/HomeIntro";
import HomeProducts from "@/components/home/HomeProducts";
import HomeCapabilities from "@/components/home/HomeCapabilities";
import HomeMarkets from "@/components/home/HomeMarkets";
import HomeWhy from "@/components/home/HomeWhy";
import HomeCTA from "@/components/home/HomeCTA";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeProducts />
      <HomeCapabilities />
      <HomeMarkets />
      <HomeWhy />
      <HomeCTA />
    </>
  );
}
     