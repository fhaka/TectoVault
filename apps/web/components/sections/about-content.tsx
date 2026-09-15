"use client";

import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { useTranslation } from "@/lib/i18n/language-context";

export function AboutContent() {
  const { t } = useTranslation();

  const beliefs = [
    { title: t("about.belief1.title"), description: t("about.belief1.body") },
    { title: t("about.belief2.title"), description: t("about.belief2.body") },
    { title: t("about.belief3.title"), description: t("about.belief3.body") },
  ];

  const capabilities = [t("about.cap1"), t("about.cap2"), t("about.cap3"), t("about.cap4")];

  return (
    <>
      <Section>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <SectionHeading title={t("about.whoWeAre.title")} className="max-w-none" />
            <p className="mt-6 leading-relaxed text-muted-foreground">{t("about.whoWeAre.body")}</p>
          </div>
          <div>
            <SectionHeading title={t("about.philosophy.title")} className="max-w-none" />
            <p className="mt-6 leading-relaxed text-muted-foreground">{t("about.philosophy.body")}</p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={t("about.beliefs.eyebrow")} title={t("about.beliefs.title")} />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {beliefs.map((belief, i) => (
            <Reveal key={belief.title} delay={i * 0.06}>
              <h3 className="text-lg font-medium">{belief.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{belief.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={t("about.capabilities.eyebrow")} title={t("about.capabilities.title")} />
        <div className="mt-10 flex flex-wrap gap-3">
          {capabilities.map((c) => (
            <span key={c} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow={t("about.team.eyebrow")}
          title={t("about.team.title")}
          description={t("about.team.description")}
        />
      </Section>
    </>
  );
}
