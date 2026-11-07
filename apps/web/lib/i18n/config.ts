// Locale routing rules, shared by the proxy, server code and client code.
//
// English is the default and lives at the root (/services); Albanian lives
// under a prefix (/sq/services). Internally every marketing page sits under
// app/[locale]/..., and proxy.ts rewrites unprefixed URLs to /en/... so the
// English URLs never change.

import type { Locale } from "./dictionaries";

export const locales = ["en", "sq"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "en";

/** Locales that appear in the URL. The default locale never does. */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale);

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

/** Open Graph locale codes. */
export const ogLocale: Record<Locale, string> = { en: "en_US", sq: "sq_AL" };

/** Paths that are never localized (APIs, admin, files). */
function isUnlocalizedPath(path: string) {
  return /^\/(api|admin|_next)(\/|$)/.test(path) || /\.[a-z0-9]+$/i.test(path.split(/[?#]/)[0]);
}

/** Removes a locale prefix: "/sq/services" -> "/services", "/sq" -> "/". */
export function stripLocale(path: string): string {
  for (const l of prefixedLocales) {
    if (path === `/${l}`) return "/";
    if (path.startsWith(`/${l}/`) || path.startsWith(`/${l}?`) || path.startsWith(`/${l}#`)) {
      const rest = path.slice(l.length + 1);
      return rest.startsWith("/") ? rest : `/${rest}`;
    }
  }
  return path;
}

/** The URL of `path` in `locale`: "/services" -> "/sq/services" for sq. */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//") || isUnlocalizedPath(path)) return path;
  const bare = stripLocale(path);
  if (locale === defaultLocale) return bare;
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
}
