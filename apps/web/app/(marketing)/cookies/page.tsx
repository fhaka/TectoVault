import type { Metadata } from "next";
import { CookiesBody } from "@/components/sections/cookies-body";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  alternates: { canonical: `${siteConfig.url}/cookies` },
};

export default function CookiesPage() {
  return <CookiesBody />;
}
