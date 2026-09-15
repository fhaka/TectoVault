"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";
import { serviceTranslationsSq } from "@/lib/i18n/content-sq";

const categories = [
  { slug: "ai-agents", title: "AI Agents", description: "Voice and chat agents for customers and teams." },
  { slug: "business-automation", title: "Business Automation", description: "Automated workflows, orders and communication." },
  { slug: "custom-software", title: "Custom Software", description: "Business management and operations systems." },
  { slug: "web-applications", title: "Web Applications", description: "Interactive, account-based platforms." },
  { slug: "mobile-applications", title: "Mobile Applications", description: "iOS and Android apps for customers and staff." },
  { slug: "ai-integration", title: "AI Integration", description: "Adding AI into your existing systems." },
  { slug: "digital-transformation", title: "Digital Transformation", description: "Turning manual processes into digital ones." },
  { slug: "intelligent-operations", title: "Intelligent Operations", description: "Connected dashboards and business intelligence." },
  { slug: "web-development", title: "Web Development", description: "Corporate and marketing websites." },
  { slug: "cloud-devops", title: "Cloud & DevOps", description: "Infrastructure, deployment and monitoring." },
  { slug: "maintenance-support", title: "Maintenance & Support", description: "Ongoing care after launch." },
];

export function PricingBody() {
  const { t, locale } = useTranslation();
  const factors = [
    t("pricing.factor1"),
    t("pricing.factor2"),
    t("pricing.factor3"),
    t("pricing.factor4"),
    t("pricing.factor5"),
  ];

  return (
    <>
      <Section>
        <SectionHeading title={t("pricing.factorsTitle")} />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {factors.map((factor) => (
            <li key={factor} className="rounded-xl border border-border p-5 text-sm font-medium">
              {factor}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={t("pricing.categoriesEyebrow")} title={t("pricing.categoriesTitle")} />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => {
            const tr = locale === "sq" ? serviceTranslationsSq[category.slug] : null;
            return (
              <Reveal key={category.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-medium">{tr?.title ?? category.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{tr?.shortDescription ?? category.description}</p>
                  <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    {t("cta.getQuote")} <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border bg-card p-10 text-center md:p-16">
          <h2 className="text-balance text-3xl font-medium md:text-4xl">{t("pricing.ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">{t("pricing.ctaDescription")}</p>
          <Button asChild size="lg" variant="accent" className="mt-8">
            <Link href="/contact">
              {t("cta.contactUs")} <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
