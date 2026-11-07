"use client";

import * as React from "react";
import Link from "@/components/i18n/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bot, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OpenAgentButton } from "@/components/agent/agent-chat";
import { useTranslation } from "@/lib/i18n/language-context";
import { quoteHref } from "@/lib/quote-link";

const FEED_MS = 2200;
const FEED_SHOWN = 4;

export function IndustryHero({
  icon,
  title,
  overview,
  feed,
  tryPrompt,
}: {
  icon: React.ReactNode;
  title: string;
  overview: string;
  feed: string[];
  tryPrompt: string;
}) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  // Index of the newest feed item; the list shows the latest few.
  const [head, setHead] = React.useState(0);

  React.useEffect(() => {
    if (reduceMotion || feed.length === 0) return;
    const id = window.setInterval(() => setHead((h) => h + 1), FEED_MS);
    return () => window.clearInterval(id);
  }, [feed.length, reduceMotion]);

  const items = Array.from({ length: Math.min(FEED_SHOWN, feed.length) }, (_, i) => {
    const n = head - i;
    return { n, text: feed[((n % feed.length) + feed.length) % feed.length] };
  });

  return (
    <section data-header-tone="dark" className="relative isolate overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-28 md:pt-44">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:3.5rem_3.5rem]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(79,209,168,0.25),transparent_26rem)]"
        animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{t("industryPage.eyebrow")}</p>
          <div className="relative mt-7 inline-grid size-16 place-items-center">
            {!reduceMotion ? (
              <>
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl border border-accent/50"
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl border border-accent/40"
                  animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
                />
              </>
            ) : null}
            <span className="relative grid size-16 place-items-center rounded-2xl bg-accent text-accent-foreground [&_svg]:size-7">
              {icon}
            </span>
          </div>
          <h1 className="mt-7 max-w-2xl text-balance font-display text-5xl font-medium leading-[0.98] md:text-6xl xl:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">{overview}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <Link href={quoteHref({ type: "ai-agents" })}>
                {t("industryPage.ctaAgent")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <OpenAgentButton prompt={tryPrompt}>
                <Bot className="size-4" />
                {t("industryPage.tryLive")}
              </OpenAgentButton>
            </Button>
          </div>
        </motion.div>

        {/* Live activity feed */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10 rounded-full bg-accent/15 blur-3xl"
          />
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2.5 text-sm font-medium">
                <span className="relative flex size-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative size-2.5 rounded-full bg-accent" />
                </span>
                {t("industryPage.feedTitle")}
              </div>
              <Bot className="size-4 text-accent" />
            </div>
            <ul className="relative h-[17.5rem] space-y-2.5 overflow-hidden p-4" aria-live="off">
              <AnimatePresence initial={false}>
                {items.map(({ n, text }, i) => (
                  <motion.li
                    key={n}
                    layout
                    initial={{ opacity: 0, y: -24, scale: 0.96 }}
                    animate={{ opacity: 1 - i * 0.18, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-sm"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-white/85">{text}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <p className="border-t border-white/10 px-5 py-3 text-[11px] text-white/45">{t("industryPage.feedNote")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
