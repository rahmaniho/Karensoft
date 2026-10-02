import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/lib/siteConfig";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/** ساخت URL مطلق با اسلش پایانی (هم‌سو با trailingSlash: true) */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = /\.[a-z0-9]+$/i.test(clean) || clean.endsWith("/") ? clean : `${clean}/`;
  return `${siteConfig.url}${withSlash}`;
}

/** تاریخ شمسی خوانا از رشتهٔ ISO (مثلاً ۲۸ شهریور ۱۴۰۵) */
export function formatJalali(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
