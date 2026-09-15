"use client";

import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";

import type { Service } from "@/types/content";
import { processStages } from "@/content/process";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { WebApplicationsHero } from "@/components/sections/web-applications-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/lib/i18n/language-context";
import { serviceTranslationsSq, serviceDetailsSq } from "@/lib/i18n/content-sq";

export function ServiceDetailBody({
  service,
  icon,
}: {
  service: Omit<Service, "icon">;
  icon: React.ReactNode;
}) {
  const { t, locale } = useTranslation();

  const trTitle = locale === "sq" ? serviceTranslationsSq[service.slug] : null;
  const trDetail = locale === "sq" ? serviceDetailsSq[service.slug] : null;

  const title = trTitle?.title ?? service.title;
  const overview = trDetail?.overview ?? service.overview;
  const capabilities = trDetail?.capabilities ?? service.capabilities;
  const whatWeBuild = trDetail?.whatWeBuild ?? service.whatWeBuild;
  const faq = trDetail?.faq ?? service.faq;

  return (
    <>
      {service.slug === "web-applications" ? (
        <WebApplicationsHero overview={overview} />
      ) : (
        <PageHero eyebrow={t("service.eyebrow")}>
          <div className="mt-1 flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
              {icon}
            </span>
          </div>
          <h1 className="mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
            {overview}
          </p>
        </PageHero>
      )}

      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading title={t("service.capabilities")} className="max-w-none" />
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {cap}
                </li>
              ))}
            </ul>

            <h3 className="mt-14 text-xl font-medium">{t("service.whatWeBuild")}</h3>
            <ul className="mt-6 space-y-3">
              {whatWeBuild.map((item) => (
                <li key={item} className="rounded-xl border border-border p-4 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl border border-border bg-muted p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {t("service.ourProcess")}
            </h3>
            <ol className="mt-4 space-y-2">
              {processStages.slice(0, 5).map((stage) => (
                <li key={stage.number} className="flex items-center gap-3 text-sm">
                  <span className="font-display text-accent">{stage.number}</span>
                  {stage.title}
                </li>
              ))}
            </ol>
            <Link
              href="/process"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent"
            >
              {t("service.seeFullProcess")} <ArrowUpRight className="size-3.5" />
            </Link>
          </aside>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title={t("service.faqTitle")} />
        <Reveal className="mt-10 max-w-2xl">
          <Accordion type="single" collapsible>
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}
