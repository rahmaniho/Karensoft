import type { Metadata } from "next";
import { Car, Gavel, Globe, Printer, Rocket, Target, Handshake, Lightbulb, BadgeCheck, Mail, Phone, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { organizationLd } from "@/lib/schema";
import { toPersianDigits } from "@/lib/utils";
import { Timeline } from "@/components/sections/Timeline";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Img } from "@/components/ui/Img";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

const DESC = `کارن سافت در سال ${toPersianDigits(siteConfig.founded.jalali)} به مدیریت و بنیان‌گذاری ${siteConfig.founder} تأسیس شد: نرم‌افزار حقوقی، نرم‌افزار رایگان مدیریت تاکسی تلفنی، خدمات چاپ و طراحی وب.`;

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
  return (
    <main id="main">
      <JsonLd data={organizationLd()} />
      <PageHero
        eyebrow="ABOUT / دربارهٔ کارن سافت"
        title={
          <>
            تأسیس {toPersianDigits(siteConfig.founded.jalali)} — یک تیم، یک استاندارد،{" "}
            <span className="text-gradient-animated">فناوری در خدمت کسب‌وکار</span>
          </>
        }
        description={`کارن سافت یک گروه نرم‌افزاری مستقر در ${siteConfig.city} است به مدیریت ${siteConfig.founder}؛ فناوری را برای صاحبان کسب‌وکار ساده، در دسترس و مفید می‌کند.`}
        breadcrumbs={[{ name: "درباره ما", path: "/about/" }]}
      />

      {/* هویت و مأموریت */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="mission-title">
        <div className="grid items-start gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal className="glass-strong relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
            <div className="bg-aurora absolute inset-0 -z-10 opacity-90" aria-hidden="true" />
            <div className="bg-noise absolute inset-0 -z-10 opacity-[0.05]" aria-hidden="true" />
            <p className="font-mono text-[0.68rem] tracking-widest text-electric-300">MISSION / مأموریت ما</p>
            <h2 id="mission-title" className="mt-4 max-w-4xl text-2xl font-black leading-[1.85] text-white sm:text-3xl">
              شریک فناوری کسب‌وکارهای ایرانی باشیم: ابزارهایی بسازیم که کار روزمره را سبک می‌کنند و رشد را ممکن می‌سازند.
            </h2>
            <p className="mt-5 max-w-3xl leading-9 text-mist-400">
              کارن سافت در سال {toPersianDigits(siteConfig.founded.jalali)} به مدیریت و بنیان‌گذاری {siteConfig.founder} تأسیس شد تا
              محصولاتی که پیش‌تر به‌صورت پراکنده برای آژانس‌های تاکسی تلفنی، دفاتر وکالت، چاپخانه‌ها و کسب‌وکارهای کوچک ساخته شده بود،
              زیر یک برند و یک استاندارد کیفیت ادامه پیدا کند.
            </p>
            <p className="mt-4 max-w-3xl leading-9 text-mist-400">
              ما فروشندهٔ نرم‌افزار آماده نیستیم؛ کنار شما می‌نشینیم، فرایند کار را می‌فهمیم و ابزاری می‌سازیم که واقعاً به کار می‌آید.
              بخشی از محصولاتمان، مثل نرم‌افزار مدیریت تاکسی تلفنی، به‌عنوان مسئولیت اجتماعی رایگان ارائه می‌شود.
            </p>
            <dl className="mt-8 grid gap-4 border-t border-white/8 pt-7 sm:grid-cols-3">
              {[
                { label: "سال تأسیس", value: toPersianDigits(siteConfig.founded.jalali) },
                { label: "مرکز فعالیت", value: siteConfig.city },
                { label: "حوزه‌های تخصصی", value: toPersianDigits(4) },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[0.62rem] tracking-widest text-mist-500">{item.label}</dt>
                  <dd className="mt-1 text-xl font-black text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* کارت مدیر و بنیان‌گذار */}
          <Reveal x={-28}>
            <Card className="group overflow-hidden p-3">
              <div className="relative overflow-hidden rounded-[1.4rem]">
                <Img
                  src={siteConfig.founderImage}
                  alt={`${siteConfig.founder}، ${siteConfig.founderRole} کارن سافت`}
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950/75 px-3 py-1 text-[0.65rem] font-bold text-mint-400 ring-1 ring-inset ring-mint-500/30 backdrop-blur-md">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    مدیر و بنیان‌گذار
                  </span>
                  <p className="mt-2 text-xl font-black text-white">{siteConfig.founder}</p>
                  <p className="font-mono text-[0.68rem] tracking-wider text-electric-300">Hosein Rahmani</p>
                </div>
              </div>
              <ul className="space-y-2.5 px-3 pb-3 pt-5 text-sm text-mist-400">
                <li>
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 transition-colors hover:text-electric-300" dir="ltr">
                    <Phone className="size-4 text-electric-400" aria-hidden="true" />
                    <span className="font-mono">{siteConfig.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors hover:text-electric-300" dir="ltr">
                    <Mail className="size-4 text-electric-400" aria-hidden="true" />
                    <span className="font-mono">{siteConfig.email}</span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="size-4 shrink-0 text-electric-400" aria-hidden="true" />
                  <span dir="rtl">{siteConfig.address}</span>
                </li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* تایم‌لاین */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="timeline-title">
        <SectionHeading
          align="start"
          eyebrow="TIMELINE / مسیر ما"
          title={<span id="timeline-title">از تجربهٔ سال‌های اول تا تأسیس {toPersianDigits(siteConfig.founded.jalali)}</span>}
          description="کارن سافت در ۱۴۰۴ تأسیس شد، اما ریشه‌اش سال‌ها کار عملی روی نرم‌افزارهای واقعی است؛ این نقطه‌های عطف همان مسیرند."
        />
        <div className="mt-14">
          <Timeline />
        </div>
      </section>

      {/* اکوسیستم */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="eco-title">
        <SectionHeading
          eyebrow="ECOSYSTEM / اکوسیستم محصولات"
          title={<span id="eco-title">چهار حوزه، یک استاندارد کیفیت</span>}
          description="هر حوزه از تجربه و نیاز واقعی همان بازار شکل گرفته است."
        />
        <Stagger className="mt-14 grid gap-4 md:grid-cols-2">
          {ECOSYSTEM.map(({ Icon, title, desc, href, cta }) => (
            <StaggerItem key={title}>
              <Card interactive className="group h-full p-7">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-electric-400/25 bg-electric-400/10 text-electric-300 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-white">{title}</h3>
                <p className="mt-2 leading-8 text-mist-400">{desc}</p>
                <Button href={href} variant="outline" size="sm" className="mt-5">{cta}</Button>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ارزش‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="values-title">
        <SectionHeading eyebrow="VALUES / ارزش‌ها" title={<span id="values-title">آنچه برایمان مهم است</span>} />
        <Stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, desc }, index) => (
            <StaggerItem as="li" key={title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-violet-glow/35 hover:bg-white/[0.045]">
                <span aria-hidden="true" className="font-mono text-[0.65rem] tracking-widest text-mist-500">
                  {`0${index + 1}`}
                </span>
                <Icon className="mt-3 size-8 text-electric-400 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-extrabold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-8 text-mist-400">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTASection title="با ما همکاری کنید" description="چه یک نرم‌افزار اختصاصی بخواهید، چه یک وب‌سایت یا سفارش چاپ، گفتگو با ما رایگان است." />
    </main>
  );
}
