import type { Metadata } from "next";
import { ArrowUpRight, Newspaper } from "lucide-react";

import { blogCategories, postsFor } from "@/content/blog";
import Link from "@/components/i18n/link";
import { localizePath } from "@/lib/i18n/config";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { FinalCta } from "@/components/sections/final-cta";
import { getLocale, getT, getTx, pageMetadata } from "@/lib/i18n/server";

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
  const locale = await getLocale();
  const t = await getT();
  const tx = await getTx();
  const posts = postsFor(locale);
  const categories = blogCategories.filter((c) => posts.some((p) => p.category === c));
  const otherLocale = locale === "sq" ? "en" : "sq";
  const otherLanguageCount = postsFor(otherLocale).length;
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "sq" ? "sq-AL" : "en-GB", { dateStyle: "medium" }).format(
      new Date(`${iso}T12:00:00Z`)
    );
  return (
    <>
      <PageHero
        eyebrow={tx("Blog")}
        title={tx("Insights & Notes")}
        description={tx("Thoughts on software, cloud infrastructure and building digital products properly.")}
      />

      <Section>
        {posts.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
                >
                  {tx(category)}
                </span>
              ))}
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-3xl border border-border bg-card p-7 transition-colors hover:border-accent md:p-8"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{tx(post.category)}</p>
                  <h2 className="mt-4 text-balance text-2xl font-medium leading-snug tracking-tight">{post.title}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-accent">
                      {t("blog.read")}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
            <Newspaper className="size-9 text-muted-foreground" />
            <h2 className="mt-5 text-xl font-medium">{tx("No articles published yet")}</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {tx("We’re working on our first posts. Check back soon for insights on software, cloud and business technology.")}
            </p>
            {otherLanguageCount > 0 ? (
              <Link
                href={localizePath("/blog", otherLocale)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                {t("blog.otherLanguage")} <ArrowUpRight className="size-3.5" />
              </Link>
            ) : null}
          </div>
        )}
      </Section>

      <FinalCta />
    </>
  );
}
