import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { jobPostings, getJobBySlug } from "@/content/careers";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { GeneralApplicationForm } from "@/components/forms/general-application-form";
import { Badge } from "@/components/ui/badge";

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
  return { title: job.title, description: job.aboutRole };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <PageHero eyebrow="Careers" title={job.title}>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{job.location}</Badge>
          <Badge>{job.employmentType}</Badge>
        </div>
      </PageHero>

      <Section>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="space-y-10">
            <div>
              <SectionHeading title="About the role" className="max-w-none" />
              <p className="mt-4 leading-relaxed text-muted-foreground">{job.aboutRole}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Responsibilities</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {job.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Requirements</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {job.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            {job.niceToHave.length > 0 ? (
              <div>
                <h3 className="text-lg font-medium">Nice to have</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {job.niceToHave.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-lg font-medium">Apply for this role</h3>
            <div className="mt-6">
              <GeneralApplicationForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
