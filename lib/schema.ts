import type { BlogPost, BreadcrumbItem, FaqItem } from "@/lib/types";
import { siteConfig } from "@/lib/siteConfig";
import { absoluteUrl, stripHtml } from "@/lib/utils";

type JsonLd = Record<string, unknown>;

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

export function organizationLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: siteConfig.nameEn,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    foundingDate: String(siteConfig.founded.gregorian),
    founder: { "@type": "Person", name: siteConfig.founder },
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressCountry: "IR",
      streetAddress: siteConfig.address,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer support",
        areaServed: "IR",
        availableLanguage: ["fa"],
      },
    ],
    sameAs: Object.values(siteConfig.socials),
  };
}

export function websiteLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteConfig.url,
    name: siteConfig.title,
    inLanguage: "fa-IR",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbLd(items: BreadcrumbItem[]): JsonLd {
  const all: BreadcrumbItem[] = [{ name: "خانه", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqLd(faqs: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleLd(post: BlogPost): JsonLd {
  const url = absoluteUrl(`/blog/${post.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.description,
    image: [`${siteConfig.url}${post.image}`],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "fa-IR",
    keywords: post.tags.join(", "),
    wordCount: stripHtml(post.content).split(" ").length,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": ORG_ID, "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: `${siteConfig.url}/images/logo.png` } },
  };
}

export function softwareLd(input: { name: string; description: string; path: string; free?: boolean; features: string[] }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "fa-IR",
    ...(input.free
      ? { offers: { "@type": "Offer", price: "0", priceCurrency: "IRR", availability: "https://schema.org/InStock" } }
      : {}),
    featureList: input.features,
    author: { "@id": ORG_ID },
  };
}

export function collectionLd(input: { name: string; description: string; path: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "fa-IR",
    isPartOf: { "@id": SITE_ID },
  };
}

export function localBusinessLd(input: { name: string; description: string; path: string; phone: string; address: string; city: string; hours?: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    telephone: input.phone,
    parentOrganization: { "@id": ORG_ID },
    address: { "@type": "PostalAddress", streetAddress: input.address, addressLocality: input.city, addressCountry: "IR" },
    ...(input.hours ? { openingHours: input.hours } : {}),
  };
}
