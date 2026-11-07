"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Bot,
  Camera,
  CalendarDays,
  Database,
  FileSpreadsheet,
  Mail,
  MessageCircle,
  Phone,
  ShoppingBag,
  Users,
} from "lucide-react";

import { Section, SectionHeading } from "@/components/shared/section";
import { useTranslation } from "@/lib/i18n/language-context";

const tools = [
  { key: "whatsapp", icon: MessageCircle },
  { key: "instagram", icon: Camera },
  { key: "email", icon: Mail },
  { key: "phone", icon: Phone },
  { key: "calendar", icon: CalendarDays },
  { key: "crm", icon: Users },
  { key: "shop", icon: ShoppingBag },
  { key: "erp", icon: Database },
  { key: "sheets", icon: FileSpreadsheet },
];

const CENTER = 50;
const RADIUS = 38;

// Evenly spaced around the agent, starting at the top.
const nodes = tools.map((tool, i) => {
  const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
  return { ...tool, x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
});

export function IntegrationsMap() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const animate = inView && !reduceMotion;

  return (
    <Section tone="ink" headerTone="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_70%_50%,rgba(79,209,168,0.14),transparent)]"
      />
      <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionHeading
          eyebrow={t("aiPage.int.eyebrow")}
          title={t("aiPage.int.title")}
          description={t("aiPage.int.description")}
          className="[&_p:last-child]:text-ink-muted"
        />

        {/* Desktop / tablet: radial map */}
        <div ref={ref} className="relative mx-auto hidden aspect-square w-full max-w-[34rem] sm:block">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
            <motion.circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.25"
              strokeDasharray="1 1.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: reduceMotion ? 0 : 1.4, ease: "easeInOut" }}
            />
            {nodes.map((node, i) => (
              <motion.line
                key={node.key}
                x1={CENTER}
                y1={CENTER}
                x2={node.x}
                y2={node.y}
                stroke="rgba(79,209,168,0.35)"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.4 + i * 0.08 }}
              />
            ))}
            {/* Data pulses: odd tools send to the agent, even ones receive. */}
            {animate
              ? nodes.map((node, i) => {
                  const inbound = i % 2 === 0;
                  return (
                    <motion.circle
                      key={`pulse-${node.key}`}
                      r="0.9"
                      fill="#4fd1a8"
                      style={{ filter: "drop-shadow(0 0 1.5px #4fd1a8)" }}
                      initial={{ opacity: 0 }}
                      animate={{
                        cx: inbound ? [node.x, CENTER] : [CENTER, node.x],
                        cy: inbound ? [node.y, CENTER] : [CENTER, node.y],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 1.6,
                        delay: 1.4 + i * 0.37,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })
              : null}
          </svg>

          {/* Agent */}
          <motion.div
            className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/40 bg-ink"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
          >
            {!reduceMotion ? (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-accent/50"
                animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
            ) : null}
            <div className="flex flex-col items-center gap-1">
              <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_0_40px_8px_rgba(79,209,168,0.35)]">
                <Bot className="size-5" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
                {t("aiPage.int.center")}
              </span>
            </div>
          </motion.div>

          {/* Tools */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.key}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: reduceMotion ? 0 : 0.6 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
            >
              <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-[#111715] text-accent shadow-lg">
                <node.icon className="size-5" />
              </span>
              <span className="whitespace-nowrap text-xs text-white/75">{t(`aiPage.int.tool.${node.key}`)}</span>
            </motion.div>
          ))}
        </div>

        {/* Mobile: compact grid */}
        <ul className="grid grid-cols-3 gap-3 sm:hidden">
          {tools.map(({ key, icon: Icon }, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center text-[11px] text-white/75"
            >
              <Icon className="size-5 text-accent" />
              {t(`aiPage.int.tool.${key}`)}
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
