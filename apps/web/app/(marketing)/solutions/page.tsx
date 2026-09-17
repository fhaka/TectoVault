import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { SolutionsExperience } from "@/components/sections/solutions-experience";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Business Solutions for Albanian Companies";
const description =
  "Business solutions built around the problems you're actually facing — management systems, booking platforms, e-commerce, and customer portals for businesses in Albania.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/solutions` },
  openGraph: { title: `${title} — ${siteConfig.name}`, description, url: `${siteConfig.url}/solutions` },
  twitter: { title: `${title} — ${siteConfig.name}`, description },
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsExperience />

      <FinalCta />
    </>
  );
}
