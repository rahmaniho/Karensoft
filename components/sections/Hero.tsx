"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { BrowserMockup, PhoneMockup } from "@/components/demos/DeviceMockups";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { siteConfig } from "@/lib/siteConfig";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yBack = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 60]);
  const yFront = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -40]);

  const item = (i: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 26 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.1 * i, ease: EASE },
  });

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40" aria-labelledby="hero-title">
      <div className="bg-aurora absolute inset-0 -z-20" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <HeroVideo src="/images/video/hero-background.mp4" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/70 to-navy-950" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        <div>
          <motion.p {...item(0)} className="inline-flex items-center gap-2 rounded-full border border-electric-400/30 bg-electric-600/10 px-4 py-1.5 text-sm font-bold text-electric-300">
            <Sparkles className="size-4" aria-hidden="true" />
            پذیرش پروژه جدید برای پاییز ۱۴۰۵
          </motion.p>
          <motion.h1 id="hero-title" {...item(1)} className="mt-6 text-4xl font-black leading-[1.5] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
            شریک فناوری <span className="text-gradient-blue">کسب‌وکارهای ایرانی</span>
            <br />
            از سال ۱۳۷۸
          </motion.h1>
          <motion.p {...item(2)} className="mt-6 max-w-xl text-lg leading-9 text-slate-300">
            نرم‌افزار مدیریت دفتر وکالت، نرم‌افزار <strong className="font-bold text-white">رایگان</strong> مدیریت تاکسی تلفنی، چاپ و صحافی و طراحی وب؛ ابزارهایی ساده که کار روزمرهٔ شما را سبک‌تر می‌کنند.
          </motion.p>
          <motion.div {...item(3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/products/taxi-software/" size="lg">
              دریافت رایگان نرم‌افزار تاکسی
              <ArrowLeft className="size-5 transition-transform group-hover/btn:-translate-x-1" aria-hidden="true" />
            </Button>
            <Button href="/products/" variant="secondary" size="lg">مشاهده محصولات</Button>
          </motion.div>
          <motion.ul {...item(4)} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              { v: "۱۳۷۸", l: "آغاز فعالیت" },
              { v: "۴", l: "حوزه تخصصی" },
              { v: "۱۰۰٪", l: "رایگان؛ نرم‌افزار تاکسی" },
            ].map((s) => (
              <li key={s.l}>
                <p className="text-3xl font-black text-white">{s.v}</p>
                <p className="mt-1 text-xs font-semibold leading-6 text-slate-400">{s.l}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div {...item(2)} className="relative mx-auto w-full max-w-xl lg:max-w-none" aria-label={`نمایی از محصولات ${siteConfig.name}`}>
          <motion.div style={{ y: yBack }}>
            <BrowserMockup
              src="/images/slider/dashboard/1.webp"
              alt="داشبورد نرم‌افزار مدیریت دفتر وکالت کارن سافت"
              url="karen-soft.ir/law-office"
              priority
              className="animate-float"
            />
          </motion.div>
          <motion.div style={{ y: yFront }} className="absolute -bottom-10 start-[-1rem] hidden w-40 sm:block md:start-[-2.5rem] md:w-48">
            <div className="glass-strong flex aspect-square items-center justify-center rounded-3xl p-4">
              <Img src="/images/taxi-karensoft.webp" alt="لوگوی نرم‌افزار مدیریت تاکسی تلفنی کارن سافت" priority className="w-full object-contain" />
            </div>
          </motion.div>
          <motion.div style={{ y: yFront }} className="glass-strong absolute -top-6 end-[-0.5rem] hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex md:end-[-2rem]">
            <span className="relative flex size-3">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-3 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-bold text-white">نرم‌افزار تاکسی: رایگان و فعال</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
