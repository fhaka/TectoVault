"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { useTranslation } from "@/lib/i18n/language-context";

const pairs = [
  { key: "pair1", href: "/services/ai-agents" },
  { key: "pair2", href: "/services/business-automation" },
  { key: "pair3", href: "/solutions/business-management-systems" },
  { key: "pair4", href: "/services/ai-integration" },
  { key: "pair5", href: "/services/digital-transformation" },
];

export function HomeProblems() {
  const { t } = useTranslation();
  return (
    <Section tone="ink" headerTone="dark">
      <SectionHeading
        eyebrow={t("problems.eyebrow")}
        title={t("problems.title")}
        description={t("problems.description")}
        className="[&_p]:text-ink-muted"
      />

      <div className="mt-14 divide-y divide-ink-border border-y border-ink-border">
        {pairs.map((pair, i) => (
          <Reveal key={pair.key} delay={i * 0.05}>
            <Link
              href={pair.href}
              className="group flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center"
            >
              <span className="text-lg font-medium sm:text-xl">{t(`problems.${pair.key}.problem`)}</span>
              <span className="flex items-center gap-2 text-lg text-accent sm:text-xl">
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                {t(`problems.${pair.key}.solution`)}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
