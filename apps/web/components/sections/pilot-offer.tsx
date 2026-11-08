"use client";

import * as React from "react";
import Link from "@/components/i18n/link";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { ArrowUpRight, ClipboardCheck, Radio, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";
import { pilotOffer } from "@/content/pilot";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";
import { quoteHref } from "@/lib/quote-link";

const steps = [
  { key: "setup", icon: Wrench, until: 7 },
  { key: "live", icon: Radio, until: 29 },
  { key: "review", icon: ClipboardCheck, until: 30 },
] as const;

// Pilot programme for the first businesses: a dark card with a day counter
// that runs from 1 to 30 across the three stages when it scrolls into view.
export function PilotOffer({ className }: { className?: string }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [day, setDay] = React.useState(reduceMotion ? pilotOffer.days : 1);

  React.useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(1, pilotOffer.days, {
      duration: 3.2,
      ease: "easeInOut",
      onUpdate: (v) => setDay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion]);

  if (!pilotOffer.enabled) return null;
  const progress = (day - 1) / (pilotOffer.days - 1);

  return (
    <section id="pilot" className={cn("py-16 sm:py-20 md:py-24", className)}>
      <div className="container-page">
        <div
          ref={ref}
          data-header-tone="dark"
          className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-ink p-6 text-ink-foreground sm:p-10 md:p-14"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(79,209,168,0.22),transparent_26rem)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:3rem_3rem]"
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{t("pilot.eyebrow")}</p>
                <span className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
                  <span className="flex gap-1" aria-hidden="true">
                    {Array.from({ length: pilotOffer.places }, (_, i) => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-accent"
                        animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }}
                      />
                    ))}
                  </span>
                  {t("pilot.badge").replace("{n}", String(pilotOffer.places))}
                </span>
              </div>
              <h2 className="mt-5 text-balance font-display text-3xl font-medium leading-tight md:text-5xl">
                {t("pilot.title").replace("{days}", String(pilotOffer.days))}
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-ink-muted">
                {t("pilot.body").replace("{n}", String(pilotOffer.places)).replace("{days}", String(pilotOffer.days))}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" variant="accent">
                  <Link href={quoteHref({ type: "ai-agents", offer: "pilot" })}>
                    {t("pilot.cta")}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <p className="max-w-xs text-xs leading-relaxed text-white/50">{t("pilot.terms")}</p>
              </div>
            </div>

            {/* Day counter and the three stages */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
              <div className="flex items-end justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t("pilot.dayLabel")}</p>
                <p className="font-display text-4xl font-semibold tabular-nums text-white sm:text-5xl" aria-hidden="true">
                  {day}
                  <span className="text-lg text-white/40 sm:text-xl"> / {pilotOffer.days}</span>
                </p>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-[#4fd1a8]"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
              <ol className="mt-6 space-y-3">
                {steps.map(({ key, icon: Icon, until }, i) => {
                  const startDay = i === 0 ? 1 : steps[i - 1].until + 1;
                  const active = day >= startDay && day <= until;
                  const done = day > until;
                  return (
                    <li
                      key={key}
                      className={cn(
                        "flex items-start gap-4 rounded-2xl border p-4 transition-colors duration-500",
                        active || done ? "border-accent/40 bg-accent/[0.07]" : "border-white/10 bg-transparent"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-500",
                          active || done ? "bg-accent text-accent-foreground" : "bg-white/5 text-white/50"
                        )}
                      >
                        <Icon className="size-[18px]" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{t(`pilot.${key}.when`)}</p>
                        <p className="mt-1 font-medium text-white">{t(`pilot.${key}.title`)}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{t(`pilot.${key}.body`)}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
