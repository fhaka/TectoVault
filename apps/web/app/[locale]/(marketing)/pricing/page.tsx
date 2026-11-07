import type { Metadata } from "next";

import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingAgentPackages } from "@/components/sections/pricing-agent-packages";
import { PricingBody } from "@/components/sections/pricing-body";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/pricing",
    { en: "Pricing", sq: "Çmimet" },
    {
      en: "AI agent packages for chat, voice and operations \u2014 plus custom software projects in Albania, priced on scope, complexity and requirements.",
      sq: "Paketa agjentësh AI për chat, telefonata dhe operacione — si dhe projekte softuerike të personalizuara në Shqipëri, me çmim sipas qëllimit, kompleksitetit dhe kërkesave.",
    }
  );
}

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingAgentPackages />
      <PricingBody />
      <FinalCta />
    </>
  );
}
