"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const EASE = [0.22, 1, 0.36, 1] as const;

const ACCENTS = ["#00f0ff", "#8b5cf6", "#10b981", "#fbbf24"];

/** کلاس انیمیشن اختصاصی آیکون هر خدمت (با هاور کارت فعال می‌شود) */
const ICON_ANIMATION: Record<string, string> = {
  Globe: "svc-anim-rock",
  Boxes: "svc-anim-pulse",
  Workflow: "svc-anim-spin",
  Printer: "svc-anim-lift",
};

/** خطوط مداری که با هاور کشیده می‌شوند */
function CircuitLines({ accent }: { accent: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 200"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    >
      <motion.path
        d="M0 168 H96 L120 144 H232 L256 120 H320"
        fill="none"
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.circle cx="120" cy="144" r="2.6" fill={accent} initial={{ opacity: 0 }} whileInView={{ opacity: [0, 1, 0.35] }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.5 }} />
      <motion.circle cx="256" cy="120" r="2.6" fill={accent} initial={{ opacity: 0 }} whileInView={{ opacity: [0, 1, 0.35] }} viewport={{ once: true }} transition={{ duration: 1.8, delay: 0.9 }} />
    </svg>
  );
}

/** خدمات با کارت‌های خطی (Outline) و آیکون متحرک */
export function ServicesOutline() {
  const { play } = useSoundFx();

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="services-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-mint-500/25 bg-mint-500/8 px-4 py-1 font-mono text-[0.68rem] tracking-widest text-mint-400">
            SERVICES / خدمات
          </p>
          <h2 id="services-title" className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl lg:text-[2.7rem]">
            <ScrambleText text="از ایده تا اجرا،" as="span" /> <span className="text-gradient-blue">کنار شما هستیم</span>
          </h2>
          <p className="mt-4 text-base leading-8 text-mist-400 sm:text-lg">
            طراحی و توسعهٔ نرم‌افزار، اتوماسیون و چاپ؛ چهار خدمت با یک استاندارد کیفیت و یک تیم پاسخگو.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {SERVICES.map((service, index) => {
            const accent = ACCENTS[index % ACCENTS.length] ?? "#00f0ff";
            const wide = index === 0 || index === 3;
            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-white/9 bg-white/[0.015] p-7 transition-colors duration-500 hover:bg-white/[0.035]",
                  wide ? "lg:col-span-7" : "lg:col-span-5",
                )}
                onPointerEnter={() => play("hover")}
              >
                {/* خط نئونی لبهٔ بالا هنگام هاور */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px origin-right scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(to left, transparent, ${accent}, transparent)` }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -end-20 -top-20 size-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: `radial-gradient(circle, ${accent}33, transparent 70%)` }}
                />
                <CircuitLines accent={accent} />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center gap-4">
                    <span
                      className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border transition-colors duration-500"
                      style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
                    >
                      <span className={cn("inline-flex", ICON_ANIMATION[service.icon] ?? "svc-anim-pulse")}>
                        <Icon name={service.icon} className="size-7" strokeWidth={1.6} />
                      </span>
                    </span>
                    <div>
                      <h3 className="text-xl font-extrabold text-white">
                        {service.href ? (
                          <Link href={service.href} className="after:absolute after:inset-0 after:content-['']">
                            {service.title}
                          </Link>
                        ) : (
                          service.title
                        )}
                      </h3>
                      <p className="font-mono text-[0.65rem] tracking-widest" style={{ color: accent }}>
                        {`0${index + 1} / SERVICE`}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 leading-8 text-mist-400">{service.desc}</p>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5 text-sm text-mist-100/85">
                        <Check className="size-4 shrink-0" style={{ color: accent }} aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
