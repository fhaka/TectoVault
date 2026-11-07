import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { jobPostings, getJobBySlug } from "@/content/careers";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { GeneralApplicationForm } from "@/components/forms/general-application-form";
import { Badge } from "@/components/ui/badge";
import { getTx } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/server";

export function generateStaticParams() {
  return jobPostings.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return {};
  return pageMetadata(
    `/careers/${slug}`,
    { en: job.title, sq: job.title },
    { en: job.aboutRole, sq: job.aboutRole }
  );
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const tx = await getTx();
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <PageHero eyebrow={tx("Careers")} title={job.title}>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{job.location}</Badge>
          <Badge>{job.employmentType}</Badge>
        </div>
      </PageHero>

      <Section>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="space-y-10">
            <div>
              <SectionHeading title={tx("About the role")} className="max-w-none" />
              <p className="mt-4 leading-relaxed text-muted-foreground">{job.aboutRole}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">{tx("Responsibilities")}</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {job.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">{tx("Requirements")}</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {job.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            {job.niceToHave.length > 0 ? (
              <div>
                <h3 className="text-lg font-medium">{tx("Nice to have")}</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {job.niceToHave.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-lg font-medium">{tx("Apply for this role")}</h3>
            <div className="mt-6">
              <GeneralApplicationForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
