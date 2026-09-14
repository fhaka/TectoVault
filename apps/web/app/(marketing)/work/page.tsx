import type { Metadata } from "next";

import { projects } from "@/content/projects";
import { Section } from "@/components/shared/section";
import { WorkGrid } from "@/components/sections/work-grid";
import { WorkHero } from "@/components/sections/work-hero";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Our Work",
  description: "A selection of the digital products we've designed and engineered.",
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
