import type { Metadata } from "next";

import { AboutHero } from "@/components/sections/about-hero";
import { AboutContent } from "@/components/sections/about-content";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — a focused software and AI automation studio.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero name={siteConfig.name} description={siteConfig.description} />
      <AboutContent />
      <FinalCta />
    </>
  );
}
