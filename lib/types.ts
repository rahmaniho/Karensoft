export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** توضیح متا (SEO) */
  description: string;
  /** دسته‌بندی نمایشی (فارسی) */
  category: string;
  /** تاریخ انتشار میلادی ISO (YYYY-MM-DD) */
  date: string;
  author: string;
  tags: string[];
  /** مسیر تصویر شاخص داخل public/ */
  image: string;
  /** زمان مطالعه به دقیقه */
  readingTime: number;
  faq?: FaqItem[];
  /** متن کامل مقاله — HTML پاک‌سازی‌شده */
  content: string;
}

export interface PrintCategory {
  id: string;
  title: string;
  short: string;
  icon: string;
  image?: string;
  desc: string;
  bullets: string[];
  faqs: { q: string; a: string }[];
}

export interface PrintProduct {
  id: string;
  category: string;
  name: string;
  emoji: string;
  tag: string;
  desc: string;
  image?: string;
  icon?: string;
  turnaround: string;
  rush?: string;
  tips: string[];
}

export interface PrintWork {
  image?: string;
  alt: string;
  badge: string;
  title: string;
  desc: string;
  category: string;
}

export interface BreadcrumbItem {
  name: string;
  /** مسیر نسبی، مثل /blog/ */
  path: string;
}
