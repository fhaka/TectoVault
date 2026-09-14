import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { solutions, getSolutionBySlug } from "@/content/solutions";
import { projects } from "@/content/projects";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return { title: solution.title, description: solution.shortDescription };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const Icon = solution.icon;
  const relatedProjects = projects.slice(0, 2);

  return (
    <>
      <PageHero eyebrow="Solutions">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          <Icon className="size-6" />
        </span>
        <h1 className="mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {solution.title}
        </h1>
      </PageHero>

      <Section>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              The problem
            </h2>
            <p className="mt-4 text-xl font-medium leading-snug text-balance">{solution.problem}</p>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              The solution
            </h2>
            <p className="mt-4 text-xl font-medium leading-snug text-balance">{solution.solution}</p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <SectionHeading title="Features" className="max-w-none" />
            <ul className="mt-8 space-y-3">
              {solution.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Benefits" className="max-w-none" />
            <ul className="mt-8 space-y-3">
              {solution.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </Section>

      <Section>
        <SectionHeading eyebrow="Related work" title="Relevant projects" />
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

      <FinalCta />
    </>
  );
}
