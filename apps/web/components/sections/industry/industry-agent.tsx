"use client";

import * as React from "react";
import Link from "@/components/i18n/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bot, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { OpenAgentButton } from "@/components/agent/agent-chat";
import { ChatPhone } from "@/components/sections/ai-agents/chat-phone";
import { agentPackages } from "@/content/agent-packages";
import type { IndustryAgent as IndustryAgentData } from "@/content/industry-agents";
import { useTranslation } from "@/lib/i18n/language-context";

export function IndustryAgent({ agent }: { agent: IndustryAgentData }) {
  const { t, locale } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [scriptIndex, setScriptIndex] = React.useState(0);
  const script = agent.scripts[scriptIndex];
  const pkg = agentPackages.find((p) => p.id === agent.package)!;
  const PkgIcon = pkg.icon;

  const next = React.useCallback(
    () => setScriptIndex((i) => (i + 1) % agent.scripts.length),
    [agent.scripts.length]
  );

  return (
    <Section tone="ink" headerTone="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_25%_50%,rgba(79,209,168,0.16),transparent)]"
      />
      <div ref={ref} className="relative grid items-center gap-14 lg:grid-cols-[auto_1fr] lg:gap-20">
        <div className="mx-auto w-full max-w-[20rem]">
          {agent.scripts.length > 1 ? (
            <div className="mb-5 flex justify-center gap-2">
              {agent.scripts.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setScriptIndex(i)}
                  aria-pressed={i === scriptIndex}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    i === scriptIndex ? "text-accent-foreground" : "text-white/60 hover:text-white"
                  )}
                >
                  {i === scriptIndex ? (
                    <motion.span
                      layoutId="industry-script-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <s.icon className="relative size-4" />
                  <span className="relative">{t(`${s.key}.name`)}</span>
                </button>
              ))}
            </div>
          ) : null}
          <AnimatePresence mode="wait">
            <motion.div
              key={script.key}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: -25, x: 30 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: 25, x: -30 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
            >
              <ChatPhone
                base={script.key}
                channel={script.channel}
                icon={script.icon}
                active={inView}
                onDone={agent.scripts.length > 1 ? next : undefined}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          <SectionHeading
            eyebrow={t("industryPage.agentEyebrow")}
            title={t("industryPage.agentTitle")}
            className="[&_p:last-child]:text-ink-muted"
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {agent.tasks.map((task, i) => (
              <motion.li
                key={task.en}
                initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/85"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-3" />
                </span>
                {task[locale]}
              </motion.li>
            ))}
          </ul>

          {/* Recommended package */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative mt-8 overflow-hidden rounded-3xl p-px"
          >
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-3xl">
              <motion.div
                className="absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(79,209,168,0.9)_60deg,transparent_120deg)]"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="relative flex flex-col items-start gap-5 rounded-[calc(1.5rem-1px)] bg-[#0d1512] p-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <PkgIcon className="size-5" />
              </span>
              <div className="min-w-0 sm:flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t("industryPage.recommended")}</p>
                <p className="mt-1 text-xl font-medium">
                  {t(`agentPackages.${pkg.id}.name`)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{agent.packageWhy[locale]}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="accent">
                  <Link href="/pricing#ai-agents">
                    {t("industryPage.seePackage")}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <OpenAgentButton prompt={t(`${script.key}.try`)}>
                    <Bot className="size-4" />
                    {t("industryPage.tryLive")}
                  </OpenAgentButton>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
