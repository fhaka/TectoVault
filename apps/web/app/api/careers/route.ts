import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/schemas";
import { postToBackend } from "@/lib/api";

// CV/resume storage (S3/R2) is a later phase — for now, only the filename
// the visitor picked is captured (see general-application-form.tsx), same
// pattern as quote attachments.

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const cvFileName = (body as Record<string, unknown>)?.cvFileName;
  const jobSlug = (body as Record<string, unknown>)?.jobSlug;

  const result = await postToBackend("/careers/applications", {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    linkedin: parsed.data.linkedin || null,
    portfolio: parsed.data.portfolio || null,
    cover_letter: parsed.data.coverLetter || null,
    cv_filename: typeof cvFileName === "string" ? cvFileName : null,
    job_slug: typeof jobSlug === "string" ? jobSlug : null,
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
