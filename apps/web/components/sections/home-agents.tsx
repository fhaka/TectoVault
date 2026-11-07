"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Check,
  FileText,
  Globe,
  Camera,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  PhoneCall,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";
import { OpenAgentButton } from "@/components/agent/agent-chat";

const agents = [
  { id: "voice", icon: PhoneCall },
  { id: "chat", icon: MessagesSquare },
  { id: "ops", icon: Workflow },
] as const;

type AgentId = (typeof agents)[number]["id"];

const ROTATE_MS = 7000;

export function HomeAgents() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = React.useState<AgentId>("voice");
  const [paused, setPaused] = React.useState(false);

  // Auto-advance while the section is on screen, so the showcase plays like
  // an ad. Any manual pick stops the rotation and hands control to the visitor.
  React.useEffect(() => {
    if (!inView || paused || reduceMotion) return;
    const id = window.setTimeout(() => {
      const i = agents.findIndex((a) => a.id === active);
      setActive(agents[(i + 1) % agents.length].id);
    }, ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [active, inView, paused, reduceMotion]);

  return (
    <Section id="agents" tone="ink" headerTone="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_20%,rgba(79,209,168,0.16),transparent)]"
      />
      <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16" ref={ref}>
        <div>
          <SectionHeading
            eyebrow={t("agents.eyebrow")}
            title={t("agents.title")}
            description={t("agents.description")}
            className="[&_p:last-child]:text-ink-muted"
          />

          <div className="mt-10 flex flex-col gap-2" role="tablist" aria-label={t("agents.eyebrow")}>
            {agents.map(({ id, icon: Icon }) => {
              const selected = id === active;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="agent-stage"
                  onClick={() => {
                    setActive(id);
                    setPaused(true);
                  }}
                  className={cn(
                    "relative flex items-start gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-colors",
                    selected
                      ? "border-accent/40 bg-white/[0.06]"
                      : "border-ink-border hover:border-white/20 hover:bg-white/[0.03]"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl transition-colors",
                      selected ? "bg-accent text-accent-foreground" : "bg-white/5 text-white/70"
                    )}
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <span>
                    <span className="block font-medium">{t(`agents.${id}.title`)}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                      {t(`agents.${id}.body`)}
                    </span>
                  </span>
                  {/* Progress bar: shows the visitor the showcase is moving on. */}
                  {selected && inView && !paused && !reduceMotion ? (
                    <motion.span
                      key={`progress-${id}`}
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-0.5 bg-accent"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <OpenAgentButton>
                <Bot className="size-4" />
                {t("agentChat.tryLive")}
              </OpenAgentButton>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/services/ai-agents">
                {t("agents.cta")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          id="agent-stage"
          role="tabpanel"
          className="relative min-h-[26rem] overflow-hidden rounded-3xl border border-ink-border bg-white/[0.03] p-6 sm:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full"
            >
              {active === "voice" ? <VoiceStage /> : null}
              {active === "chat" ? <ChatStage /> : null}
              {active === "ops" ? <OpsStage /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Voice agent: live waveform + transcript + outcome ---------- */

function VoiceStage() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const lines = ["agents.voice.line1", "agents.voice.line2", "agents.voice.line3"];
  const bars = Array.from({ length: 28 });

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative grid size-11 place-items-center rounded-full bg-accent text-accent-foreground">
            <Phone className="size-5" />
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full border-2 border-accent"
                animate={reduceMotion ? undefined : { scale: [1, 1.9], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i, ease: "easeOut" }}
              />
            ))}
          </span>
          <div>
            <p className="text-sm font-medium text-white">{t("agents.voice.caller")}</p>
            <p className="font-mono text-[11px] text-white/50">{t("agents.voice.callState")}</p>
          </div>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-white/60">00:42</span>
      </div>

      <div className="flex h-20 items-center justify-center gap-1" aria-hidden="true">
        {bars.map((_, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-accent/40 to-accent"
            initial={{ height: 8 }}
            animate={
              reduceMotion
                ? { height: 8 + ((i * 7) % 40) }
                : { height: [8, 14 + ((i * 13) % 56), 10, 20 + ((i * 5) % 40), 8] }
            }
            transition={{ duration: 1.4 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.03 }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {lines.map((key, i) => (
          <motion.p
            key={key}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 1.1, duration: 0.45 }}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm",
              i % 2 === 0 ? "bg-white/[0.06] text-white/85" : "bg-accent/15 text-accent"
            )}
          >
            {t(key)}
          </motion.p>
        ))}
      </div>

      <Outcome delay={3.8} label={t("agents.voice.outcome")} />
    </div>
  );
}

/* ---------- Chat agent: every channel flows into one agent ---------- */

const channels = [
  { icon: MessageCircle, key: "WhatsApp" },
  { icon: Globe, key: "Website" },
  { icon: Camera, key: "Instagram" },
  { icon: Mail, key: "Email" },
];

function ChatStage() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="relative grid min-h-[15rem] grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex flex-col gap-3">
          {channels.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink/60 px-3 py-2 text-xs text-white/80"
            >
              <Icon className="size-3.5 text-accent" />
              {key}
            </motion.div>
          ))}
        </div>

        <div className="relative grid size-24 place-items-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-dashed border-accent/40"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-3 rounded-full bg-accent/15"
            animate={reduceMotion ? undefined : { scale: [1, 1.15, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <span className="relative grid size-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_0_40px_8px_rgba(79,209,168,0.4)]">
            <Bot className="size-6" />
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {["agents.chat.reply1", "agents.chat.reply2", "agents.chat.reply3", "agents.chat.reply4"].map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.5 }}
              className="flex items-center gap-2 rounded-xl bg-accent/15 px-3 py-2 text-xs text-accent"
            >
              <Check className="size-3.5 shrink-0" />
              <span className="line-clamp-1">{t(key)}</span>
            </motion.div>
          ))}
        </div>

        {/* Message packets travelling from channels into the agent and out. */}
        {!reduceMotion
          ? [0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="pointer-events-none absolute size-1.5 rounded-full bg-accent shadow-[0_0_10px_3px_rgba(79,209,168,0.7)]"
                style={{ top: `${14 + i * 24}%` }}
                animate={{ left: ["28%", "50%", "72%"], opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }}
              />
            ))
          : null}
      </div>

      <Outcome delay={2.8} label={t("agents.chat.outcome")} />
    </div>
  );
}

