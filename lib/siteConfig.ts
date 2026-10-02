/**
 * تنظیمات مرکزی سایت — تنها منبع حقیقت برای نام، آدرس، اطلاعات تماس و Formspree.
 */
export const siteConfig = {
  name: "کارن سافت",
  nameEn: "Karen Soft",
  url: "https://karen-soft.ir",
  title: "کارن سافت | راهکارهای نرم‌افزاری",
  tagline: "فناوری پیچیده، رشد ساده.",
  description:
    "کارن سافت؛ شریک فناوری کسب‌وکارهای ایرانی از سال ۱۳۷۸. نرم‌افزار حقوقی، نرم‌افزار رایگان مدیریت تاکسی تلفنی، خدمات چاپ و طراحی و توسعه وب.",
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
   * ۱) در formspree.io یک فرم بسازید و شناسهٔ آن (مثلاً xyzabcde) را بگیرید.
   * ۲) مقدار NEXT_PUBLIC_FORMSPREE_ID را هنگام build تنظیم کنید یا مستقیماً اینجا بنویسید.
   */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID",
  ogImage: "/images/og-image.jpg",
} as const;

export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${siteConfig.formspreeId}`;
export const isFormspreeConfigured = siteConfig.formspreeId !== "YOUR_FORM_ID";

export const EXTERNAL = {
  vokalahomeLive: "https://rahmaniho.github.io/Vokalahome/",
  vokalahomeRepo: "https://github.com/rahmaniho/Vokalahome",
} as const;
