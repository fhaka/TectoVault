import type { Metadata } from "next";
import { Newspaper } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { blogPosts, blogCategories } from "@/content/blog";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";

const title = "Blog";
const description = "Insights on software, cloud and building better digital products.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: { title: `${title} — ${siteConfig.name}`, description, url: `${siteConfig.url}/blog` },
  twitter: { title: `${title} — ${siteConfig.name}`, description },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights & Notes"
        description="Thoughts on software, cloud infrastructure and building digital products properly."
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
            >
              {category}
            </span>
          ))}
        </div>

        {blogPosts.length === 0 ? (
          <div className="mt-14 flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
            <Newspaper className="size-9 text-muted-foreground" />
            <h2 className="mt-5 text-xl font-medium">No articles published yet</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              We&rsquo;re working on our first posts. Check back soon for insights on software, cloud and business technology.
            </p>
          </div>
        ) : null}
      </Section>

      <FinalCta />
    </>
  );
}
