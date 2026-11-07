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
import { ChatPhone } from "@/components/sections/ai-agents/chat-phone";

const industries = [
  { id: "restaurant", icon: UtensilsCrossed, channel: "WhatsApp" },
  { id: "clinic", icon: Stethoscope, channel: "Website" },
  { id: "shop", icon: ShoppingBag, channel: "Instagram" },
  { id: "realestate", icon: Home, channel: "WhatsApp" },
  { id: "hotel", icon: BedDouble, channel: "Website" },
] as const;

type IndustryId = (typeof industries)[number]["id"];

export function IndustryShowcase() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = React.useState<IndustryId>("restaurant");
  const [paused, setPaused] = React.useState(false);
  const next = React.useCallback(() => {
    if (paused) return;
    setActive((current) => {
      const i = industries.findIndex((x) => x.id === current);
      return industries[(i + 1) % industries.length].id;
    });
  }, [paused]);

  const pick = (id: IndustryId) => {
    setPaused(true);
    setActive(id);
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
            >
              <ChatPhone base={base} channel={industry.channel} icon={industry.icon} active={inView} onDone={next} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
