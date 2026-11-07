"use client";

import * as React from "react";
import Link from "@/components/i18n/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Repeat, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";
import { agentPackages, type AgentPackage } from "@/content/agent-packages";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";
import { quoteHref } from "@/lib/quote-link";

export function PricingAgentPackages() {
  const { t } = useTranslation();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Section id="agent-packages" tone="ink" headerTone="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(79,209,168,0.18),transparent)]"
      />
      <div className="relative">
        <SectionHeading
          align="center"
          eyebrow={t("agentPackages.eyebrow")}
          title={t("agentPackages.title")}
          description={t("agentPackages.description")}
          className="[&_p:last-child]:text-ink-muted"
        />

        <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {agentPackages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} inView={inView} />
          ))}
        </div>

        <PricingModel />
      </div>
    </Section>
  );
}

function PackageCard({ pkg, index, inView }: { pkg: AgentPackage; index: number; inView: boolean }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const Icon = pkg.icon;
  const features = Array.from({ length: pkg.featureCount }, (_, n) => t(`agentPackages.${pkg.id}.feature${n + 1}`));
  const hasPrice = pkg.setupPrice || pkg.monthlyPrice;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={cn("relative rounded-3xl p-px", pkg.featured ? "lg:-my-4" : "")}
    >
      {/* Featured plan: a light sweeps around its border. */}
      {pkg.featured ? (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-3xl">
          <motion.div
            className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(79,209,168,0.95)_60deg,transparent_120deg)]"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 rounded-3xl bg-ink-border" />
      )}

      <div
        className={cn(
          "relative flex h-full flex-col rounded-[calc(1.5rem-1px)] p-7 md:p-8",
          pkg.featured ? "bg-[#0d1512]" : "bg-ink"
        )}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "grid size-11 place-items-center rounded-xl",
              pkg.featured ? "bg-accent text-accent-foreground" : "bg-white/5 text-accent"
            )}
          >
            <Icon className="size-5" />
          </span>
          {pkg.featured ? (
            <span className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              {t("agentPackages.popular")}
            </span>
          ) : null}
        </div>

        <h3 className="mt-6 text-2xl font-medium">{t(`agentPackages.${pkg.id}.name`)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`agentPackages.${pkg.id}.tagline`)}</p>

        <div className="mt-6 border-y border-white/10 py-5">
          {hasPrice ? (
            <div className="space-y-1">
              {pkg.setupPrice ? (
                <p className="text-sm text-ink-muted">
                  <span className="font-display text-3xl font-semibold text-white">{pkg.setupPrice}</span>{" "}
                  {t("agentPackages.setupSuffix")}
                </p>
              ) : null}
              {pkg.monthlyPrice ? (
                <p className="text-sm text-ink-muted">
                  + <span className="font-semibold text-white">{pkg.monthlyPrice}</span> {t("agentPackages.monthlySuffix")}
                </p>
              ) : null}
            </div>
          ) : (
            <>
              <p className="font-display text-3xl font-semibold text-white">{t("agentPackages.customQuote")}</p>
              <p className="mt-1 text-sm text-ink-muted">{t("agentPackages.customQuoteNote")}</p>
            </>
          )}
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          {t(`agentPackages.${pkg.id}.bestFor`)}
        </p>

        <ul className="mt-4 flex-1 space-y-3">
          {features.map((feature, n) => (
            <motion.li
              key={feature}
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.4 + index * 0.12 + n * 0.06, duration: 0.4 }}
              className="flex items-start gap-3 text-sm text-white/80"
            >
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Check className="size-3" />
              </span>
              {feature}
            </motion.li>
          ))}
        </ul>

        <Button
          asChild
          size="lg"
          variant={pkg.featured ? "accent" : "outline"}
          className={cn("mt-8 w-full", !pkg.featured && "border-white/20 text-white hover:bg-white/10")}
        >
          <Link href={quoteHref({ type: "ai-agents", pkg: pkg.id })}>
            {t(`agentPackages.${pkg.id}.cta`)}
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

/* One-time setup + monthly plan, joined by a flowing connector. */
function PricingModel() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const parts = [
    { key: "setup", icon: Wrench },
    { key: "monthly", icon: Repeat },
  ];

  return (
    <Reveal className="mt-16">
      <div className="rounded-3xl border border-ink-border bg-white/[0.03] p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("agentPackages.modelEyebrow")}</p>
        <h3 className="mt-3 text-2xl font-medium md:text-3xl">{t("agentPackages.modelTitle")}</h3>

        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
          {parts.map(({ key, icon: Icon }, i) => (
            <React.Fragment key={key}>
              <div className="rounded-2xl border border-white/10 bg-ink p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="size-[18px]" />
                  </span>
                  <p className="font-medium">{t(`agentPackages.model.${key}.title`)}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t(`agentPackages.model.${key}.body`)}</p>
              </div>
              {i === 0 ? (
                <div aria-hidden="true" className="relative hidden w-16 items-center md:flex">
                  <span className="h-px w-full bg-white/15" />
                  {!reduceMotion ? (
                    <motion.span
                      className="absolute size-2 rounded-full bg-accent shadow-[0_0_14px_4px_rgba(79,209,168,0.6)]"
                      animate={{ left: ["0%", "90%"], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : null}
                  <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-ink px-2 text-lg text-accent">+</span>
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
