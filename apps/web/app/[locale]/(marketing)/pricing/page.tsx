import type { Metadata } from "next";

import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingPackages } from "@/components/sections/pricing-packages";
import { PilotOffer } from "@/components/sections/pilot-offer";
import { SavingsCalculator } from "@/components/sections/savings-calculator";
import { PricingBody } from "@/components/sections/pricing-body";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/pricing",
    { en: "Packages for AI Agents, Websites and Software", sq: "Paketa për agjentë AI, faqe interneti dhe softuer" },
    {
      en: "Packages for AI agents, business automation, custom software, websites and hosting in Albania. Pick one and get a quote made for your business.",
      sq: "Paketa për agjentë AI, automatizim biznesi, softuer të personalizuar, faqe interneti dhe hostim në Shqipëri. Zgjidhni një dhe merrni një ofertë për biznesin tuaj.",
    }
  );
}

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPackages />
      <SavingsCalculator />
      <PilotOffer className="pt-0 sm:pt-0 md:pt-0" />
      <PricingBody />
      <FinalCta />
    </>
  );
}
