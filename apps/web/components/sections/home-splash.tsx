"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/lib/i18n/language-context";

// Shown once per browser session on the home page: a full-bleed splash with
// the hero image, brand mark and an "Explore" button. Clicking it — or
// scrolling, or pressing Enter/Escape — fades the splash out and reveals the
// real homepage underneath. Uses sessionStorage (not localStorage) so it
// reappears on a fresh visit but not on every client-side navigation back to
// "/" within the same tab.
const SPLASH_SESSION_KEY = "tectovault:splash-seen";

type Phase = "pending" | "visible" | "exiting" | "hidden";

export function HomeSplash() {
  const [phase, setPhase] = React.useState<Phase>("pending");
  const { t } = useTranslation();

  React.useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable (private mode, etc.) — just show the splash.
    }
    setPhase(seen ? "hidden" : "visible");
  }, []);

  const dismiss = React.useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    } catch {
      // ignore
    }
    // The hero (same background image) starts its entrance now, so the two
    // screens read as one continuous scene: splash copy sinks out while the
    // hero copy rises in over an unchanged backdrop.
    window.dispatchEvent(new Event("tectovault:splash-explore"));
    setPhase((p) => (p === "visible" ? "exiting" : p));
  }, []);

  React.useEffect(() => {
    if (phase !== "visible" && phase !== "exiting") return;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    // Guard against browser scroll restoration: the handoff to the hero only
    // reads as continuous if the page under the splash is at the top.
    window.scrollTo(0, 0);

    // Scrolling or keyboard intent also dismisses — the splash should never
    // feel like it's blocking someone who already wants the content. A short
    // grace period swallows spurious events that arrive with the page load
    // (trackpad momentum carried over from the previous page, restored-scroll
    // side effects), which would otherwise dismiss the splash instantly.
    const shownAt = performance.now();
    const pastGrace = () => performance.now() - shownAt > 700;
    const onWheel = () => {
      if (pastGrace()) dismiss();
    };
    const onTouchMove = () => {
      if (pastGrace()) dismiss();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        pastGrace() &&
        ["Escape", "Enter", " ", "ArrowDown", "PageDown"].includes(e.key)
      ) {
        dismiss();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      style.overflow = previousOverflow;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [phase, dismiss]);

  if (phase === "pending" || phase === "hidden") return null;

  return (
    <AnimatePresence onExitComplete={() => setPhase("hidden")}>
      {phase === "visible" && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Slow Ken Burns zoom keeps the still image feeling alive. On exit
              it settles to scale 1 — the exact framing of the hero's copy of
              this image — so the backdrop appears not to change at all. */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1, transition: { duration: 0.6, ease: "easeOut" } }}
            transition={{ duration: 8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/home-splash.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/50" />

          {/* Brand mark — the splash should never be anonymous. */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -16,
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-0 z-10 flex justify-center pt-10 md:pt-14"
          >
            <Image
              src="/images/tectovault-logo.png"
              alt={siteConfig.name}
              width={696}
              height={147}
              className="h-8 w-auto md:h-9"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 28,
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full flex-col items-center justify-end gap-6 pb-16 text-center md:pb-20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              {t("splash.tagline")}
            </p>
            <p className="max-w-md text-balance px-6 font-display text-2xl font-medium leading-snug text-white md:text-3xl">
              {t("splash.message")}
            </p>
            <Button size="lg" variant="accent" onClick={dismiss}>
              {t("splash.explore")}
              <ArrowRight className="size-4" />
            </Button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-xs text-white/50"
            >
              {t("splash.scrollHint")}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
