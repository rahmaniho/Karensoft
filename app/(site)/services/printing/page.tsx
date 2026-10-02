import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone, Quote, Clock, User } from "lucide-react";
import { PRINT_CONTACT, PRINT_FAQS, PRINT_STEPS, PRINT_TESTIMONIALS } from "@/lib/printing";
import { buildMetadata } from "@/lib/seo";
import { localBusinessLd } from "@/lib/schema";
import { toPersianDigits } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Img } from "@/components/ui/Img";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrintCatalog } from "@/components/sections/PrintCatalog";
import { PrintWorks } from "@/components/sections/PrintWorks";
import { FaqList } from "@/components/shared/FaqList";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

const TITLE = "کارن چاپ | خدمات انواع چاپ، مهر و صحافی در قزوین";
const DESC = "کارن چاپ، زیرمجموعهٔ کارن سافت در شهرصنعتی البرز قزوین: چاپ افست و دیجیتال، تراکت، کارت ویزیت، ساخت مهر، صحافی پایان‌نامه، چاپ کتاب، ماگ و تیشرت. ارسال به سراسر کشور.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESC,
  path: "/services/printing/",
  image: "/images/cover.webp",
  keywords: ["چاپخانه قزوین", "چاپ دیجیتال", "ساخت مهر", "صحافی پایان‌نامه", "کارن چاپ"],
});

const WHY = [
  { title: "تحویل سریع", desc: "مهر ۲۴ تا ۴۸ ساعت و چاپ دیجیتال ۱ تا ۳ روز کاری." },
  { title: "کیفیت تضمینی", desc: "چاپ افست استاندارد CMYK و کنترل کیفیت پیش از تحویل." },
  { title: "قیمت رقابتی", desc: "پیش‌فاکتور شفاف پیش از شروع تولید." },
  { title: "طراحی اختصاصی", desc: "در صورت نیاز، طراحی گرافیک را هم انجام می‌دهیم." },
  { title: "ارسال سراسری", desc: "بسته‌بندی امن و ارسال به تمام نقاط کشور." },
  { title: "پشتیبانی کامل", desc: "پیگیری سفارش از ثبت تا تحویل با کد پیگیری." },
];

