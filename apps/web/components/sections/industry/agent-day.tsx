"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, Moon, Sun, Sunrise, Sunset } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/shared/section";
import { useTranslation } from "@/lib/i18n/language-context";

const STEP_MS = 2600;

function TimeIcon({ time, className }: { time: string; className?: string }) {
  const hour = Number(time.slice(0, 2));
  const Icon = hour < 9 ? Sunrise : hour < 17 ? Sun : hour < 20 ? Sunset : Moon;
  return <Icon className={className} />;
}

export function AgentDay({ day }: { day: { time: string; text: string }[] }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [active, setActive] = React.useState(0);

  // Walk through the day while the section is on screen.
  React.useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % day.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [inView, reduceMotion, day.length]);

  const pct = (i: number) => (day.length > 1 ? (i / (day.length - 1)) * 100 : 0);

  return (
    <Section tone="muted">
      <SectionHeading eyebrow={t("industryPage.dayEyebrow")} title={t("industryPage.dayTitle")} />

      <div ref={ref} className="mt-14">
        {/* Desktop: horizontal track with a travelling marker */}
        <div className="relative hidden md:block">
          <div className="absolute left-[10%] right-[10%] top-7 h-px bg-border" aria-hidden="true">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              animate={{ width: `${pct(active)}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute -top-[13px] grid size-7 -translate-x-1/2 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_0_24px_6px_rgba(47,143,114,0.35)]"
              animate={{ left: `${pct(active)}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Bot className="size-3.5" />
            </motion.span>
          </div>
          <ol className="grid grid-cols-5 gap-4">
            {day.map((moment, i) => {
              const on = i === active;
              const past = i < active;
              return (
                <li key={moment.time} className="flex flex-col items-center text-center">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative z-10 mt-[3.75rem] flex flex-col items-center gap-1 rounded-full px-3 py-1.5 font-mono text-sm transition-colors",
                      on ? "bg-foreground text-background" : past ? "text-accent" : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-pressed={on}
                  >
                    {moment.time}
                  </button>
                  <motion.div
                    animate={{ y: on ? -4 : 0, scale: on ? 1.03 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className={cn(
                      "mt-4 w-full rounded-2xl border p-4 text-left text-sm leading-relaxed transition-colors duration-500",
                      on ? "border-accent bg-card shadow-lg" : "border-transparent bg-transparent text-muted-foreground"
                    )}
                  >
                    <TimeIcon time={moment.time} className={cn("mb-2 size-4", on ? "text-accent" : "text-muted-foreground")} />
                    {moment.text}
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile: vertical list, current moment highlighted */}
        <ol className="space-y-3 md:hidden">
          {day.map((moment, i) => (
            <li
              key={moment.time}
              className={cn(
                "flex gap-4 rounded-2xl border p-4 text-sm leading-relaxed transition-colors duration-500",
                i === active ? "border-accent bg-card" : "border-border"
              )}
            >
              <span className={cn("font-mono", i === active ? "text-accent" : "text-muted-foreground")}>{moment.time}</span>
              <span>{moment.text}</span>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-xs text-muted-foreground">{t("industryPage.dayNote")}</p>
      </div>
    </Section>
  );
}
