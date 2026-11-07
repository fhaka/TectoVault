"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { BookOpen, FlaskConical, Plug, Rocket, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/shared/section";
import { useTranslation } from "@/lib/i18n/language-context";

const steps = [
  { key: "discover", icon: Search },
  { key: "train", icon: BookOpen },
  { key: "connect", icon: Plug },
  { key: "test", icon: FlaskConical },
  { key: "launch", icon: Rocket },
];

export function LaunchTimeline() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLOListElement>(null);
  // The line fills as the list scrolls through the middle of the screen.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow={t("aiPage.launch.eyebrow")}
            title={t("aiPage.launch.title")}
            description={t("aiPage.launch.description")}
          />
        </div>

        <ol ref={ref} className="relative space-y-10 pl-16">
          <span aria-hidden="true" className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-border" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-6 left-[1.4rem] top-6 w-px origin-top bg-accent"
            style={{ scaleY: reduceMotion ? 1 : fill }}
          />
          {steps.map((step, i) => (
            <Step key={step.key} index={i} icon={step.icon} title={t(`aiPage.launch.${step.key}.title`)} body={t(`aiPage.launch.${step.key}.body`)} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Step({
  index,
  icon: Icon,
  title,
  body,
}: {
  index: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLLIElement>(null);
  // Lights up once the step reaches the middle of the screen.
  const reached = useInView(ref, { margin: "0px 0px -45% 0px" });
  const active = reached || Boolean(reduceMotion);

  return (
    <motion.li
      ref={ref}
      className="relative"
      initial={reduceMotion ? false : { opacity: 0.35, x: 16 }}
      animate={active ? { opacity: 1, x: 0 } : { opacity: 0.35, x: 16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className={cn(
          "absolute -left-16 top-0 grid size-11 place-items-center rounded-2xl border transition-colors duration-500",
          active ? "border-accent bg-accent text-accent-foreground shadow-[0_0_24px_4px_rgba(47,143,114,0.3)]" : "border-border bg-card text-muted-foreground"
        )}
      >
        <Icon className="size-5" />
      </span>
      <p className="font-mono text-xs text-muted-foreground">0{index + 1}</p>
      <h3 className="mt-1 text-xl font-medium">{title}</h3>
      <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground">{body}</p>
    </motion.li>
  );
}
