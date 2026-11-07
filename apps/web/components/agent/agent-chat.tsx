"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Bot, Check, Loader2, RotateCcw, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/language-context";

// Floating live demo agent. Talks to /api/agent, which streams NDJSON events
// (text chunks + tool progress). Any element can open it with
// window.dispatchEvent(new CustomEvent(OPEN_AGENT_EVENT, { detail: { prompt } })).

export const OPEN_AGENT_EVENT = "tectovault:open-agent";

// Shared across widget and buttons: is the live agent configured on the server?
let availability: Promise<boolean> | null = null;
function checkAvailability() {
  availability ??= fetch("/api/agent", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : { enabled: false }))
    .then((d) => Boolean(d.enabled))
    .catch(() => false);
  return availability;
}

function useAgentAvailable() {
  const [available, setAvailable] = React.useState(false);
  React.useEffect(() => {
    let alive = true;
    checkAvailability().then((ok) => alive && setAvailable(ok));
    return () => {
      alive = false;
    };
  }, []);
  return available;
}

type ToolStatus = "start" | "done" | "error";
type ToolChip = { id: string; label: string; status: ToolStatus };
type ChatMessage = { role: "user" | "assistant"; content: string; tools?: ToolChip[]; error?: boolean };

const SUGGESTIONS = ["agentChat.suggest1", "agentChat.suggest2", "agentChat.suggest3"];

