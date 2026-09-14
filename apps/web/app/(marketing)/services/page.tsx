import type { Metadata } from "next";

import { ServicesOrbit } from "@/components/sections/services-orbit";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Section } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI agents, business automation, custom software, web applications, mobile applications, AI integration, digital transformation, intelligent operations, web development, cloud & DevOps, and maintenance & support — the systems that run modern businesses.",
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
