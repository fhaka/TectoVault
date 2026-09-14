import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/content/services";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";

export function HomeServices() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we do"
        title="End-to-end digital product development"
        description="From marketing websites to full software platforms — one team across design, engineering and infrastructure."
      />

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.slug} delay={i * 0.05} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between bg-card p-7 transition-colors hover:bg-muted"
              >
                <div>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-medium">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowUpRight className="size-3.5" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
