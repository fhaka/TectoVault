"use client";

import * as React from "react";
import Link from "@/components/i18n/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  BedDouble,
  Check,
  Home,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { OpenAgentButton } from "@/components/agent/agent-chat";
import { useTranslation } from "@/lib/i18n/language-context";

const industries = [
  { id: "restaurant", icon: UtensilsCrossed, channel: "WhatsApp" },
  { id: "clinic", icon: Stethoscope, channel: "Website" },
  { id: "shop", icon: ShoppingBag, channel: "Instagram" },
  { id: "realestate", icon: Home, channel: "WhatsApp" },
  { id: "hotel", icon: BedDouble, channel: "Website" },
] as const;

type IndustryId = (typeof industries)[number]["id"];

// Every script follows the same beat: customer, agent, customer, action, agent.
const script = [
  { kind: "user", key: "m1" },
  { kind: "agent", key: "m2" },
  { kind: "user", key: "m3" },
  { kind: "tool", key: "action" },
  { kind: "agent", key: "m4" },
] as const;

const STEP_MS = 1300;
const HOLD_MS = 3500;

export function IndustryShowcase() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = React.useState<IndustryId>("restaurant");
  const [paused, setPaused] = React.useState(false);
  const [visible, setVisible] = React.useState(0);

  // Play the conversation message by message, then move to the next
  // industry (until the visitor picks one themselves).
  React.useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      const id = window.setTimeout(() => setVisible(script.length), 0);
      return () => window.clearTimeout(id);
    }
    if (visible < script.length) {
      const id = window.setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 600 : STEP_MS);
      return () => window.clearTimeout(id);
    }
    if (paused) return;
    const id = window.setTimeout(() => {
      const i = industries.findIndex((x) => x.id === active);
      setActive(industries[(i + 1) % industries.length].id);
      setVisible(0);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [active, inView, paused, reduceMotion, visible]);

  const pick = (id: IndustryId) => {
    setPaused(true);
    if (id === active) return;
    setActive(id);
    setVisible(0);
  };

  const industry = industries.find((x) => x.id === active)!;
  const base = `aiPage.ind.${active}`;

  return (
    <Section id="industries" className="relative overflow-hidden">
      <div ref={ref} className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={t("aiPage.ind.eyebrow")}
            title={t("aiPage.ind.title")}
            description={t("aiPage.ind.description")}
          />

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={t("aiPage.ind.eyebrow")}>
            {industries.map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={id === active}
                onClick={() => pick(id)}
                className={cn(
                  "relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  id === active
                    ? "border-transparent text-accent-foreground"
                    : "border-border text-foreground/80 hover:border-foreground/30"
                )}
              >
                {id === active ? (
                  <motion.span
                    layoutId="industry-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                ) : null}
                <Icon className="relative size-4" />
                <span className="relative">{t(`aiPage.ind.${id}.name`)}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t("aiPage.ind.handles")}
              </p>
              <ul className="mt-4 space-y-3">
                {["h1", "h2", "h3"].map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      <Check className="size-3" />
                    </span>
                    {t(`${base}.${h}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <OpenAgentButton prompt={t(`${base}.try`)}>
                <Bot className="size-4" />
                {t("aiPage.ind.tryLive")}
              </OpenAgentButton>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/request-quote">
                {t("aiPage.ind.getAgent")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="relative mx-auto w-full max-w-[20rem]">
          <div
            aria-hidden="true"
            className="absolute -inset-10 -z-10 rounded-full bg-accent/15 blur-3xl"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: -25, x: 40 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: 25, x: -40 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
              className="overflow-hidden rounded-[2.75rem] border-[6px] border-ink bg-ink shadow-2xl"
              role="img"
              aria-label={`${t(`${base}.business`)} – ${industry.channel}`}
            >
              <div className="relative flex items-center gap-3 bg-[#0f1a16] px-4 pb-3 pt-7">
                <span className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
                <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-foreground">
                  <industry.icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{t(`${base}.business`)}</p>
                  <p className="flex items-center gap-1.5 text-[10px] text-white/55">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {industry.channel} · {t("aiPage.ind.aiAgent")}
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
                {visible > 0 && visible < script.length && script[visible].kind !== "user" ? (
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
