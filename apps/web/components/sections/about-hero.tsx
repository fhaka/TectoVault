"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AboutHero({ name, description }: { name: string; description: string }) {
  const reduceMotion = useReducedMotion();
  return <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-ink-foreground md:pb-28 md:pt-44" data-header-tone="dark"><div className="container-page relative"><p className="text-xs font-semibold uppercase tracking-[.28em] text-accent">About / the studio</p><motion.h1 initial={reduceMotion ? false : { opacity: 0, letterSpacing: "-.12em" }} animate={{ opacity: 1, letterSpacing: "-.045em" }} transition={{ duration: 1.05, ease: [0.16, 1, .3, 1] }} className="mt-5 max-w-4xl text-balance font-display text-5xl font-medium leading-[.98] md:text-7xl">We build with intent, not noise.</motion.h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">{description}</p><motion.div aria-hidden="true" className="mt-14 h-px origin-left bg-gradient-to-r from-accent via-white/40 to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, .3, 1] }} /><p className="mt-4 text-xs font-semibold uppercase tracking-[.22em] text-white/50">{name} / Independent digital systems</p></div></section>;
}
