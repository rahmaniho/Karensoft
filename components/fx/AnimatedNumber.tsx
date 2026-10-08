"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { cn, toPersianDigits } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  /** پسوند فارسی مثل «+» یا «٪» */
  suffix?: string;
  className?: string;
  duration?: number;
  /** پیش از رسیدن به دید، صفر نشان داده نشود */
  delay?: number;
}

/** عدد با انیمیشن شمارش افزایشی (Count-up) و رقم‌های فارسی */
export function AnimatedNumber({ value, suffix, className, duration = 1.7, delay = 0 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${toPersianDigits(value)}${suffix ?? ""}`;
      return;
    }

    let controls: ReturnType<typeof animate> | undefined;
    const start = window.setTimeout(() => {
      controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(latest) {
          if (ref.current) ref.current.textContent = `${toPersianDigits(Math.round(latest))}${suffix ?? ""}`;
        },
      });
    }, delay);

    return () => {
      window.clearTimeout(start);
      controls?.stop();
    };
  }, [inView, value, suffix, duration, delay, reduce]);

  return (
    <span ref={ref} className={cn("font-mono-tabular", className)}>
      {reduce ? `${toPersianDigits(value)}${suffix ?? ""}` : `${toPersianDigits(0)}${suffix ?? ""}`}
    </span>
  );
}
