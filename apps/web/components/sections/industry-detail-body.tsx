"use client";

import Link from "@/components/i18n/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bot } from "lucide-react";

import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";
import { IndustryHero } from "@/components/sections/industry/industry-hero";
import { BeforeAfter } from "@/components/sections/industry/before-after";
import { IndustryAgent } from "@/components/sections/industry/industry-agent";
import { AgentDay } from "@/components/sections/industry/agent-day";
import { industryAgents } from "@/content/industry-agents";
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
  relatedSolutions: { slug: string; title: string; shortDescription: string }[];
  relatedServices: { slug: string; title: string; shortDescription: string }[];
  relatedProjects: Project[];
}) {
  const { t, locale } = useTranslation();
  const reduceMotion = useReducedMotion();
  const tr = locale === "sq" ? industryTranslationsSq[industry.slug] : null;
  const agent = industryAgents[industry.slug];

  const title = tr?.title ?? industry.title;
  const overview = tr?.overview ?? industry.overview;
  const problems = tr?.problems ?? industry.problems;

  const related = [
    ...relatedServices.map((s) => {
      const st = locale === "sq" ? serviceTranslationsSq[s.slug] : null;
      return {
        href: `/services/${s.slug}`,
        title: st?.title ?? s.title,
        description: st?.shortDescription ?? s.shortDescription,
        featured: s.slug === "ai-agents",
      };
    }),
    ...relatedSolutions.map((s) => {
      const st = locale === "sq" ? solutionTranslationsSq[s.slug] : null;
      return {
        href: `/solutions/${s.slug}`,
        title: st?.title ?? s.title,
        description: st?.shortDescription ?? s.shortDescription,
        featured: false,
      };
    }),
  ];

  return (
    <>
      <IndustryHero
        icon={icon}
        title={title}
        overview={overview}
        feed={agent ? agent.feed.map((f) => f[locale]) : []}
        tryPrompt={agent ? t(`${agent.scripts[0].key}.try`) : ""}
      />

      {agent ? (
        <>
          <BeforeAfter problems={problems} fixes={agent.fixes.map((f) => f[locale])} />
          <IndustryAgent agent={agent} />
          <AgentDay day={agent.day.map((d) => ({ time: d.time, text: d.text[locale] }))} />
        </>
      ) : null}

      <Section>
        <SectionHeading eyebrow={t("industryPage.relatedEyebrow")} title={t("industryPage.relatedTitle")} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, i) => (
            <motion.div
              key={item.href}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className={cn(item.featured && "sm:col-span-2 lg:col-span-1")}
            >
              <Link
                href={item.href}
                className={cn(
                  "group flex h-full flex-col rounded-2xl border p-6 transition-colors",
                  item.featured ? "border-transparent bg-ink text-ink-foreground" : "border-border bg-card hover:border-accent"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.title}</span>
                  {item.featured ? (
                    <Bot className="size-4 text-accent" />
                  ) : (
                    <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-accent" />
                  )}
                </div>
                <p className={cn("mt-2 flex-1 text-sm leading-relaxed", item.featured ? "text-ink-muted" : "text-muted-foreground")}>
                  {item.description}
                </p>
                {item.featured ? (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    {t("cta.learnMore")} <ArrowUpRight className="size-3.5" />
                  </span>
                ) : null}
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {relatedProjects.length > 0 ? (
        <Section tone="muted">
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

      <FinalCta variant="agents" />
    </>
  );
}
