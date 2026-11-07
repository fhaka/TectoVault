import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { blogPosts, getPostBySlug } from "@/content/blog";
import { FinalCta } from "@/components/sections/final-cta";
import { getLocale, pageMetadata } from "@/lib/i18n/server";
import { localizePath } from "@/lib/i18n/config";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const meta = await pageMetadata(
    `/blog/${slug}`,
    { en: post.title, sq: post.title },
    { en: post.excerpt, sq: post.excerpt }
  );
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date, authors: [post.author] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const locale = await getLocale();
  const abs = (path: string) => `${siteConfig.url}${localizePath(path, locale) === "/" ? "" : localizePath(path, locale)}`;
  const url = abs(`/blog/${slug}`);
  const defaultImage = `${siteConfig.url}/icon-512.png`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: defaultImage,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: defaultImage },
    },
    datePublished: post.date,
    // No separate last-edited tracking exists in the content model — the
    // most accurate honest default is "unchanged since publish".
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "sq" ? "Kreu" : "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: locale === "sq" ? "Blog" : "Blog", item: abs("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="pb-20 pt-36 md:pt-44">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{post.category}</p>
          <h1 className="mt-4 text-balance text-4xl font-medium leading-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <span>{post.date}</span>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="prose prose-neutral mt-12 max-w-none">
            <p>{post.content}</p>
          </div>
        </div>
      </article>

      <FinalCta />
    </>
  );
}
