/**
 * تنظیمات مرکزی سایت — تنها منبع حقیقت برای نام، آدرس، اطلاعات تماس و Formspree.
 * تمام تغییرات در این فایل به صورت خودکار در سایت منعکس می‌شوند.
 */

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

if (!formspreeId || formspreeId === "YOUR_FORM_ID_HERE") {
  console.warn(
    "⚠️  Formspree ID not configured. Set NEXT_PUBLIC_FORMSPREE_ID in .env.local to enable forms."
  );
}

export const siteConfig = {
  name: "کارن سافت",
  nameEn: "Karen Soft",
  url: "https://karen-soft.ir",
  title: "کارن سافت | راهکارهای نرم‌افزاری",
  tagline: "فناوری پیچیده، رشد ساده.",
  description:
    "کارن سافت؛ شریک فناوری کسب‌وکارهای ایرانی از سال ۱۳۷۸. نرم‌افزار حقوقی، نرم‌افزار رایگان مدیریت تاکسی تلفنی، ساخت وب‌سایت و بهینه‌سازی کسب‌وکار.",
  locale: "fa_IR",
  founded: { jalali: 1378, gregorian: 1999 },
  founder: "حسین رحمانی",
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
    telegram: "https://t.me/KarenSoftOfficial",
    instagram: "https://www.instagram.com/karen_soft.ir",
    youtube: "https://www.youtube.com/@KarenSoftOfficial",
    linkedin: "https://www.linkedin.com/company/karensoft",
    twitter: "https://twitter.com/KarenSoft_ir",
  },
  /**
   * آدرس endpoint فرم‌ها در Formspree.
   * راهنمای تنظیم:
   * ۱) به formspree.io بروید و ثبت‌نام کنید
   * ۲) یک فرم جدید ایجاد کنید
   * ۳) شناسهٔ فرم را کپی کنید (مثلاً: xyzabcde)
   * ۴) آن را در .env.local تنظیم کنید:
   *    NEXT_PUBLIC_FORMSPREE_ID=xyzabcde
   */
  formspreeId: formspreeId ?? "YOUR_FORM_ID_HERE",
  ogImage: "/images/og-image.jpg",
} as const;

export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${siteConfig.formspreeId}`;
export const isFormspreeConfigured =
  siteConfig.formspreeId !== "YOUR_FORM_ID_HERE" &&
  typeof siteConfig.formspreeId === "string" &&
  siteConfig.formspreeId.length > 0;

export const EXTERNAL = {
  vokalahomeLive: "https://rahmaniho.github.io/Vokalahome/",
  vokalahomeRepo: "https://github.com/rahmaniho/Vokalahome",
} as const;

/**
 * Type guard for site config validation
 */
export function validateSiteConfig(): boolean {
  if (!isFormspreeConfigured) {
    console.warn(
      "⚠️  Forms are disabled: Formspree ID not configured properly"
    );
    return false;
  }
  return true;
}
