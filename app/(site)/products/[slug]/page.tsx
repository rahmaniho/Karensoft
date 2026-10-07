import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { GENERIC_PRODUCTS, PRODUCT_STATUS_LABEL, getProduct } from "@/lib/products";
import { softwareLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrowserMockup } from "@/components/demos/DeviceMockups";
import { ContactForm, type FormFieldConfig } from "@/components/shared/ContactForm";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return GENERIC_PRODUCTS.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return buildMetadata({ title: p.name, description: p.description, path: `/products/${p.slug}/` });
}

const LAW_SHOTS: { src: string; alt: string }[] = [
  { src: "/images/slider/dashboard/1.webp", alt: "داشبورد نرم‌افزار دفتر وکالت" },
  { src: "/images/slider/cases/1.webp", alt: "فهرست پرونده‌ها در نرم‌افزار دفتر وکالت" },
  { src: "/images/slider/calendar/1.webp", alt: "تقویم شمسی جلسات در نرم‌افزار دفتر وکالت" },
  { src: "/images/slider/finance/1.webp", alt: "بخش امور مالی نرم‌افزار دفتر وکالت" },
  { src: "/images/slider/clients/1.webp", alt: "مدیریت موکلین در نرم‌افزار دفتر وکالت" },
  { src: "/images/slider/reports/1.webp", alt: "گزارش‌های نرم‌افزار دفتر وکالت" },
];

const MODULE_ICONS = ["Layout", "Layers", "Users", "Calendar", "Wallet", "Sparkles", "FileText"];

const LAW_PLANS = [
  { name: "پلن وکلا", desc: "برای وکیل مستقل و دفاتر کوچک." },
  { name: "پلن مؤسسات", desc: "برای مؤسسات حقوقی و دفاتر چندنفره." },
  { name: "پلن حرفه‌ای + AI", desc: "تمام امکانات به‌همراه دستیار هوش مصنوعی." },
];

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const isActive = p.status === "active";
  const isLaw = p.slug === "law-office";
  const fields: FormFieldConfig[] = [
    { name: "name", label: "نام و نام خانوادگی", required: true },
    { name: "phone", label: "شماره تماس", type: "tel", required: true, placeholder: "۰۹۱۲۱۲۳۴۵۶۷" },
    { name: "email", label: "ایمیل (اختیاری)", type: "email" },
    ...(isLaw ? [{ name: "plan", label: "پلن مورد نظر", type: "select" as const, options: LAW_PLANS.map((l) => l.name) }] : []),
    { name: "message", label: "توضیحات (اختیاری)", type: "textarea", rows: 4, full: true },
  ];

  return (
    <main id="main">
      <JsonLd data={softwareLd({ name: p.name, description: p.description, path: `/products/${p.slug}/`, free: p.free, features: p.features })} />
      <PageHero
        eyebrow={isActive ? "محصول فعال" : "در حال توسعه"}
        title={p.name}
        description={p.description}
        breadcrumbs={[{ name: "محصولات", path: "/products/" }, { name: p.name, path: `/products/${p.slug}/` }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={isActive ? "green" : "amber"}>{PRODUCT_STATUS_LABEL[p.status]}</Badge>
          {p.chips.map((c) => <Badge key={c} tone="slate">{c}</Badge>)}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="#request" size="lg">{isActive ? "درخواست نسخه آزمایشی" : "اطلاع‌رسانی انتشار"}</Button>
          {p.demoHref ? <Button href={p.demoHref} variant="secondary" size="lg" external>مشاهده دمو</Button> : null}
        </div>
      </PageHero>

      {isLaw ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="shots-title">
          <SectionHeading eyebrow="تصاویر محیط نرم‌افزار" title={<span id="shots-title">نگاهی به داخل برنامه</span>} />
          <Reveal className="mx-auto mt-12 max-w-4xl">
            <BrowserMockup src={LAW_SHOTS[0]!.src} alt={LAW_SHOTS[0]!.alt} url="Karen Soft · Law Office" />
          </Reveal>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LAW_SHOTS.slice(1).map((s) => (
              <StaggerItem key={s.src}>
                <BrowserMockup src={s.src} alt={s.alt} url="Karen Soft · Law Office" />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="features-title">
        <SectionHeading eyebrow={isActive ? "امکانات" : "قابلیت‌های برنامه‌ریزی‌شده"} title={<span id="features-title">{isActive ? "آنچه دریافت می‌کنید" : "آنچه در حال ساخت آن هستیم"}</span>} />
        <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2">
          {p.features.map((f) => (
            <StaggerItem as="li" key={f}>
              <div className="glass flex h-full items-start gap-4 rounded-2xl p-5">
                <span className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-electric-600/25 text-electric-300"><Check className="size-4" aria-hidden="true" /></span>
                <span className="leading-8 text-slate-200">{f}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="modules-title">
        <SectionHeading eyebrow="بخش‌ها" title={<span id="modules-title">ماژول‌های محصول</span>} />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.modules.map((m, i) => (
            <StaggerItem key={m.title}>
              <Card interactive className="h-full p-6">
                <Icon name={MODULE_ICONS[i % MODULE_ICONS.length] ?? "Layout"} className="size-7 text-electric-300" />
                <h3 className="mt-4 text-lg font-extrabold text-white">{m.title}</h3>
                <p className="mt-2 leading-8 text-slate-300">{m.desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {isLaw ? (
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6" aria-labelledby="plans-title">
          <SectionHeading eyebrow="پلن‌ها" title={<span id="plans-title">سه پلن برای هر اندازه دفتر</span>} description="برای اطلاع از شرایط و قیمت هر پلن، از فرم پایین صفحه یا تماس تلفنی استفاده کنید." />
          <Stagger as="ul" className="mt-10 grid gap-5 md:grid-cols-3">
            {LAW_PLANS.map((l) => (
              <StaggerItem as="li" key={l.name}>
                <Card className="h-full p-6 text-center"><h3 className="text-lg font-extrabold text-white">{l.name}</h3><p className="mt-2 text-slate-300">{l.desc}</p></Card>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ) : null}

      <section id="request" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-16 sm:px-6" aria-labelledby="request-title">
        <Reveal>
          <Card className="p-6 sm:p-9">
            <h2 id="request-title" className="text-2xl font-extrabold text-white">{isActive ? "درخواست نسخه آزمایشی" : `از انتشار «${p.name}» باخبر شوید`}</h2>
            <p className="mb-7 mt-2 leading-8 text-slate-300">
              {isActive ? "اطلاعات خود را بگذارید تا نسخهٔ آزمایشی و راهنمای نصب را برایتان ارسال کنیم." : "این محصول هنوز منتشر نشده است. شمارهٔ تماس‌تان را بگذارید تا هنگام انتشار به شما اطلاع دهیم."}
            </p>
            <ContactForm
              formId={`product-${p.slug}`}
              fields={fields}
              subject={`${isActive ? "درخواست نسخه آزمایشی" : "اطلاع‌رسانی انتشار"}: ${p.name}`}
              hidden={{ product: p.name }}
              submitLabel={isActive ? "ثبت درخواست" : "ثبت درخواست اطلاع‌رسانی"}
              successTitle="درخواست شما ثبت شد"
              successMessage="به‌زودی با شما تماس می‌گیریم."
            />
          </Card>
        </Reveal>
        {p.image && isLaw ? <div className="mt-10 flex justify-center"><Img src={p.image} alt="نماد نرم‌افزار دفتر وکالت هوشمند" className="size-24 rounded-2xl" /></div> : null}
      </section>
    </main>
  );
}
