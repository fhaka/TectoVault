"use client";

import * as React from "react";
import Link from "@/components/i18n/link";
import { animate, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Clock, Euro, MessagesSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";
import { quoteHref } from "@/lib/quote-link";

// "How much time could an agent save you?" The visitor enters their own
// numbers; everything is computed in the browser and nothing is sent.

const OPEN_DAYS = [
  { days: 22, key: "weekdays" },
  { days: 26, key: "sixDays" },
  { days: 30, key: "everyDay" },
] as const;

export function SavingsCalculator({ className }: { className?: string }) {
  const { t, locale } = useTranslation();
  const [perDay, setPerDay] = React.useState(40);
  const [minutes, setMinutes] = React.useState(3);
  const [share, setShare] = React.useState(50);
  const [days, setDays] = React.useState(26);
  const [hourlyCost, setHourlyCost] = React.useState("5");

  const handledPerMonth = Math.round(perDay * days * (share / 100));
  const hours = (handledPerMonth * minutes) / 60;
  const cost = Number.parseFloat(hourlyCost.replace(",", "."));
  const value = Number.isFinite(cost) && cost > 0 ? hours * cost : null;
  const fmt = (n: number, digits = 0) => formatNumber(n, digits, locale);

  return (
    <section id="savings" className={cn("py-16 sm:py-20 md:py-28", className)}>
      <div className="container-page">
        <SectionHeading eyebrow={t("calc.eyebrow")} title={t("calc.title")} description={t("calc.description")} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Inputs */}
          <div className="space-y-8 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <Slider
              label={t("calc.perDay")}
              value={perDay}
              min={5}
              max={300}
              step={5}
              onChange={setPerDay}
              display={fmt(perDay)}
            />
            <Slider
              label={t("calc.minutes")}
              value={minutes}
              min={1}
              max={10}
              step={1}
              onChange={setMinutes}
              display={`${minutes} ${t("calc.minUnit")}`}
            />
            <Slider
              label={t("calc.share")}
              hint={t("calc.shareHint")}
              value={share}
              min={20}
              max={90}
              step={5}
              onChange={setShare}
              display={`${share}%`}
            />

            <fieldset>
              <legend className="text-sm font-medium">{t("calc.openDays")}</legend>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {OPEN_DAYS.map((option) => (
                  <button
                    key={option.days}
                    type="button"
                    aria-pressed={days === option.days}
                    onClick={() => setDays(option.days)}
                    className={cn(
                      "rounded-xl border px-2 py-2.5 text-xs font-medium transition-colors sm:text-sm",
                      days === option.days
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-foreground/30"
                    )}
                  >
                    {t(`calc.days.${option.key}`)}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="text-sm font-medium">{t("calc.hourlyCost")}</span>
              <span className="mt-3 flex max-w-[12rem] items-center rounded-xl border border-border bg-background focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
                <span className="pl-3 text-muted-foreground">€</span>
                <input
                  inputMode="decimal"
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(e.target.value.replace(/[^\d.,]/g, "").slice(0, 6))}
                  className="h-11 w-full bg-transparent px-2 text-sm outline-none"
                  aria-describedby="calc-cost-hint"
                />
                <span className="whitespace-nowrap pr-3 text-xs text-muted-foreground">/ {t("calc.hourUnit")}</span>
              </span>
              <span id="calc-cost-hint" className="mt-2 block text-xs text-muted-foreground">
                {t("calc.hourlyHint")}
              </span>
            </label>
          </div>

          {/* Results */}
          <div
            data-header-tone="dark"
            className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-ink p-6 text-ink-foreground sm:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,rgba(79,209,168,0.25),transparent_22rem)]"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("calc.resultEyebrow")}</p>
            <div className="mt-4 flex items-baseline gap-3" aria-live="polite">
              <AnimatedNumber value={hours} format={(n) => fmt(n)} className="font-display text-6xl font-semibold text-white sm:text-7xl" />
              <span className="text-lg text-ink-muted">{t("calc.hoursMonth")}</span>
            </div>

            <dl className="mt-8 grid flex-1 content-start gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Stat icon={CalendarDays} label={t("calc.workdays")}>
                <AnimatedNumber value={hours / 8} format={(n) => fmt(n, 1)} />
              </Stat>
              <Stat icon={MessagesSquare} label={t("calc.handled")}>
                <AnimatedNumber value={handledPerMonth} format={(n) => fmt(n)} />
              </Stat>
              <Stat icon={Clock} label={t("calc.perWeek")}>
                <AnimatedNumber value={(hours / days) * (days === 22 ? 5 : days === 26 ? 6 : 7)} format={(n) => fmt(n, 1)} />
              </Stat>
              <Stat icon={Euro} label={t("calc.value")}>
                {value === null ? "—" : <AnimatedNumber value={value} format={(n) => `€${fmt(n)}`} />}
              </Stat>
            </dl>

            <p className="mt-6 text-xs leading-relaxed text-white/50">{t("calc.note")}</p>
            <Button asChild size="lg" variant="accent" className="mt-6 w-full sm:w-auto sm:self-start">
              <Link href={quoteHref({ type: "ai-agents" })}>
                {t("calc.cta")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Same output on the server and in every browser (Intl's Albanian format
 * differs between Node and browsers, which broke hydration).
 * en: 1,234.5   sq: 1 234,5
 */
function formatNumber(n: number, digits: number, locale: string) {
  const factor = 10 ** digits;
  const rounded = Math.round(n * factor) / factor;
  const [int, dec] = Math.abs(rounded).toFixed(digits).split(".");
  const sq = locale === "sq";
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, sq ? "\u00a0" : ",");
  const decimals = dec && Number(dec) !== 0 ? (sq ? "," : ".") + dec.replace(/0+$/, "") : "";
  return (rounded < 0 ? "-" : "") + grouped + decimals;
}

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  const id = React.useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <span className="shrink-0 rounded-lg bg-accent/10 px-2.5 py-1 font-mono text-sm font-semibold text-foreground">
          {display}
        </span>
      </div>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-range mt-4 w-full"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
    </div>
  );
}

function Stat({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <dt className="flex items-center gap-2 text-xs text-ink-muted">
        <Icon className="size-3.5 text-accent" />
        {label}
      </dt>
      <dd className="mt-2 font-display text-2xl font-semibold text-white">{children}</dd>
    </div>
  );
}

function AnimatedNumber({
  value,
  format,
  className,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = React.useState(value);
  const latest = React.useRef(value);

  React.useEffect(() => {
    if (reduceMotion) {
      latest.current = value;
      const id = window.setTimeout(() => setShown(value), 0);
      return () => window.clearTimeout(id);
    }
    const controls = animate(latest.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => {
        latest.current = v;
        setShown(v);
      },
    });
    return () => controls.stop();
  }, [value, reduceMotion]);

  return <motion.span className={className}>{format(shown)}</motion.span>;
}
