"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/language-context";

// Phone mockup that plays an agent conversation message by message.
// Scripts live in the dictionaries under `<base>.business`, `.m1`, `.m2`,
// `.m3`, `.action`, `.m4` (customer, agent, customer, action, agent).
// Change `key` on the component to start another script.

const script = [
  { kind: "user", key: "m1" },
  { kind: "agent", key: "m2" },
  { kind: "user", key: "m3" },
  { kind: "tool", key: "action" },
  { kind: "agent", key: "m4" },
] as const;

const STEP_MS = 1300;
const HOLD_MS = 3500;

export function ChatPhone({
  base,
  channel,
  icon: Icon,
  active = true,
  onDone,
  className,
}: {
  /** Dictionary prefix, e.g. "aiPage.ind.clinic". */
  base: string;
  channel: string;
  icon: LucideIcon;
  /** Only plays while true (e.g. while on screen). */
  active?: boolean;
  /** Called after the finished conversation has been shown for a moment.
   *  Without it, the conversation replays from the start. */
  onDone?: () => void;
  className?: string;
}) {
  const { t, tx } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(0);
  const onDoneRef = React.useRef(onDone);
  React.useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  React.useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      const id = window.setTimeout(() => setVisible(script.length), 0);
      return () => window.clearTimeout(id);
    }
    if (visible < script.length) {
      const id = window.setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 600 : STEP_MS);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      if (onDoneRef.current) onDoneRef.current();
      else setVisible(0);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [active, reduceMotion, visible]);

  const typing = visible > 0 && visible < script.length && script[visible].kind !== "user";

  return (
    <div
      className={cn("overflow-hidden rounded-[2.75rem] border-[6px] border-ink bg-ink shadow-2xl", className)}
      role="img"
      aria-label={`${t(`${base}.business`)} – ${tx(channel)}`}
    >
      <div className="relative flex items-center gap-3 bg-[#0f1a16] px-4 pb-3 pt-7">
        <span className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
        <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-foreground">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{t(`${base}.business`)}</p>
          <p className="flex items-center gap-1.5 text-[10px] text-white/55">
            <span className="size-1.5 rounded-full bg-accent" />
            {tx(channel)} · {t("aiPage.ind.aiAgent")}
          </p>
        </div>
      </div>

      <div className="flex h-[26rem] flex-col justify-end gap-2 bg-[#0b0f0e] bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] p-3 [background-size:14px_14px]">
        <AnimatePresence initial={false}>
          {script.slice(0, visible).map((step) => (
            <motion.div
              key={step.key}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn("flex", step.kind === "user" ? "justify-end" : "justify-start")}
            >
              {step.kind === "tool" ? (
                <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] text-accent">
                  <Check className="size-3" />
                  {t(`${base}.${step.key}`)}
                </span>
              ) : (
                <span
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug",
                    step.kind === "user"
                      ? "rounded-br-md bg-[#1f6f57] text-white"
                      : "rounded-bl-md bg-white/[0.09] text-white/90"
                  )}
                >
                  {t(`${base}.${step.key}`)}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {typing ? (
          <div className="flex gap-1 pl-2">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="size-1.5 rounded-full bg-white/50"
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
