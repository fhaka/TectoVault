import type { Metadata } from "next";

import { SolutionsExperience } from "@/components/sections/solutions-experience";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/solutions",
    { en: "Business Solutions for Albanian Companies", sq: "Zgjidhje Biznesi për Kompanitë Shqiptare" },
    {
      en: "Business solutions built around the problems you're actually facing \u2014 management systems, booking platforms, e-commerce, and customer portals for businesses in Albania.",
      sq: "Zgjidhje biznesi të ndërtuara rreth problemeve reale — sisteme menaxhimi, platforma rezervimi, e-commerce dhe portale klientësh për bizneset në Shqipëri.",
    }
  );
}

export default function SolutionsPage() {
  return (
    <>
      <SolutionsExperience />

      <FinalCta />
    </>
  );
}
