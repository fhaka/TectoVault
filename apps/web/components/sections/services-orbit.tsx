"use client";

import * as React from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import { services } from "@/content/services";

// Interactive 3D map of the service catalog: icon nodes orbit a central hub
// on a perspective-tilted plane that follows the cursor; hovering (or
// focusing) a node lights it up, floats it forward and the hub reveals that
// service. Nodes are real links to the service pages, so touch and keyboard
// users lose nothing — the hub preview is progressive enhancement.

const RADIUS = 40; // % of the stage, node distance from center
const BASE_TILT = 16; // resting rotateX in degrees

function nodePosition(index: number, count: number) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
}

export function ServicesOrbit() {
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null);
  const active = services.find((s) => s.slug === activeSlug) ?? null;

  const stageRef = React.useRef<HTMLDivElement>(null);
  const tiltX = useMotionValue(BASE_TILT);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 60, damping: 16 });
  const rotateY = useSpring(tiltY, { stiffness: 60, damping: 16 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(BASE_TILT - py * 18);
    tiltY.set(px * 20);
  };

  const handleMouseLeave = () => {
    tiltX.set(BASE_TILT);
    tiltY.set(0);
    setActiveSlug(null);
  };

  return (
    <section className="overflow-hidden bg-ink pb-20 pt-36 text-ink-foreground md:pb-28 md:pt-44" data-header-tone="dark">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Services
          </p>
          <h1 className="text-balance text-3xl font-medium leading-[1.1] md:text-5xl">
            Everything your product needs, connected.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
            End-to-end digital product development — hover a service to
            explore it.
          </p>
        </div>

        <div style={{ perspective: "1400px" }}>
          <motion.div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative mx-auto mt-8 aspect-square w-full max-w-[380px] select-none sm:max-w-[560px] md:max-w-[640px]"
          >
            {/* Orbit rings + connectors — the flat base plane of the scene */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="orbit-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4fd1a8" stopOpacity="0.3" />
                  <stop offset="70%" stopColor="#4fd1a8" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#4fd1a8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="49" fill="url(#orbit-glow)" />
              <g className="origin-center animate-[spin_90s_linear_infinite]">
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke="#4fd1a8"
                  strokeOpacity="0.3"
                  strokeWidth="0.25"
                  strokeDasharray="0.6 2.4"
                />
              </g>
              <g className="origin-center animate-[spin_60s_linear_infinite] [animation-direction:reverse]">
                <circle
                  cx="50"
                  cy="50"
                  r={RADIUS - 9}
                  fill="none"
                  stroke="#4fd1a8"
                  strokeOpacity="0.2"
                  strokeWidth="0.25"
                  strokeDasharray="0.3 1.8"
                />
              </g>
              {services.map((service, i) => {
                const { x, y } = nodePosition(i, services.length);
                const isActive = service.slug === activeSlug;
                return (
                  <motion.line
                    key={service.slug}
                    x1="50"
                    y1="50"
                    x2={x}
                    y2={y}
                    stroke="#4fd1a8"
                    strokeWidth={isActive ? 0.5 : 0.25}
                    initial={false}
                    animate={{ strokeOpacity: isActive ? 0.9 : 0.15 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
            </svg>

            {/* Central hub — floats above the ring plane */}
            <div
              className="absolute left-1/2 top-1/2 flex aspect-square w-[52%] items-center justify-center rounded-full border border-white/10 bg-ink/85 p-6 text-center shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] sm:w-[46%]"
              style={{
                transform: "translate(-50%, -50%) translateZ(56px)",
              }}
            >
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.slug}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >
                    <h2 className="text-balance text-base font-medium sm:text-xl">
                      {active.title}
                    </h2>
                    <p className="mt-2 hidden text-xs leading-relaxed text-ink-muted sm:block sm:text-sm">
                      {active.shortDescription}
                    </p>
                    <Link
                      href={`/services/${active.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline sm:text-sm"
                    >
                      Learn more <ArrowRight className="size-3.5" />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center"
                  >
                    <p className="font-display text-lg font-semibold sm:text-2xl">
                      Our Services
                    </p>
                    <p className="mt-2 text-xs text-ink-muted sm:text-sm">
                      Hover a node to explore
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Service nodes — hover floats them toward the viewer */}
            {services.map((service, i) => {
              const { x, y } = nodePosition(i, services.length);
              const Icon = service.icon;
              const isActive = service.slug === activeSlug;
              return (
                <motion.div
                  key={service.slug}
                  className="absolute z-10"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.15 + i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{ z: isActive ? 80 : 28 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      aria-label={service.title}
                      onMouseEnter={() => setActiveSlug(service.slug)}
                      onFocus={() => setActiveSlug(service.slug)}
                      className="group block -translate-x-1/2 -translate-y-1/2"
                    >
                      <motion.span
                        animate={
                          isActive
                            ? {
                                scale: 1.12,
                                boxShadow:
                                  "0 0 36px 6px rgba(79,209,168,0.5), 0 18px 32px -8px rgba(0,0,0,0.6)",
                              }
                            : {
                                scale: 1,
                                boxShadow:
                                  "0 0 0px 0px rgba(79,209,168,0), 0 10px 22px -8px rgba(0,0,0,0.5)",
                              }
                        }
                        transition={{ duration: 0.25 }}
                        className={`flex size-12 items-center justify-center rounded-full border transition-colors sm:size-16 ${
                          isActive
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-white/15 bg-[#12141c] text-ink-foreground"
                        }`}
                      >
                        <Icon className="size-5 sm:size-6" />
                      </motion.span>
                      <span
                        className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium tracking-wide transition-opacity sm:text-xs ${
                          isActive
                            ? "text-ink-foreground opacity-100"
                            : "text-ink-muted opacity-0 sm:opacity-60"
                        }`}
                      >
                        {service.title}
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
