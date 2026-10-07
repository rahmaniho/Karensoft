# کارن سافت — وب‌سایت رسمی

وب‌سایت استاتیک **Next.js 15 (App Router)** برای گروه نرم‌افزاری کارن سافت؛ فارسی/راست‌چین، Tailwind CSS v4، Framer Motion و Lenis، با خروجی `out/` برای **GitHub Pages** (دامنهٔ `karen-soft.ir`).

## اجرا

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # خروجی استاتیک در ./out
npm run typecheck  # بررسی strict تایپ‌اسکریپت
```

## فرم‌ها، ایمیل و چت آنلاین

فرم‌های تماس، دریافت نرم‌افزار، درخواست قیمت چاپ و درخواست نسخهٔ آزمایشی از یک کامپوننت مشترک استفاده می‌کنند. برای خروجی استاتیک، Formspree را در زمان build وصل کنید:

```bash
NEXT_PUBLIC_FORMSPREE_ID=شناسه-فرم
```

اگر شناسه یا API تنظیم نشده باشد، فرم متن پیام را در برنامهٔ ایمیل کاربر آماده می‌کند و وضعیت را صادقانه به‌عنوان «نیازمند تأیید ایمیل» نشان می‌دهد. برای API خصوصی Resend و جزئیات کد استخراج‌شده از مخزن قدیمی، محدودیت استاتیک و اتصال Crisp، راهنمای [`docs/communications.md`](docs/communications.md) را ببینید. کلید `RESEND_API_KEY` فقط روی سرور API تنظیم می‌شود.

چت آنلاین Crisp از کد موجود در `public/taxi-app/index.html` استخراج و به‌صورت سراسری به سایت افزوده شده است؛ اسکریپت Crisp فقط پس از کلیک بازدیدکننده بارگذاری می‌شود.

صفحهٔ نمونه‌کارها اکنون به پروژه‌های دارای نسخهٔ آنلاین از مخازن عمومی `Dastmozd2025`، `Lawbook`، `QC_Print`، `Industrial_factory`، `Karensoft-HSE`، `Vokalahome` و وب‌سایت لیلا آبکه پیوند مستقیم و در صورت وجود لینک مخزن می‌دهد. نمونه‌های نمایشی با برچسب و هشدار داده مشخص شده‌اند.

## استقرار

با هر push به `main`، workflow `.github/workflows/deploy.yml` پروژه را build و روی GitHub Pages منتشر می‌کند (Settings → Pages → Source: GitHub Actions). فایل‌های `public/CNAME` و `public/.nojekyll` در خروجی کپی می‌شوند.

## ساختار

- `app/` — مسیرها؛ گروه `(site)` شامل about، blog، demos، industries، products، services، portfolio و contact. `sitemap.xml` و `robots.txt` از `app/sitemap.ts` و `app/robots.ts` ساخته می‌شوند.
- `components/` — layout، sections، ui، demos، shared، industries.
- `lib/` — دادهٔ محتوا (`blog.ts`، `products.ts`، `demos.ts`، `industries.ts`، `portfolio.ts`، `printing.ts`) و ابزارها (`siteConfig`، `seo`، `schema`، `utils`).
- `public/images/` — تصاویر بهینه‌شدهٔ سایت و پیش‌نمایش پروژه‌ها. `public/live/` و `public/taxi-app/` نسخه‌های قابل اجرای دموها هستند.
- `scripts/generate-image-meta.mjs` — ابعاد تصاویر را برای `lib/imageSizes.ts` می‌سازد (جلوگیری از CLS).
