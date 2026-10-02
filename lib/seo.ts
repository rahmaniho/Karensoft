import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { absoluteUrl } from "@/lib/utils";

interface BuildMetadataInput {
  title: string;
  description: string;
  /** مسیر نسبی صفحه، مثل /blog/ */
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
  noindex?: boolean;
}

/**
 * ساخت Metadata یکدست برای هر صفحه: عنوان، توضیح، canonical، OpenGraph و Twitter.
 * عنوان از طریق title.template در layout با «| کارن سافت» تکمیل می‌شود.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  type = "website",
  publishedTime,
  keywords,
  noindex,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: imageUrl }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [imageUrl],
    },
  };
}
