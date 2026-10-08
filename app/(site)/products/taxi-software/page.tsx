import type { Metadata } from "next";
import { ArrowLeft, BarChart3, Car, Download, HeartHandshake, Route, Smartphone, UserRound, Users, CloudOff, Database, Lock } from "lucide-react";
import { getPost } from "@/lib/blog";
import { getProduct } from "@/lib/products";
import { softwareLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Img } from "@/components/ui/Img";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FaqList } from "@/components/shared/FaqList";
import { ContactForm, type FormFieldConfig } from "@/components/shared/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

const TITLE = "نرم‌افزار مدیریت تاکسی تلفنی — رایگان برای همه آژانس‌ها";
const DESC = "نرم‌افزار مدیریت تاکسی تلفنی کارن سافت کاملاً رایگان است: داشبورد زنده، ثبت سفر و کرایه خودکار، مدیریت رانندگان و ناوگان، حسابداری و گزارش‌گیری.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESC,
  path: "/products/taxi-software/",
  image: "/images/taxi-karensoft.webp",
  keywords: ["نرم‌افزار تاکسی تلفنی", "نرم‌افزار آژانس تاکسی رایگان", "مدیریت ناوگان تاکسی", "کارن سافت"],
});

const FEATURES = [
  { Icon: UserRound, title: "اپ راننده", desc: "پروفایل راننده و خودرو، وضعیت فعالیت و صورت‌حساب شخصی هر راننده در یک نگاه." },
  { Icon: Smartphone, title: "سفارش مسافر", desc: "ثبت سفارش تلفنی با مشترکین و آدرس‌های پرکاربرد؛ مسافر قدیمی در چند ثانیه ثبت می‌شود." },
  { Icon: Route, title: "توزیع زنده سفر", desc: "انتخاب راننده، مبدأ و مقصد و محاسبهٔ خودکار کرایه؛ پیگیری لحظه‌ای سفرها از داشبورد." },
  { Icon: Car, title: "مدیریت ناوگان", desc: "ثبت رانندگان و خودروها و نگهداری اطلاعات تمام ناوگان آژانس در یک جا." },
  { Icon: BarChart3, title: "گزارش‌گیری", desc: "گزارش درآمد، کمیسیون و هزینه‌ها برای تصمیم‌گیری دقیق‌تر مدیر آژانس." },
  { Icon: Database, title: "پشتیبان‌گیری", desc: "خروجی JSON از تمام داده‌ها و بازیابی آسان روی هر دستگاه دیگر." },
];

const FIELDS: FormFieldConfig[] = [
  { name: "name", label: "نام و نام خانوادگی", required: true },
  { name: "agency", label: "نام آژانس", required: true },
  { name: "phone", label: "شماره تماس", type: "tel", required: true, placeholder: "۰۹۱۲۱۲۳۴۵۶۷" },
  { name: "email", label: "ایمیل (اختیاری)", type: "email" },
  { name: "city", label: "شهر" },
  { name: "drivers", label: "تعداد رانندگان (تقریبی)", type: "number", min: 0 },
  { name: "message", label: "توضیحات یا درخواست ویژه (اختیاری)", type: "textarea", rows: 4, full: true },
];

