import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { DEMOS } from "@/lib/demos";
import { INDUSTRIES } from "@/lib/industries";
import { PRODUCTS, productHref } from "@/lib/products";
import { siteConfig } from "@/lib/siteConfig";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${siteConfig.url}${p}`;
  const build = new Date();

  type Entry = MetadataRoute.Sitemap[number];
  const staticPages: Entry[] = ([
    { url: url("/"), priority: 1, changeFrequency: "weekly" },
    { url: url("/about/"), priority: 0.8, changeFrequency: "monthly" },
    { url: url("/products/"), priority: 0.9, changeFrequency: "weekly" },
    { url: url("/services/"), priority: 0.8, changeFrequency: "monthly" },
    { url: url("/services/printing/"), priority: 0.8, changeFrequency: "monthly" },
    { url: url("/demos/"), priority: 0.8, changeFrequency: "monthly" },
    { url: url("/industries/"), priority: 0.7, changeFrequency: "monthly" },
    { url: url("/portfolio/"), priority: 0.8, changeFrequency: "monthly" },
    { url: url("/blog/"), priority: 0.9, changeFrequency: "weekly" },
    { url: url("/contact/"), priority: 0.8, changeFrequency: "yearly" },
  ] as Entry[]).map((e) => ({ ...e, lastModified: build }));

  const products = PRODUCTS.map((p) => ({
    url: url(productHref(p)),
    lastModified: build,
    priority: p.status === "active" ? 0.8 : 0.5,
    changeFrequency: "monthly" as const,
  }));
  const demos = DEMOS.map((d) => ({ url: url(d.href), lastModified: build, priority: 0.7, changeFrequency: "monthly" as const }));
  const industries = INDUSTRIES.map((i) => ({ url: url(`/industries/${i.slug}/`), lastModified: build, priority: 0.5, changeFrequency: "monthly" as const }));
  const posts = BLOG_POSTS.map((p) => ({
    url: url(`/blog/${p.slug}/`),
    lastModified: new Date(`${p.date}T00:00:00Z`),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...products, ...demos, ...industries, ...posts];
}
