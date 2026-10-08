"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedNumber } from "@/components/fx/AnimatedNumber";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { HOME_STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** آمار کلیدی با شمارش افزایشی و هالهٔ نور دنبال‌کنندهٔ مکان‌نما */
export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const { play } = useSoundFx();
  const [glow, setGlow] = useState<{ x: number; y: number } | null>(null);

  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setGlow({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <section className="relative py-14 sm:py-16" aria-labelledby="stats-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="stats-title" className="sr-only">
          کارن سافت در یک نگاه
        </h2>
        <div
          ref={ref}
          onPointerMove={onMove}
          onPointerEnter={() => play("hover")}
          className="glass relative overflow-hidden rounded-3xl"
          style={
            glow
              ? ({ ["--mx" as string]: `${glow.x}%`, ["--my" as string]: `${glow.y}%` } as React.CSSProperties)
              : undefined
          }
        >
          <span aria-hidden="true" className="spotlight pointer-events-none absolute inset-0 opacity-70" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-l from-transparent via-electric-400/70 to-transparent"
          />
          <ul className="relative grid divide-y divide-white/8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {HOME_STATS.map((stat, index) => (
              <motion.li
                key={stat.label}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: index * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "px-6 py-8 text-center sm:py-9",
                  index > 0 && "lg:border-s lg:border-white/8",
                  index === 1 && "border-s border-white/8 sm:border-s-0",
                  index === 2 && "sm:border-s sm:border-white/8",
                  index === 3 && "border-s border-white/8",
                )}
              >
                <p className="text-3xl font-black sm:text-[2.6rem] sm:leading-none" style={{ color: stat.accent ?? "#fff" }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={index * 90} />
                </p>
                <p className="mt-3 text-xs font-bold text-mist-400 sm:text-sm">{stat.label}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
