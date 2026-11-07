import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin-api";
import { defaultLocale, prefixedLocales } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return adminGuard(request);
  return localeRouting(request);
}

// --- Localized marketing site -------------------------------------------
//
// English is served at the root URLs (/services) and Albanian under /sq
// (/sq/services). Every marketing page lives under app/[locale]/, so
// unprefixed requests are rewritten - not redirected - to /en/..., which
// keeps the English URLs exactly as they were. Anyone requesting /en/...
// directly is redirected to the unprefixed URL so each page has one address.
function localeRouting(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasPrefix = prefixedLocales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

// --- Admin panel ----------------------------------------------------------
//
// First line of defense: redirect obviously-unauthenticated requests before
// they render anything. This only checks that the cookie exists — it does
// NOT verify the JWT's signature or expiry (that would mean shipping the
// backend's SECRET_KEY into the Next.js edge runtime, which we deliberately
// avoid). Real authorization happens server-side on every admin data fetch:
// each Server Component / Route Handler calls the FastAPI backend with the
// cookie's token, and the backend is the actual source of truth — an
// expired or forged token gets a 401 there and the page redirects to
// /admin/login. So this is a fast UX shortcut, not the security boundary.
//
// It also sets X-Robots-Tag: noindex on every /admin/* response. The
// protected layout can't set page-level `robots` metadata for every route
// under it in one place, and /admin/login is a client component (Next.js
// metadata exports only work in Server Components), so a response header
// here is the one spot that reliably keeps the whole admin panel out of
// search results, on top of the robots.txt disallow.
function adminGuard(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(ADMIN_SESSION_COOKIE);

  if (pathname === "/admin/login") {
    if (hasSession) {
      return withNoindex(NextResponse.redirect(new URL("/admin", request.url)));
    }
    return withNoindex(NextResponse.next());
  }

  if (!hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    return withNoindex(NextResponse.redirect(loginUrl));
  }

  return withNoindex(NextResponse.next());
}

function withNoindex(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  // Everything except API routes, Next internals, metadata routes and files
  // with an extension (images, icons, fonts...).
  matcher: ["/((?!api|_next|sitemap.xml|robots.txt|.*\\..*).*)"],
};
