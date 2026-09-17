import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";
import { blogPosts } from "@/content/blog";
import { jobPostings } from "@/content/careers";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
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
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const dynamicRoutes = [
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.9 })),
    ...solutions.map((s) => ({ path: `/solutions/${s.slug}`, priority: 0.8 })),
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.7 })),
    ...blogPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6 })),
    ...jobPostings.map((j) => ({ path: `/careers/${j.slug}`, priority: 0.5 })),
  ].map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
