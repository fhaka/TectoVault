"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { copySq } from "./copy-sq";
import { dictionaries, defaultLocale, type Locale } from "./dictionaries";
import { localizePath } from "./config";

// The locale comes from the URL (/services = English, /sq/services =
// Albanian), resolved on the server by app/[locale]/layout.tsx and passed in
// here, so pages render in the right language on the server - which is what
// search engines index. Switching language navigates to the same page in the
// other language.

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Dictionary lookup by key (lib/i18n/dictionaries.ts). */
  t: (key: string) => string;
  /** Translate literal English copy via the exact-copy map (lib/i18n/copy-sq.ts). */
  tx: (text: string) => string;
  /** The given path in the current locale ("/pricing" -> "/sq/pricing"). */
  href: (path: string) => string;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = React.useCallback(
    (next: Locale) => {
      if (next === locale) return;
      const { search, hash } = window.location;
      router.push(localizePath(pathname || "/", next) + search + hash);
    },
    [locale, pathname, router]
  );

  const t = React.useCallback(
    (key: string) => dictionaries[locale][key] ?? dictionaries[defaultLocale][key] ?? key,
    [locale]
  );

  const tx = React.useCallback(
    (text: string) => (locale === "sq" ? copySq[text.replace(/\s+/g, " ").trim()] ?? text : text),
    [locale]
  );

  const href = React.useCallback((path: string) => localizePath(path, locale), [locale]);

  const value = React.useMemo(() => ({ locale, setLocale, t, tx, href }), [locale, setLocale, t, tx, href]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
