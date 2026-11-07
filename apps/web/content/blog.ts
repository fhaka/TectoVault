import type { Locale } from "@/lib/i18n/dictionaries";
import { postsSq } from "./blog-posts-sq";

// Blog posts. Each post is written in one language and only exists at that
// language's URL (an Albanian post lives at /sq/blog/<slug> only). Per the
// content rules: real, useful articles only — no placeholder posts, no
// invented statistics, clients or quotes.

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export interface BlogPost {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  /** One of blogCategories (English key; translated for display). */
  category: string;
  author: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  readingTime: string;
  content: BlogBlock[];
}

export const blogPosts: BlogPost[] = [...postsSq];

export const blogCategories = [
  "AI Agents",
  "Technology",
  "Software",
  "Cloud",
  "Cybersecurity",
  "Business",
  "Company",
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function postsFor(locale: Locale) {
  return blogPosts
    .filter((p) => p.locale === locale)
    .sort((a, b) => b.date.localeCompare(a.date));
}
