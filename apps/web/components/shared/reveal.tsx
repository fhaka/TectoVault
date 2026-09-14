"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span";
}

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      /* Huge top margin: anything the user has already scrolled past still
         counts as in view, so fast jumps (End key, anchor links) can't leave
         sections stuck invisible above the viewport. */
      viewport={{ once: true, margin: "10000px 0px -80px 0px" }}
      custom={delay}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
