import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { industries, getIndustryBySlug } from "@/content/industries";
import { getSolutionBySlug } from "@/content/solutions";
import { getServiceBySlug } from "@/content/services";
import { projects } from "@/content/projects";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return { title: industry.title, description: industry.overview };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const Icon = industry.icon;
  const relatedSolutions = industry.relatedSolutions
    .map(getSolutionBySlug)
    .filter(Boolean);
  const relatedServices = industry.relatedServices
    .map(getServiceBySlug)
    .filter(Boolean);
  const relatedProjects = projects.filter((p) => p.industry === industry.title).slice(0, 2);

  return (
    <>
      <PageHero eyebrow="Industries">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          <Icon className="size-6" />
        </span>
        <h1 className="mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {industry.title}
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
          {industry.overview}
        </p>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Common challenges" title="What we typically see" />
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {industry.problems.map((problem) => (
            <li key={problem} className="rounded-2xl border border-border p-6 text-sm leading-relaxed">
              {problem}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <SectionHeading title="Relevant solutions" className="max-w-none" />
            <div className="mt-8 space-y-3">
              {relatedSolutions.map((s) =>
                s ? (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-accent"
                  >
                    {s.title}
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent" />
                  </Link>
                ) : null
              )}
            </div>
          </div>
          <div>
            <SectionHeading title="Relevant services" className="max-w-none" />
            <div className="mt-8 space-y-3">
              {relatedServices.map((s) =>
                s ? (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-accent"
                  >
                    {s.title}
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent" />
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </div>
      </Section>

      {relatedProjects.length > 0 ? (
        <Section>
          <SectionHeading eyebrow="Case studies" title="Related work" />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <article
                key={project.slug}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-medium">{project.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      <FinalCta />
    </>
  );
}
