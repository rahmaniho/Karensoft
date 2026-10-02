import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog";
import { DEMOS } from "@/lib/demos";
import { HOME_FAQS, PROCESS_STEPS, SERVICES } from "@/lib/constants";
import { INDUSTRIES } from "@/lib/industries";
import { PRODUCTS } from "@/lib/products";
import { siteConfig } from "@/lib/siteConfig";
import { toPersianDigits } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/shared/BlogCard";
import { DemoCard } from "@/components/shared/DemoCard";
import { FaqList } from "@/components/shared/FaqList";
import { ProductCard } from "@/components/shared/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export function TaxiBanner() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="taxi-banner-title">
      <div className={wrap}>
        <Reveal className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="absolute -end-20 -top-20 size-72 rounded-full bg-amber-400/15 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">رایگان برای همه آژانس‌ها</p>
              <h2 id="taxi-banner-title" className="mt-4 text-2xl font-black leading-[1.6] text-white sm:text-3xl">
                نرم‌افزار مدیریت تاکسی تلفنی — رایگان برای همه آژانس‌ها
              </h2>
              <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                داشبورد زنده، ثبت سفر با کرایه خودکار، حسابداری رانندگان و پشتیبان‌گیری؛ بدون هزینه و بدون اشتراک. فقط وارد شوید و کار را شروع کنید.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/products/taxi-software/">جزئیات و درخواست</Button>
                <Button href="/taxi-app/" variant="secondary">اجرای نسخه آنلاین</Button>
              </div>
            </div>
            <Img src="/images/taxi-karensoft.webp" alt="نرم‌افزار مدیریت تاکسی تلفنی کارن سافت" className="mx-auto w-48 rounded-2xl bg-white/95 p-3 sm:w-60" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProductsSection() {
  const list = PRODUCTS.slice(0, 6);
  return (
    <section className="py-20 sm:py-28" aria-labelledby="products-title">
      <div className={wrap}>
        <SectionHeading
          eyebrow="اکوسیستم محصولات"
          title={<span id="products-title">نرم‌افزارهایی که از دل نیاز واقعی بازار ساخته شده‌اند</span>}
          description="دو محصول هم‌اکنون فعال هستند و بقیه در حال توسعه‌اند. ابتدا نیاز را می‌شناسیم، بعد نرم‌افزار می‌سازیم."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <StaggerItem key={p.slug}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-center">
          <Button href="/products/" variant="outline">مشاهده همه محصولات<ArrowLeft className="size-4" aria-hidden="true" /></Button>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="services-title">
      <div className={wrap}>
        <SectionHeading eyebrow="خدمات" title={<span id="services-title">از ایده تا اجرا، کنار شما هستیم</span>} description="طراحی، توسعه و چاپ؛ هر سه زیر یک سقف و با یک استاندارد کیفیت." />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <StaggerItem key={s.slug}>
              <article className="glass group relative h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-electric-400/40">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-600/30 to-cyan-glow/10 text-electric-300 ring-1 ring-inset ring-electric-400/25">
                  <Icon name={s.icon} className="size-7" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-white">
                  {s.href ? <Link href={s.href} className="after:absolute after:inset-0 after:content-['']">{s.title}</Link> : s.title}
                </h3>
                <p className="mt-2 leading-8 text-slate-300">{s.desc}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-300">
                      <Icon name="Check" className="size-4 shrink-0 text-electric-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function DemosSection() {
  const list = DEMOS.slice(0, 3);
  return (
    <section className="py-20 sm:py-28" aria-labelledby="demos-title">
      <div className={wrap}>
        <SectionHeading eyebrow="دموی زنده" title={<span id="demos-title">پیش از تصمیم، کار را ببینید</span>} description="نمونه‌های واقعی که اجرا شده‌اند؛ باز کنید، کلیک کنید و کیفیت را خودتان بسنجید." />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <StaggerItem key={d.slug}>
              <DemoCard demo={d} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-center">
          <Button href="/demos/" variant="outline">همه دموها<ArrowLeft className="size-4" aria-hidden="true" /></Button>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutTeaser() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="about-title">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
        <Reveal x={30}>
          <p className="mb-4 text-sm font-bold text-electric-300">درباره کارن سافت</p>
          <h2 id="about-title" className="text-3xl font-black leading-[1.55] text-white sm:text-4xl">
            بیش از {toPersianDigits(1405 - siteConfig.founded.jalali)} سال، یک مسیر: فناوری در خدمت کسب‌وکار
          </h2>
          <p className="mt-5 text-lg leading-9 text-slate-300">
            فعالیت ما از سال {toPersianDigits(siteConfig.founded.jalali)} در قزوین آغاز شد. از نرم‌افزار حقوقی و مدیریت تاکسی تا چاپ و وب، همه را با یک نگاه می‌سازیم: ابزار باید ساده، سریع و قابل اتکا باشد.
          </p>
          <ul className="mt-6 space-y-3">
            {["نرم‌افزار حقوقی برای وکلا و مؤسسات", "نرم‌افزار رایگان مدیریت تاکسی تلفنی", "کارن چاپ؛ چاپ، مهر و صحافی", "طراحی و توسعه وب"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-slate-200">
                <Icon name="Check" className="size-5 shrink-0 text-cyan-glow" />
                {t}
              </li>
            ))}
          </ul>
          <Button href="/about/" className="mt-8" variant="secondary">بیشتر درباره ما بخوانید</Button>
        </Reveal>
        <Reveal x={-30} className="glass-strong relative overflow-hidden rounded-3xl p-3">
          <Img src="/images/hosein-rahmani.webp" alt="حسین رحمانی، بنیان‌گذار کارن سافت" className="w-full rounded-2xl object-cover" />
          <p className="px-3 pb-2 pt-4 text-center text-sm font-semibold text-slate-300">حسین رحمانی — بنیان‌گذار کارن سافت</p>
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="process-title">
      <div className={wrap}>
        <SectionHeading eyebrow="روش کار" title={<span id="process-title">چهار قدم تا تحویل</span>} />
        <Stagger as="ul" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <StaggerItem as="li" key={s.title}>
              <div className="glass relative h-full rounded-2xl p-6">
                <span className="text-gradient-blue text-5xl font-black">{toPersianDigits(i + 1)}</span>
                <h3 className="mt-3 text-lg font-extrabold text-white">{s.title}</h3>
                <p className="mt-2 leading-8 text-slate-300">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function IndustriesTeaser() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="ind-title">
      <div className={wrap}>
        <SectionHeading eyebrow="صنایع" title={<span id="ind-title">طراحی متناسب با هر صنعت</span>} description="دوازده نمونه طراحی مفهومی با رنگ، تایپوگرافی و ساختار مخصوص هر کسب‌وکار." />
        <Stagger as="ul" className="mt-12 flex flex-wrap justify-center gap-3">
          {INDUSTRIES.map((ind) => (
            <StaggerItem as="li" key={ind.slug}>
              <Link href={`/industries/${ind.slug}/`} className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-electric-400/50 hover:text-white">
                <span className="size-3 rounded-full ring-1 ring-white/30" style={{ background: ind.palette.primary }} aria-hidden="true" />
                {ind.name}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function BlogSection() {
  const posts = BLOG_POSTS.filter((p) => p.slug !== "archive").slice(0, 3);
  return (
    <section className="py-20 sm:py-28" aria-labelledby="blog-title">
      <div className={wrap}>
        <SectionHeading eyebrow="وبلاگ" title={<span id="blog-title">تازه‌ترین مقالات</span>} description="از امنیت و اتوماسیون تا مدیریت دفتر وکالت و تاکسی تلفنی." />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <StaggerItem key={p.slug}>
              <BlogCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-center">
          <Button href="/blog/" variant="outline">همه مقالات<ArrowLeft className="size-4" aria-hidden="true" /></Button>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="پرسش‌های متداول" title={<span id="faq-title">پاسخ پرسش‌های رایج</span>} />
        <Reveal className="mt-12">
          <FaqList items={HOME_FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
