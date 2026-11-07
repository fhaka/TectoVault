"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/shared/section";
import { useTranslation } from "@/lib/i18n/language-context";

export function BeforeAfter({ problems, fixes }: { problems: string[]; fixes: string[] }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const [withAgent, setWithAgent] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  // Flip once on its own when it comes into view, to show what it does.
  React.useEffect(() => {
    if (!inView || touched) return;
    const id = window.setTimeout(() => setWithAgent(true), reduceMotion ? 0 : 1600);
    return () => window.clearTimeout(id);
  }, [inView, touched, reduceMotion]);

  const toggle = (value: boolean) => {
    setTouched(true);
    setWithAgent(value);
  };

  return (
    <Section>
      <div ref={ref} className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          eyebrow={t("industryPage.problemsEyebrow")}
          title={t("industryPage.problemsTitle")}
          description={t("industryPage.problemsDescription")}
        />
        <div role="group" className="relative flex rounded-full border border-border bg-muted p-1 text-sm font-medium">
          {[false, true].map((value) => (
            <button
              key={String(value)}
              type="button"
              aria-pressed={withAgent === value}
              onClick={() => toggle(value)}
              className={cn(
                "relative z-10 rounded-full px-4 py-2 transition-colors",
                withAgent === value ? (value ? "text-accent-foreground" : "text-background") : "text-muted-foreground"
              )}
            >
              {withAgent === value ? (
                <motion.span
                  layoutId="before-after-pill"
                  className={cn("absolute inset-0 -z-10 rounded-full", value ? "bg-accent" : "bg-foreground")}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              ) : null}
              {value ? t("industryPage.after") : t("industryPage.before")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {problems.map((problem, i) => (
          <motion.div
            key={problem}
            layout
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={cn(
              "relative min-h-52 overflow-hidden rounded-3xl border p-7 transition-colors duration-500",
              withAgent ? "border-accent/40 bg-accent/5" : "border-border bg-card"
            )}
          >
            <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={withAgent ? "after" : "before"}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: -70, y: 10 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: 70, y: -10 }}
                transition={{ duration: 0.4, delay: withAgent ? i * 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 800 }}
                className="mt-4"
              >
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-full",
                    withAgent ? "bg-accent text-accent-foreground" : "bg-red-500/10 text-red-500"
                  )}
                >
                  {withAgent ? <Check className="size-4" /> : <X className="size-4" />}
                </span>
                <p className={cn("mt-4 leading-relaxed", withAgent ? "text-foreground" : "text-muted-foreground")}>
                  {withAgent ? fixes[i] : problem}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
