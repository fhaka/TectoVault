"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/content/services";
import { Reveal } from "@/components/shared/reveal";
import { useTranslation } from "@/lib/i18n/language-context";
import { serviceTranslationsSq } from "@/lib/i18n/content-sq";

export function ServicesGrid() {
  const { locale } = useTranslation();
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => {
        const Icon = service.icon;
        const tr = locale === "sq" ? serviceTranslationsSq[service.slug] : null;
        return (
          <Reveal key={service.slug} delay={i * 0.04} className="h-full">
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col justify-between bg-card p-8"
            >
              <div>
                <span className="flex size-12 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-6 text-lg font-medium">{tr?.title ?? service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tr?.shortDescription ?? service.shortDescription}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-1 text-sm font-medium text-accent">
                Learn more <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
