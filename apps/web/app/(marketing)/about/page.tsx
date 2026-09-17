import type { Metadata } from "next";

import { AboutHero } from "@/components/sections/about-hero";
import { AboutContent } from "@/components/sections/about-content";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

const title = "About Us";
const description = `About ${siteConfig.name} — a software development company based in Tirana, Albania.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: { title: `${title} — ${siteConfig.name}`, description, url: `${siteConfig.url}/about` },
  twitter: { title: `${title} — ${siteConfig.name}`, description },
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
