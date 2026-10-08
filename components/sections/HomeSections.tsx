"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog";
import { HOME_FAQS, PROCESS_STEPS } from "@/lib/constants";
import { INDUSTRIES } from "@/lib/industries";
import { siteConfig } from "@/lib/siteConfig";
import { toPersianDigits } from "@/lib/utils";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { ActionButton } from "@/components/ui/ActionButton";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { BlogCard } from "@/components/shared/BlogCard";
import { FaqList } from "@/components/shared/FaqList";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

const wrap = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const EASE = [0.22, 1, 0.36, 1] as const;

/** بنر نرم‌افزار رایگان مدیریت تاکسی تلفنی */
export function TaxiBanner() {
  const reduce = useReducedMotion();
  return (
    <section className="py-14 sm:py-18" aria-labelledby="taxi-banner-title">
      <div className={wrap}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] border border-mint-500/22 bg-gradient-to-l from-mint-500/12 via-ink-850/60 to-ink-900/40 p-8 backdrop-blur-xl sm:p-12"
        >
          <span aria-hidden="true" className="bg-noise absolute inset-0 opacity-[0.05]" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -end-24 -top-24 size-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgb(16 185 129 / 0.28), transparent 68%)" }}
          />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-mint-500/15 px-3 py-1 font-mono text-[0.66rem] tracking-widest text-mint-400 ring-1 ring-inset ring-mint-500/25">
                <Sparkles className="size-3.5" aria-hidden="true" />
                FREE FOREVER
              </p>
              <h2 id="taxi-banner-title" className="mt-4 text-2xl font-black leading-[1.6] text-white sm:text-3xl">
                نرم‌افزار مدیریت تاکسی تلفنی — رایگان برای همهٔ آژانس‌ها
              </h2>
              <p className="mt-3 max-w-2xl leading-8 text-mist-400">
                داشبورد زنده، ثبت سفر با کرایهٔ خودکار، حسابداری رانندگان و پشتیبان‌گیری؛ بدون هزینه، بدون اشتراک و بدون محدودیت نسخه.
                وارد شوید و کار را شروع کنید.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ActionButton href="/products/taxi-software/" magnetic>جزئیات و درخواست</ActionButton>
                <ActionButton href="/taxi-app/" variant="secondary">اجرای نسخهٔ آنلاین</ActionButton>
              </div>
            </div>
            <Img
              src="/images/taxi-karensoft.webp"
              alt="نرم‌افزار مدیریت تاکسی تلفنی کارن سافت"
              className="mx-auto w-44 rounded-2xl bg-white/95 p-3 shadow-[0_30px_70px_-40px_rgb(16_185_129/0.9)] sm:w-56"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** روش کار: چهار قدم تا تحویل */
export function ProcessSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="process-title">
      <div className={wrap}>
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 font-mono text-[0.68rem] tracking-widest text-mist-400">
            PROCESS / روش کار
          </p>
          <h2 id="process-title" className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            <ScrambleText text="چهار قدم تا تحویل" as="span" />
          </h2>
        </div>

        <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-9 hidden h-px bg-gradient-to-l from-transparent via-electric-400/25 to-transparent lg:block"
          />
          {PROCESS_STEPS.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
              className="group relative rounded-3xl border border-white/8 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-electric-400/30 hover:bg-white/[0.045]"
            >
              <span className="relative inline-flex size-12 items-center justify-center rounded-2xl border border-electric-400/25 bg-ink-950 font-mono text-lg font-bold text-electric-300">
                {toPersianDigits(index + 1)}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_28px_2px_rgb(0_240_255/0.55)] transition-opacity duration-500 group-hover:opacity-100"
                />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-8 text-mist-400">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** صنایع: طراحی متناسب با هر کسب‌وکار */
export function IndustriesTeaser() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="ind-title">
      <div className={wrap}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-glow/25 bg-violet-glow/8 px-4 py-1 font-mono text-[0.68rem] tracking-widest text-violet-soft">
              INDUSTRIES / صنایع
            </p>
            <h2 id="ind-title" className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl">
              طراحی متناسب با هر <span className="text-gradient-blue">صنعت</span>
            </h2>
            <p className="mt-4 text-base leading-8 text-mist-400">
              {toPersianDigits(INDUSTRIES.length)} نمونهٔ طراحی مفهومی با رنگ، تایپوگرافی و ساختار مخصوص هر کسب‌وکار.
            </p>
          </div>
          <ActionButton href="/industries/" variant="outline" className="shrink-0">
            همهٔ صنایع
            <ArrowLeft className="size-4 -scale-x-100" aria-hidden="true" />
          </ActionButton>
        </div>

        <Stagger as="ul" className="mt-10 flex flex-wrap gap-2.5">
          {INDUSTRIES.map((industry) => (
            <StaggerItem as="li" key={industry.slug}>
              <Link
                href={`/industries/${industry.slug}/`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/9 bg-white/[0.025] px-4 py-2.5 text-sm font-bold text-mist-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-400/40 hover:bg-white/6 hover:text-white"
              >
                <span
                  className="size-2.5 rounded-full ring-1 ring-white/25 transition-transform duration-300 group-hover:scale-125"
                  style={{ background: industry.palette.primary }}
                  aria-hidden="true"
                />
                {industry.name}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** وبلاگ: تازه‌ترین مقالات */
export function BlogSection() {
  const posts = BLOG_POSTS.filter((post) => post.slug !== "archive").slice(0, 3);
  return (
    <section className="py-20 sm:py-28" aria-labelledby="blog-title">
      <div className={wrap}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 font-mono text-[0.68rem] tracking-widest text-mist-400">
              BLOG / وبلاگ
            </p>
            <h2 id="blog-title" className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl">
              <ScrambleText text="تازه‌ترین مقالات" as="span" />
            </h2>
            <p className="mt-4 text-base leading-8 text-mist-400">
              از امنیت و اتوماسیون تا مدیریت دفتر وکالت، تاکسی تلفنی و فناوری‌های نو.
            </p>
          </div>
          <ActionButton href="/blog/" variant="outline" className="shrink-0">
            همهٔ مقالات
            <ArrowLeft className="size-4 -scale-x-100" aria-hidden="true" />
          </ActionButton>
        </div>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** پرسش‌های متداول صفحهٔ اصلی */
export function HomeFaq() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 font-mono text-[0.68rem] tracking-widest text-mist-400">
            FAQ / پرسش‌ها
          </p>
          <h2 id="faq-title" className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            پاسخ پرسش‌های رایج
          </h2>
        </Reveal>
        <Reveal className="mt-10">
          <FaqList items={HOME_FAQS} />
        </Reveal>
        <Reveal className="mt-8 text-center text-sm text-mist-400">
          پاسخ سؤال خود را پیدا نکردید؟{" "}
          <Link href="/contact/" className="font-bold text-electric-300 underline decoration-electric-400/35 underline-offset-4 transition-colors hover:text-white">
            با {siteConfig.name} تماس بگیرید
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** آیکون کوچک با حرکت ملایم (برای بخش‌های تبلیغاتی) */
export function FloatingIcon({ name, className }: { name: string; className?: string }) {
  return (
    <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className={className}>
      <Icon name={name} className="size-full" />
    </motion.span>
  );
}
