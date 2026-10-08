"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, MapPin, Play, Sparkles, UserRound } from "lucide-react";
import { MockTerminal } from "@/components/fx/MockTerminal";
import { NeuralBackground } from "@/components/fx/NeuralBackground";
import { Typewriter } from "@/components/fx/Typewriter";
import { siteConfig } from "@/lib/siteConfig";
import { TECH_BADGES } from "@/lib/constants";
import { toPersianDigits } from "@/lib/utils";
import { ActionButton } from "@/components/ui/ActionButton";

const EASE = [0.22, 1, 0.36, 1] as const;

/** نوار تکنولوژی‌ها با حرکت بی‌پایان */
function TechMarquee() {
  const reduce = useReducedMotion();
  const items = [...TECH_BADGES, "Web Audio", "GitHub Actions", "JSON-LD", "Vazirmatn", "JetBrains Mono"];
  const row = (
    <ul className="flex shrink-0 items-center gap-8 pe-8" aria-hidden="true">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8">
          <span className="font-mono text-xs tracking-widest text-mist-400/80">{item}</span>
          <span className="size-1 rounded-full bg-electric-400/45" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-white/6 bg-white/[0.015] py-3">
      <div
        className="flex w-max items-center"
        style={reduce ? undefined : { animation: "marquee 42s linear infinite" }}
      >
        {row}
        {row}
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
      <p className="sr-only">فناوری‌ها: {TECH_BADGES.join("، ")}</p>
    </div>
  );
}

/** بخش اصلی صفحهٔ نخست: تایپ‌رایتر + ترمینال شبیه‌سازی‌شده + شبکهٔ عصبی متحرک */
export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 620], [0, reduce ? 0 : 52]);
  const yVisual = useTransform(scrollY, [0, 620], [0, reduce ? 0 : -36]);
  const fade = useTransform(scrollY, [0, 520], [1, reduce ? 1 : 0.25]);

  const item = (index: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 26 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay: 0.08 * index, ease: EASE },
  });

  return (
    <section className="relative isolate overflow-hidden pt-24 pb-0 sm:pt-28 xl:pt-20" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <NeuralBackground />
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-8 lg:pb-24">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.p
            {...item(0)}
            className="inline-flex items-center gap-2 rounded-full border border-electric-400/25 bg-electric-400/8 px-4 py-1.5 text-xs font-bold text-electric-300 sm:text-sm"
          >
            <Sparkles className="size-4 text-electric-400" aria-hidden="true" />
            تأسیس {toPersianDigits(siteConfig.founded.jalali)} — پذیرش پروژه‌های جدید
          </motion.p>

          <motion.h1
            id="hero-title"
            {...item(1)}
            className="mt-6 text-[2.1rem] font-black leading-[1.55] tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.45]"
          >
            <Typewriter phrases={["شریک فناوری", "توسعه‌دهندهٔ نرم‌افزار", "سازندهٔ وب‌سایت"]} label="شریک فناوری" />
            <br />
            <span className="text-gradient-animated">کسب‌وکارهای ایرانی</span>
          </motion.h1>

          <motion.p {...item(2)} className="mt-6 max-w-xl text-base leading-9 text-mist-400 sm:text-lg">
            کارن سافت به مدیریت <strong className="font-extrabold text-white">{siteConfig.founder}</strong> نرم‌افزار و وب‌سایت می‌سازد:
            از سامانهٔ حقوقی و نرم‌افزار <strong className="font-extrabold text-mint-400">رایگان</strong> مدیریت تاکسی تلفنی تا لندینگ‌پیج‌های
            پرفروش و داشبوردهای صنعتی. ساده، سریع و قابل اتکا.
          </motion.p>

          <motion.div {...item(3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ActionButton href="/contact/" size="lg" magnetic>
              مشاورهٔ رایگان پروژه
              <ArrowLeft className="size-5 transition-transform duration-300 group-hover/btn:-translate-x-1" aria-hidden="true" />
            </ActionButton>
            <ActionButton href="/portfolio/" variant="secondary" size="lg" magnetic>
              <Play className="size-4 text-electric-400" aria-hidden="true" />
              نمونه‌کارهای زنده
            </ActionButton>
          </motion.div>

          <motion.ul {...item(4)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/8 pt-7 text-sm text-mist-400">
            <li className="flex items-center gap-2">
              <UserRound className="size-4 text-electric-400" aria-hidden="true" />
              <span>
                مدیر و بنیان‌گذار: <strong className="font-bold text-white">{siteConfig.founder}</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-violet-soft" aria-hidden="true" />
              <span>{siteConfig.city}</span>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 font-mono transition-colors hover:text-electric-300" dir="ltr">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-400/70" aria-hidden="true" />
                  <span className="relative inline-flex size-2 rounded-full bg-mint-400" aria-hidden="true" />
                </span>
                {siteConfig.phoneDisplay}
              </a>
            </li>
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: yVisual }} {...item(2)} className="relative">
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_30%,rgb(0_240_255/0.16),transparent_70%)] blur-2xl" />
          <MockTerminal />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            className="mt-4 grid gap-3 sm:grid-cols-3"
          >
            {[
              { label: "نرم‌افزار تاکسی", value: "رایگان", tone: "text-mint-400" },
              { label: "نمونه‌کار آنلاین", value: `${toPersianDigits(17)}+`, tone: "text-electric-300" },
              { label: "حوزهٔ تخصصی", value: toPersianDigits(4), tone: "text-violet-soft" },
            ].map((chip) => (
              <div key={chip.label} className="glass rounded-xl px-3 py-2.5 text-center">
                <p className={`font-mono-tabular text-lg font-bold ${chip.tone}`}>{chip.value}</p>
                <p className="text-[0.68rem] font-semibold text-mist-400">{chip.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <TechMarquee />
    </section>
  );
}
