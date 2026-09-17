import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { ServicesOrbit } from "@/components/sections/services-orbit";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Section } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Software & AI Development Services in Albania";
const description =
  "AI agents, business automation, custom software, and web & cloud development — software & AI services built to grow businesses across Albania.";

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
