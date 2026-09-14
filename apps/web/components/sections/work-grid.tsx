"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

import type { Project, ProjectCategory } from "@/types/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { useTranslation } from "@/lib/i18n/language-context";
import { projectTranslationsSq } from "@/lib/i18n/content-sq";

const filters: ("All" | ProjectCategory)[] = [
  "All",
  "Websites",
  "Applications",
  "E-Commerce",
  "Software",
  "Cloud",
];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = React.useState<(typeof filters)[number]>("All");
  const reduceMotion = useReducedMotion();
  const { locale } = useTranslation();

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === filter
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 6) * 0.05}>
            <div>
            <div>
              <ProjectMedia project={project} index={i} reduceMotion={reduceMotion} />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{locale === "sq" ? projectTranslationsSq[project.slug]?.name ?? project.name : project.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{project.industry}</p>
                </div>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                    aria-label={`Visit ${project.name}`}
                  >
                    Visit site <ArrowUpRight className="size-4" />
                  </a>
                ) : null}
              </div>
            </div>
            </div>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No projects in this category yet.
        </p>
      ) : null}
    </div>
  );
}

function ProjectMedia({
  project,
  index,
  reduceMotion,
}: {
  project: Project;
  index: number;
  reduceMotion: boolean | null;
}) {
  const { t } = useTranslation();
  const gallery = project.images && project.images.length > 1 ? project.images : null;
  const [active, setActive] = React.useState(0);

  const go = (dir: 1 | -1, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!gallery) return;
    setActive((cur) => (cur + dir + gallery.length) % gallery.length);
  };

  const singleImage = gallery ? gallery[active] : project.image;

  return (
    <div className="group/media relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-[0_18px_40px_-32px_rgba(9,12,30,0.55)] sm:aspect-video">
      {!gallery ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,transparent_24%,rgba(255,255,255,0.34)_43%,transparent_58%)] mix-blend-overlay"
          initial={false}
          animate={reduceMotion ? undefined : { x: ["-130%", "130%"] }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : null}

      {singleImage ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={singleImage}
            className="absolute inset-0"
            initial={gallery ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={singleImage}
              alt={`${project.name} — screenshot ${gallery ? active + 1 : ""}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain object-center sm:object-cover sm:object-top"
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          style={{
            background: `linear-gradient(135deg, hsl(${(index * 47) % 360} 55% 14%), hsl(${(index * 47 + 40) % 360} 60% 22%))`,
          }}
        />
      )}

      {project.isPlaceholder ? (
        <Badge variant="outline" className="absolute left-4 top-4 z-20 bg-background/90 backdrop-blur">
          Sample project
        </Badge>
      ) : null}

      {project.slug === "pirko-glass-management" ? (
        <span className="absolute right-3 top-3 z-20 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur">
          {t("gallery.privacyNote")}
        </span>
      ) : null}

      {gallery ? (
        <>
          <button
            type="button"
            onClick={(e) => go(-1, e)}
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/70 group-hover/media:opacity-100"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={(e) => go(1, e)}
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/70 group-hover/media:opacity-100"
          >
            <ChevronRight className="size-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActive(i);
                }}
                aria-label={`Show screenshot ${i + 1}`}
                className={cn(
                  "size-1.5 rounded-full transition-all",
                  i === active ? "w-4 bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
