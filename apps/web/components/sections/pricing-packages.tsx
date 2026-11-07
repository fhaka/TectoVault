"use client";

import * as React from "react";
import Link from "@/components/i18n/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { services } from "@/content/services";
import {
  isPackageService,
  packageKey,
  packageServices,
  servicePackages,
  type PackageService,
  type ServicePackage,
} from "@/content/service-packages";
import { SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";
import { serviceTranslationsSq } from "@/lib/i18n/content-sq";
import { quoteHref } from "@/lib/quote-link";

// Every service gets the same treatment: a tab, a short pitch and three
// packages. No prices: each package leads to a quote request.
// Deep links: /pricing#web-development opens that service's tab.

const LEGACY_HASHES: Record<string, PackageService> = { "agent-packages": "ai-agents" };

export function PricingPackages() {
  const { t, locale } = useTranslation();
  const reduceMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState<PackageService>("ai-agents");

  React.useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.slice(1);
      const target = isPackageService(hash) ? hash : LEGACY_HASHES[hash];
      if (!target) return;
      setActive(target);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const id = window.setTimeout(apply, 0);
    window.addEventListener("hashchange", apply);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("hashchange", apply);
    };
  }, []);

  const pick = (slug: PackageService) => {
    setActive(slug);
    window.history.replaceState(null, "", `#${slug}`);
  };

  const serviceTitle = (slug: string) => {
    const service = services.find((s) => s.slug === slug)!;
    return locale === "sq" ? serviceTranslationsSq[slug]?.title ?? service.title : service.title;
  };
  const activeService = services.find((s) => s.slug === active)!;
  const ActiveIcon = activeService.icon;

  return (
    <section
      ref={sectionRef}
      id="packages"
      data-header-tone="dark"
      className="relative scroll-mt-16 overflow-hidden bg-ink py-20 text-ink-foreground md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(79,209,168,0.18),transparent)]"
      />
      <div className="container-page relative">
        <SectionHeading align="center" eyebrow={t("packages.eyebrow")} title={t("packages.title")} />

        {/* Service tabs */}
        <div className="-mx-5 mt-10 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
          <div role="tablist" aria-label={t("packages.eyebrow")} className="mx-auto flex w-max gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
            {packageServices.map((slug) => {
              const Icon = services.find((s) => s.slug === slug)!.icon;
              const selected = slug === active;
              return (
                <button
                  key={slug}
                  type="button"
                  role="tab"
                  id={`tab-${slug}`}
                  aria-selected={selected}
                  aria-controls="packages-panel"
                  onClick={() => pick(slug)}
                  className={cn(
                    "relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                    selected ? "text-accent-foreground" : "text-white/70 hover:text-white"
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="packages-tab"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <Icon className="relative size-4" />
                  <span className="relative">{serviceTitle(slug)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id="packages-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            {/* Service intro */}
            <div className="flex flex-col items-start justify-between gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent">
                  <ActiveIcon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-medium md:text-3xl">{serviceTitle(active)}</h3>
                  <p className="mt-2 max-w-xl text-ink-muted">{t(`packages.${active}.pitch`)}</p>
                </div>
              </div>
              <Link
                href={`/services/${active}`}
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent"
              >
                {t("packages.learnMore")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch">
              {servicePackages[active].map((pkg, i) => (
                <PackageCard key={pkg.id} service={active} pkg={pkg} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function PackageCard({ service, pkg, index }: { service: PackageService; pkg: ServicePackage; index: number }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const Icon = pkg.icon;
  const key = packageKey(service, pkg.id);
  const features = Array.from({ length: pkg.featureCount }, (_, n) => t(`${key}.feature${n + 1}`));

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.08 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={cn("relative rounded-3xl p-px", pkg.featured ? "lg:-my-4" : "")}
    >
      {/* Recommended plan: a light sweeps around its border. */}
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

        <h4 className="mt-6 text-2xl font-medium">{t(`${key}.name`)}</h4>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t(`${key}.tagline`)}</p>

        <p className="mt-6 border-t border-white/10 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          {t(`${key}.bestFor`)}
        </p>

        <ul className="mt-4 flex-1 space-y-3">
          {features.map((feature, n) => (
            <motion.li
              key={feature}
              initial={reduceMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 + n * 0.05, duration: 0.4 }}
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
          <Link href={quoteHref({ service, pkg: pkg.id })}>
            {t("cta.contactUs")}
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
