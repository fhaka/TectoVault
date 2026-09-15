"use client";

import { Check } from "lucide-react";

import type { Solution } from "@/types/content";
import type { Project } from "@/types/content";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";
import { useTranslation } from "@/lib/i18n/language-context";
import { solutionTranslationsSq, projectTranslationsSq } from "@/lib/i18n/content-sq";

export function SolutionDetailBody({
  solution,
  icon,
  relatedProjects,
}: {
  solution: Omit<Solution, "icon">;
  icon: React.ReactNode;
  relatedProjects: Project[];
}) {
  const { t, locale } = useTranslation();
  const tr = locale === "sq" ? solutionTranslationsSq[solution.slug] : null;

  const title = tr?.title ?? solution.title;
  const problem = tr?.problem ?? solution.problem;
  const solutionText = tr?.solution ?? solution.solution;
  const features = tr?.features ?? solution.features;
  const benefits = tr?.benefits ?? solution.benefits;

  return (
    <>
      <PageHero eyebrow={t("solution.eyebrow")}>
        <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
          {icon}
        </span>
        <h1 className="mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
      </PageHero>

      <Section>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              {t("solution.theProblem")}
            </h2>
            <p className="mt-4 text-xl font-medium leading-snug text-balance">{problem}</p>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              {t("solution.theSolution")}
            </h2>
            <p className="mt-4 text-xl font-medium leading-snug text-balance">{solutionText}</p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <SectionHeading title={t("solution.features")} className="max-w-none" />
            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={t("solution.benefits")} className="max-w-none" />
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
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
        <SectionHeading eyebrow={t("solution.relatedWork")} title={t("solution.relevantProjects")} />
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

      <FinalCta />
    </>
  );
}
