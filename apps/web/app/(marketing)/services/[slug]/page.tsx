import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowUpRight } from "lucide-react";

import { services, getServiceBySlug } from "@/content/services";
import { processStages } from "@/content/process";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { WebApplicationsHero } from "@/components/sections/web-applications-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = service.icon;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.overview,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {service.slug === "web-applications" ? (
        <WebApplicationsHero overview={service.overview} />
      ) : (
      <PageHero eyebrow="Services">
        <div className="mt-1 flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-muted">
            <Icon className="size-6" />
          </span>
        </div>
        <h1 className="mt-6 max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {service.title}
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
          {service.overview}
        </p>
      </PageHero>
      )}

      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading title="Capabilities" className="max-w-none" />
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {cap}
                </li>
              ))}
            </ul>

            <h3 className="mt-14 text-xl font-medium">What we build</h3>
            <ul className="mt-6 space-y-3">
              {service.whatWeBuild.map((item) => (
                <li key={item} className="rounded-xl border border-border p-4 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl border border-border bg-muted p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Our process
            </h3>
            <ol className="mt-4 space-y-2">
              {processStages.slice(0, 5).map((stage) => (
                <li key={stage.number} className="flex items-center gap-3 text-sm">
                  <span className="font-display text-accent">{stage.number}</span>
                  {stage.title}
                </li>
              ))}
            </ol>
            <Link
              href="/process"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent"
            >
              See full process <ArrowUpRight className="size-3.5" />
            </Link>
          </aside>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <Reveal className="mt-10 max-w-2xl">
          <Accordion type="single" collapsible>
            {service.faq.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}