export default function PrintingPage() {
  return (
    <main id="main">
      <JsonLd data={localBusinessLd({ name: "کارن چاپ", description: DESC, path: "/services/printing/", phone: PRINT_CONTACT.tel, address: PRINT_CONTACT.address, city: "قزوین" })} />
      <PageHero
        eyebrow="کارن چاپ · زیرمجموعه کارن سافت"
        title="چاپ، مهر و صحافی؛ سریع و باکیفیت در قزوین"
        description="از کارت ویزیت و تراکت تا چاپ کتاب، ساخت مهر و صحافی پایان‌نامه؛ سفارش را آنلاین ثبت کنید و پیش‌فاکتور بگیرید."
        breadcrumbs={[{ name: "خدمات", path: "/services/" }, { name: "کارن چاپ", path: "/services/printing/" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#catalog" size="lg">مشاهده خدمات و سفارش</Button>
          <Button href={`tel:${PRINT_CONTACT.tel}`} variant="secondary" size="lg"><Phone className="size-5" aria-hidden="true" />{PRINT_CONTACT.phone}</Button>
        </div>
        <ul className="mt-10 grid max-w-md grid-cols-2 gap-6">
          <li><p className="text-4xl font-black text-white">{toPersianDigits(12)}+</p><p className="text-sm text-slate-400">سال تجربه</p></li>
          <li><p className="text-4xl font-black text-white">{toPersianDigits(5000)}+</p><p className="text-sm text-slate-400">سفارش انجام‌شده</p></li>
        </ul>
      </PageHero>

      <section id="catalog" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="catalog-title">
        <SectionHeading eyebrow="خدمات و محصولات" title={<span id="catalog-title">هر آنچه به چاپ نیاز دارد</span>} description="دسته را انتخاب کنید، محصول را ببینید و درخواست قیمت بدهید." />
        <div className="mt-12"><PrintCatalog /></div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="why-title">
        <SectionHeading eyebrow="چرا کارن چاپ" title={<span id="why-title">شش دلیل برای انتخاب ما</span>} />
        <Stagger as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <StaggerItem as="li" key={w.title}>
              <div className="glass h-full rounded-2xl p-6">
                <span className="text-gradient-blue text-4xl font-black">{toPersianDigits(i + 1)}</span>
                <h3 className="mt-2 text-lg font-extrabold text-white">{w.title}</h3>
                <p className="mt-2 leading-8 text-slate-300">{w.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="works-title">
        <SectionHeading eyebrow="نمونه‌کارها" title={<span id="works-title">کارهایی که چاپ کرده‌ایم</span>} />
        <div className="mt-12"><PrintWorks /></div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="steps-title">
        <SectionHeading eyebrow="مراحل سفارش" title={<span id="steps-title">چهار مرحله تا تحویل</span>} />
        <Stagger as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINT_STEPS.map((s, i) => (
            <StaggerItem as="li" key={s.title}>
              <div className="glass h-full rounded-2xl p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-electric-600 font-black text-white">{toPersianDigits(i + 1)}</span>
                <h3 className="mt-3 text-lg font-extrabold text-white">{s.title}</h3>
                <p className="mt-2 leading-8 text-slate-300">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="reviews-title">
        <SectionHeading eyebrow="نظر مشتریان" title={<span id="reviews-title">مشتریان چه می‌گویند</span>} />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {PRINT_TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <blockquote className="glass h-full rounded-2xl p-6">
                <Quote className="size-6 text-electric-300" aria-hidden="true" />
                <p className="mt-3 leading-8 text-slate-200">{t.quote}</p>
                <footer className="mt-4 text-sm text-slate-400"><strong className="text-white">{t.name}</strong> — {t.role}</footer>
              </blockquote>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6" aria-labelledby="faq-title">
        <SectionHeading eyebrow="پرسش‌های متداول" title={<span id="faq-title">پیش از سفارش بخوانید</span>} />
        <Reveal className="mt-10"><FaqList items={PRINT_FAQS} /></Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6" aria-labelledby="contact-title">
        <Reveal className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-7 sm:p-9">
            <h2 id="contact-title" className="text-2xl font-extrabold text-white">تماس با کارن چاپ</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4"><User className="mt-1 size-5 shrink-0 text-electric-300" aria-hidden="true" /><div><p className="text-xs text-slate-400">مدیر</p><p className="font-bold text-white">{PRINT_CONTACT.manager}</p></div></li>
              <li className="flex gap-4"><Phone className="mt-1 size-5 shrink-0 text-electric-300" aria-hidden="true" /><div><p className="text-xs text-slate-400">تلفن</p><a href={`tel:${PRINT_CONTACT.tel}`} className="font-bold text-white hover:text-electric-300">{PRINT_CONTACT.phone}</a></div></li>
              <li className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-electric-300" aria-hidden="true" /><div><p className="text-xs text-slate-400">نشانی</p><p className="font-bold leading-8 text-white">{PRINT_CONTACT.address}</p></div></li>
              <li className="flex gap-4"><Clock className="mt-1 size-5 shrink-0 text-electric-300" aria-hidden="true" /><div><p className="text-xs text-slate-400">ساعات کاری</p><p className="font-bold text-white">{PRINT_CONTACT.hours}</p></div></li>
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={PRINT_CONTACT.whatsapp} external><MessageCircle className="size-5" aria-hidden="true" />واتس‌اپ</Button>
              <Button href={PRINT_CONTACT.map} external variant="secondary"><MapPin className="size-5" aria-hidden="true" />مسیریابی</Button>
            </div>
          </Card>
          <Card className="grid place-items-center p-8">
            <Img src="/images/karenchap.webp" alt="لوگوی کارن چاپ" className="w-full max-w-[16rem] rounded-2xl" />
          </Card>
        </Reveal>
      </section>
    </main>
  );
}
