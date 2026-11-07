"use client";

import Link from "@/components/i18n/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/content/services";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/language-context";
import { serviceTranslationsSq } from "@/lib/i18n/content-sq";

export function ServicesGrid() {
  const { locale } = useTranslation();
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => {
        const Icon = service.icon;
        const tr = locale === "sq" ? serviceTranslationsSq[service.slug] : null;
        // AI Agents is the flagship: a wide, dark tile that leads the grid.
        const featured = service.slug === "ai-agents";
        return (
          <Reveal key={service.slug} delay={i * 0.04} className={cn("h-full", featured && "sm:col-span-2")}>
            <Link
              href={`/services/${service.slug}`}
              className={cn(
                "group relative flex h-full flex-col justify-between overflow-hidden p-8",
                featured ? "bg-ink text-ink-foreground" : "bg-card"
              )}
            >
              {featured ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent/25 blur-3xl transition-transform duration-700 group-hover:scale-125"
                />
              ) : null}
              <div className="relative">
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-xl transition-colors",
                    featured
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted group-hover:bg-accent group-hover:text-accent-foreground"
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <h2 className={cn("mt-6 font-medium", featured ? "text-2xl" : "text-lg")}>{tr?.title ?? service.title}</h2>
                <p className={cn("mt-2 text-sm leading-relaxed", featured ? "max-w-md text-ink-muted" : "text-muted-foreground")}>
                  {tr?.shortDescription ?? service.shortDescription}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-1 text-sm font-medium text-accent">
                Learn more <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
