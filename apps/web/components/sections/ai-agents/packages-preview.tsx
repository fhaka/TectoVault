"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { agentPackages } from "@/content/agent-packages";
import { Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";

export function PackagesPreview() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={t("aiPage.pkg.eyebrow")}
          title={t("aiPage.pkg.title")}
          description={t("aiPage.pkg.description")}
        />
        <Button asChild variant="outline" size="lg">
          <Link href="/pricing#agent-packages">
            {t("aiPage.pkg.compare")}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {agentPackages.map((pkg, i) => {
          const Icon = pkg.icon;
          return (
            <motion.div
              key={pkg.id}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="relative rounded-3xl p-px"
            >
              {pkg.featured ? (
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-3xl">
                  <motion.div
                    className="absolute left-1/2 top-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(47,143,114,0.9)_60deg,transparent_120deg)]"
                    animate={reduceMotion ? undefined : { rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              ) : (
                <div aria-hidden="true" className="absolute inset-0 rounded-3xl bg-border" />
              )}
              <Link
                href="/pricing#agent-packages"
                className={cn(
                  "relative flex h-full flex-col rounded-[calc(1.5rem-1px)] p-6",
                  pkg.featured ? "bg-ink text-ink-foreground" : "bg-card"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl",
                      pkg.featured ? "bg-accent text-accent-foreground" : "bg-muted text-accent"
                    )}
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  {pkg.featured ? (
                    <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                      {t("agentPackages.popular")}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 text-xl font-medium">{t(`agentPackages.${pkg.id}.name`)}</h3>
                <p className={cn("mt-1 text-sm", pkg.featured ? "text-ink-muted" : "text-muted-foreground")}>
                  {t(`agentPackages.${pkg.id}.bestFor`)}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {t(`agentPackages.${pkg.id}.feature${n}`)}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  {t("aiPage.pkg.details")} <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
