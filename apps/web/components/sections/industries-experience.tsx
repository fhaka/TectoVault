"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { industries } from "@/content/industries";
import { useTranslation } from "@/lib/i18n/language-context";
import { industryTranslationsSq } from "@/lib/i18n/content-sq";

const visualStyles = [
  "from-rose-500/35 via-red-500/10 to-transparent",
  "from-amber-400/35 via-orange-500/10 to-transparent",
  "from-cyan-400/35 via-blue-500/10 to-transparent",
  "from-violet-500/35 via-indigo-500/10 to-transparent",
  "from-emerald-400/35 via-teal-500/10 to-transparent",
  "from-blue-500/35 via-accent/10 to-transparent",
];

export function IndustriesExperience() {
  const [active, setActive] = React.useState(0);
  const { locale } = useTranslation();
  const trOf = (slug: string) => (locale === "sq" ? industryTranslationsSq[slug] : null);
  const reduceMotion = useReducedMotion();
  const selected = industries[active];
  const SelectedIcon = selected.icon;

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-ink-foreground md:pb-28 md:pt-44" data-header-tone="dark">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:5rem_5rem]" />
        <div className="container-page relative grid items-end gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent"><Sparkles className="size-3.5" /> Industries</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.03] md:text-6xl">Technology that understands the work behind the work.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">Choose an industry to see the operational challenges we turn into better digital systems.</p>
          </div>
          <motion.div className="relative hidden aspect-square max-w-sm justify-self-end lg:block" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }}>
            <div className="absolute inset-0 rounded-full border border-dashed border-white/20" />
            <div className="absolute inset-[22%] rounded-full border border-accent/60 shadow-[0_0_80px_15px_rgba(47,143,114,0.25)]" />
            <motion.span className="absolute left-[8%] top-1/2 size-3 rounded-full bg-accent shadow-[0_0_24px_6px_rgba(47,143,114,0.7)]" animate={reduceMotion ? undefined : { scale: [0.7, 1.5, 0.7], opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} />
            <span className="absolute right-[17%] top-[18%] size-2 rounded-full bg-white/80" />
            <span className="absolute bottom-[13%] right-[30%] size-2.5 rounded-full bg-accent/80" />
            <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-ink"><SelectedIcon className="size-7 text-accent" /></div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap gap-2">
            {industries.map((industry, index) => (
              <button key={industry.slug} type="button" onClick={() => setActive(index)} className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${active === index ? "border-accent bg-accent text-white shadow-lg shadow-accent/20" : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground"}`}>{trOf(industry.slug)?.title ?? industry.title}</button>
            ))}
          </div>

          <motion.div key={selected.slug} initial={{ opacity: 0, y: 30, clipPath: "inset(8% 0 8% 0 round 1.5rem)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0 round 1.5rem)" }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 md:p-12">
            <div className={`absolute inset-0 bg-gradient-to-br ${visualStyles[active]} opacity-70`} />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="grid size-14 place-items-center rounded-2xl bg-ink text-white shadow-xl"><SelectedIcon className="size-6" /></span>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Industry signal / 0{active + 1}</p>
                <h2 className="mt-3 font-display text-3xl font-medium md:text-5xl">{trOf(selected.slug)?.title ?? selected.title}</h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{trOf(selected.slug)?.overview ?? selected.overview}</p>
                <Link href={`/industries/${selected.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-1">Explore this industry <ArrowUpRight className="size-4" /></Link>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/75 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">What we solve</p>
                <div className="mt-5 space-y-4">
                  {selected.problems.map((problem, index) => <motion.div key={problem} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex gap-3 text-sm leading-relaxed"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />{problem}</motion.div>)}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => { const Icon = industry.icon; return <motion.button key={industry.slug} type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} whileHover={reduceMotion ? undefined : { y: -8 }} className={`group flex min-h-44 flex-col justify-between rounded-2xl border p-6 text-left transition-colors ${active === index ? "border-accent bg-accent text-white" : "border-border bg-card hover:border-accent"}`}><span className={`grid size-10 place-items-center rounded-xl ${active === index ? "bg-white/15" : "bg-muted"}`}><Icon className="size-5" /></span><span><span className="block font-medium">{trOf(industry.slug)?.title ?? industry.title}</span><span className={`mt-1 block text-sm ${active === index ? "text-white/70" : "text-muted-foreground"}`}>Explore industry systems</span></span></motion.button>; })}
          </div>
        </div>
      </section>
    </>
  );
}
