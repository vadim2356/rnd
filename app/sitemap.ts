import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { CITY_SLUGS } from "@/data/cities";
import { SERVICE_SLUGS } from "@/data/services";
import { SOLUTION_SLUGS } from "@/data/solutions";
import { BLOG_SLUGS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const entries: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/solutions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/goroda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/prices`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sitemap`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  for (const slug of SERVICE_SLUGS) {
    entries.push({
      url: `${base}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const slug of SOLUTION_SLUGS) {
    entries.push({
      url: `${base}/solutions/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const slug of BLOG_SLUGS) {
    entries.push({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const citySlug of CITY_SLUGS) {
    entries.push({
      url: `${base}/${citySlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    entries.push({
      url: `${base}/${citySlug}/prices`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const serviceSlug of SERVICE_SLUGS) {
      entries.push({
        url: `${base}/${citySlug}/${serviceSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
    for (const solutionSlug of SOLUTION_SLUGS) {
      entries.push({
        url: `${base}/${citySlug}/solutions/${solutionSlug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
