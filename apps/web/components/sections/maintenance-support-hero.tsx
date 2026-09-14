"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LifeBuoy } from "lucide-react";

export function MaintenanceSupportHero({ overview }: { overview: string }) {
  const reduceMotion = useReducedMotion();
  return <section className="relative isolate min-h-[38rem] overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-28 md:pt-44" data-header-tone="dark"><motion.div aria-hidden="true" className="absolute -inset-8 bg-cover bg-center opacity-75" style={{ backgroundImage: "url('/images/maintenance-support-hero.png')" }} animate={reduceMotion ? undefined : { scale: [1.04, 1.12, 1.04], y: [0, -12, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }} /><div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,11,24,.95)_0%,rgba(3,11,24,.72)_45%,rgba(3,11,24,.22)_100%)]" /><motion.div aria-hidden="true" className="absolute left-[42%] top-[18%] size-48 rounded-full border border-cyan-200/40" animate={reduceMotion ? undefined : { scale: [.8, 1.25, .8], opacity: [.2, .7, .2] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} /><div className="container-page relative"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, .3, 1] }}><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.28em] text-cyan-200"><LifeBuoy className="size-3.5" /> Services / Maintenance &amp; support</p><h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[.96] md:text-7xl">Support that keeps your product moving.</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{overview}</p></motion.div></div></section>;
}
