import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { projects } from "@/content/projects";
import { Section } from "@/components/shared/section";
import { WorkGrid } from "@/components/sections/work-grid";
import { WorkHero } from "@/components/sections/work-hero";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Our Work";
const description =
  "A selection of the websites, applications and cloud systems TectoVault has designed and engineered for clients.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/work` },
  openGraph: { title: `${title} — ${siteConfig.name}`, description, url: `${siteConfig.url}/work` },
  twitter: { title: `${title} — ${siteConfig.name}`, description },
};

export default function WorkPage() {
  const hasPlaceholders = projects.some((p) => p.isPlaceholder);

  return (
    <>
      <WorkHero hasPlaceholders={hasPlaceholders} />

      <Section>
        <WorkGrid projects={projects} />
      </Section>

      <FinalCta />
    </>
  );
}
