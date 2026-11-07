import type { Metadata } from "next";

import { ServicesOrbit } from "@/components/sections/services-orbit";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Section } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/services",
    { en: "Software & AI Development Services in Albania", sq: "Shërbime Zhvillimi Softueri & AI në Shqipëri" },
    {
      en: "AI agents, business automation, custom software, and web & cloud development \u2014 software & AI services built to grow businesses across Albania.",
      sq: "Agjentë AI, automatizim biznesi, softuer i personalizuar dhe zhvillim web & cloud — shërbime softueri & AI për të rritur bizneset në të gjithë Shqipërinë.",
    }
  );
}

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