/* ---------- Operations agent: document in, structured data out ---------- */

function OpsStage() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const fields = ["agents.ops.field1", "agents.ops.field2", "agents.ops.field3", "agents.ops.field4"];

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="relative mx-auto h-40 w-32 overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] p-3">
          <FileText className="size-5 text-white/60" />
          <div className="mt-3 space-y-2">
            {[80, 60, 90, 50, 70, 40].map((w, i) => (
              <span key={i} className="block h-1.5 rounded-full bg-white/15" style={{ width: `${w}%` }} />
            ))}
          </div>
          {/* Scanner beam */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-accent/40 to-transparent"
            animate={reduceMotion ? { top: "40%" } : { top: ["-20%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="space-y-2">
          {fields.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.6 }}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-ink/60 px-3 py-2 text-xs"
            >
              <span className="text-white/55">{t(`${key}.label`)}</span>
              <span className="font-mono text-white">{t(`${key}.value`)}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-white/60">
        {["agents.ops.step1", "agents.ops.step2", "agents.ops.step3"].map((key, i) => (
          <React.Fragment key={key}>
            <motion.span
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 + i * 0.4 }}
              className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-accent"
            >
              {t(key)}
            </motion.span>
            {i < 2 ? <span className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" /> : null}
          </React.Fragment>
        ))}
      </div>

      <Outcome delay={4} label={t("agents.ops.outcome")} />
    </div>
  );
}

function Outcome({ delay, label }: { delay: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
      className="mt-auto flex items-center gap-3 self-start rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
    >
      <Check className="size-4" />
      {label}
    </motion.div>
  );
}
