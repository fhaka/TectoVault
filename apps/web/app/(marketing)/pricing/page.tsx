import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PricingHero } from "@/components/sections/pricing-hero";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "How we price projects — based on scope, complexity and requirements, not one-size-fits-all packages.",
};

const factors = [
  "Scope & number of features",
  "Design & UX requirements",
  "Integrations with other systems",
  "Infrastructure & hosting needs",
  "Timeline",
];

const categories = [
  { title: "AI Agents", description: "Voice and chat agents for customers and teams." },
  { title: "Business Automation", description: "Automated workflows, orders and communication." },
  { title: "Custom Software", description: "Business management and operations systems." },
  { title: "Web Applications", description: "Interactive, account-based platforms." },
  { title: "Mobile Applications", description: "iOS and Android apps for customers and staff." },
  { title: "AI Integration", description: "Adding AI into your existing systems." },
  { title: "Digital Transformation", description: "Turning manual processes into digital ones." },
  { title: "Intelligent Operations", description: "Connected dashboards and business intelligence." },
  { title: "Web Development", description: "Corporate and marketing websites." },
  { title: "Cloud & DevOps", description: "Infrastructure, deployment and monitoring." },
  { title: "Maintenance & Support", description: "Ongoing care after launch." },
];

export default function PricingPage() {
  return (
    <>
      <PricingHero />

      <Section>
        <SectionHeading title="What determines the price" />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {factors.map((factor) => (
            <li key={factor} className="rounded-xl border border-border p-5 text-sm font-medium">
              {factor}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Project types" title="Categories we typically scope" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-medium">{category.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent"
                >
                  Get a quote <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border bg-card p-10 text-center md:p-16">
          <h2 className="text-balance text-3xl font-medium md:text-4xl">
            Want an accurate number for your project?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Every project is priced individually, based on scope, complexity, functionality and
            difficulty — not a fixed package. Tell us what you&rsquo;re building and we&rsquo;ll
            come back with a real estimate.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-8">
            <Link href="/contact">
              Contact Us <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
