import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";
import { blogPosts } from "@/content/blog";
import { jobPostings } from "@/content/careers";
import { locales, localizePath } from "@/lib/i18n/config";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type StaticRouteDef = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRouteDefs: StaticRouteDef[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/services", changeFrequency: "weekly", priority: 0.9 },
    { path: "/solutions", changeFrequency: "weekly", priority: 0.9 },
    { path: "/industries", changeFrequency: "weekly", priority: 0.8 },
    { path: "/work", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/process", changeFrequency: "monthly", priority: 0.6 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/request-quote", changeFrequency: "monthly", priority: 0.8 },
    { path: "/careers", changeFrequency: "weekly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
  ];

  // Every page exists in each language: English at /path, Albanian at
  // /sq/path. Each entry lists all versions so search engines link them.
  const absolute = (path: string, locale: (typeof locales)[number]) => {
    const localized = localizePath(path || "/", locale);
    return `${siteConfig.url}${localized === "/" ? "" : localized}`;
  };
  const entriesFor = (path: string, changeFrequency: ChangeFrequency, priority: number): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: absolute(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absolute(path, l)])),
      },
    }));

  const staticRoutes = staticRouteDefs.flatMap(({ path, changeFrequency, priority }) =>
    entriesFor(path, changeFrequency, priority)
  );

  const dynamicRouteDefs: { path: string; priority: number }[] = [
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.9 })),
    ...solutions.map((s) => ({ path: `/solutions/${s.slug}`, priority: 0.8 })),
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.7 })),
    ...jobPostings.map((j) => ({ path: `/careers/${j.slug}`, priority: 0.5 })),
  ];

  const dynamicRoutes = dynamicRouteDefs.flatMap(({ path, priority }) => entriesFor(path, "monthly", priority));

  // Blog posts exist in one language only: one entry, no alternates.
  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absolute(`/blog/${post.slug}`, post.locale),
    lastModified: new Date(`${post.date}T12:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamicRoutes, ...postRoutes];
}
