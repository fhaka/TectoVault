"use client";

import type { Locale } from "@/lib/i18n/dictionaries";
import { LanguageProvider } from "@/lib/i18n/language-context";

export function Providers({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LanguageProvider locale={locale}>{children}</LanguageProvider>;
}
