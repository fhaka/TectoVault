import type { Metadata } from "next";

import { projects } from "@/content/projects";
import { Section } from "@/components/shared/section";
import { WorkGrid } from "@/components/sections/work-grid";
import { WorkHero } from "@/components/sections/work-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/work",
    { en: "Our Work", sq: "Punët Tona" },
    {
      en: "A selection of the websites, applications and cloud systems TectoVault has designed and engineered for clients.",
      sq: "Një përzgjedhje e faqeve, aplikacioneve dhe sistemeve cloud që TectoVault ka projektuar dhe ndërtuar për klientët.",
    }
  );
}

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
