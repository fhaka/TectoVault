import type { Metadata } from "next";
import { SolutionsExperience } from "@/components/sections/solutions-experience";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Business solutions built around the problems you're actually facing — business management systems, booking platforms, e-commerce, customer portals and automation.",
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsExperience />

      <FinalCta />
    </>
  );
}
