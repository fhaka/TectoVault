import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { HomeSplash } from "@/components/sections/home-splash";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeCapability } from "@/components/sections/home-capability";
import { HomeServices } from "@/components/sections/home-services";
import { HomeWork } from "@/components/sections/home-work";
import { HomeProblems } from "@/components/sections/home-problems";
import { HomeIndustries } from "@/components/sections/home-industries";
import { HomeProcess } from "@/components/sections/home-process";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Software Development Company in Albania";
const description =
  "Custom software, web development, and cloud & DevOps services in Albania. TectoVault builds AI-driven systems for businesses in Tirana and beyond.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${title} — ${siteConfig.name}`,
    description,
    url: siteConfig.url,
  },
  twitter: {
    title: `${title} — ${siteConfig.name}`,
    description,
  },
};

export default function Home() {
  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    image: `${siteConfig.url}/icon-512.png`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tirana",
      addressCountry: "AL",
    },
    areaServed: "Albania",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <HomeSplash />
      <HomeHero />
      <HomeCapability />
      <HomeServices />
      <HomeWork />
      <HomeProblems />
      <HomeIndustries />
      <HomeProcess />
      <FinalCta />
    </>
  );
}
