"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cloud } from "lucide-react";

export function CloudDevopsHero({ overview }: { overview: string }) {
  const reduceMotion = useReducedMotion();
  return <section className="relative isolate min-h-[38rem] overflow-hidden bg-[#152875] pb-20 pt-36 text-white md:pb-28 md:pt-44" data-header-tone="dark"><motion.div aria-hidden="true" className="absolute -inset-8 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/images/cloud-devops-hero.png')" }} animate={reduceMotion ? undefined : { scale: [1.04, 1.11, 1.04], x: [0, -16, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} /><div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,28,91,.93)_0%,rgba(15,28,91,.61)_48%,rgba(15,28,91,.15)_100%)]" /><motion.div aria-hidden="true" className="absolute -right-12 top-1/2 size-80 -translate-y-1/2 rounded-full border border-cyan-200/30" animate={reduceMotion ? undefined : { scale: [.8, 1.25, .8], opacity: [.15, .55, .15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} /><div className="container-page relative"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, .3, 1] }}><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.28em] text-cyan-200"><Cloud className="size-3.5" /> Services / Cloud &amp; DevOps</p><h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[.96] md:text-7xl">Infrastructure that keeps pace with your product.</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{overview}</p></motion.div></div></section>;
}