export function AgentChat() {
  const { t, locale } = useTranslation();
  const reduceMotion = useReducedMotion();
  const available = useAgentAvailable();
  const [open, setOpen] = React.useState(false);
  const [teaser, setTeaser] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const abortRef = React.useRef<AbortController | null>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // Gentle nudge a few seconds after landing, once per session.
  React.useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("tectovault:agent-teaser") === "1";
    } catch {}
    if (seen || !available) return;
    const id = window.setTimeout(() => setTeaser(true), 6000);
    return () => window.clearTimeout(id);
  }, [available]);

  const dismissTeaser = React.useCallback(() => {
    setTeaser(false);
    try {
      sessionStorage.setItem("tectovault:agent-teaser", "1");
    } catch {}
  }, []);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, busy, reduceMotion]);

  React.useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const send = React.useCallback(
    async (text: string) => {
      const content = text.trim().slice(0, 1500);
      if (!content || busy) return;
      const history: ChatMessage[] = [...messages.filter((m) => !m.error), { role: "user", content }];
      setMessages([...history, { role: "assistant", content: "", tools: [] }]);
      setInput("");
      setBusy(true);

      const update = (fn: (last: ChatMessage) => ChatMessage) =>
        setMessages((prev) => [...prev.slice(0, -1), fn(prev[prev.length - 1])]);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locale,
            // Only the visible text goes back; keep the most recent turns.
            messages: history
              .filter((m) => m.content.trim())
              .slice(-20)
              .map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => null);
          update((last) => ({ ...last, content: data?.message ?? t("agentChat.error"), error: true }));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const event = JSON.parse(line);
            if (event.type === "text") {
              update((last) => ({ ...last, content: last.content + event.text }));
            } else if (event.type === "tool") {
              update((last) => {
                const tools = [...(last.tools ?? [])];
                const i = tools.findIndex((c) => c.id === event.id);
                const chip = { id: event.id, label: event.label, status: event.status as ToolStatus };
                if (i >= 0) tools[i] = chip;
                else tools.push(chip);
                return { ...last, tools };
              });
            } else if (event.type === "error") {
              update((last) => ({ ...last, content: last.content || event.message, error: !last.content }));
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          update((last) => ({ ...last, content: last.content || t("agentChat.error"), error: !last.content }));
        }
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, locale, messages, t]
  );

  // Let buttons elsewhere on the page open the chat, optionally with a prompt.
  React.useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      dismissTeaser();
      const prompt = (e as CustomEvent<{ prompt?: string }>).detail?.prompt;
      if (prompt) setInput(prompt);
    };
    window.addEventListener(OPEN_AGENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_AGENT_EVENT, onOpen);
  }, [dismissTeaser]);

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
  };

  const last = messages[messages.length - 1];
  const waiting = busy && last?.role === "assistant" && !last.content;

  // No API key on the server: render nothing rather than an offline demo.
  if (!available) return null;

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open ? (
          <motion.div
            key="launcher"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
          >
            <AnimatePresence>
              {teaser ? (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="relative max-w-[16rem] rounded-2xl rounded-br-md border border-border bg-card p-4 pr-8 text-sm shadow-xl"
                >
                  <button
                    type="button"
                    onClick={dismissTeaser}
                    aria-label={t("agentChat.close")}
                    className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:bg-muted"
                  >
                    <X className="size-3.5" />
                  </button>
                  <p className="font-medium">{t("agentChat.teaserTitle")}</p>
                  <p className="mt-1 text-muted-foreground">{t("agentChat.teaserBody")}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => {
                setOpen(true);
                dismissTeaser();
              }}
              className="group relative flex items-center gap-2.5 rounded-full bg-ink py-2 pl-2 pr-5 text-sm font-medium text-white shadow-[0_12px_40px_-8px_rgba(47,143,114,0.6)] ring-1 ring-white/10 transition-transform hover:-translate-y-0.5"
            >
              <span className="relative grid size-9 place-items-center rounded-full bg-accent text-accent-foreground">
                <Bot className="size-[18px]" />
                {!reduceMotion ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border-2 border-accent"
                    animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                ) : null}
              </span>
              {t("agentChat.launcher")}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-label={t("agentChat.title")}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-ink text-white sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(40rem,calc(100svh-3rem))] sm:w-[25rem] sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-[0_40px_120px_-30px_rgba(79,209,168,0.45)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(79,209,168,0.18),transparent)]"
            />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="relative grid size-10 place-items-center rounded-full bg-accent/15 text-accent">
                  <Bot className="size-5" />
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-ink bg-accent" />
                </span>
                <div>
                  <p className="text-sm font-medium">{t("agentChat.title")}</p>
                  <p className="text-[11px] text-white/55">{t("agentChat.subtitle")}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length ? (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label={t("agentChat.restart")}
                    title={t("agentChat.restart")}
                    className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("agentChat.close")}
                  className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="relative flex-1 space-y-3 overflow-y-auto px-5 py-5" aria-live="polite">
              <Bubble role="assistant" content={t("agentChat.greeting")} />

              {messages.length === 0 ? (
                <div className="flex flex-col items-start gap-2 pt-2">
                  {SUGGESTIONS.map((key, i) => (
                    <motion.button
                      key={key}
                      type="button"
                      initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      onClick={() => send(t(key))}
                      className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/20"
                    >
                      {t(key)}
                    </motion.button>
                  ))}
                </div>
              ) : null}

              {messages.map((m, i) => (
                <React.Fragment key={i}>
                  {m.tools?.length ? (
                    <div className="flex flex-col items-start gap-1.5">
                      {m.tools.map((chip) => (
                        <motion.div
                          key={chip.id}
                          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px]",
                            chip.status === "error"
                              ? "border-red-400/30 bg-red-400/10 text-red-300"
                              : "border-accent/30 bg-accent/10 text-accent"
                          )}
                        >
                          {chip.status === "start" ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : chip.status === "done" ? (
                            <Check className="size-3.5" />
                          ) : (
                            <X className="size-3.5" />
                          )}
                          {chip.label}
                        </motion.div>
                      ))}
                    </div>
                  ) : null}
                  {m.content ? <Bubble role={m.role} content={m.content} error={m.error} /> : null}
                </React.Fragment>
              ))}

              {waiting ? (
                <div className="flex items-center gap-1.5 pl-1" aria-label={t("agentChat.typing")}>
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="size-1.5 rounded-full bg-accent"
                      animate={reduceMotion ? undefined : { y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="relative border-t border-white/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 pl-4 focus-within:border-accent/50">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  maxLength={1500}
                  placeholder={t("agentChat.placeholder")}
                  aria-label={t("agentChat.placeholder")}
                  className="max-h-32 min-h-[2.25rem] flex-1 resize-none bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label={t("agentChat.send")}
                  className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground transition-opacity disabled:opacity-40"
                >
                  {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-white/40">{t("agentChat.disclaimer")}</p>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content, error }: { role: "user" | "assistant"; content: string; error?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          role === "user"
            ? "rounded-br-md bg-accent text-accent-foreground"
            : error
              ? "rounded-bl-md border border-red-400/30 bg-red-400/10 text-red-200"
              : "rounded-bl-md bg-white/[0.07] text-white/90"
        )}
      >
        {content}
      </div>
    </motion.div>
  );
}

/** Button that opens the live agent from anywhere on the page. */
export function OpenAgentButton({
  className,
  children,
  prompt,
}: {
  className?: string;
  children: React.ReactNode;
  prompt?: string;
}) {
  const available = useAgentAvailable();
  if (!available) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_AGENT_EVENT, { detail: { prompt } }))}
    >
      {children}
    </button>
  );
}
