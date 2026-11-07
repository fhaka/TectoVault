import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/dictionaries";

const greeting: Record<Locale, string> = {
  en: "Hi TectoVault! I'd like to know more about AI agents for my business.",
  sq: "Përshëndetje TectoVault! Dua të di më shumë për agjentët AI për biznesin tim.",
};

/** wa.me link to the company WhatsApp, with a greeting in the visitor's language. */
export function whatsappLink(locale: Locale) {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(greeting[locale])}`;
}
