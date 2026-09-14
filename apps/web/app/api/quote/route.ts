import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schemas";
import { postToBackend } from "@/lib/api";

// Attachments: files are validated client-side (type/size/count) and only
// their filenames are sent along today. Actual file storage (S3/R2 upload)
// is a later phase — see spec section 34 — the backend already models
// `attachments` as a list of filenames so this can be upgraded without a
// schema change on either side.

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const attachments = Array.isArray((body as Record<string, unknown>)?.attachments)
    ? ((body as Record<string, unknown>).attachments as unknown[]).filter(
        (item): item is string => typeof item === "string"
      )
    : [];

  const result = await postToBackend("/quotes", {
    project_type: parsed.data.projectType,
    description: parsed.data.description,
    budget: parsed.data.budget,
    timeline: parsed.data.timeline,
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company || null,
    phone: parsed.data.phone || null,
    company_website: parsed.data.companyWebsite || null,
    attachments,
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
