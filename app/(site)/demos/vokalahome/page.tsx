import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Armchair, CalendarCheck, Compass, FileText, Search, Smartphone, UsersRound, Zap } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { EXTERNAL, siteConfig } from "@/lib/siteConfig";
import { TECH_BADGES } from "@/lib/constants";
import { softwareLd } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { BrowserMockup, PhoneMockup } from "@/components/demos/DeviceMockups";
import { VokalaGallery, type GalleryItem } from "@/components/demos/VokalaGallery";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

const DESC = "دموی وب‌سایت «خانه وکلا»؛ کافه و باشگاه تخصصی وکلا در قزوین. ساخته‌شده با Next.js 14، TypeScript، Tailwind، Framer Motion و PWA با امتیاز ۱۰۰ در دسترس‌پذیری، بهترین شیوه‌ها و سئو.";
const DIR = "/images/demos/vokalahome";

export const metadata: Metadata = buildMetadata({
  title: "دموی خانه وکلا (Vokalahome)",
  description: DESC,
  path: "/demos/vokalahome/",
  image: `${DIR}/og.jpg`,
  keywords: ["خانه وکلا", "طراحی سایت وکیل", "Next.js", "PWA"],
});

const FEATURES = [
  { Icon: Compass, title: "گالری و تور مجازی ۳۶۰°", desc: "گالری تصاویر فضای کافه و باشگاه، به‌همراه پانورامای ۳۶۰ درجه برای بازدید آنلاین." },
  { Icon: CalendarCheck, title: "رزرو اتاق با تقویم شمسی", desc: "ویجت رزرو اتاق مشاوره و جلسات با انتخاب تاریخ شمسی." },
  { Icon: FileText, title: "مقالات حقوقی", desc: "صفحات مقاله با داده ساختاریافته، فید RSS و ساختار مناسب موتورهای جستجو." },
  { Icon: UsersRound, title: "پروفایل وکلای عضو", desc: "صفحهٔ اختصاصی برای هر وکیل، همراه با تخصص‌ها و راه‌های ارتباطی." },
  { Icon: Smartphone, title: "PWA و حالت آفلاین", desc: "قابل نصب روی گوشی، دارای Service Worker و صفحهٔ آفلاین." },
  { Icon: Search, title: "سئو و دسترس‌پذیری", desc: "نقشهٔ سایت، robots، JSON-LD و رعایت استانداردهای دسترس‌پذیری." },
  { Icon: Armchair, title: "طراحی راست‌چین موبایل‌محور", desc: "رابط کاملاً فارسی با فونت Vazirmatn خودمیزبان و بدون وابستگی به CDN." },
  { Icon: Zap, title: "استاتیک و سریع", desc: "خروجی کاملاً استاتیک روی GitHub Pages؛ بدون سرور و دیتابیس." },
];

const SCORES = [
  { label: "دسترس‌پذیری", sub: "Accessibility" },
  { label: "بهترین شیوه‌ها", sub: "Best Practices" },
  { label: "سئو", sub: "SEO" },
];

const GALLERY: GalleryItem[] = [
  { src: `${DIR}/cafe-interior.webp`, alt: "فضای داخلی کافه خانه وکلا", caption: "فضای کافه" },
  { src: `${DIR}/coffee-and-case.webp`, alt: "فنجان قهوه، ترازو و پروندهٔ حقوقی روی میز", caption: "قهوه و پرونده" },
  { src: `${DIR}/consultation-room.webp`, alt: "اتاق مشاوره حقوقی با میز و چراغ مطالعه", caption: "اتاق مشاوره" },
  { src: `${DIR}/reception.webp`, alt: "لابی و بخش پذیرش خانه وکلا", caption: "پذیرش" },
  { src: `${DIR}/library.webp`, alt: "کتابخانهٔ حقوقی", caption: "کتابخانه" },
  { src: `${DIR}/meeting-room.webp`, alt: "میز و صندلی‌های اتاق جلسات خانه وکلا", caption: "اتاق جلسات" },
  { src: `${DIR}/panorama-cafe-360.webp`, alt: "تصویر پانورامای ۳۶۰ درجه از کافه", caption: "پانورامای ۳۶۰° کافه" },
  { src: `${DIR}/legal-editorial.webp`, alt: "ترازوی عدالت و کتاب حقوقی روی میز", caption: "مقالات حقوقی" },
  { src: `${DIR}/manager-portrait.webp`, alt: "پرتره یک وکیل با کت‌وشلوار در برابر قفسهٔ کتاب", caption: "پرتره وکیل" },
];

