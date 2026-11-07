"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Ear, Brain, Zap, CheckCircle2, Clock, Languages, UserRound, Plug } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { useTranslation } from "@/lib/i18n/language-context";

const stages = [
  { key: "listen", icon: Ear },
  { key: "understand", icon: Brain },
  { key: "act", icon: Zap },
  { key: "resolve", icon: CheckCircle2 },
];

const promises = [
  { key: "always", icon: Clock },
  { key: "languages", icon: Languages },
  { key: "handoff", icon: UserRound },
  { key: "tools", icon: Plug },
];

const CYCLE = 6;

export function HomeAgentFlow() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const animate = inView && !reduceMotion;

  return (
    <Section>
      <SectionHeading
        eyebrow={t("flow.eyebrow")}
        title={t("flow.title")}
        description={t("flow.description")}
      />

      <div ref={ref} className="relative mt-16">
        {/* Track with a signal pulse travelling across every stage. */}
        <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-border md:block">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : undefined}
            transition={{ duration: reduceMotion ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {animate ? (
            <motion.span
              className="absolute -top-[5px] size-[11px] rounded-full bg-accent shadow-[0_0_18px_6px_rgba(47,143,114,0.55)]"
              animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: CYCLE / 2, repeat: Infinity, repeatDelay: CYCLE / 2, ease: "easeInOut", delay: 1.6 }}
            />
          ) : null}
        </div>

        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {stages.map(({ key, icon: Icon }, i) => (
            <li key={key} className="relative flex flex-col items-start md:items-center md:text-center">
              <motion.span
                className="relative z-10 grid size-16 place-items-center rounded-2xl border border-border bg-card text-foreground shadow-sm"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ delay: reduceMotion ? 0 : 0.2 + i * 0.35, type: "spring", stiffness: 260, damping: 18 }}
              >
                <Icon className="size-6 text-accent" />
                {/* Each stage lights up as the pulse passes it. */}
                {animate ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl border-2 border-accent"
                    animate={{ opacity: [0, 1, 0], scale: [1, 1.12, 1.2] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      repeatDelay: CYCLE - 0.9,
                      delay: 1.6 + (i / (stages.length - 1)) * (CYCLE / 2) - 0.3,
                    }}
                  />
                ) : null}
              </motion.span>
              <span className="mt-5 font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-1 text-lg font-medium">{t(`flow.${key}.title`)}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {t(`flow.${key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {promises.map(({ key, icon: Icon }, i) => (
          <Reveal key={key} delay={i * 0.06} className="h-full">
            <div className="flex h-full flex-col gap-3 bg-card p-6">
              <Icon className="size-5 text-accent" />
              <p className="font-display text-xl font-semibold">{t(`flow.promise.${key}.title`)}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(`flow.promise.${key}.body`)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
