import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/final-cta";
import { ProcessExperience } from "@/components/sections/process-experience";

export const metadata: Metadata = { title: "Process", description: "Exactly how clients work with us, from discovery to ongoing support." };

export default function ProcessPage() {
  return <>
    <ProcessExperience />
    <FinalCta />
  </>;
}
