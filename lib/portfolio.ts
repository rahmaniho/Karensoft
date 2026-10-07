export type PortfolioCategory = "website" | "software" | "print";

export interface PortfolioItem {
  slug: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  summary: string;
  image?: string;
  imageAlt?: string;
  /** Lucide icon name used when there is no project screenshot. */
  icon: string;
  accent: string;
  tags: string[];
  /** Local project/case-study page, when available. */
  href?: string;
  /** Public preview declared by the project repository. */
  liveUrl?: string;
  /** Public source repository. */
  repoUrl?: string;
  cta?: string;
  statusLabel?: string;
  featured?: boolean;
}

export const PORTFOLIO_CATEGORY_LABEL: Record<PortfolioCategory | "all", string> = {
  all: "همه پروژه‌ها",
  website: "طراحی وب",
  software: "نرم‌افزار و محصول",
  print: "چاپ و برندینگ",
};

/**
 * نمونه‌کارهای گردآوری‌شده از پروژه‌های این مخزن و مخازن عمومی rahmaniho.
 * URLهای زنده عمداً جدا از صفحهٔ معرفی و لینک منبع نگه داشته می‌شوند تا مخاطب
 * بتواند هم خود محصول را ببیند و هم منشأ آن را بررسی کند.
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "vokalahome",
    title: "خانه وکلا — Vokalahome",
    client: "وب‌سایت کافه و باشگاه تخصصی وکلا · قزوین",
    category: "website",
    summary:
      "وب‌سایت فارسی و موبایل‌محور برای خانه وکلا؛ همراه با معرفی خدمات، پروفایل وکلا، مقالات، گالری، تور مجازی ۳۶۰ درجه و مسیر رزرو مشاوره.",
    image: "/images/demos/vokalahome/hero.webp",
    imageAlt: "پیش‌نمایش وب‌سایت خانه وکلا",
    icon: "Scale",
    accent: "#c9a227",
    tags: ["Next.js", "PWA", "سئو", "تور ۳۶۰°"],
    href: "/demos/vokalahome/",
    liveUrl: "https://rahmaniho.github.io/Vokalahome/",
    repoUrl: "https://github.com/rahmaniho/Vokalahome",
    cta: "معرفی پروژه",
    statusLabel: "وب‌سایت آنلاین",
    featured: true,
  },
  {
    slug: "dastmozd-1405",
    title: "دستمزد آرمانی ۱۴۰۵",
    client: "سامانهٔ حقوق و دستمزد · صنعت بسته‌بندی نقش آرمانی",
    category: "software",
    summary:
      "سامانهٔ آفلاین‌محور حقوق و دستمزد با پروندهٔ کارکنان، حضور و غیاب، محاسبات سالانه، فیش حقوقی، خروجی‌های بیمه و مالیات و نسخهٔ نصب‌شدنی وب/دسکتاپ.",
    image: "/images/portfolio/dastmozd-og.png",
    imageAlt: "هویت بصری سامانه دستمزد آرمانی ۱۴۰۵",
    icon: "WalletCards",
    accent: "#2dd4bf",
    tags: ["Next.js", "PWA", "آفلاین‌محور", "گزارش حقوق"],
    liveUrl: "https://rahmaniho.github.io/Dastmozd2025/",
    repoUrl: "https://github.com/rahmaniho/Dastmozd2025",
    statusLabel: "نسخهٔ آنلاین",
    featured: true,
  },
  {
    slug: "lawbook",
    title: "کتاب قانون ایران",
    client: "محصول حقوقی · تدوین محتوای حقوقی با همکاری لیلا آبکه",
    category: "software",
    summary:
      "وب‌اپلیکیشن مطالعه و جست‌وجوی قوانین ایران با جست‌وجوی فارسی، دسته‌بندی موضوعی، نشان‌گذاری و کارکرد آفلاین؛ اطلاعات شخصی مطالعه روی دستگاه کاربر می‌ماند.",
    icon: "BookOpen",
    accent: "#fbbf24",
    tags: ["PWA", "جست‌وجوی فارسی", "آفلاین", "حریم خصوصی"],
    liveUrl: "https://lawbookkarensoft.vercel.app",
    repoUrl: "https://github.com/rahmaniho/Lawbook",
    statusLabel: "وب‌اپ آنلاین",
    featured: true,
  },
  {
    slug: "qc-print",
    title: "QC Print Inspector",
    client: "سامانهٔ کنترل کیفیت چاپ صنعتی",
    category: "software",
    summary:
      "داشبورد بازرسی مرحله‌ای چاپ با ثبت شاخص‌های رنگ، رجیستر و عیوب، گردش اقدام اصلاحی و خروجی گزارش. داده‌های نمونهٔ دمو را با نتایج عملیاتی اشتباه نگیرید.",
    icon: "ShieldCheck",
    accent: "#a78bfa",
    tags: ["Next.js", "کنترل کیفیت", "گزارش PDF/Excel", "RTL"],
    liveUrl: "https://qcprint-karensoft-afsharib73-7895.vercel.app",
    repoUrl: "https://github.com/rahmaniho/QC_Print",
    statusLabel: "پیش‌نمایش محصول",
    featured: true,
  },
  {
    slug: "industrial-automation",
    title: "اتوماسیون یکپارچهٔ کارخانه",
    client: "پورتال راهکار و مستندات معماری صنعتی",
    category: "software",
    summary:
      "پورتال تعاملی برای مرور معماری مرجع، شاخص‌های کلیدی، ریسک‌ها و نقشهٔ راه یکپارچه‌سازی کارخانه؛ این نمونه، مستندات و طرح اجراست و ادعای اتصال واقعی به تجهیزات کارخانه ندارد.",
    icon: "Factory",
    accent: "#22d3ee",
    tags: ["معماری صنعتی", "KPI", "نقشهٔ راه", "پورتال داده"],
    liveUrl: "https://rahmaniho.github.io/Industrial_factory/",
    repoUrl: "https://github.com/rahmaniho/Industrial_factory",
    statusLabel: "پورتال آنلاین",
  },
  {
    slug: "karen-hse",
    title: "کارن HSE",
    client: "داشبورد نمایشی ایمنی، بهداشت و محیط زیست",
    category: "software",
    summary:
      "نمونهٔ رابط کاربری برای ثبت رویداد، بازرسی، آموزش و پیگیری اقدامات HSE؛ نسخهٔ فعلی MVP محلی است و همگام‌سازی چندکاربره یا پایگاه دادهٔ عملیاتی ندارد.",
    icon: "HardHat",
    accent: "#fb923c",
    tags: ["React", "PWA", "داشبورد", "MVP نمایشی"],
    liveUrl: "https://karensoft-hse.vercel.app",
    repoUrl: "https://github.com/rahmaniho/Karensoft-HSE",
    statusLabel: "دموی MVP",
  },
  {
    slug: "leyla-abkeh",
    title: "وب‌سایت وکیل لیلا آبکه",
    client: "دفتر وکالت و مشاورهٔ حقوقی · قزوین",
    category: "website",
    summary:
      "وب‌سایت راست‌چین معرفی وکیل پایه‌یک دادگستری، خدمات حقوقی و مسیر تماس برای مراجعان؛ طراحی واکنش‌گرا با محتوای فارسی.",
    image: "/images/blog/lawyer-website.webp",
    imageAlt: "تصویر شاخص طراحی وب‌سایت وکالت",
    icon: "Scale",
    accent: "#f0c674",
    tags: ["React", "طراحی راست‌چین", "خدمات حقوقی", "تماس سریع"],
    liveUrl: "https://rahmaniho.github.io/leyla-abkeh-lawyer-site/",
    repoUrl: "https://github.com/rahmaniho/leyla-abkeh-lawyer-site",
    statusLabel: "وب‌سایت آنلاین",
  },
  {
    slug: "najafisahar",
    title: "سالن زیبایی و آکادمی سحر نجفی",
    client: "سحر نجفی · قزوین",
    category: "website",
    summary:
      "وب‌سایت تک‌صفحه‌ای برای معرفی خدمات زیبایی، نمونه‌کارها، آکادمی آنلاین و راه سریع رزرو نوبت؛ با تمرکز بر جست‌وجوی محلی.",
    image: "/images/hero-sahar.webp",
    imageAlt: "نمونه طراحی سایت سالن زیبایی سحر نجفی",
    icon: "Sparkles",
    accent: "#f472b6",
    tags: ["One-page", "سئوی محلی", "گالری", "رزرو نوبت"],
    href: "/demos/najafisahar/",
    liveUrl: "/live/najafisahar/",
    cta: "مشاهده نمونه",
    statusLabel: "دموی داخلی",
  },
  {
    slug: "sahar-najafi",
    title: "سالن و آکادمی تخصصی ناخن سحر نجفی",
    client: "سحر نجفی · قزوین",
    category: "website",
    summary:
      "نسخهٔ توسعه‌یافته برای معرفی مانیکور روسی، خدمات سالن و دوره‌های آکادمی؛ شامل تعرفه، ویدیو، گالری و رزرو نوبت.",
    image: "/images/saharnajafi.webp",
    imageAlt: "نمونه کار وب‌سایت سالن و آکادمی ناخن سحر نجفی",
    icon: "Sparkles",
    accent: "#fb7185",
    tags: ["تعرفهٔ خدمات", "آکادمی", "گالری", "رزرو"],
    href: "/demos/sahar-najafi/",
    liveUrl: "/live/sahar-najafi/",
    cta: "مشاهده نمونه",
    statusLabel: "دموی داخلی",
  },
  {
    slug: "law-office",
    title: "مدیریت هوشمند دفتر وکالت",
    client: "محصول کارن سافت",
    category: "software",
    summary:
      "محصول مدیریت پرونده‌ها، موکلان، قراردادها، جلسات و امور مالی دفتر وکالت؛ صفحهٔ معرفی و پیش‌نمایش داخل وب‌سایت.",
    image: "/images/slider/dashboard/1.webp",
    imageAlt: "داشبورد نرم‌افزار مدیریت دفتر وکالت",
    icon: "Scale",
    accent: "#c9a227",
    tags: ["مدیریت پرونده", "تقویم شمسی", "گزارش مالی"],
    href: "/products/law-office/",
    liveUrl: "/live/law-office/",
    repoUrl: "https://github.com/rahmaniho/Karensoft",
    cta: "جزئیات محصول",
    statusLabel: "دموی داخل سایت",
  },
  {
    slug: "taxi-software",
    title: "نرم‌افزار رایگان مدیریت تاکسی تلفنی",
    client: "خدمت اجتماعی کارن سافت",
    category: "software",
    summary:
      "نسخهٔ آنلاین ثبت راننده، مشتری و سفر با کرایهٔ خودکار، حسابداری روزانه و پشتیبان‌گیری؛ رایگان برای آژانس‌های تاکسی تلفنی.",
    image: "/images/taxi-karensoft.webp",
    imageAlt: "نرم‌افزار رایگان مدیریت تاکسی تلفنی کارن سافت",
    icon: "Car",
    accent: "#38bdf8",
    tags: ["رایگان", "تحت وب", "حسابداری", "PWA"],
    href: "/products/taxi-software/",
    liveUrl: "/taxi-app/",
    repoUrl: "https://github.com/rahmaniho/taxi",
    cta: "جزئیات و دریافت",
    statusLabel: "نسخهٔ زنده",
  },
  {
    slug: "karen-chap",
    title: "کارن چاپ — چاپ، مهر و صحافی",
    client: "کارن چاپ · قزوین",
    category: "print",
    summary:
      "کاتالوگ خدمات و نمونه‌های چاپ، ساخت مهر و صحافی؛ امکان ارسال درخواست قیمت از صفحهٔ خدمات چاپ.",
    image: "/images/chapkhaneh.webp",
    imageAlt: "نمونه فضای چاپ و تولید محصولات کارن چاپ",
    icon: "Printer",
    accent: "#60a5fa",
    tags: ["چاپ", "مهر", "صحافی", "درخواست قیمت"],
    href: "/services/printing/",
    repoUrl: "https://github.com/rahmaniho/karen-soft",
    cta: "مشاهده خدمات",
    statusLabel: "خدمات کارن سافت",
  },
];
