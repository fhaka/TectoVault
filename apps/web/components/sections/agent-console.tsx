"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Check, Loader2, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/language-context";

// A scripted, looping "live" agent conversation. Each step reveals after the
// previous one, then the whole script resets — so visitors watch an agent
// understand a request, call real business tools and resolve it, instead of
// reading a sentence that claims it can.
type Step =
  | { kind: "user"; key: string }
  | { kind: "agent"; key: string }
  | { kind: "tool"; key: string };

const scripts: Step[][] = [
  [
    { kind: "user", key: "console.s1.user" },
    { kind: "tool", key: "console.s1.tool1" },
    { kind: "tool", key: "console.s1.tool2" },
    { kind: "agent", key: "console.s1.agent" },
  ],
  [
    { kind: "user", key: "console.s2.user" },
    { kind: "tool", key: "console.s2.tool1" },
    { kind: "tool", key: "console.s2.tool2" },
    { kind: "agent", key: "console.s2.agent" },
  ],
  [
    { kind: "user", key: "console.s3.user" },
    { kind: "tool", key: "console.s3.tool1" },
    { kind: "agent", key: "console.s3.agent" },
  ],
];

const STEP_MS = 1500;
const HOLD_MS = 3200;

export function AgentConsole({
  className,
  active = true,
}: {
  className?: string;
  /** Hold the animation until the surrounding section is ready. */
  active?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const { t } = useTranslation();
  const [scriptIndex, setScriptIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(0);
  const script = scripts[scriptIndex];

  React.useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      const id = window.setTimeout(() => setVisible(script.length), 0);
      return () => window.clearTimeout(id);
    }
    if (visible < script.length) {
      const id = window.setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 500 : STEP_MS);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setVisible(0);
      setScriptIndex((i) => (i + 1) % scripts.length);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [active, visible, script.length, reduceMotion]);

  const nextStep = script[visible];
  const thinking = active && !reduceMotion && visible > 0 && nextStep && nextStep.kind !== "user";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-white/15 bg-ink/70 text-left text-white shadow-[0_40px_120px_-30px_rgba(79,209,168,0.45)] backdrop-blur-xl",
        className
      )}
      aria-label={t("console.label")}
      role="img"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="relative grid size-9 place-items-center rounded-full bg-accent/15 text-accent">
            <Bot className="size-[18px]" />
            <motion.span
              className="absolute inset-0 rounded-full border border-accent/60"
              animate={reduceMotion ? undefined : { scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          </span>
          <div>
            <p className="text-sm font-medium">{t("console.agentName")}</p>
            <p className="flex items-center gap-1.5 text-[11px] text-white/55">
              <span className="size-1.5 rounded-full bg-accent" />
              {t("console.status")}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
          {t(`console.s${scriptIndex + 1}.channel`)}
        </span>
      </div>

      <div className="flex h-[19rem] flex-col justify-end gap-2.5 overflow-hidden px-5 py-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {script.slice(0, visible).map((step, i) => (
            <motion.div
              key={`${scriptIndex}-${i}`}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "flex",
                step.kind === "user" ? "justify-end" : "justify-start"
              )}
            >
              {step.kind === "tool" ? (
                <ToolChip label={t(step.key)} />
              ) : (
                <div
                  className={cn(
                    "flex max-w-[85%] items-start gap-2 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    step.kind === "user"
                      ? "rounded-br-md bg-white/10 text-white"
                      : "rounded-bl-md bg-accent text-accent-foreground"
                  )}
                >
                  {step.kind === "user" ? (
                    <User className="mt-0.5 size-3.5 shrink-0 opacity-60" />
                  ) : (
                    <Bot className="mt-0.5 size-3.5 shrink-0 opacity-70" />
                  )}
                  <span>{t(step.key)}</span>
                </div>
              )}
            </motion.div>
          ))}
          {thinking ? (
            <motion.div
              key={`thinking-${scriptIndex}-${visible}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex items-center gap-1.5 pl-1"
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="size-1.5 rounded-full bg-accent"
                  animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ToolChip({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = React.useState(Boolean(reduceMotion));

  React.useEffect(() => {
    if (reduceMotion) return;
    const id = window.setTimeout(() => setDone(true), 750);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  return (
    <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 py-1.5 pl-2 pr-3 font-mono text-[11px] text-accent">
      {done ? <Check className="size-3.5" /> : <Loader2 className="size-3.5 animate-spin" />}
      {label}
    </div>
  );
}
