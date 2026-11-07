import Link from "@/components/i18n/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/content/services";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { getTx } from "@/lib/i18n/server";

// AI Agents is the flagship offer, so it gets the large lead card; everything
// else (web applications included) follows in the regular grid.
const featured = services.find((s) => s.slug === "ai-agents");
const rest = services.filter((s) => s.slug !== "ai-agents");

export async function HomeServices() {
  const tx = await getTx();
  return (
    <Section id="services">
      <SectionHeading
        eyebrow={tx("What we do")}
        title={tx("AI agents first. Full software when you need it.")}
        description={tx("We lead with AI agents that do real work for your business — and back them with the automation, web applications and infrastructure they run on.")}
      />

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {featured ? (
          <Reveal className="h-full sm:col-span-2 lg:row-span-2">
            <Link
              href={`/services/${featured.slug}`}
              className="group relative flex h-full flex-col justify-between overflow-hidden bg-ink p-8 text-ink-foreground md:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/25 blur-3xl transition-transform duration-700 group-hover:scale-125"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <featured.icon className="size-6" />
                  </span>
                  <span className="flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                    {tx("Our focus")}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-medium md:text-3xl">{tx(featured.title)}</h3>
                <p className="mt-3 max-w-md text-ink-muted">{tx(featured.overview)}</p>
              </div>
              <ul className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80">
                {featured.capabilities.slice(0, 6).map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-accent" />
                    {tx(c)}
                  </li>
                ))}
              </ul>
              <div className="relative mt-8 flex items-center gap-1 text-sm font-medium text-accent">
                {tx("Learn more")} <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </Reveal>
        ) : null}
        {rest.map((service, i) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.slug} delay={(i + 1) * 0.05} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between bg-card p-7 transition-colors hover:bg-muted"
              >
                <div>
                  <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-medium">{tx(service.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tx(service.shortDescription)}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  {tx("Learn more")} <ArrowUpRight className="size-3.5" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
