/**
 * تنظیمات مرکزی هویت، تماس و یکپارچه‌سازی‌های سمت مرورگر.
 * کلیدهای محرمانه (مثل RESEND_API_KEY) هرگز نباید در این فایل یا NEXT_PUBLIC_* باشند.
 */

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim() ?? "";
const contactApiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim() ?? "";
// شناسهٔ Crisp عمومی است و از کد پشتیبانی داخل public/taxi-app استخراج شده است.
const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID?.trim() || "ffafdfcf-e510-45d0-a026-4e964ad420ee";

export const siteConfig = {
  name: "کارن سافت",
  nameEn: "Karen Soft",
  url: "https://karen-soft.ir",
  title: "کارن سافت | راهکارهای نرم‌افزاری",
  tagline: "فناوری پیچیده، رشد ساده.",
  description:
    "کارن سافت؛ شریک فناوری کسب‌وکارهای ایرانی، تأسیس ۱۴۰۴ به مدیریت حسین رحمانی. نرم‌افزار حقوقی، نرم‌افزار رایگان مدیریت تاکسی تلفنی، ساخت وب‌سایت و بهینه‌سازی کسب‌وکار.",
  locale: "fa_IR",
  /** کارن سافت در سال ۱۴۰۴ به‌صورت رسمی تأسیس شد. */
  founded: { jalali: 1404, gregorian: 2025 },
  founder: "حسین رحمانی",
  founderRole: "مدیر و بنیان‌گذار",
  /** تصویر مدیر و بنیان‌گذار (از مخزن karen-soft) */
  founderImage: "/images/Hosein-rahmani.jpg",
  phone: "+989152521166",
  phoneDisplay: "۰۹۱۵۲۵۲۱۱۶۶",
  email: "info@karen-soft.ir",
  address: "قزوین، زیباشهر، کارن سافت",
  city: "قزوین",
  workingHours: [
    { days: "شنبه تا چهارشنبه", hours: "۹:۰۰ تا ۱۸:۰۰" },
    { days: "پنجشنبه", hours: "۹:۰۰ تا ۱۳:۰۰" },
    { days: "جمعه", hours: "تعطیل" },
  ],
  socials: {
    rubika: "https://rubika.ir/KarenSoft",
    whatsapp: "https://wa.me/karensoft.ir",
    telegram: "https://t.me/KarenSoft_dev",
    instagram: "https://www.instagram.com/Karen_soft.ir/",
    youtube: "https://www.youtube.com/@KarenSoftOfficial",
    linkedin: "https://www.linkedin.com/company/karensoft",
    twitter: "https://twitter.com/KarenSoft_ir",
  },
  /** Formspree ID عمومی؛ برای انتشار استاتیک در زمان build تنظیم می‌شود. */
  formspreeId,
  /** URL عمومیِ یک API امن؛ Secret ایمیل فقط باید روی سرور API بماند. */
  contactApiUrl,
  /** شناسهٔ عمومی سایت Crisp؛ بارگذاری اسکریپت فقط پس از کلیک کاربر انجام می‌شود. */
  crispWebsiteId,
  ogImage: "/images/og-image.jpg",
} as const;

/**
 * سال شمسی مرجع محتوا؛ در زمان build ثابت می‌ماند تا خروجی استاتیک و هیدریشن
 * مرورگر هیچ‌وقت با هم اختلاف پیدا نکنند.
 */
export const CURRENT_JALALI_YEAR = 1405;

/** سال‌های فعالیت کارن سافت از زمان تأسیس (۱۴۰۴) */
export const yearsSinceFounding = Math.max(0, CURRENT_JALALI_YEAR - siteConfig.founded.jalali);

export const isFormspreeConfigured = /^[A-Za-z0-9]{6,}$/.test(siteConfig.formspreeId);
export const FORMSPREE_ENDPOINT = isFormspreeConfigured
  ? `https://formspree.io/f/${siteConfig.formspreeId}`
  : "";
export const CONTACT_API_ENDPOINT = siteConfig.contactApiUrl;
export const isContactApiConfigured = /^https:\/\//i.test(CONTACT_API_ENDPOINT) || /^\/(?!\/)/.test(CONTACT_API_ENDPOINT);
export const isCrispConfigured = /^[a-f0-9-]{36}$/i.test(siteConfig.crispWebsiteId);

export const EXTERNAL = {
  vokalahomeLive: "https://rahmaniho.github.io/Vokalahome/",
} as const;

/**
 * اعتبارسنجی سبک در زمان اجرا؛ در محیط استاتیک فرم همچنان مسیر fallback ایمیل را دارد.
 */
export function validateSiteConfig(): boolean {
  return Boolean(siteConfig.name && siteConfig.url && siteConfig.email);
}
