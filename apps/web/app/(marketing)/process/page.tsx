import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { FinalCta } from "@/components/sections/final-cta";
import { ProcessExperience } from "@/components/sections/process-experience";

const title = "Our Process";
const description = "Exactly how clients work with us, from discovery to ongoing support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/process` },
  openGraph: { title: `${title} — ${siteConfig.name}`, description, url: `${siteConfig.url}/process` },
  twitter: { title: `${title} — ${siteConfig.name}`, description },
};

export default function ProcessPage() {
  return (
    <>
      <ProcessExperience />
      <FinalCta />
    </>
  );
}
