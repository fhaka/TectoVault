"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe } from "lucide-react";

export function WebDevelopmentHero({ overview }: { overview: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[38rem] overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-28 md:pt-44" data-header-tone="dark">
      <motion.div aria-hidden="true" className="absolute -inset-8 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/images/web-development-hero.png')" }} animate={reduceMotion ? undefined : { scale: [1.05, 1.14, 1.05], x: [0, -18, 0], y: [0, 10, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,15,.96)_0%,rgba(3,7,15,.78)_42%,rgba(3,7,15,.26)_100%)]" />
      <motion.div aria-hidden="true" className="absolute -left-1/4 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-2xl" animate={reduceMotion ? undefined : { x: ["-30%", "430%"] }} transition={{ duration: 5.8, repeat: Infinity, repeatDelay: 3, ease: [0.16, 1, 0.3, 1] }} />
      <div className="container-page relative"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.16, 1, .3, 1] }}><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.28em] text-accent"><Globe className="size-3.5" /> Services / Web development</p><h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[.96] md:text-7xl">Web development, built to perform.</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{overview}</p></motion.div></div>
      <motion.div aria-hidden="true" className="absolute bottom-8 right-8 hidden size-24 rounded-full border border-white/25 lg:block" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}><span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-[2.7rem] rounded-full bg-accent shadow-[0_0_18px_5px_rgba(54,84,255,.8)]" /></motion.div>
    </section>
  );
}
