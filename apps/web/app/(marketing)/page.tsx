import { HomeSplash } from "@/components/sections/home-splash";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeCapability } from "@/components/sections/home-capability";
import { HomeServices } from "@/components/sections/home-services";
import { HomeWork } from "@/components/sections/home-work";
import { HomeProblems } from "@/components/sections/home-problems";
import { HomeIndustries } from "@/components/sections/home-industries";
import { HomeProcess } from "@/components/sections/home-process";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <HomeSplash />
      <HomeHero />
      <HomeCapability />
      <HomeServices />
      <HomeWork />
      <HomeProblems />
      <HomeIndustries />
      <HomeProcess />
      <FinalCta />
    </>
  );
}
