"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, BookOpen, Gift, MapPin, Phone, Printer, Stamp } from "lucide-react";
import { TiltCard } from "@/components/fx/TiltCard";
import { PRINT_CATEGORIES, PRINT_CONTACT } from "@/lib/printing";
import { ActionButton } from "@/components/ui/ActionButton";
import { Img } from "@/components/ui/Img";

const EASE = [0.22, 1, 0.36, 1] as const;

const PRINT_SERVICES = [
  { Icon: Printer, title: "چاپ افست و دیجیتال", desc: "تراکت، کارت ویزیت، بروشور، ست اداری و پوستر؛ تیراژ بالا یا فوری کم‌تیراژ." },
  { Icon: Stamp, title: "ساخت انواع مهر", desc: "مهر خودکار، لیزری، برجسته و تاریخ‌زن با حکاکی دقیق و تحویل سریع." },
  { Icon: BookOpen, title: "صحافی و پایان‌نامه", desc: "صحافی کتاب، پایان‌نامه و سررسید؛ سیمی، چسبی و جلد سخت با سلیقهٔ شما." },
  { Icon: Gift, title: "هدایای تبلیغاتی", desc: "ماگ، تیشرت، سررسید و ست تبلیغاتی با چاپ اختصاصی لوگوی برند شما." },
];

const THUMBS = [
  { src: "/images/mug.webp", alt: "ماگ چاپ‌شدهٔ کارن چاپ" },
  { src: "/images/t-shirt.webp", alt: "تیشرت چاپ‌شدهٔ کارن چاپ" },
  { src: "/images/tracket.webp", alt: "تراکت چاپ‌شدهٔ کارن چاپ" },
];

/** بخش معرفی کارن چاپ — زیرمجموعهٔ چاپ، مهر و صحافی کارن سافت */
export function KarenChapSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="karenchap-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* متن و خدمات */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/8 px-4 py-1 font-mono text-[0.68rem] tracking-widest text-[#e6c75a]">
            <Stamp className="size-3.5" aria-hidden="true" />
            SUBSIDIARY / زیرمجموعهٔ کارن سافت
          </p>
          <h2 id="karenchap-title" className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl">
            کارن چاپ — <span className="text-gradient-animated">چاپ، مهر و صحافی</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-9 text-mist-400 sm:text-lg">
            کارن چاپ بازوی تولید فیزیکی کارن سافت در شهرصنعتی البرز قزوین است؛ همان استاندارد کیفیت نرم‌افزاری‌مان، این‌بار روی
            کاغذ، مهر و پارچه. از طراحی گرافیک تا تحویل، همه‌چیز زیر یک سقف انجام می‌شود.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {PRINT_SERVICES.map(({ Icon, title, desc }) => (
              <li
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-colors duration-500 hover:border-gold-400/35 hover:bg-white/[0.045]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: "radial-gradient(circle, rgb(201 162 39 / 0.25), transparent 70%)" }}
                />
                <Icon className="size-6 text-[#e6c75a]" aria-hidden="true" />
                <h3 className="mt-3 text-base font-extrabold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-mist-400">{desc}</p>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="دسته‌های خدمات کارن چاپ">
            {PRINT_CATEGORIES.map((category) => (
              <li key={category.id} className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-[0.68rem] text-mist-100/85 ring-1 ring-inset ring-white/10">
                {category.title}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ActionButton href="/services/printing/" magnetic>
              مشاهدهٔ خدمات و نمونه‌ها
              <ArrowLeft className="size-4 -scale-x-100 transition-transform duration-300 group-hover/btn:-translate-x-1" aria-hidden="true" />
            </ActionButton>
            <a
              href={`tel:${PRINT_CONTACT.tel}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 px-6 text-sm font-bold text-mist-100 transition-colors hover:border-gold-400/45 hover:text-[#e6c75a]"
              dir="ltr"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="font-mono">{PRINT_CONTACT.phone}</span>
            </a>
          </div>

          <p className="mt-5 flex items-start gap-2 text-sm text-mist-500">
            <MapPin className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden="true" />
            <span dir="rtl">{PRINT_CONTACT.address}</span>
          </p>
        </motion.div>

        {/* کلاژ تصاویر */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <TiltCard maxTilt={5} sound className="glass-strong relative overflow-hidden rounded-[2rem] p-3">
            <div className="relative overflow-hidden rounded-[1.6rem]">
              <Img
                src="/images/chapkhaneh.webp"
                alt="فضای چاپ و تولید کارن چاپ"
                sizes="(max-width: 1024px) 92vw, 520px"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-black text-white">کارن چاپ</p>
                  <p className="font-mono text-[0.66rem] tracking-wider text-[#e6c75a]">KAREN PRINT · QAZVIN</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950/75 px-3 py-1.5 text-[0.65rem] font-bold text-mint-400 ring-1 ring-inset ring-mint-500/30 backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-mint-400" aria-hidden="true" />
                  پذیرش آنلاین ۲۴/۷
                </span>
              </div>
            </div>
          </TiltCard>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {THUMBS.map((thumb, index) => (
              <motion.div
                key={thumb.src}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.5, ease: EASE }}
              >
                <TiltCard maxTilt={9} className="glass overflow-hidden rounded-2xl p-1.5">
                  <Img src={thumb.src} alt={thumb.alt} sizes="(max-width: 1024px) 30vw, 160px" className="aspect-square w-full rounded-xl object-cover" />
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
