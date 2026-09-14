export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  content: string;
}

// No posts are published yet — per the content rules, we never publish
// placeholder or fake articles. Add real posts here as they're written.
export const blogPosts: BlogPost[] = [];

export const blogCategories = [
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
