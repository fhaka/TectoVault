import type { Metadata } from "next";

import { FinalCta } from "@/components/sections/final-cta";
import { ProcessExperience } from "@/components/sections/process-experience";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/process",
    { en: "Our Process", sq: "Procesi Ynë" },
    {
      en: "Exactly how clients work with us, from discovery to ongoing support.",
      sq: "Si punojnë saktësisht klientët me ne, nga zbulimi deri te mbështetja e vazhdueshme.",
    }
  );
}

export default function ProcessPage() {
  return (
    <>
      <ProcessExperience />
      <FinalCta />
    </>
  );
}
