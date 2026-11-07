import type { Metadata } from "next";
import { TermsBody } from "@/components/sections/terms-body";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/terms",
    { en: "Terms of Service", sq: "Kushtet e Shërbimit" },
    {
      en: "The terms that apply when you use the TectoVault website and services.",
      sq: "Kushtet që zbatohen kur përdorni faqen dhe shërbimet e TectoVault.",
    }
  );
}

export default function TermsPage() {
  return <TermsBody />;
}
