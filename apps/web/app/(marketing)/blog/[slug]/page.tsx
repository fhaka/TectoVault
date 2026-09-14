import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogPosts, getPostBySlug } from "@/content/blog";
import { FinalCta } from "@/components/sections/final-cta";

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
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
