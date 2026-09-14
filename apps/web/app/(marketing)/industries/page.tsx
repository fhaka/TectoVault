import type { Metadata } from "next";
import { IndustriesExperience } from "@/components/sections/industries-experience";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Focused industry experience across healthcare, retail, hospitality, real estate, professional services and SMBs.",
};

export default function IndustriesPage() {
  return (
    <>
      <IndustriesExperience />

      <FinalCta />
    </>
  );
}
