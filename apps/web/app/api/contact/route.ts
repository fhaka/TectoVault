import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { postToBackend } from "@/lib/api";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    // Honeypot triggered — return success so bots learn nothing, but never
    // forward it to the backend (nothing to persist or notify about).
    return NextResponse.json({ ok: true });
  }

  const result = await postToBackend("/contact", {
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company || null,
    message: parsed.data.message,
    website: "",
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: { form: [result.message] } },
      { status: result.status }
    );
  }

  return NextResponse.json({ ok: true });
}
