import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { IndustriesExperience } from "@/components/sections/industries-experience";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Industries We Serve";
const description =
  "Focused industry experience across healthcare, retail, hospitality, real estate, professional services and SMBs in Albania and beyond.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/industries` },
  openGraph: { title: `${title} — ${siteConfig.name}`, description, url: `${siteConfig.url}/industries` },
  twitter: { title: `${title} — ${siteConfig.name}`, description },
};

export default function IndustriesPage() {
  return (
    <>
      <IndustriesExperience />

      <FinalCta />
    </>
  );
}
