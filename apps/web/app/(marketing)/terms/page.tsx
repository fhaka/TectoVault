import type { Metadata } from "next";
import { TermsBody } from "@/components/sections/terms-body";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return <TermsBody />;
}
