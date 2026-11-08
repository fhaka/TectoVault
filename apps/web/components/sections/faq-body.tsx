"use client";

import * as React from "react";
import Link from "@/components/i18n/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bot, Lock, MessagesSquare, Search, Users, Wallet, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { faqGroups } from "@/content/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { OpenAgentButton } from "@/components/agent/agent-chat";
import { WhatsappIcon } from "@/components/shared/social-icons";
import { useTranslation } from "@/lib/i18n/language-context";
import { whatsappLink } from "@/lib/whatsapp";

const groupIcons: Record<string, React.ElementType> = {
  agents: Bot,
  data: Lock,
  working: Users,
  pricing: Wallet,
};

// Folds Albanian letters (ë, ç) so "cmim" finds "çmim".
const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function FaqBody() {
  const { t, locale } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = React.useState("");
  const [group, setGroup] = React.useState<string>("all");

  const q = fold(query.trim());
  const groups = faqGroups
    .filter((g) => group === "all" || g.id === group)
    .map((g) => ({
      ...g,
      items: q ? g.items.filter((item) => fold(item.q[locale] + " " + item.a[locale]).includes(q)) : g.items,
    }))
    .filter((g) => g.items.length > 0);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      {/* Hero */}
      <section
        data-header-tone="dark"
        className="relative isolate overflow-hidden bg-ink pb-16 pt-36 text-ink-foreground md:pb-20 md:pt-44"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:3.5rem_3.5rem]"
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_30%,rgba(79,209,168,0.22),transparent_28rem)]"
          animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-page">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{t("faq.eyebrow")}</p>
            <h1 className="mt-5 text-balance font-display text-4xl font-medium leading-[1.03] md:text-6xl">
              {t("faq.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{t("faq.description")}</p>

            <label className="relative mt-9 block max-w-xl">
              <span className="sr-only">{t("faq.searchLabel")}</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-white/50" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("faq.searchPlaceholder")}
                className="h-14 w-full rounded-2xl border border-white/15 bg-white/[0.06] pl-11 pr-12 text-base text-white outline-none backdrop-blur placeholder:text-white/40 focus:border-accent focus:ring-2 focus:ring-accent/25 [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={t("faq.clear")}
                  className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-white/60 hover:bg-white/10"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </label>
          </motion.div>
        </div>
      </section>

      {/* Topics + questions */}
      <section className="py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-16">
          <nav aria-label={t("faq.topics")} className="lg:sticky lg:top-28 lg:self-start">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:px-0">
              {[{ id: "all", title: { en: t("faq.all"), sq: t("faq.all") } }, ...faqGroups].map((g) => {
                const Icon = groupIcons[g.id] ?? MessagesSquare;
                const selected = group === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setGroup(g.id)}
                    className={cn(
                      "relative flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors lg:rounded-xl",
                      selected ? "text-accent-foreground" : "text-foreground/75 hover:bg-muted"
                    )}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="faq-topic"
                        className="absolute inset-0 rounded-full bg-accent lg:rounded-xl"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    ) : null}
                    <Icon className="relative size-4 shrink-0" />
                    <span className="relative whitespace-nowrap lg:whitespace-normal">{g.title[locale]}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="min-w-0">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {t(total === 1 ? "faq.countOne" : "faq.count").replace("{n}", String(total))}
            </p>
            <AnimatePresence mode="popLayout" initial={false}>
              {groups.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 rounded-3xl border border-dashed border-border p-8 text-center"
                >
                  <p className="font-medium">{t("faq.noResults")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t("faq.noResultsHint")}</p>
                </motion.div>
              ) : (
                groups.map((g) => (
                  <motion.div
                    key={g.id}
                    layout={!reduceMotion}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 first-of-type:mt-6"
                  >
                    <h2 id={g.id} className="scroll-mt-28 font-display text-2xl font-medium">
                      {g.title[locale]}
                    </h2>
                    <Accordion type="single" collapsible className="mt-3">
                      {g.items.map((item, i) => (
                        <AccordionItem key={item.q.en} value={`${g.id}-${i}`}>
                          <AccordionTrigger className="text-[1.05rem]">{item.q[locale]}</AccordionTrigger>
                          <AccordionContent className="max-w-2xl text-[0.95rem]">{item.a[locale]}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Still have a question? */}
            <div className="mt-14 rounded-3xl border border-border bg-muted/60 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-medium">{t("faq.moreTitle")}</h2>
              <p className="mt-2 max-w-lg text-muted-foreground">{t("faq.moreBody")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="accent">
                  <a href={whatsappLink(locale)} target="_blank" rel="noopener noreferrer">
                    <WhatsappIcon className="size-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <OpenAgentButton prompt={query.trim() || t("faq.agentPrompt")}>
                    <Bot className="size-4" />
                    {t("faq.askAgent")}
                  </OpenAgentButton>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">
                    {t("cta.contactUs")}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
