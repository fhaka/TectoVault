import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingBody } from "@/components/sections/pricing-body";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Pricing";
const description =
  "How we price software projects in Albania — based on scope, complexity and requirements, not one-size-fits-all packages.";

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
      <PricingBody />
      <FinalCta />
    </>
  );
}
