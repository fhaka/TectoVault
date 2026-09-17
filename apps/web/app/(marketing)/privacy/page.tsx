import type { Metadata } from "next";
import { PrivacyBody } from "@/components/sections/privacy-body";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return <PrivacyBody />;
}
