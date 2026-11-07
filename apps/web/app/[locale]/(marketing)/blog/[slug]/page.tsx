import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Bot } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { getPostBySlug, postsFor, type BlogBlock } from "@/content/blog";
import { FinalCta } from "@/components/sections/final-cta";
import { OpenAgentButton } from "@/components/agent/agent-chat";
import Link from "@/components/i18n/link";
import { Button } from "@/components/ui/button";
import { getLocale, getT, getTx, ogImage } from "@/lib/i18n/server";
import { localizePath, ogLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/dictionaries";

// Posts exist in one language only, so each locale builds just its own.
export async function generateStaticParams() {
  const locale = await getLocale();
  return postsFor(locale).map((p) => ({ slug: p.slug }));
}

function absolute(path: string, locale: Locale) {
  const localized = localizePath(path, locale);
  return `${siteConfig.url}${localized === "/" ? "" : localized}`;
}

async function findPost(slug: string) {
  const locale = await getLocale();
  const post = getPostBySlug(slug);
  return post && post.locale === locale ? { post, locale } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = await findPost((await params).slug);
  if (!found) return {};
  const { post, locale } = found;
  const url = absolute(`/blog/${post.slug}`, locale);
  return {
    title: post.title,
    description: post.excerpt,
    // Only this language exists, so no hreflang alternates to other locales.
    alternates: { canonical: url, languages: { [locale]: url } },
    openGraph: {
      type: "article",
      url,
      locale: ogLocale[locale],
      title: `${post.title} — ${siteConfig.name}`,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [ogImage(locale, "ai-agents")],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — ${siteConfig.name}`,
      description: post.excerpt,
      images: [ogImage(locale, "ai-agents").url],
    },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 text-2xl font-medium tracking-tight md:text-3xl">{block.text}</h2>;
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-relaxed text-foreground/85">
              <span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <p className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-6 text-lg leading-relaxed">{block.text}</p>
      );
    default:
      return <p className="mt-5 text-lg leading-relaxed text-foreground/85">{block.text}</p>;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const found = await findPost((await params).slug);
  if (!found) notFound();
  const { post, locale } = found;
  const t = await getT();
  const tx = await getTx();

  const url = absolute(`/blog/${post.slug}`, locale);
  const image = `${siteConfig.url}${ogImage(locale, "ai-agents").url}`;
  const date = new Intl.DateTimeFormat(locale === "sq" ? "sq-AL" : "en-GB", { dateStyle: "long" }).format(
    new Date(`${post.date}T12:00:00Z`)
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    inLanguage: locale,
    image,
    author: { "@type": "Organization", name: post.author, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon-512.png` },
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
      { "@type": "ListItem", position: 1, name: locale === "sq" ? "Kreu" : "Home", item: absolute("/", locale) },
      { "@type": "ListItem", position: 2, name: "Blog", item: absolute("/blog", locale) },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article className="pb-20 pt-36 md:pt-44">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> {t("blog.back")}
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{tx(post.category)}</p>
          <h1 className="mt-4 text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-border pb-8 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{date}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="mt-4">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <aside className="mt-16 rounded-3xl bg-ink p-8 text-ink-foreground md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("blog.cta.eyebrow")}</p>
            <p className="mt-3 text-2xl font-medium">{t("blog.cta.title")}</p>
            <p className="mt-3 text-ink-muted">{t("blog.cta.body")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="accent" size="lg">
                <OpenAgentButton>
                  <Bot className="size-4" />
                  {t("agentChat.tryLive")}
                </OpenAgentButton>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/pricing#ai-agents">
                  {t("blog.cta.packages")}
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </aside>
          </div>
        </div>
      </article>

      <FinalCta variant="agents" />
    </>
  );
}
