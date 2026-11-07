"use client";

import Link from "@/components/i18n/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";

// Animated hero for the service pages (AI Agents has its own). Pages with a
// photo get a slow Ken Burns drift and a light sweep; pages without one get
// an animated "workflow" of nodes passing data along connected lines.

const heroes: Record<string, { image?: string; titleKey: string }> = {
  "business-automation": { titleKey: "serviceHero.business-automation" },
  "custom-software": { image: "/images/web-applications-hero.png", titleKey: "serviceHero.custom-software" },
  "web-development": { image: "/images/web-development-hero.png", titleKey: "serviceHero.web-development" },
  "maintenance-support": { image: "/images/maintenance-support-hero.png", titleKey: "serviceHero.maintenance-support" },
};

export function hasServiceHero(slug: string) {
  return slug in heroes;
}

export function ServiceHero({
  slug,
  title,
  overview,
  icon,
}: {
  slug: string;
  title: string;
  overview: string;
  icon: React.ReactNode;
}) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const hero = heroes[slug];

  return (
    <section
      data-header-tone="dark"
      className="relative isolate min-h-[38rem] overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-28 md:pt-44"
    >
      {hero?.image ? (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute -inset-8 bg-cover bg-center opacity-75"
            style={{ backgroundImage: `url('${hero.image}')` }}
            animate={reduceMotion ? undefined : { scale: [1.04, 1.12, 1.04], x: [0, -14, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,12,.96)_0%,rgba(8,9,12,.78)_45%,rgba(8,9,12,.25)_100%)]"
          />
          <motion.div
            aria-hidden="true"
            className="absolute -left-1/4 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-accent/25 to-transparent blur-2xl"
            animate={reduceMotion ? undefined : { x: ["-30%", "430%"] }}
            transition={{ duration: 6, repeat: Infinity, repeatDelay: 3, ease: [0.16, 1, 0.3, 1] }}
          />
        </>
      ) : (
        <WorkflowBackdrop reduceMotion={Boolean(reduceMotion)} />
      )}

      <div className="container-page relative">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent [&_svg]:size-3.5">
            {icon} {t("service.eyebrow")} / {title}
          </p>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[0.98] md:text-7xl">
            {hero ? t(hero.titleKey) : title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{overview}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <Link href="/request-quote">
                {t("cta.startProject")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Nodes on a grid with data pulses travelling between them. */
function WorkflowBackdrop({ reduceMotion }: { reduceMotion: boolean }) {
  const rows = [22, 50, 78];
  const nodes = [52, 67, 82, 95];
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:3.5rem_3.5rem]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(79,209,168,0.2),transparent_28rem)]" />
      <svg className="absolute inset-0 hidden size-full md:block" viewBox="0 0 100 100" preserveAspectRatio="none">
        {rows.map((y) => (
          <line key={y} x1="48" y1={y} x2="98" y2={y} stroke="rgba(79,209,168,0.25)" strokeWidth="0.15" />
        ))}
        {nodes.slice(0, -1).map((x, i) => (
          <line key={x} x1={x + 7} y1={rows[i % 3]} x2={x + 7} y2={rows[(i + 1) % 3]} stroke="rgba(79,209,168,0.18)" strokeWidth="0.15" />
        ))}
      </svg>
      <div className="absolute inset-0 hidden md:block">
        {rows.flatMap((y, r) =>
          nodes.map((x) => (
            <span
              key={`${r}-${x}`}
              className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-md border border-accent/50 bg-ink"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          ))
        )}
        {!reduceMotion
          ? rows.map((y, r) => (
              <motion.span
                key={`pulse-${y}`}
                className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_4px_rgba(79,209,168,0.6)]"
                style={{ top: `${y}%` }}
                animate={{ left: ["48%", "98%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: r * 1.1, ease: "easeInOut" }}
              />
            ))
          : null}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,12,.97)_0%,rgba(8,9,12,.85)_40%,rgba(8,9,12,.1)_100%)]" />
    </div>
  );
}
