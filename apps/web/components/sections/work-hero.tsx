"use client";

import { motion, useReducedMotion } from "framer-motion";

export function WorkHero({ hasPlaceholders }: { hasPlaceholders: boolean }) {
  const reduceMotion = useReducedMotion();
  return <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-ink-foreground md:pb-24 md:pt-44" data-header-tone="dark">
    <motion.div aria-hidden="true" className="absolute -right-40 top-24 h-56 w-80 -rotate-12 rounded-[2rem] border border-white/20 bg-white/[.045] sm:-right-24 sm:top-20 sm:h-80 sm:w-[32rem] sm:rounded-[3rem]" animate={reduceMotion ? undefined : { y: [0, -24, 0], rotate: [-12, -7, -12] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div aria-hidden="true" className="absolute -right-16 top-10 h-56 w-80 rotate-6 rounded-[2rem] border border-accent/50 bg-accent/10 sm:right-24 sm:top-6 sm:h-80 sm:w-[32rem] sm:rounded-[3rem]" animate={reduceMotion ? undefined : { y: [0, 28, 0], rotate: [6, 10, 6] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
    <div className="container-page relative"><p className="text-xs font-semibold uppercase tracking-[.28em] text-accent">Selected work / 2026</p><motion.h1 initial={reduceMotion ? false : { y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} className="mt-5 max-w-4xl text-balance font-display text-5xl font-medium leading-[.94] md:text-7xl">Ideas that made it into the world.</motion.h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">A selection of digital products designed and engineered from the first sketch to a real release.</p>{hasPlaceholders ? <p className="mt-7 text-sm text-white/55">Sample case studies shown below — real projects added as they launch.</p> : null}</div>
  </section>;
}
