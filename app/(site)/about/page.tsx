import type { Metadata } from "next";
import { Car, Gavel, Globe, Printer, Rocket, Target, Handshake, Lightbulb } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { organizationLd } from "@/lib/schema";
import { toPersianDigits } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Img } from "@/components/ui/Img";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

const DESC = "کارن سافت از سال ۱۳۷۸ شریک فناوری کسب‌وکارهای ایرانی است: نرم‌افزار حقوقی، نرم‌افزار رایگان مدیریت تاکسی تلفنی، خدمات چاپ و طراحی وب.";

export const metadata: Metadata = buildMetadata({ title: "درباره ما", description: DESC, path: "/about/" });

const ECOSYSTEM = [
  { Icon: Gavel, title: "نرم‌افزار حقوقی", desc: "نرم‌افزار مدیریت دفتر وکالت هوشمند: پرونده، موکل، جلسات، قراردادها و مالی در یک بستر آفلاین و امن.", href: "/products/law-office/", cta: "مشاهده محصول" },
  { Icon: Car, title: "مدیریت تاکسی تلفنی", desc: "نرم‌افزار رایگان برای آژانس‌ها؛ از ثبت سفر و کرایه خودکار تا حسابداری رانندگان و پشتیبان‌گیری.", href: "/products/taxi-software/", cta: "دریافت رایگان" },
  { Icon: Printer, title: "کارن چاپ", desc: "چاپ افست و دیجیتال، مهر، صحافی و هدایای تبلیغاتی در شهرصنعتی البرز قزوین.", href: "/services/printing/", cta: "مشاهده خدمات" },
  { Icon: Globe, title: "طراحی و توسعه وب", desc: "وب‌سایت‌های سریع، دسترس‌پذیر و سئوشده با Next.js؛ از سایت شرکتی تا لندینگ و فروشگاه.", href: "/portfolio/", cta: "نمونه‌کارها" },
];

const VALUES = [
  { Icon: Lightbulb, title: "ساده‌سازی", desc: "هر ابزاری که می‌سازیم باید در همان روز اول قابل استفاده باشد." },
  { Icon: Handshake, title: "تعهد پس از تحویل", desc: "پشتیبانی و به‌روزرسانی، بخشی از محصول است نه یک هزینهٔ جداگانه." },
  { Icon: Target, title: "تمرکز بر نیاز واقعی", desc: "از دل مسئله‌های واقعی دفاتر وکالت، آژانس‌ها و چاپخانه‌ها شروع می‌کنیم." },
  { Icon: Rocket, title: "کیفیت فنی", desc: "کد تمیز، سرعت بالا، دسترس‌پذیری و امنیت از ابتدا در طراحی لحاظ می‌شود." },
];

export default function AboutPage() {
  const years = 1405 - siteConfig.founded.jalali;
  return (
    <main id="main">
      <JsonLd data={organizationLd()} />
      <PageHero
        eyebrow="درباره کارن سافت"
        title={<>از سال {toPersianDigits(siteConfig.founded.jalali)}، در کنار کسب‌وکارهای ایرانی</>}
        description="کارن سافت یک گروه نرم‌افزاری مستقر در قزوین است که فناوری را برای صاحبان کسب‌وکار ساده، در دسترس و مفید می‌کند."
        breadcrumbs={[{ name: "درباره ما", path: "/about/" }]}
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8" aria-labelledby="history-title">
        <Reveal>
          <h2 id="history-title" className="text-3xl font-black text-white">تاریخچه؛ بیش از {toPersianDigits(years)} سال تجربه</h2>
          <div className="mt-6 space-y-5 text-lg leading-9 text-slate-300">
            <p>فعالیت کارن سافت در سال {toPersianDigits(siteConfig.founded.jalali)} در قزوین آغاز شد. از همان ابتدا باور داشتیم نرم‌افزار خوب، نرم‌افزاری است که کاربر برای استفاده از آن نیاز به آموزش طولانی نداشته باشد.</p>
            <p>امروز فعالیت ما چهار حوزهٔ مکمل را پوشش می‌دهد. سیستم «کارن» برای مدیریت تاکسی تلفنی در سال ۱۳۹۶ در مشهد رونمایی شد و امروز نسخهٔ رایگان آن برای همهٔ آژانس‌ها در دسترس است.</p>
            <p>نرم‌افزار مدیریت دفتر وکالت هوشمند، محصول حقوقی ما، برای وکلا و مؤسسات حقوقی ساخته شد تا پرونده‌ها، جلسات و امور مالی در یک بستر ساده و امن مدیریت شوند.</p>
          </div>
        </Reveal>
        <Reveal x={-30}>
          <Card className="p-3">
            <Img src="/images/hosein-rahmani.webp" alt="حسین رحمانی، بنیان‌گذار کارن سافت" className="w-full rounded-xl object-cover" />
            <div className="px-3 py-4 text-center">
              <p className="text-lg font-extrabold text-white">{siteConfig.founder}</p>
              <p className="text-sm text-slate-400">بنیان‌گذار کارن سافت</p>
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="mission-title">
        <Reveal className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-14">
          <div className="bg-aurora absolute inset-0 -z-10" aria-hidden="true" />
          <p className="text-sm font-bold text-electric-300">ماموریت ما</p>
          <h2 id="mission-title" className="mt-3 max-w-4xl text-2xl font-black leading-[1.9] text-white sm:text-3xl">
            شریک فناوری کسب‌وکارهای ایرانی باشیم: ابزارهایی بسازیم که کار روزمره را سبک می‌کنند و رشد را ممکن می‌سازند.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-200">
            ما فروشندهٔ نرم‌افزار آماده نیستیم؛ کنار شما می‌نشینیم، فرایند کار را می‌فهمیم و ابزاری می‌سازیم که واقعاً به کار می‌آید. بخشی از محصولاتمان، مثل نرم‌افزار مدیریت تاکسی تلفنی، را به‌عنوان مسئولیت اجتماعی رایگان ارائه می‌دهیم.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="eco-title">
        <SectionHeading eyebrow="اکوسیستم محصولات" title={<span id="eco-title">چهار حوزه، یک استاندارد کیفیت</span>} description="هر حوزه از تجربه و نیاز واقعی همان بازار شکل گرفته است." />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {ECOSYSTEM.map(({ Icon, title, desc, href, cta }) => (
            <StaggerItem key={title}>
              <Card interactive className="h-full p-7">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-electric-600/15 text-electric-300 ring-1 ring-inset ring-electric-400/25">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-white">{title}</h3>
                <p className="mt-2 leading-8 text-slate-300">{desc}</p>
                <Button href={href} variant="outline" size="sm" className="mt-5">{cta}</Button>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="values-title">
        <SectionHeading eyebrow="ارزش‌ها" title={<span id="values-title">آنچه برایمان مهم است</span>} />
        <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, desc }) => (
            <StaggerItem as="li" key={title}>
              <div className="glass h-full rounded-2xl p-6">
                <Icon className="size-8 text-cyan-glow" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-extrabold text-white">{title}</h3>
                <p className="mt-2 leading-8 text-slate-300">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTASection title="با ما همکاری کنید" description="چه یک نرم‌افزار اختصاصی بخواهید، چه یک وب‌سایت یا سفارش چاپ، گفتگو با ما رایگان است." />
    </main>
  );
}
