import type { Metadata } from "next";

import { IndustriesExperience } from "@/components/sections/industries-experience";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/industries",
    { en: "Industries We Serve", sq: "Industritë që Shërbejmë" },
    {
      en: "Focused industry experience across healthcare, retail, hospitality, real estate, professional services and SMBs in Albania and beyond.",
      sq: "Përvojë e fokusuar në shëndetësi, tregti me pakicë, mikpritje, pasuri të paluajtshme, shërbime profesionale dhe biznese të vogla e të mesme në Shqipëri e më gjerë.",
    }
  );
}

export default function IndustriesPage() {
  return (
    <>
      <IndustriesExperience />

      <FinalCta />
    </>
  );
}
