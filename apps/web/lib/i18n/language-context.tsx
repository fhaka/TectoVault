"use client";

import * as React from "react";
import { dictionaries, defaultLocale, type Locale } from "./dictionaries";

const STORAGE_KEY = "tectovault:locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale);

  React.useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable — stay on default locale.
    }
    if (stored !== "en" && stored !== "sq") return;
    const update = window.setTimeout(() => {
      setLocaleState(stored as Locale);
      // setLocaleState alone doesn't touch the DOM — a restored preference
      // needs the same <html lang> sync that an explicit switch gets via
      // setLocale, or a returning Albanian-preference visitor keeps lang="en".
      if (typeof document !== "undefined") {
        document.documentElement.lang = stored as Locale;
      }
    }, 0);
    return () => window.clearTimeout(update);
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  }, []);

  const t = React.useCallback(
    (key: string) => dictionaries[locale][key] ?? dictionaries[defaultLocale][key] ?? key,
    [locale]
  );

  const value = React.useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
