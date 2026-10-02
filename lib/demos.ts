export type DemoCategory = "website" | "software" | "landing";

export interface Demo {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: DemoCategory;
  image: string;
  imageAlt: string;
  tech: string[];
  highlights: string[];
  /** صفحهٔ اختصاصی دارد (در [slug] ساخته نمی‌شود) */
  dedicated: boolean;
  /** مسیر کامل صفحهٔ دمو در سایت */
  href: string;
  /** آدرس دموی زنده: مسیر داخلی یا لینک خارجی */
  liveUrl: string;
  external?: boolean;
}

export const DEMO_CATEGORY_LABEL: Record<DemoCategory | "all", string> = {
  all: "همه",
  website: "وب‌سایت",
  landing: "لندینگ پیج",
  software: "نرم‌افزار",
};

export const DEMOS: Demo[] = [
  {
    slug: "vokalahome",
    title: "خانه وکلا (Vokalahome)",
    subtitle: "کافه و باشگاه تخصصی وکلا",
    description:
      "وب‌سایت استاتیک Next.js 14 برای کافه و باشگاه تخصصی وکلا؛ با مقالات، پروفایل وکلا، صفحات خدمات، گالری، تور مجازی ۳۶۰ درجه، PWA و سئوی کامل.",
    category: "website",
    image: "/images/demos/vokalahome/hero.webp",
    imageAlt: "کافه و باشگاه تخصصی خانه وکلا",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "PWA"],
    highlights: ["تور مجازی ۳۶۰ درجه", "پروفایل وکلا", "مقالات و سئو", "رزرو اتاق مشاوره"],
    dedicated: true,
    href: "/demos/vokalahome/",
    liveUrl: "https://rahmaniho.github.io/Vokalahome/",
    external: true,
  },
  {
    slug: "sahar-najafi",
    title: "سالن و آکادمی ناخن سحر نجفی",
    subtitle: "سالن تخصصی ناخن و آکادمی بین‌المللی — قزوین",
    description:
      "وب‌سایت تخصصی مانیکور روسی، کاشت پلی‌ژل بدون اسید و دوره‌های آکادمی؛ شامل گالری، ویدیوها، تعرفه خدمات، نظرات مشتریان و رزرو نوبت.",
    category: "website",
    image: "/images/saharnajafi.webp",
    imageAlt: "لوگوی سالن و آکادمی ناخن سحر نجفی",
    tech: ["HTML5", "CSS3", "JavaScript", "Schema.org"],
    highlights: ["مانیکور روسی", "آکادمی بین‌المللی", "گالری و ویدیو", "رزرو آنلاین"],
    dedicated: true,
    href: "/demos/sahar-najafi/",
    liveUrl: "/live/sahar-najafi/",
  },
  {
    slug: "najafisahar",
    title: "لندینگ سالن زیبایی سحر نجفی",
    subtitle: "میکاپ عروس، شنیون و کاشت ناخن",
    description:
      "لندینگ پیج تک‌صفحه‌ای سالن زیبایی با تمرکز بر جذب مشتری محلی: خدمات، نمونه‌کار، آکادمی آنلاین، نظرات و رزرو نوبت فوری.",
    category: "landing",
    image: "/images/hero-sahar.webp",
    imageAlt: "سحر نجفی، بنیان‌گذار سالن زیبایی",
    tech: ["One-Page", "RTL", "سئوی محلی", "رزرو سریع"],
    highlights: ["پکیج عروس", "آکادمی آنلاین", "نمونه‌کارها", "تماس و واتساپ"],
    dedicated: true,
    href: "/demos/najafisahar/",
    liveUrl: "/live/najafisahar/",
  },
  {
    slug: "taxi-app",
    title: "اپ مدیریت تاکسی تلفنی",
    subtitle: "نرم‌افزار رایگان — اجرای زنده در مرورگر",
    description:
      "نسخهٔ زندهٔ نرم‌افزار رایگان مدیریت تاکسی تلفنی؛ داشبورد، رانندگان، مشترکین، ثبت سفر، حسابداری و پشتیبان‌گیری. داده‌ها فقط روی دستگاه شما می‌مانند.",
    category: "software",
    image: "/images/taxi-karensoft.webp",
    imageAlt: "نرم‌افزار مدیریت تاکسی تلفنی کارن سافت",
    tech: ["Web App", "Chart.js", "LocalStorage", "PWA"],
    highlights: ["داشبورد زنده", "ثبت سفر و کرایه", "حسابداری", "پشتیبان‌گیری JSON"],
    dedicated: false,
    href: "/demos/taxi-app/",
    liveUrl: "/taxi-app/",
  },
  {
    slug: "law-office",
    title: "نرم‌افزار مدیریت دفتر وکالت",
    subtitle: "پرونده، موکل، جلسات و مالی",
    description:
      "معرفی نرم‌افزار دسکتاپ مدیریت دفتر وکالت هوشمند: مدیریت پرونده‌ها، قراردادها، جلسات، مالی و مکاتبات حقوقی، همراه با نسخهٔ آزمایشی.",
    category: "software",
    image: "/images/app-icon-law-office.webp",
    imageAlt: "نماد نرم‌افزار دفتر وکالت",
    tech: ["ذخیره‌سازی آفلاین", "تقویم شمسی", "دستیار AI", "خروجی PDF"],
    highlights: ["مدیریت پرونده", "تقویم جلسات", "قراردادها", "گزارش مالی"],
    dedicated: false,
    href: "/demos/law-office/",
    liveUrl: "/live/law-office/",
  },
];

export const GENERIC_DEMOS: Demo[] = DEMOS.filter((d) => !d.dedicated);

export function getDemo(slug: string): Demo | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
