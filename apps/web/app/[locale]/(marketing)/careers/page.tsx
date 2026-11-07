import type { Metadata } from "next";
import { Heart, TrendingUp, Users } from "lucide-react";

import { jobPostings } from "@/content/careers";
import { PageHero } from "@/components/shared/page-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { GeneralApplicationForm } from "@/components/forms/general-application-form";
import { getTx } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/careers",
    { en: "Careers", sq: "Karriera" },
    {
      en: "Join TectoVault in Tirana, Albania. See open positions or send us your CV.",
      sq: "Bashkohuni me TectoVault në Tiranë, Shqipëri. Shikoni pozicionet e hapura ose na dërgoni CV-në tuaj.",
    }
  );
}

const values = [
  {
    icon: Users,
    title: "Small, hands-on team",
    description: "You'll work directly on real client projects, not buried in process.",
  },
  {
    icon: TrendingUp,
    title: "Room to grow",
    description: "As the company grows, so does the scope of what you own.",
  },
  {
    icon: Heart,
    title: "Quality over speed-at-all-costs",
    description: "We care about building things properly, not just shipping fast.",
  },
];

export default async function CareersPage() {
  const tx = await getTx();
  return (
    <>
      <PageHero
        eyebrow={tx("Careers")}
        title={tx("Build the future with us.")}
        description={tx("We're a small, focused software studio — here's what it's like to work with us.")}
      />

      <Section>
        <SectionHeading eyebrow={tx("Why work with us")} title={tx("What we value")} />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={tx(value.title)}>
                <span className="flex size-11 items-center justify-center rounded-xl bg-muted">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-medium">{tx(value.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tx(value.description)}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={tx("Open positions")} title={tx("Current openings")} />
        {jobPostings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-muted-foreground">
              {tx("We don’t have any open positions right now, but we’re always interested in meeting talented people.")}
            </p>
          </div>
        ) : null}
      </Section>

      <Section>
        <SectionHeading eyebrow={tx("General application")} title={tx("Send us your CV")} description={tx("Even without an open role, we're happy to keep good people in mind for the future.")} />
        <div className="mt-10 max-w-xl">
          <GeneralApplicationForm />
        </div>
      </Section>
    </>
  );
}
