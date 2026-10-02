import { siteConfig } from "@/lib/siteConfig";

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "محصولات", href: "/products/" },
  { label: "خدمات", href: "/services/" },
  { label: "دموی زنده", href: "/demos/" },
  { label: "صنایع", href: "/industries/" },
  { label: "نمونه‌کارها", href: "/portfolio/" },
  { label: "وبلاگ", href: "/blog/" },
  { label: "درباره ما", href: "/about/" },
];

export const NAV_CTA: NavItem = { label: "تماس با ما", href: "/contact/" };
export const NAV_FREE: NavItem = { label: "تاکسی رایگان", href: "/products/taxi-software/", badge: "رایگان" };

export const FOOTER_GROUPS: { title: string; links: NavItem[] }[] = [
  {
    title: "محصولات",
    links: [
      { label: "نرم‌افزار مدیریت دفتر وکالت", href: "/products/law-office/" },
      { label: "نرم‌افزار رایگان تاکسی تلفنی", href: "/products/taxi-software/" },
      { label: "همه محصولات", href: "/products/" },
      { label: "دموی زنده Vokalahome", href: "/demos/vokalahome/" },
    ],
  },
  {
    title: "خدمات",
    links: [
      { label: "طراحی و توسعه وب", href: "/services/" },
      { label: "چاپ، مهر و صحافی", href: "/services/printing/" },
      { label: "نمونه‌کارها", href: "/portfolio/" },
      { label: "نمونه سایت صنایع", href: "/industries/" },
    ],
  },
  {
    title: "کارن سافت",
    links: [
      { label: "درباره ما", href: "/about/" },
      { label: "وبلاگ", href: "/blog/" },
      { label: "آرشیو مقالات", href: "/blog/archive/" },
      { label: "تماس با ما", href: "/contact/" },
    ],
  },
];

export const SOCIAL_LINKS: { label: string; href: string; icon: "Send" | "Instagram" | "Youtube" | "Linkedin" | "Twitter" }[] = [
  { label: "تلگرام", href: siteConfig.socials.telegram, icon: "Send" },
  { label: "اینستاگرام", href: siteConfig.socials.instagram, icon: "Instagram" },
  { label: "یوتیوب", href: siteConfig.socials.youtube, icon: "Youtube" },
  { label: "لینکدین", href: siteConfig.socials.linkedin, icon: "Linkedin" },
  { label: "توییتر", href: siteConfig.socials.twitter, icon: "Twitter" },
];

export const HOME_STATS: { value: string; label: string }[] = [
  { value: "۱۳۷۸", label: "آغاز فعالیت" },
  { value: "۲۷+", label: "سال تجربه" },
  { value: "۴", label: "حوزه تخصصی" },
  { value: "۱۰۰٪", label: "رایگان؛ نرم‌افزار تاکسی" },
];

export interface ServiceItem {
  slug: string;
  title: string;
  icon: string;
  desc: string;
  bullets: string[];
  href?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "web",
    title: "طراحی و توسعه وب",
    icon: "Globe",
    desc: "وب‌سایت‌های شرکتی و فروشگاهی با تجربه کاربری دقیق، سرعت بالا و زیرساخت آماده رشد؛ کدنویسی اختصاصی، بدون قالب آماده.",
    bullets: ["طراحی UI/UX اختصاصی", "بهینه‌سازی فنی و سئو", "واکنش‌گرا در تمام دستگاه‌ها", "فروشگاه اینترنتی"],
    href: "/portfolio/",
  },
  {
    slug: "software",
    title: "نرم‌افزار اختصاصی",
    icon: "Boxes",
    desc: "سیستم‌های مدیریتی متناسب با فرایند واقعی سازمان شما؛ بدون امکانات اضافه و محدودیت‌های نرم‌افزار آماده.",
    bullets: ["تحلیل فرایند کسب‌وکار", "داشبورد و گزارش‌ساز", "سطوح دسترسی و امنیت", "آموزش و پشتیبانی"],
    href: "/products/",
  },
  {
    slug: "automation",
    title: "اتوماسیون هوشمند",
    icon: "Workflow",
    desc: "حذف کارهای تکراری، اتصال ابزارها و تبدیل داده‌های پراکنده به جریان کاری یکپارچه و قابل اندازه‌گیری.",
    bullets: ["اتوماسیون فرایندها", "یکپارچه‌سازی API", "گزارش‌های خودکار", "پایش و پشتیبانی مداوم"],
    href: "/blog/automation/",
  },
  {
    slug: "printing",
    title: "چاپ، مهر و صحافی",
    icon: "Printer",
    desc: "کارن چاپ، زیرمجموعه کارن سافت در قزوین: چاپ افست و دیجیتال، ساخت مهر، صحافی کتاب و پایان‌نامه، ماگ و تیشرت.",
    bullets: ["چاپ افست و دیجیتال", "ساخت انواع مهر", "صحافی و پایان‌نامه", "هدایای تبلیغاتی"],
    href: "/services/printing/",
  },
];

export const PROCESS_STEPS: { title: string; desc: string }[] = [
  { title: "کشف و تحلیل", desc: "شنیدن نیاز شما، درک فرایندها و تعریف دقیق دامنهٔ پروژه." },
  { title: "طراحی تجربه", desc: "وایرفریم، پروتوتایپ و تأیید طراحی پیش از شروع کدنویسی." },
  { title: "توسعه و تست", desc: "توسعه مرحله‌ای با تحویل‌های کوتاه و بازبینی مداوم کیفیت." },
  { title: "استقرار و پشتیبانی", desc: "راه‌اندازی، آموزش تیم و پشتیبانی واقعی پس از تحویل." },
];

export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "کارن سافت چه خدماتی ارائه می‌دهد؟",
    a: "کارن سافت راهکارهای نرم‌افزاری برای کسب‌وکارها ارائه می‌دهد: نرم‌افزار مدیریت دفتر وکالت، نرم‌افزار رایگان مدیریت تاکسی تلفنی، خدمات چاپ و صحافی (کارن چاپ) و طراحی و توسعه وب.",
  },
  {
    q: "نرم‌افزار مدیریت تاکسی تلفنی واقعاً رایگان است؟",
    a: "بله. نرم‌افزار مدیریت تاکسی تلفنی کارن سافت به‌عنوان یک خدمت اجتماعی برای همه آژانس‌ها رایگان است و هیچ هزینه‌ای برای استفاده یا اشتراک ندارد.",
  },
  {
    q: "آیا می‌توانم پیش از سفارش، نمونه کار را ببینم؟",
    a: "بله. در بخش دموی زنده و نمونه‌کارها، پروژه‌هایی مثل خانه وکلا (Vokalahome) و وب‌سایت‌های سالن زیبایی سحر نجفی را به‌صورت آنلاین می‌توانید ببینید.",
  },
  {
    q: "هزینه طراحی سایت یا نرم‌افزار اختصاصی چقدر است؟",
    a: "هزینه به دامنهٔ پروژه بستگی دارد. مشاوره و برآورد اولیه رایگان است؛ از طریق صفحهٔ تماس یا شمارهٔ ۰۹۱۵۲۵۲۱۱۶۶ درخواست خود را ثبت کنید.",
  },
  {
    q: "پشتیبانی بعد از تحویل چگونه است؟",
    a: "تیم پشتیبانی کارن سافت در زمینهٔ نصب، راه‌اندازی و سفارشی‌سازی نرم‌افزار پاسخگوی شماست و می‌توانید از طریق تلفن، ایمیل یا فرم تماس درخواست پشتیبانی ثبت کنید.",
  },
];

export const TECH_BADGES: string[] = ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "PWA"];
