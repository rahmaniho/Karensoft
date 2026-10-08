# کارن سافت — وب‌سایت رسمی

وب‌سایت استاتیک **Next.js 15 (App Router)** برای گروه نرم‌افزاری کارن سافت؛ فارسی/راست‌چین، Tailwind CSS v4، Framer Motion، Lenis و Howler.js، با خروجی `out/` برای **GitHub Pages** (دامنهٔ `karen-soft.ir`).

کارن سافت در سال **۱۴۰۴** به مدیریت و بنیان‌گذاری **حسین رحمانی** تأسیس شده است (`lib/siteConfig.ts`).

## اجرا

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # خروجی استاتیک در ./out
npm run typecheck  # بررسی strict تایپ‌اسکریپت
npm run lint       # ESLint
```

## طراحی و تجربهٔ کاربری (نسخهٔ ۳٫۱)

هویت بصری جدید مینیمال/تیره با پالت نئونی ساخته شده است:

- **رنگ‌ها:** پس‌زمینهٔ مشکی عمیق (`#0A0A0A`) با تاکیدی‌های آبی الکتریک `#00F0FF`، بنفش نئونی `#8B5CF6` و سبز نرم `#10B981`؛ متن سفید مات `#E5E7EB` و بدنهٔ خاکستری `#9CA3AF`.
- **تایپوگرافی:** Vazirmatn برای بدنه/تیترها + JetBrains Mono (خودمیزبان در `public/fonts/`) برای کد، آمار و اعداد.
- **بافت و عمق:** Glassmorphism برای کارت‌ها/سایدبار/مودال‌ها، بافت Noise محو، Grid متحرک و وینیت سراسری (`components/fx/GlobalBackground.tsx`).
- **ناوبری:** سایدبار جمع‌شونده در سمت راست (۲۶۰↔۷۰ پیکسل، Spring + Tooltip شیشه‌ای + ذخیرهٔ حالت در localStorage) و منوی موبایل تمام‌صفحه با همبرگری مورفینگ، ورود پله‌ای آیتم‌ها و پارالاکس آیکون‌های پس‌زمینه (`components/layout/Sidebar.tsx` و `MobileNav.tsx`).
- **طراحی صدا (Howler.js):** افکت‌های کلیک مکانیکی، سووش منو، تیک هاور، زنگ موفقیت و بوق خطا که **در زمان اجرا سنتز می‌شوند** (`lib/sounds.ts`) و فقط پس از اولین تعامل کاربر فعال می‌شوند؛ کلید روشن/خاموش در سایدبار و نوار موبایل.
- **میکرو-تعاملات:** دکمهٔ مغناطیسی + موج نور از نقطهٔ کلیک (`components/ui/ActionButton.tsx`)، چرخش سه‌بعدی کارت‌ها (`components/fx/TiltCard.tsx`)، هالهٔ نور دنبال‌کنندهٔ مکان‌نما (`components/fx/CursorGlow.tsx`) و انفجار ذرات هنگام کلیک روی آیکون‌های سایدبار (`components/fx/ParticleBurst.tsx`).
- **Hero:** تیتر با افکت Typewriter، ترمینال شبیه‌سازی‌شده که کد واقعی محصولات را تایپ می‌کند (`components/fx/MockTerminal.tsx`) و شبکهٔ عصبی متحرک + باران کد محو (`components/fx/NeuralBackground.tsx`).
- **آمار:** شمارش افزایشی (Count-up) با رقم‌های فارسی (`components/fx/AnimatedNumber.tsx`).
- **عناوین بخش‌ها:** افکت Text Scramble هنگام ورود به دید (`components/fx/ScrambleText.tsx`).
- **محصولات:** چیدمان نامتقارن Bento Grid با آیکون متحرک و هاور اختصاصی (`components/sections/ProductsBento.tsx`).
- **خدمات:** کارت‌های خطی (Outline) با مدار SVG کشیده‌شونده و آیکون متحرک هنگام هاور (`components/sections/ServicesOutline.tsx`).
- **نمونه‌کارها:** کارت‌های تعاملی + مودال شیشه‌ای جزئیات پروژه (نقش ما، نکات برجسته، لینک زنده و مخزن) (`components/sections/PortfolioGrid.tsx`).
- **درباره ما:** تایم‌لاین عمودی که با اسکرول پر می‌شود و نقطه‌های عطف ۱۳۹۰ تا ۱۴۰۵ را نشان می‌دهد (`components/sections/Timeline.tsx`) + کارت مدیر و بنیان‌گذار با تصویر `public/images/Hosein-rahmani.jpg`.
- **فرم‌ها:** برچسب شناور (Floating Label)، اعتبارسنجی زنده هنگام خروج از فیلد، انیمیشن لرزش (Shake) در خطا و زنگ موفقیت پس از ارسال (`components/ui/Field.tsx` و `components/shared/ContactForm.tsx`).
- **دسترس‌پذیری:** کنتراست مناسب، `aria-*` کامل، فوکوس قابل مشاهده و احترام به `prefers-reduced-motion` در همهٔ انیمیشن‌های سنگین.

