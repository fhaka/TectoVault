import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { ServicesOrbit } from "@/components/sections/services-orbit";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Section } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Software Development Services in Albania";
const description =
  "Custom software, web applications, mobile apps, cloud & DevOps, and AI-driven automation — software development services built for businesses across Albania.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: { title: `${title} — ${siteConfig.name}`, description, url: `${siteConfig.url}/services` },
  twitter: { title: `${title} — ${siteConfig.name}`, description },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesOrbit />

      <Section>
        <ServicesGrid />
      </Section>

      <FinalCta />
    </>
  );
}
