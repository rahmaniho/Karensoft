# کارن سافت — وب‌سایت رسمی

وب‌سایت استاتیک **Next.js 15 (App Router)** برای گروه نرم‌افزاری کارن سافت؛ فارسی/راست‌چین، Tailwind CSS v4، Framer Motion و Lenis، با خروجی `out/` برای **GitHub Pages** (دامنهٔ `karen-soft.ir`).

## اجرا

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # خروجی استاتیک در ./out
npm run typecheck  # بررسی strict تایپ‌اسکریپت
```

## فرم‌ها (Formspree)

همهٔ فرم‌ها (تماس، دریافت نرم‌افزار تاکسی، درخواست قیمت چاپ، درخواست نسخهٔ آزمایشی) به Formspree ارسال می‌شوند.

1. در [formspree.io](https://formspree.io) یک فرم بسازید و شناسهٔ آن را بردارید.
2. مقدار را در `lib/siteConfig.ts` (`formspreeId`) بنویسید، یا هنگام build متغیر `NEXT_PUBLIC_FORMSPREE_ID` را تنظیم کنید.

## استقرار

با هر push به `main`، workflow `.github/workflows/deploy.yml` پروژه را build و روی GitHub Pages منتشر می‌کند (Settings → Pages → Source: GitHub Actions). فایل‌های `public/CNAME` و `public/.nojekyll` در خروجی کپی می‌شوند.

## ساختار

- `app/` — مسیرها؛ گروه `(site)` شامل about، blog، demos، industries، products، services، portfolio و contact. `sitemap.xml` و `robots.txt` از `app/sitemap.ts` و `app/robots.ts` ساخته می‌شوند.
- `components/` — layout، sections، ui، demos، shared، industries.
- `lib/` — دادهٔ محتوا (`blog.ts`، `products.ts`، `demos.ts`، `industries.ts`، `portfolio.ts`، `printing.ts`) و ابزارها (`siteConfig`، `seo`، `schema`، `utils`).
- `public/images/` — تمام تصاویر (WebP). `public/live/` و `public/taxi-app/` نسخه‌های زندهٔ دموها هستند.
- `scripts/generate-image-meta.mjs` — ابعاد تصاویر را برای `lib/imageSizes.ts` می‌سازد (جلوگیری از CLS).
