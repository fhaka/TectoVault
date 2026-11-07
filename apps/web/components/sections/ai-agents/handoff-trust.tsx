"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Bell, Bot, History, Loader2, ShieldCheck, SlidersHorizontal, User, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { useTranslation } from "@/lib/i18n/language-context";

// Scene beats: customer asks -> agent recognises its limit -> handoff chip ->
// staff notification slides in. Loops while on screen.
const BEATS = [700, 1500, 1300, 1200, 4200];

const points = [
  { key: "handoff", icon: ShieldCheck },
  { key: "rules", icon: SlidersHorizontal },
  { key: "review", icon: History },
];

export function HandoffTrust() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [beat, setBeat] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      const id = window.setTimeout(() => setBeat(4), 0);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setBeat((b) => (b + 1) % (BEATS.length + 1)), BEATS[beat] ?? 600);
    return () => window.clearTimeout(id);
  }, [beat, inView, reduceMotion]);

  return (
    <Section tone="muted">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow={t("aiPage.handoff.eyebrow")}
            title={t("aiPage.handoff.title")}
            description={t("aiPage.handoff.description")}
          />
          <ul className="mt-10 space-y-6">
            {points.map(({ key, icon: Icon }, i) => (
              <Reveal key={key} delay={i * 0.08}>
                <li className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-card text-accent shadow-sm ring-1 ring-border">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-medium">{t(`aiPage.handoff.${key}.title`)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`aiPage.handoff.${key}.body`)}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Scene */}
        <div ref={ref} className="relative min-h-[27rem]" role="img" aria-label={t("aiPage.handoff.sceneLabel")}>
          <div className="absolute inset-y-0 left-0 right-10 flex flex-col justify-start gap-3 rounded-3xl bg-ink p-5 pt-6 text-white shadow-xl sm:right-16">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 text-sm">
              <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-accent">
                <Bot className="size-4" />
              </span>
              <span className="font-medium">{t("aiPage.handoff.chatTitle")}</span>
              <span className="ml-auto rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/55">
                WhatsApp
              </span>
            </div>

            <AnimatePresence>
              {beat >= 1 ? (
                <Line key="q" side="right" icon={<User className="size-3.5 opacity-60" />}>
                  {t("aiPage.handoff.customer")}
                </Line>
              ) : null}
              {beat >= 2 ? (
                <Line key="a" side="left" icon={<Bot className="size-3.5 opacity-70" />} accent>
                  {t("aiPage.handoff.agent")}
                </Line>
              ) : null}
              {beat >= 3 ? (
                <motion.div
                  key="chip"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[11px] text-accent"
                >
                  {beat === 3 && !reduceMotion ? <Loader2 className="size-3.5 animate-spin" /> : <UserRound className="size-3.5" />}
                  {t("aiPage.handoff.chip")}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Staff phone notification */}
          <AnimatePresence>
            {beat >= 4 ? (
              <motion.div
                key="notify"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 60, y: 20, rotate: 4 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="absolute bottom-6 right-0 w-[min(19rem,85%)] rounded-2xl border border-border bg-card p-4 shadow-2xl"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <motion.span
                    className="grid size-6 place-items-center rounded-md bg-accent text-accent-foreground"
                    animate={reduceMotion ? undefined : { rotate: [0, -14, 12, -8, 0] }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    <Bell className="size-3.5" />
                  </motion.span>
                  {t("aiPage.handoff.notifyApp")}
                  <span className="ml-auto">{t("aiPage.handoff.notifyTime")}</span>
                </div>
                <p className="mt-3 text-sm font-semibold">{t("aiPage.handoff.notifyTitle")}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("aiPage.handoff.notifyBody")}</p>
                <span className="mt-3 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  {t("aiPage.handoff.notifyAction")}
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function Line({
  side,
  icon,
  accent,
  children,
}: {
  side: "left" | "right";
  icon: React.ReactNode;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex", side === "right" ? "justify-end" : "justify-start")}
    >
      <span
        className={cn(
          "flex max-w-[88%] items-start gap-2 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          side === "right" ? "rounded-br-md bg-white/10" : "rounded-bl-md",
          accent && "bg-accent text-accent-foreground"
        )}
      >
        <span className="mt-1 shrink-0">{icon}</span>
        <span>{children}</span>
      </span>
    </motion.div>
  );
}
