import type { Metadata } from "next";
import { Clock, Globe, Instagram, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { organizationLd } from "@/lib/schema";
import { ContactForm, type FormFieldConfig } from "@/components/shared/ContactForm";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";

const DESC = "با کارن سافت تماس بگیرید: مشاوره و خرید نرم‌افزار، پشتیبانی، درخواست نسخه آزمایشی و سفارش طراحی وب. پاسخگویی ۲۴ ساعته از طریق ایمیل.";

export const metadata: Metadata = buildMetadata({ title: "تماس با ما", description: DESC, path: "/contact/" });

const FIELDS: FormFieldConfig[] = [
  { name: "name", label: "نام و نام خانوادگی", required: true, placeholder: "مثلاً علی رضایی" },
  { name: "phone", label: "شماره تماس", type: "tel", required: true, placeholder: "۰۹۱۲۱۲۳۴۵۶۷" },
  { name: "email", label: "ایمیل (اختیاری)", type: "email", placeholder: "you@example.com" },
  { name: "topic", label: "موضوع", type: "select", required: true, options: ["مشاوره و خرید", "نظرات و پیشنهادات", "پشتیبانی", "درخواست نسخه تستی", "سایر"] },
  { name: "message", label: "پیام شما", type: "textarea", required: true, placeholder: "نیاز یا سؤال خود را بنویسید…", rows: 6 },
];

export default function ContactPage() {
  const info = [
    { Icon: Phone, label: "تلفن", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
    { Icon: Mail, label: "ایمیل", value: siteConfig.email, href: `mailto:${siteConfig.email}`, ltr: true },
    { Icon: MessageCircle, label: "واتساپ", value: "@karensoft.ir", href: siteConfig.socials.whatsapp, ltr: true },
    { Icon: Send, label: "تلگرام", value: "@KarenSoft_dev", href: siteConfig.socials.telegram, ltr: true },
    { Icon: Globe, label: "روبیکا", value: "@KarenSoft", href: siteConfig.socials.rubika, ltr: true },
    { Icon: Instagram, label: "اینستاگرام", value: "@Karen_soft.ir", href: siteConfig.socials.instagram, ltr: true },
    { Icon: MapPin, label: "نشانی", value: siteConfig.address },
  ];
  return (
    <main id="main">
      <JsonLd data={organizationLd()} />
      <PageHero eyebrow="تماس با ما" title="برای شروع، یک پیام کافی است" description="مشاوره و برآورد اولیه رایگان است. پیام بگذارید یا مستقیم تماس بگیرید." breadcrumbs={[{ name: "تماس با ما", path: "/contact/" }]} />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <Reveal>
          <Card className="p-6 sm:p-9">
            <h2 className="text-2xl font-extrabold text-white">ارسال پیام</h2>
            <p className="mb-7 mt-2 text-slate-300">فرم زیر را پر کنید؛ در سریع‌ترین زمان پاسخ می‌دهیم.</p>
            <ContactForm
              formId="contact"
              fields={FIELDS}
              subject="پیام جدید از فرم تماس سایت کارن سافت"
              submitLabel="ارسال پیام"
              successMessage="پیام شما با موفقیت ثبت شد و در سریع‌ترین زمان ممکن پاسخ می‌دهیم."
            />
          </Card>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <Card className="p-6">
              <h2 className="text-lg font-extrabold text-white">راه‌های ارتباطی</h2>
              <ul className="mt-5 space-y-4">
                {info.map(({ Icon, label, value, href, ltr }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-electric-600/15 text-electric-300">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      {href ? (
                        <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="font-bold text-white transition-colors hover:text-electric-300" dir={ltr ? "ltr" : undefined}>{value}</a>
                      ) : (
                        <p className="font-bold text-white">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.15}>
            <Card className="p-6">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-white"><Clock className="size-5 text-electric-300" aria-hidden="true" />ساعات کاری</h2>
              <dl className="mt-4 divide-y divide-white/10">
                {siteConfig.workingHours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="text-slate-300">{h.days}</dt>
                    <dd className="font-bold text-white">{h.hours}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-slate-400">پاسخگویی ایمیلی ۲۴ ساعته</p>
            </Card>
          </Reveal>
          <Reveal delay={0.2}>
            <Card className="border-electric-400/30 bg-electric-600/10 p-6">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-white"><ShieldCheck className="size-5 text-electric-300" aria-hidden="true" />پشتیبانی ویژه</h2>
              <p className="mt-3 leading-8 text-slate-200">کاربران نرم‌افزارهای کارن سافت می‌توانند درخواست نصب، راه‌اندازی و سفارشی‌سازی را از همین فرم یا از طریق تلفن ثبت کنند.</p>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
