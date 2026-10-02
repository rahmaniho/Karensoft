export type PortfolioCategory = "website" | "software" | "print";

export interface PortfolioItem {
  slug: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  summary: string;
  image: string;
  imageAlt: string;
  tags: string[];
  href: string;
  cta: string;
}

export const PORTFOLIO_CATEGORY_LABEL: Record<PortfolioCategory | "all", string> = {
  all: "همه",
  website: "طراحی وب",
  software: "نرم‌افزار",
  print: "چاپ و برندینگ",
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "vokalahome",
    title: "خانه وکلا — Vokalahome",
    client: "کافه و باشگاه تخصصی وکلا، قزوین",
    category: "website",
    summary:
      "وب‌سایت استاتیک و سریع با مقالات، پروفایل وکلا، گالری، تور مجازی ۳۶۰ درجه، PWA و سئوی کامل؛ با امتیاز ۱۰۰ در دسترس‌پذیری، بهترین شیوه‌ها و سئو.",
    image: "/images/demos/vokalahome/hero.webp",
    imageAlt: "نمونه کار وب‌سایت خانه وکلا",
    tags: ["Next.js 14", "PWA", "سئو", "تور ۳۶۰°"],
    href: "/demos/vokalahome/",
    cta: "مشاهده دمو",
  },
  {
    slug: "najafisahar",
    title: "سالن زیبایی و آکادمی سحر نجفی",
    client: "سحر نجفی — قزوین، چهارراه محمد رسول‌الله",
    category: "website",
    summary:
      "وب‌سایت تک‌صفحه‌ای برای معرفی خدمات میکاپ عروس، شنیون و کاشت ناخن به‌همراه آکادمی آنلاین؛ با تمرکز بر جذب مشتری محلی و رزرو سریع نوبت.",
    image: "/images/hero-sahar.webp",
    imageAlt: "نمونه کار طراحی سایت سالن زیبایی سحر نجفی",
    tags: ["One-Page", "سئوی محلی", "گالری", "رزرو نوبت"],
    href: "/demos/najafisahar/",
    cta: "مشاهده دمو",
  },
  {
    slug: "sahar-najafi",
    title: "سالن و آکادمی تخصصی ناخن سحر نجفی",
    client: "سحر نجفی — قزوین",
    category: "website",
    summary:
      "نسخهٔ توسعه‌یافته با تمرکز بر مانیکور روسی، کاشت پلی‌ژل بدون اسید و دوره‌های آکادمی؛ شامل تعرفه خدمات، ویدیوها، نظرات مشتریان و انیمیشن اسکرول.",
    image: "/images/saharnajafi.webp",
    imageAlt: "نمونه کار وب‌سایت سالن ناخن سحر نجفی",
    tags: ["تعرفه خدمات", "آکادمی", "Schema.org", "انیمیشن"],
    href: "/demos/sahar-najafi/",
    cta: "مشاهده دمو",
  },
  {
    slug: "law-office",
    title: "نرم‌افزار مدیریت دفتر وکالت هوشمند",
    client: "محصول کارن سافت",
    category: "software",
    summary: "مدیریت پرونده‌ها، قراردادها، جلسات، مالی و مکاتبات حقوقی در یک نرم‌افزار یکپارچه.",
    image: "/images/slider/dashboard/1.webp",
    imageAlt: "داشبورد نرم‌افزار دفتر وکالت",
    tags: ["دسکتاپ", "گزارش‌ساز", "تقویم شمسی"],
    href: "/products/law-office/",
    cta: "جزئیات محصول",
  },
  {
    slug: "taxi-software",
    title: "نرم‌افزار رایگان مدیریت تاکسی تلفنی",
    client: "خدمت اجتماعی کارن سافت",
    category: "software",
    summary: "داشبورد زنده، ثبت سفر با کرایه خودکار، حسابداری و پشتیبان‌گیری؛ رایگان برای همه آژانس‌ها.",
    image: "/images/taxi-karensoft.webp",
    imageAlt: "نرم‌افزار مدیریت تاکسی تلفنی",
    tags: ["رایگان", "تحت وب", "حسابداری"],
    href: "/products/taxi-software/",
    cta: "جزئیات و دریافت",
  },
  {
    slug: "karen-chap",
    title: "کارن چاپ — سفارش آنلاین چاپ، مهر و صحافی",
    client: "کارن چاپ، شهرصنعتی البرز قزوین",
    category: "print",
    summary: "وب‌اپ سفارش آنلاین با فرم پیکربندی دقیق هر محصول، نمونه‌کارها و ارسال سفارش با کد پیگیری.",
    image: "/images/karenchap.webp",
    imageAlt: "لوگوی کارن چاپ",
    tags: ["چاپ", "مهر", "صحافی", "سفارش آنلاین"],
    href: "/services/printing/",
    cta: "مشاهده خدمات",
  },
];
