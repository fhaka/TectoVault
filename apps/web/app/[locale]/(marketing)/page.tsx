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
import { PilotOffer } from "@/components/sections/pilot-offer";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/",
    { en: "AI Agents, Automation & Software in Albania", sq: "Agjentë AI, chatbot dhe softuer për biznese në Shqipëri" },
    {
      en: "AI agents and chatbots that answer your customers 24/7 on WhatsApp, phone and your website, plus business automation, websites and custom software. TectoVault, Tirana, Albania.",
      sq: "Agjentë AI dhe chatbot që u përgjigjen klientëve tuaj 24/7 në WhatsApp, telefon dhe në faqen tuaj, si dhe automatizim biznesi, faqe interneti dhe softuer i personalizuar. TectoVault, Tiranë.",
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
      <PilotOffer />
      <HomeProblems />
      <HomeServices />
      <HomeIndustries />
      <HomeProcess />
      <FinalCta variant="agents" />
    </>
  );
}
