"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { solutions } from "@/content/solutions";

export function SolutionsExperience() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const reduceMotion = useReducedMotion();
  const active = solutions[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section data-header-tone="dark" className="overflow-hidden bg-ink py-16 text-ink-foreground md:py-24">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <Sparkles className="size-3.5" /> Find your path
            </p>
            <h2 className="mt-5 max-w-lg text-balance font-display text-3xl font-medium leading-tight md:text-5xl">
              Start with the problem. Follow the signal to the solution.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
              Select the challenge closest to your business. The right product is never a template—it is a system designed around the work that matters.
            </p>

            <div className="mt-8 grid gap-2">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                const selected = index === activeIndex;
                return (
                  <button
                    key={solution.slug}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${selected ? "border-accent bg-white/10 text-white" : "border-white/10 text-ink-muted hover:border-white/30 hover:bg-white/5 hover:text-white"}`}
                    aria-pressed={selected}
                  >
                    <span className={`grid size-8 place-items-center rounded-lg transition-colors ${selected ? "bg-accent text-white" : "bg-white/5"}`}>
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm font-medium">{solution.title}</span>
                    <span className={`ml-auto size-1.5 rounded-full transition-all ${selected ? "scale-125 bg-accent shadow-[0_0_14px_3px_rgba(47,143,114,0.75)]" : "bg-white/20"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[38rem]">
            <motion.div
              className="absolute inset-[6%] rounded-full border border-white/10"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-[20%] rounded-full border border-dashed border-white/20"
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(47,143,114,0.22),transparent_55%)]" />

            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              const angle = -90 + index * (360 / solutions.length);
              const selected = index === activeIndex;
              return (
                <button
                  key={solution.slug}
                  type="button"
                  aria-label={`Show ${solution.title}`}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`absolute left-1/2 top-1/2 z-10 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-sm transition-all duration-300 md:size-14 ${selected ? "border-accent bg-accent text-white shadow-[0_0_30px_5px_rgba(47,143,114,0.55)]" : "border-white/20 bg-ink/70 text-white/70 hover:border-white/60 hover:text-white"}`}
                  style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-min(34vw, 13rem)) rotate(${-angle}deg) scale(${selected ? 1.1 : 1})` }}
                >
                  <Icon className="size-4 md:size-5" />
                </button>
              );
            })}

            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-[25%] z-20 flex flex-col justify-between rounded-2xl border border-white/20 bg-ink/80 p-5 shadow-2xl backdrop-blur-xl md:p-7"
            >
              <div>
                <span className="grid size-10 place-items-center rounded-xl bg-accent text-white">
                  <ActiveIcon className="size-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Recommended path</p>
                <h3 className="mt-2 font-display text-lg font-medium leading-tight md:text-2xl">{active.title}</h3>
                <p className="mt-3 hidden text-sm leading-relaxed text-ink-muted sm:block">{active.shortDescription}</p>
              </div>
              <Link href={`/solutions/${active.slug}`} className="group mt-4 flex items-center gap-2 text-sm font-medium text-white">
                Explore solution <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
