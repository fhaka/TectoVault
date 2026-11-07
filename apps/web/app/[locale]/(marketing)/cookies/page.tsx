import type { Metadata } from "next";
import { CookiesBody } from "@/components/sections/cookies-body";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/cookies",
    { en: "Cookie Policy", sq: "Politika e Cookies" },
    {
      en: "How TectoVault uses cookies on this website.",
      sq: "Si i përdor TectoVault cookies në këtë faqe interneti.",
    }
  );
}

export default function CookiesPage() {
  return <CookiesBody />;
}
