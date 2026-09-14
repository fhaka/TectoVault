"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";

// When the splash is showing, the hero waits for its handoff event before
// animating in — the splash copy sinks out while this copy rises in over the
// same background image, so the two read as one continuous scene. When the
// splash was already seen this session (or storage is unavailable and the
// splash chose to show, it still dispatches the event), the hero animates on
// mount as usual.
function useSplashHandoff() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let splashPending = true;
    try {
      splashPending = sessionStorage.getItem("tectovault:splash-seen") !== "1";
    } catch {
      // Mirror the splash's fallback: it shows, so wait for its event.
    }
    if (!splashPending) {
      setReady(true);
      return;
    }
    const onExplore = () => setReady(true);
    window.addEventListener("tectovault:splash-explore", onExplore);
    return () => window.removeEventListener("tectovault:splash-explore", onExplore);
  }, []);

  return ready;
}

export function HomeHero() {
  const ready = useSplashHandoff();
  const reduceMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <section data-header-tone="hero" className="relative flex min-h-svh items-end overflow-hidden bg-ink text-ink-foreground">
      <AbstractVisual reduceMotion={reduceMotion} />

      <motion.div
        aria-hidden="true"
        className="absolute right-[7%] top-1/2 z-[1] hidden h-[min(42vw,38rem)] w-[min(42vw,38rem)] -translate-y-1/2 lg:block"
        initial={{ opacity: 0, scale: 0.86, rotate: -14 }}
        animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-[7%] rounded-full border border-white/15"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -left-1 top-1/2 size-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_5px_rgba(79,209,168,0.7)]" />
          <span className="absolute right-[16%] top-[7%] size-1.5 rounded-full bg-white shadow-[0_0_18px_3px_rgba(255,255,255,0.8)]" />
        </motion.div>
        <motion.div
          className="absolute inset-[18%] rounded-full border border-dashed border-white/20"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[31%] rounded-full border border-accent/50 bg-accent/10 shadow-[0_0_100px_20px_rgba(79,209,168,0.22)]"
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-ink/60 backdrop-blur-xl">
          <div className="size-4 rounded-full bg-accent shadow-[0_0_35px_12px_rgba(79,209,168,0.85)]" />
        </div>
        <motion.div
          className="absolute -right-5 top-[18%] rounded-xl border border-white/15 bg-ink/65 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-md"
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="mb-1.5 block text-accent">01 / Signal live</span>
          Building what&apos;s next
        </motion.div>
      </motion.div>

      <div className="container-page relative z-10 pb-14 pt-28 sm:pb-20 sm:pt-40 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted sm:mb-6 sm:text-xs sm:tracking-[0.25em]"
        >
          <motion.span
            className="size-2 rounded-full bg-accent"
            animate={reduceMotion ? undefined : { scale: [1, 1.7, 1], opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          {t("hero.eyebrow")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl text-balance text-[2.65rem] font-medium leading-[1.02] tracking-tight min-[400px]:text-5xl md:text-7xl lg:text-[5.5rem]"
        >
          {t("hero.headline1")}
          <br />
          {t("hero.headline2")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:mt-8 sm:text-lg md:text-xl"
        >
          {t("hero.subheadline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 grid gap-3 min-[400px]:flex min-[400px]:flex-wrap min-[400px]:items-center sm:mt-10 sm:gap-4"
        >
          <Button asChild size="lg" variant="accent">
            <Link href="/request-quote">
              {t("cta.startProject")}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link href="/services">
              {t("cta.exploreTechnology")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function AbstractVisual({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Same asset as the splash so the splash-to-hero transition reads as one
          continuous scene and the browser reuses the cached download. */}
      <Image
        src="/images/home-splash.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <motion.div
        className="absolute -inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-80"
        animate={reduceMotion ? undefined : { y: [0, 900, 0], opacity: [0, 0.75, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:4rem_4rem]" />
      {/* Legibility scrims: darken the left edge under the copy and settle the
          bottom into the ink background the next section starts from. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
    </div>
  );
}
