"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AgentConsole } from "@/components/sections/agent-console";
import { OpenAgentButton } from "@/components/agent/agent-chat";
import { useTranslation } from "@/lib/i18n/language-context";

export function AiAgentsHero({ overview }: { overview: string }) {
  const reduceMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <section
      data-header-tone="dark"
      className="relative isolate overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-28 md:pt-44"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:3.5rem_3.5rem]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(79,209,168,0.28),transparent_26rem)]"
        animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -38 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            <Bot className="size-3.5" /> {t("aiAgentsHero.eyebrow")}
          </p>
          <h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[0.98] md:text-6xl xl:text-7xl">
            {t("aiAgentsHero.title")}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">{overview}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg" variant="accent">
              <Link href="/request-quote">
                {t("cta.getAgent")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <OpenAgentButton>
                <Bot className="size-4" />
                {t("agentChat.tryLive")}
              </OpenAgentButton>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <AgentConsole />
        </motion.div>
      </div>
    </section>
  );
}
