import type { Metadata } from "next";

import { AboutHero } from "@/components/sections/about-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — a focused software and cloud solutions studio.`,
};

const beliefs = [
  {
    title: "Software should solve real problems",
    description:
      "We don't build features for their own sake. Every piece of work should trace back to a business problem worth solving.",
  },
  {
    title: "Clarity beats complexity",
    description:
      "Clear architecture, clear communication, clear scope. Complexity is a cost, not a sign of sophistication.",
  },
  {
    title: "Quality is not optional",
    description:
      "Performance, accessibility and maintainability aren't add-ons — they're part of what 'done' means.",
  },
];

const capabilities = [
  "Web & software engineering",
  "Cloud infrastructure & DevOps",
  "UI/UX design",
  "Business process automation",
];

export default function AboutPage() {
  return (
    <>
      <AboutHero name={siteConfig.name} description={siteConfig.description} />

      <Section>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <SectionHeading title="Who we are" className="max-w-none" />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {siteConfig.name} is a software and cloud solutions studio focused on
              building digital products properly — from marketing websites to
              full custom software platforms. We work closely with each client
              to understand the business behind the request, not just the
              feature list.
            </p>
          </div>
          <div>
            <SectionHeading title="Our philosophy" className="max-w-none" />
            <p className="mt-6 leading-relaxed text-muted-foreground">
              We&rsquo;d rather ship something focused and well-built than
              something large and half-finished. That means asking questions
              before writing code, being honest about scope and timeline, and
              treating every project as something we&rsquo;d be proud to put our
              name on.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="What we believe" title="Principles that guide our work" />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {beliefs.map((belief, i) => (
            <Reveal key={belief.title} delay={i * 0.06}>
              <h3 className="text-lg font-medium">{belief.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {belief.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Capabilities" title="What we're set up to deliver" />
        <div className="mt-10 flex flex-wrap gap-3">
          {capabilities.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Team" title="A small, focused team" description="We keep the team lean and hands-on — every project gets direct attention rather than being handed off through layers of process." />
      </Section>

      <FinalCta />
    </>
  );
}