export default function VokalahomePage() {
  return (
    <main id="main" className="bg-[#0B1F3A]">
      <JsonLd data={softwareLd({ name: "وب‌سایت خانه وکلا", description: DESC, path: "/demos/vokalahome/", features: FEATURES.map((f) => f.title) })} />

      {/* هیرو */}
      <section className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-40" aria-labelledby="vk-title">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,rgb(201_162_39/0.22),transparent_70%),radial-gradient(50%_45%_at_0%_30%,rgb(201_162_39/0.1),transparent_70%)]" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "دموی زنده", path: "/demos/" }, { name: "خانه وکلا", path: "/demos/vokalahome/" }]} />
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <p className="inline-flex rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 text-sm font-bold text-[#C9A227]">نمونه‌کار کارن سافت · کافه و باشگاه وکلا، قزوین</p>
              <h1 id="vk-title" className="mt-6 text-4xl font-black leading-[1.5] text-white sm:text-5xl">
                خانه وکلا
                <span className="mt-2 block text-[#C9A227]">وب‌سایتی که به اندازهٔ یک وکیل، قابل اعتماد است</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-9 text-mist-100">
                وب‌سایت رسمی «خانه وکلا»، کافه و باشگاه تخصصی وکلا در قزوین: سریع، راست‌چین، موبایل‌محور و کاملاً استاتیک، با امتیاز ۱۰۰ در دسترس‌پذیری، بهترین شیوه‌ها و سئو در Lighthouse.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={EXTERNAL.vokalahomeLive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#C9A227] px-8 text-base font-extrabold text-[#0B1F3A] shadow-[0_10px_34px_-10px_rgb(201_162_39/0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#d8b238] active:scale-[0.97]"
                >
                  مشاهده دموی زنده
                  <ArrowLeft className="size-5 transition-transform group-hover/btn:-translate-x-1" aria-hidden="true" />
                </a>
                <a href={EXTERNAL.vokalahomeRepo} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:border-[#C9A227] hover:text-[#C9A227]">
                  کد منبع در GitHub
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="فناوری‌های به‌کاررفته">
                {TECH_BADGES.map((t) => (
                  <li key={t} className="rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/8 px-3 py-1.5 text-sm font-bold text-[#e6c75a]" dir="ltr">{t}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal x={-30} className="relative">
              <BrowserMockup src={`${DIR}/hero.webp`} alt="صفحهٔ اصلی وب‌سایت خانه وکلا در مرورگر دسکتاپ" url="rahmaniho.github.io/Vokalahome" priority className="border-[#C9A227]/30" barClassName="bg-[#0B1F3A]" />
              <div className="absolute -bottom-12 start-2 hidden w-36 sm:block md:start-[-1.5rem] md:w-44">
                <PhoneMockup src={`${DIR}/reception.webp`} alt="نمای موبایل وب‌سایت خانه وکلا" frameClassName="border-[#142c52]" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* امتیازها */}
      <section className="border-y border-[#C9A227]/20 bg-black/20 py-14" aria-labelledby="scores-title">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 id="scores-title" className="text-2xl font-black text-white sm:text-3xl">گزارش Lighthouse: <span className="text-[#C9A227]">۱۰۰ / ۱۰۰ / ۱۰۰</span></h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {SCORES.map((s) => (
              <li key={s.label} className="rounded-2xl border border-[#C9A227]/25 bg-[#0B1F3A] p-6">
                <span className="mx-auto grid size-24 place-items-center rounded-full border-4 border-emerald-400 text-4xl font-black text-emerald-300" aria-hidden="true">۱۰۰</span>
                <p className="mt-4 text-lg font-extrabold text-white">{s.label}</p>
                <p className="text-sm text-mist-400" dir="ltr">{s.sub}: 100</p>
                <span className="sr-only">امتیاز ۱۰۰ از ۱۰۰</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ویژگی‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="vk-features">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold text-[#C9A227]">مرور ویژگی‌ها</p>
          <h2 id="vk-features" className="mt-3 text-3xl font-black leading-[1.6] text-white sm:text-4xl">هر بخش، برای اعتماد بیشتر مراجعان</h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ Icon, title, desc }) => (
            <StaggerItem key={title} lift>
              <article className="h-full rounded-2xl border border-[#C9A227]/20 bg-gradient-to-b from-white/[0.06] to-transparent p-6 transition-colors hover:border-[#C9A227]/60">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-[#C9A227]/15 text-[#C9A227]"><Icon className="size-6" aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg font-extrabold text-white">{title}</h3>
                <p className="mt-2 leading-8 text-mist-400">{desc}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* گالری */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8" aria-labelledby="vk-gallery">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-bold text-[#C9A227]">گالری</p>
          <h2 id="vk-gallery" className="mt-3 text-3xl font-black text-white sm:text-4xl">نگاهی به فضای خانه وکلا</h2>
          <p className="mt-3 text-mist-400">برای بزرگ‌نمایی روی هر تصویر کلیک کنید.</p>
        </Reveal>
        <VokalaGallery items={GALLERY} />
      </section>

      {/* فناوری‌ها + CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8" aria-labelledby="vk-tech">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#C9A227]/30 bg-gradient-to-br from-[#12305a] to-[#0B1F3A] p-8 text-center sm:p-14">
          <h2 id="vk-tech" className="text-2xl font-black text-white sm:text-3xl">ساخته‌شده با فناوری روز</h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-3" aria-label="فناوری‌ها">
            {TECH_BADGES.map((t) => (
              <li key={t} className="rounded-xl border border-[#C9A227]/40 bg-black/20 px-5 py-2.5 font-bold text-[#e6c75a]" dir="ltr">{t}</li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-mist-100">وب‌سایتی مثل «خانه وکلا» برای کسب‌وکار شما هم می‌سازیم. با {siteConfig.name} گفتگو کنید.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={EXTERNAL.vokalahomeLive} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-xl bg-[#C9A227] px-8 font-extrabold text-[#0B1F3A] transition-all hover:-translate-y-0.5 hover:bg-[#d8b238]">
              مشاهده دموی زنده
            </a>
            <Link href="/contact/" className="inline-flex h-14 items-center justify-center rounded-xl border border-white/25 px-8 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-[#C9A227] hover:text-[#C9A227]">
              سفارش پروژه مشابه
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
