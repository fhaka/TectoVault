import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { processStages } from "@/content/process";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

export function HomeProcess() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="How we work"
          title="A clear, predictable process"
          description="No surprises — you always know what happens next."
        />
        <Button asChild variant="outline">
          <Link href="/process">
            See the full process <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 min-[380px]:grid-cols-2 sm:mt-14 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-7">
        {processStages.map((stage, i) => (
          <Reveal key={stage.number} delay={i * 0.04}>
            <div className="font-display text-3xl font-semibold text-accent">{stage.number}</div>
            <div className="mt-2 text-sm font-medium">{stage.title}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