## فرم‌ها، ایمیل و چت آنلاین

فرم‌های تماس، دریافت نرم‌افزار، درخواست قیمت چاپ و درخواست نسخهٔ آزمایشی از یک کامپوننت مشترک استفاده می‌کنند. برای خروجی استاتیک، Formspree را در زمان build وصل کنید:

```bash
NEXT_PUBLIC_FORMSPREE_ID=شناسه-فرم
```

اگر شناسه یا API تنظیم نشده باشد، فرم متن پیام را در برنامهٔ ایمیل کاربر آماده می‌کند و وضعیت را صادقانه به‌عنوان «نیازمند تأیید ایمیل» نشان می‌دهد. برای API خصوصی Resend و جزئیات کد استخراج‌شده از مخزن قدیمی، محدودیت استاتیک و اتصال Crisp، راهنمای [`docs/communications.md`](docs/communications.md) را ببینید. کلید `RESEND_API_KEY` فقط روی سرور API تنظیم می‌شود.

چت آنلاین Crisp از کد موجود در `public/taxi-app/index.html` استخراج و به‌صورت سراسری به سایت افزوده شده است؛ اسکریپت Crisp فقط پس از کلیک بازدیدکننده بارگذاری می‌شود.

## نمونه‌کارها و دموها

صفحهٔ نمونه‌کارها پروژه‌های دارای نسخهٔ آنلاین از مخازن عمومی را فهرست می‌کند: `musician` (استودیو موسیقی آوا)، `Abolfazl-miramoo`، `Qazvi_tasvir`، `icecream-factory`، `Dastmozd2025`، `Lawbook`، `QC_Print`، `Industrial_factory`، `Karensoft-HSE`، `Vokalahome` و وب‌سایت لیلا آبکه؛ هر مورد با لینک نسخهٔ زنده، مخزن کد و مودال جزئیات. بخش «دموی زنده» همین پروژه‌ها را با پیش‌نمایش iframe داخلی نشان می‌دهد. نمونه‌های نمایشی با برچسب و هشدار داده مشخص شده‌اند.

## استقرار

با هر push به `main`، workflow `.github/workflows/deploy.yml` پروژه را build و روی GitHub Pages منتشر می‌کند (Settings → Pages → Source: GitHub Actions). فایل‌های `public/CNAME` و `public/.nojekyll` در خروجی کپی می‌شوند.

## ساختار

- `app/` — مسیرها؛ گروه `(site)` شامل about، blog، demos، industries، products، services، portfolio و contact. `sitemap.xml` و `robots.txt` از `app/sitemap.ts` و `app/robots.ts` ساخته می‌شوند.
- `components/` — layout (سایدبار/ناوبری موبایل/فوتر)، sections (Hero، بنتو، خدمات، تایم‌لاین و …)، fx (انیمیشن‌ها و صدا)، ui، demos، shared، industries.
- `lib/` — دادهٔ محتوا (`blog.ts`، `products.ts`، `demos.ts`، `industries.ts`، `portfolio.ts`، `printing.ts`، `constants.ts`) و ابزارها (`siteConfig`، `seo`، `schema`، `sounds`، `utils`).
- `public/images/` — تصاویر بهینه‌شدهٔ سایت و پیش‌نمایش پروژه‌ها. `public/live/` و `public/taxi-app/` نسخه‌های قابل اجرای دموها هستند.
- `scripts/generate-image-meta.mjs` — ابعاد تصاویر را برای `lib/imageSizes.ts` می‌سازد (جلوگیری از CLS).
