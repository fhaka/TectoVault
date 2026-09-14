import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin-api";

// First line of defense: redirect obviously-unauthenticated requests before
// they render anything. This only checks that the cookie exists — it does
// NOT verify the JWT's signature or expiry (that would mean shipping the
// backend's SECRET_KEY into the Next.js edge runtime, which we deliberately
// avoid). Real authorization happens server-side on every admin data fetch:
// each Server Component / Route Handler calls the FastAPI backend with the
// cookie's token, and the backend is the actual source of truth — an
// expired or forged token gets a 401 there and the page redirects to
// /admin/login. So this middleware is a fast UX shortcut, not the security
// boundary.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(ADMIN_SESSION_COOKIE);

  if (pathname === "/admin/login") {
    if (hasSession) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
