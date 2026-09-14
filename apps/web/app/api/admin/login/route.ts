import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

import { API_V1_URL } from "@/lib/api";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE_SECONDS } from "@/lib/admin-api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Please enter a valid email and password." }, { status: 400 });
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${API_V1_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "We couldn't reach the server. Please try again shortly." },
      { status: 503 }
    );
  }

  if (backendRes.status === 429) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  if (!backendRes.ok) {
    // Same generic message whether the email or the password was wrong —
    // never reveal which one, so we don't help an attacker enumerate accounts.
    return NextResponse.json({ ok: false, message: "Incorrect email or password." }, { status: 401 });
  }

  const data = (await backendRes.json()) as { access_token: string };

  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ ok: true });
}
