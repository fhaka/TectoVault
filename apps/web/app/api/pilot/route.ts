import { NextResponse } from "next/server";

import { API_V1_URL } from "@/lib/api";

// Places left in the pilot programme, for the pilot section on the website.
// Cached briefly at the edge; on any backend problem the section falls back
// to its static text.
export async function GET() {
  try {
    const res = await fetch(`${API_V1_URL}/pilot/availability`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { total: number; taken: number; left: number; open: boolean };
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=30, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return NextResponse.json({ unavailable: true }, { headers: { "Cache-Control": "no-store" } });
  }
}
