"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی0123456789#%&*/<>";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** سرعت پیشروی رمزگشایی (میلی‌ثانیه بین هر گام) */
  speed?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * عناوین بخش‌ها هنگام ورود به دید، به‌هم‌ریخته و دوباره بازسازی می‌شوند.
 * متن اصلی همیشه برای صفحه‌خوان و سئو در DOM باقی می‌ماند (visually-hidden).
 */
export function ScrambleText({ text, className, speed = 34, as: Tag = "span" }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (reduce || !inView || done.current) {
      setDisplay(text);
      return;
    }
    done.current = true;

    const chars = Array.from(text);
    let frame = 0;
    const total = chars.length + 6;
    const timer = window.setInterval(() => {
      frame += 1;
      const revealed = Math.max(0, frame - 6);
      setDisplay(
        chars
          .map((char, i) => {
            if (char === " " || char === "\u200c") return char;
            if (i < revealed) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (frame >= total) {
        window.clearInterval(timer);
        setDisplay(text);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [inView, reduce, text, speed]);

  return (
    <Tag ref={ref as never} className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
