"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { useTranslation } from "@/lib/i18n/language-context";

export function FinalCta({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref = "/request-quote",
  secondaryLabel,
  secondaryHref = "/contact",
  variant = "default",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** "agents" swaps the default copy for the AI-agent pitch. */
  variant?: "default" | "agents";
}) {
  const { t } = useTranslation();
  const ns = variant === "agents" ? "finalCta.agents" : "finalCta";
  const resolvedEyebrow = eyebrow ?? t(`${ns}.eyebrow`);
  const resolvedTitle = title ?? t(`${ns}.title`);
  const resolvedDescription = description ?? t(`${ns}.description`);
  const resolvedPrimaryLabel =
    primaryLabel ?? t(variant === "agents" ? "cta.getAgent" : "cta.startProject");
  const resolvedSecondaryLabel = secondaryLabel ?? t("cta.contactUs");
  return (
    <section data-header-tone="dark" className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(47,143,114,0.25),transparent)]" />
      <div className="container-page relative text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">
            {resolvedEyebrow}
          </p>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-medium leading-tight md:text-5xl">
            {resolvedTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-balance text-ink-muted">
            {resolvedDescription}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="accent">
              <Link href={primaryHref}>
                {resolvedPrimaryLabel}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href={secondaryHref}>{resolvedSecondaryLabel}</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
