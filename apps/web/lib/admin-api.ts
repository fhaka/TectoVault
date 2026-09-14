import "server-only";

import { cookies } from "next/headers";

import { API_V1_URL } from "@/lib/api";

// Name of the httpOnly cookie holding the FastAPI-issued JWT. Never read or
// set from client components — only Route Handlers and Server Components
// touch it, via next/headers.
export const ADMIN_SESSION_COOKIE = "admin_session";

// Matches Settings.access_token_expire_minutes (24h) in the FastAPI backend
// — see apps/api/app/core/config.py. Kept here so the cookie's maxAge tracks
// the token's real lifetime instead of drifting from it.
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;

export async function getAdminToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ADMIN_SESSION_COOKIE)?.value ?? null;
}

/**
 * Server-only fetch helper for calling the FastAPI admin API with the
 * current admin's session token attached. Use from Server Components (for
 * reads) and Route Handlers (for mutations) — never from the browser.
 */
export async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getAdminToken();

  const headers = new Headers(init.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${API_V1_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}

/**
 * Convenience wrapper for Server Components: fetch + parse JSON, returning
 * null on any failure (missing/expired session, backend down, etc.) so
 * pages can redirect to /admin/login rather than throwing.
 */
export async function adminFetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await adminFetch(path);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
