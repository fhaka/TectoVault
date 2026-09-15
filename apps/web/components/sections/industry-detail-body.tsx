"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/content";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";
import { useTranslation } from "@/lib/i18n/language-context";
import {
  industryTranslationsSq,
  solutionTranslationsSq,
  serviceTranslationsSq,
  projectTranslationsSq,
} from "@/lib/i18n/content-sq";

export function IndustryDetailBody({
  industry,
  icon,
  relatedSolutions,
  relatedServices,
  relatedProjects,
}: {
  industry: { slug: string; title: string; overview: string; problems: string[] };
  icon: React.ReactNode;
  relatedSolutions: { slug: string; title: string }[];
  relatedServices: { slug: string; title: string }[];
  relatedProjects: Project[];
}) {
  const { t, locale } = useTranslation();
  const tr = locale === "sq" ? industryTranslationsSq[industry.slug] : null;

  const title = tr?.title ?? industry.title;
  const overview = tr?.overview ?? industry.overview;
  const problems = tr?.problems ?? industry.problems;

  return (
    <>
      <PageHero eyebrow={t("industry.eyebrow")}>
        <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          {icon}
        </span>
        <h1 className="mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
          {overview}
        </p>
      </PageHero>

      <Section>
        <SectionHeading eyebrow={t("industry.challengesEyebrow")} title={t("industry.challengesTitle")} />
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {problems.map((problem) => (
            <li key={problem} className="rounded-2xl border border-border p-6 text-sm leading-relaxed">
              {problem}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <SectionHeading title={t("industry.relevantSolutions")} className="max-w-none" />
            <div className="mt-8 space-y-3">
              {relatedSolutions.map((s) => {
                const stitle = locale === "sq" ? solutionTranslationsSq[s.slug]?.title ?? s.title : s.title;
                return (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-accent"
                  >
                    {stitle}
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent" />
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <SectionHeading title={t("industry.relevantServices")} className="max-w-none" />
            <div className="mt-8 space-y-3">
              {relatedServices.map((s) => {
                const stitle = locale === "sq" ? serviceTranslationsSq[s.slug]?.title ?? s.title : s.title;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-accent"
                  >
                    {stitle}
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {relatedProjects.length > 0 ? (
        <Section>
          <SectionHeading eyebrow={t("industry.caseStudiesEyebrow")} title={t("industry.relatedWork")} />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {relatedProjects.map((project) => {
              const ptr = locale === "sq" ? projectTranslationsSq[project.slug] : null;
              return (
                <article key={project.slug} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-medium">{ptr?.name ?? project.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{ptr?.description ?? project.description}</p>
                </article>
              );
            })}
          </div>
        </Section>
      ) : null}

      <FinalCta />
    </>
  );
}
