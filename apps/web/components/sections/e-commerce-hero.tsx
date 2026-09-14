"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export function EcommerceHero({ overview }: { overview: string }) {
  const reduceMotion = useReducedMotion();
  return <section className="relative isolate min-h-[38rem] overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-28 md:pt-44" data-header-tone="dark"><motion.div aria-hidden="true" className="absolute -inset-8 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/images/e-commerce-hero.png')" }} animate={reduceMotion ? undefined : { scale: [1.05, 1.13, 1.05], x: [0, 15, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }} /><div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,9,17,.95)_0%,rgba(2,9,17,.7)_46%,rgba(2,9,17,.2)_100%)]" /><motion.div aria-hidden="true" className="absolute left-[28%] top-[28%] size-64 rounded-full border border-cyan-200/30" animate={reduceMotion ? undefined : { rotate: 360, scale: [.9, 1.1, .9] }} transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} /><div className="container-page relative"><motion.div initial={reduceMotion ? false : { opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .75, ease: [0.16, 1, .3, 1] }}><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.28em] text-cyan-200"><ShoppingCart className="size-3.5" /> Services / E-Commerce</p><h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-medium leading-[.96] md:text-7xl">Commerce designed to convert.</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/72">{overview}</p></motion.div></div></section>;
}
