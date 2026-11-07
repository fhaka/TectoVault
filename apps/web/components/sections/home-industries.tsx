import Link from "@/components/i18n/link";

import { industries } from "@/content/industries";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { getTx } from "@/lib/i18n/server";

export async function HomeIndustries() {
  const tx = await getTx();
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow={tx("Who we work with")}
        title={tx("Focused industry experience")}
        description={tx("We bring domain understanding, not just code, to the sectors we work in most.")}
      />

      <div className="mt-10 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:mt-14 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {industries.map((industry, i) => {
          const Icon = industry.icon;
          return (
            <Reveal key={industry.slug} delay={i * 0.04}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-accent sm:p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-medium">{tx(industry.title)}</span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
