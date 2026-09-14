"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LayoutGrid } from "lucide-react";

export function WebApplicationsHero({ overview }: { overview: string }) {
  const reduceMotion = useReducedMotion();
  return <section className="relative isolate min-h-[38rem] overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-28 md:pt-44" data-header-tone="dark"><motion.div aria-hidden="true" className="absolute -inset-8 bg-cover bg-center opacity-75" style={{ backgroundImage: "url('/images/web-applications-hero.png')" }} animate={reduceMotion ? undefined : { scale: [1.04, 1.12, 1.04], x: [0, 16, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} /><div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,8,12,.92)_0%,rgba(28,8,12,.7)_45%,rgba(28,8,12,.18)_100%)]" /><motion.div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_62%_45%,rgba(255,125,20,.38),transparent_20rem)]" animate={reduceMotion ? undefined : { opacity: [.3, .8, .3], scale: [.9, 1.1, .9] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} /><div className="container-page relative"><motion.div initial={reduceMotion ? false : { opacity: 0, x: -38 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }}><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.28em] text-orange-300"><LayoutGrid className="size-3.5" /> Services / Web applications</p><h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[.96] md:text-7xl">Web applications that make work flow.</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{overview}</p></motion.div></div></section>;
}
