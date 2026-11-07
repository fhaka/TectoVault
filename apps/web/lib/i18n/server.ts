import { locale as localeParam } from "next/root-params";

import { siteConfig } from "@/lib/site-config";
import { copySq } from "./copy-sq";
import { dictionaries, type Locale } from "./dictionaries";
import { defaultLocale, isLocale, localizePath, locales, ogLocale } from "./config";

/** The locale of the page being rendered, from the [locale] URL segment. */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  return isLocale(value) ? value : defaultLocale;
}

/** Dictionary lookup for Server Components, same keys as the client t(). */
export async function getT() {
  const locale = await getLocale();
  return (key: string) => dictionaries[locale][key] ?? dictionaries[defaultLocale][key] ?? key;
}

/**
 * Translates literal English copy in Server Components using the reviewed
 * exact-copy map (lib/i18n/copy-sq.ts). Unknown strings fall back to English.
 */
export async function getTx() {
  const locale = await getLocale();
  return (text: string) => (locale === "sq" ? copySq[text.replace(/\s+/g, " ").trim()] ?? text : text);
}

type Localized = { en: string; sq: string };

/**
 * Canonical + hreflang alternates for a page path ("/services"), plus the
 * Open Graph URL/locale, for the current locale.
 */
export function localeAlternates(path: string, locale: Locale) {
  const url = (l: Locale) => `${siteConfig.url}${localizePath(path, l) === "/" ? "" : localizePath(path, l)}`;
  return {
    alternates: {
      canonical: url(locale),
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, url(l)])),
        "x-default": url(defaultLocale),
      },
    },
    openGraph: { url: url(locale), locale: ogLocale[locale] },
  };
}

/** Standard page metadata: localized title/description + alternates. */
export async function pageMetadata(path: string, title: Localized, description: Localized) {
  const locale = await getLocale();
  const { alternates, openGraph } = localeAlternates(path, locale);
  const t = title[locale];
  const d = description[locale];
  return {
    title: t,
    description: d,
    alternates,
    openGraph: { ...openGraph, title: `${t} — ${siteConfig.name}`, description: d },
    twitter: { title: `${t} — ${siteConfig.name}`, description: d },
  };
}
