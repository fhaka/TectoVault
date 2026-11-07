"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Endless strip of everything an agent can handle, right under the hero.
export function CapabilityMarquee({ items }: { items: string[] }) {
  const reduceMotion = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border bg-card py-5" aria-label={items.join(", ")}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-card to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-card to-transparent" />
      <motion.ul
        aria-hidden="true"
        className="flex w-max gap-3"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border px-4 py-2 text-sm text-foreground/80"
          >
            <Sparkles className="size-3.5 text-accent" />
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
