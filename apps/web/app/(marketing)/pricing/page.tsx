import type { Metadata } from "next";

import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingBody } from "@/components/sections/pricing-body";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Pricing",
  description: "How we price projects — based on scope, complexity and requirements, not one-size-fits-all packages.",
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
