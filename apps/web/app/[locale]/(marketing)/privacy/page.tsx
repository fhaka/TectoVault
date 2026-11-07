import type { Metadata } from "next";
import { PrivacyBody } from "@/components/sections/privacy-body";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/privacy",
    { en: "Privacy Policy", sq: "Politika e Privatësisë" },
    {
      en: "How TectoVault collects, uses and protects your personal data.",
      sq: "Si i mbledh, i përdor dhe i mbron TectoVault të dhënat tuaja personale.",
    }
  );
}

export default function PrivacyPage() {
  return <PrivacyBody />;
}
