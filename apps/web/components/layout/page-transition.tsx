"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-left bg-ink"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{
          duration: reduceMotion ? 0.2 : 0.85,
          delay: reduceMotion ? 0 : 0.16,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <motion.div
          className="absolute bottom-0 right-0 top-0 w-2 bg-accent shadow-[0_0_40px_12px_rgba(47,143,114,0.7)]"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.32, ease: "easeOut" }}
        />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:4rem_4rem]" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold uppercase tracking-[0.45em] text-white/60"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -12] }}
          transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: "easeInOut" }}
        >
          TECTOVAULT / Loading
        </motion.div>
      </motion.div>
      {children}
    </>
  );
}
