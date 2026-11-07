import type { Metadata } from "next";

import { AboutHero } from "@/components/sections/about-hero";
import { AboutContent } from "@/components/sections/about-content";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/about",
    { en: "About Us", sq: "Rreth Nesh" },
    {
      en: "About TectoVault \u2014 a software development company based in Tirana, Albania.",
      sq: "Rreth TectoVault — një kompani zhvillimi softueri me bazë në Tiranë, Shqipëri.",
    }
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero name={siteConfig.name} description={siteConfig.description} />
      <AboutContent />
      <FinalCta />
    </>
  );
}
