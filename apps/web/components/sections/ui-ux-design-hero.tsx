"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Palette } from "lucide-react";

export function UiUxDesignHero({ overview }: { overview: string }) {
  const reduceMotion = useReducedMotion();
  return <section className="relative isolate min-h-[38rem] overflow-hidden bg-[#07142d] pb-20 pt-36 text-white md:pb-28 md:pt-44" data-header-tone="dark"><motion.div aria-hidden="true" className="absolute -inset-8 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/images/ui-ux-design-hero.png')" }} animate={reduceMotion ? undefined : { scale: [1.04, 1.1, 1.04], y: [0, 12, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} /><div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,12,36,.95)_0%,rgba(5,12,36,.65)_46%,rgba(5,12,36,.18)_100%)]" /><motion.div aria-hidden="true" className="absolute left-[43%] top-[21%] h-56 w-44 rounded-[2rem] border border-white/25" animate={reduceMotion ? undefined : { y: [-10, 16, -10], rotate: [-2, 2, -2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} /><div className="container-page relative"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, .3, 1] }}><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.28em] text-blue-200"><Palette className="size-3.5" /> Services / UI &amp; UX design</p><h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[.96] md:text-7xl">Interfaces that make sense at first touch.</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{overview}</p></motion.div></div></section>;
}