export default function TaxiSoftwarePage() {
  const product = getProduct("taxi-software");
  const faq = getPost("taxi")?.faq ?? [];
  return (
    <main id="main">
      <JsonLd data={softwareLd({ name: "نرم‌افزار مدیریت تاکسی تلفنی کارن سافت", description: DESC, path: "/products/taxi-software/", free: true, features: product?.features ?? [] })} />

      <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40">
        <div className="bg-aurora absolute inset-0 -z-10" aria-hidden="true" />
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "محصولات", path: "/products/" }, { name: "نرم‌افزار تاکسی تلفنی", path: "/products/taxi-software/" }]} />
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <Badge tone="green">۱۰۰٪ رایگان</Badge>
              <h1 className="text-gradient mt-5 text-4xl font-black leading-[1.55] sm:text-5xl">{TITLE}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-mist-400">
                آژانس‌های تاکسی تلفنی برای مدیریت راننده، سفر و حساب‌وکتاب نباید هزینهٔ سنگین نرم‌افزار بدهند. کارن سافت این نرم‌افزار را رایگان در اختیار همهٔ آژانس‌ها قرار داده است.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#download" size="lg"><Download className="size-5" aria-hidden="true" />دریافت و درخواست نسخه</Button>
                <Button href="/taxi-app/" variant="secondary" size="lg" external>اجرای نسخه آنلاین<ArrowLeft className="size-5" aria-hidden="true" /></Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist-400">
                <li className="flex items-center gap-2"><CloudOff className="size-4 text-emerald-300" aria-hidden="true" />بدون نیاز به سرور</li>
                <li className="flex items-center gap-2"><Lock className="size-4 text-emerald-300" aria-hidden="true" />داده‌ها روی دستگاه شما می‌ماند</li>
                <li className="flex items-center gap-2"><Users className="size-4 text-emerald-300" aria-hidden="true" />کاملاً فارسی و راست‌چین</li>
              </ul>
            </Reveal>
            <Reveal x={-30} className="mx-auto w-full max-w-sm">
              <div className="glass-strong rounded-3xl bg-white/95 p-6">
                <Img src="/images/taxi-karensoft.webp" alt="لوگوی نرم‌افزار مدیریت تاکسی تلفنی کارن سافت" priority className="w-full animate-float object-contain" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="features-title">
        <SectionHeading eyebrow="امکانات" title={<span id="features-title">هر آنچه یک آژانس تاکسی تلفنی لازم دارد</span>} description="از ثبت تماس مسافر تا تسویه‌حساب راننده؛ در یک برنامهٔ ساده و فارسی." />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, desc }) => (
            <StaggerItem key={title}>
              <Card interactive className="h-full p-7">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300 ring-1 ring-inset ring-amber-300/25"><Icon className="size-7" aria-hidden="true" /></span>
                <h3 className="mt-5 text-xl font-extrabold text-white">{title}</h3>
                <p className="mt-2 leading-8 text-mist-400">{desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="impact-title">
        <Reveal className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-14">
          <div className="bg-aurora absolute inset-0 -z-10" aria-hidden="true" />
          <HeartHandshakeBadge />
          <h2 id="impact-title" className="mt-4 text-3xl font-black leading-[1.6] text-white">چرا رایگان؟ مسئولیت اجتماعی کارن سافت</h2>
          <div className="mt-5 grid gap-8 text-lg leading-9 text-mist-100 lg:grid-cols-2">
            <p>بسیاری از آژانس‌های کوچک و رانندگان، توان پرداخت هزینهٔ نرم‌افزارهای مدیریتی را ندارند و هنوز با دفتر و کاغذ کار می‌کنند. ما می‌خواهیم دیجیتال‌شدن این صنف، یک امتیاز برای همه باشد نه یک هزینه.</p>
            <p>سیستم «کارن» برای مدیریت تاکسی تلفنی در سال ۱۳۹۶ در مشهد رونمایی شد؛ امروز نسخهٔ رایگان و به‌روز آن برای همهٔ آژانس‌های کشور در دسترس است. اگر آژانس شماست، همین حالا درخواست دهید.</p>
          </div>
        </Reveal>
      </section>

      <section id="download" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 sm:px-6" aria-labelledby="download-title">
        <Reveal>
          <Card className="p-6 sm:p-9">
            <h2 id="download-title" className="text-2xl font-extrabold text-white">دریافت یا درخواست نرم‌افزار</h2>
            <p className="mb-7 mt-2 leading-8 text-mist-400">اطلاعات آژانس را بنویسید تا راهنمای استفاده، آموزش و پشتیبانی را برایتان ارسال کنیم. استفاده از نرم‌افزار هیچ هزینه‌ای ندارد.</p>
            <ContactForm
              formId="taxi"
              fields={FIELDS}
              subject="درخواست نرم‌افزار رایگان مدیریت تاکسی تلفنی"
              hidden={{ product: "taxi-software" }}
              submitLabel="ثبت درخواست دریافت"
              successTitle="درخواست شما ثبت شد"
              successMessage="به‌زودی با شما تماس می‌گیریم. می‌توانید همین حالا هم نسخهٔ آنلاین را اجرا کنید."
              note="اطلاعات شما فقط برای ارسال نرم‌افزار و پشتیبانی استفاده می‌شود."
            />
          </Card>
        </Reveal>
      </section>

      {faq.length > 0 ? (
        <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6" aria-labelledby="faq-title">
          <SectionHeading eyebrow="پرسش‌های متداول" title={<span id="faq-title">پاسخ پرسش‌های رایج</span>} />
          <Reveal className="mt-10"><FaqList items={faq} /></Reveal>
          <p className="mt-8 text-center"><Button href="/blog/taxi/" variant="outline">مقالهٔ کامل معرفی نرم‌افزار</Button></p>
        </section>
      ) : null}
    </main>
  );
}

function HeartHandshakeBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 text-sm font-bold text-emerald-300">
      <HeartHandshake className="size-4" aria-hidden="true" />
      اثر اجتماعی
    </span>
  );
}
