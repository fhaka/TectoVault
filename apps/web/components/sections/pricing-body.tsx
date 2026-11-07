"use client";

import Link from "@/components/i18n/link";
import { ArrowUpRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";

export function PricingBody() {
  const { t } = useTranslation();
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
        <SectionHeading eyebrow={t("pricing.customEyebrow")} title={t("pricing.factorsTitle")} />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {factors.map((factor) => (
            <li key={factor} className="rounded-xl border border-border p-5 text-sm font-medium">
              {factor}
            </li>
          ))}
        </ul>
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
