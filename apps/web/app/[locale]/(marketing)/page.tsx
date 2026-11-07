import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { HomeSplash } from "@/components/sections/home-splash";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeCapability } from "@/components/sections/home-capability";
import { HomeAgents } from "@/components/sections/home-agents";
import { HomeAgentFlow } from "@/components/sections/home-agent-flow";
import { HomeServices } from "@/components/sections/home-services";
import { HomeProblems } from "@/components/sections/home-problems";
import { HomeIndustries } from "@/components/sections/home-industries";
import { HomeProcess } from "@/components/sections/home-process";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/",
    { en: "Software & AI Development Company in Albania", sq: "Kompani Zhvillimi Softueri & AI në Shqipëri" },
    {
      en: "AI agents, business automation, and custom software built to grow your business \u2014 TectoVault is a software & AI development company in Tirana, Albania.",
      sq: "Agjentë AI, automatizim biznesi dhe softuer i personalizuar për të rritur biznesin tuaj — TectoVault është një kompani zhvillimi softueri & AI në Tiranë, Shqipëri.",
    }
  );
}

export default function Home() {
  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    image: `${siteConfig.url}/icon-512.png`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tirana",
      addressCountry: "AL",
    },
    areaServed: "Albania",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <HomeSplash />
      <HomeHero />
      <HomeCapability />
      <HomeAgents />
      <HomeAgentFlow />
      <HomeProblems />
      <HomeServices />
      <HomeIndustries />
      <HomeProcess />
      <FinalCta variant="agents" />
    </>
  );
}
