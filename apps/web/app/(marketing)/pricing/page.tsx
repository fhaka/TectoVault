import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingAgentPackages } from "@/components/sections/pricing-agent-packages";
import { PricingBody } from "@/components/sections/pricing-body";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Pricing";
const description =
  "AI agent packages for chat, voice and operations — plus custom software projects in Albania, priced on scope, complexity and requirements.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/pricing` },
  openGraph: { title: `${title} — ${siteConfig.name}`, description, url: `${siteConfig.url}/pricing` },
  twitter: { title: `${title} — ${siteConfig.name}`, description },
};

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
