"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, BadgeCheck, MapPin, Quote } from "lucide-react";
import { AnimatedNumber } from "@/components/fx/AnimatedNumber";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { siteConfig } from "@/lib/siteConfig";
import { toPersianDigits } from "@/lib/utils";
import { ActionButton } from "@/components/ui/ActionButton";
import { Img } from "@/components/ui/Img";

const EASE = [0.22, 1, 0.36, 1] as const;

const FACTS = [
  { label: "نرم‌افزار حقوقی برای وکلا و مؤسسات", icon: "Scale" },
  { label: "نرم‌افزار رایگان مدیریت تاکسی تلفنی", icon: "Car" },
  { label: "کارن چاپ؛ چاپ، مهر و صحافی", icon: "Printer" },
  { label: "طراحی و توسعهٔ وب‌سایت و لندینگ", icon: "Globe" },
];

/** معرفی مدیر و بنیان‌گذار + هویت کارن سافت (بخش درباره ما در صفحهٔ اصلی) */
export function FounderSpotlight() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        {/* کارت مدیر */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="glass-strong group relative overflow-hidden rounded-[2rem] p-3">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70"
              style={{ background: "radial-gradient(80% 50% at 50% 0%, rgb(0 240 255 / 0.16), transparent 70%)" }}
            />
            <div className="relative overflow-hidden rounded-[1.6rem]">
              <Img
                src={siteConfig.founderImage}
                alt={`${siteConfig.founder}، ${siteConfig.founderRole} کارن سافت`}
                sizes="(max-width: 1024px) 90vw, 380px"
                className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-lg font-black text-white">{siteConfig.founder}</p>
                  <p className="font-mono text-[0.68rem] tracking-wider text-electric-300">{siteConfig.founderRole}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950/75 px-3 py-1.5 text-[0.65rem] font-bold text-mint-400 ring-1 ring-inset ring-mint-500/30 backdrop-blur-md">
                  <BadgeCheck className="size-3.5" aria-hidden="true" />
                  بنیان‌گذار
                </span>
              </div>
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
            className="glass absolute -bottom-7 -start-4 hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex"
          >
            <MapPin className="size-4 text-violet-soft" aria-hidden="true" />
            <span className="text-sm font-bold text-white">{siteConfig.city}</span>
            <span className="font-mono text-[0.65rem] text-mist-400">est. {toPersianDigits(siteConfig.founded.jalali)}</span>
          </motion.div>
        </motion.div>

        {/* متن */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-electric-400/25 bg-electric-400/8 px-4 py-1 font-mono text-[0.68rem] tracking-widest text-electric-300">
            ABOUT / دربارهٔ ما
          </p>
          <h2 id="about-title" className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            <ScrambleText text="کارن سافت؛ تأسیس" as="span" />{" "}
            <span className="text-gradient-animated font-mono-tabular">{toPersianDigits(siteConfig.founded.jalali)}</span>
          </h2>
          <p className="mt-5 text-base leading-9 text-mist-400 sm:text-lg">
            کارن سافت در سال {toPersianDigits(siteConfig.founded.jalali)} به مدیریت و بنیان‌گذاری{" "}
            <strong className="font-extrabold text-white">{siteConfig.founder}</strong> در {siteConfig.city} تأسیس شد؛ نتیجهٔ سال‌ها کار
            عملی روی نرم‌افزارهای واقعی برای آژانس‌های تاکسی تلفنی، دفاتر وکالت، چاپخانه‌ها و کسب‌وکارهای کوچک.
          </p>

          <blockquote className="mt-6 rounded-2xl border border-white/8 bg-white/[0.025] p-5">
            <Quote className="size-5 text-electric-400/70" aria-hidden="true" />
            <p className="mt-3 text-base font-bold leading-9 text-white sm:text-lg">
              ابزار خوب ابزاری است که کاربر در همان روز اول، بدون آموزش طولانی، کارش را راه بیندازد.
            </p>
            <footer className="mt-3 text-sm text-mist-400">
              {siteConfig.founder} — {siteConfig.founderRole}
            </footer>
          </blockquote>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {FACTS.map((fact) => (
              <li key={fact.label} className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm text-mist-100/90">
                <span className="size-1.5 shrink-0 rounded-full bg-electric-400 shadow-[0_0_10px_2px_rgb(0_240_255/0.5)]" aria-hidden="true" />
                {fact.label}
              </li>
            ))}
          </ul>

          <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-white/8 pt-7">
            {[
              { value: siteConfig.founded.jalali, suffix: "", label: "سال تأسیس" },
              { value: 17, suffix: "+", label: "نمونه‌کار منتشرشده" },
              { value: 4, suffix: "", label: "حوزهٔ تخصصی" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-black text-white sm:text-3xl">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-mist-400">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionButton href="/about/" variant="secondary" magnetic>
              بیشتر دربارهٔ ما
              <ArrowLeft className="size-4 -scale-x-100" aria-hidden="true" />
            </ActionButton>
            <Link
              href="/portfolio/"
              className="inline-flex h-12 items-center justify-center gap-2 px-6 text-sm font-bold text-mist-400 transition-colors hover:text-electric-300"
            >
              دیدن نمونه‌کارها
              <ArrowLeft className="size-4 -scale-x-100" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
