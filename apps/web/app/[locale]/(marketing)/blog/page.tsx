import type { Metadata } from "next";
import { Newspaper } from "lucide-react";

import { blogPosts, blogCategories } from "@/content/blog";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";
import { getTx } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/blog",
    { en: "Blog", sq: "Blog" },
    {
      en: "Insights on software, cloud and building better digital products.",
      sq: "Ide mbi softuerin, cloud-in dhe ndërtimin e produkteve digjitale më të mira.",
    }
  );
}

export default async function BlogPage() {
  const tx = await getTx();
  return (
    <>
      <PageHero
        eyebrow={tx("Blog")}
        title={tx("Insights & Notes")}
        description={tx("Thoughts on software, cloud infrastructure and building digital products properly.")}
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
            >
              {tx(category)}
            </span>
          ))}
        </div>

        {blogPosts.length === 0 ? (
          <div className="mt-14 flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
            <Newspaper className="size-9 text-muted-foreground" />
            <h2 className="mt-5 text-xl font-medium">{tx("No articles published yet")}</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {tx("We’re working on our first posts. Check back soon for insights on software, cloud and business technology.")}
            </p>
          </div>
        ) : null}
      </Section>

      <FinalCta />
    </>
  );
}
