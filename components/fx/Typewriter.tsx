"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  phrases: string[];
  className?: string;
  /** سرعت تایپ هر نویسه (میلی‌ثانیه) */
  typeSpeed?: number;
  /** سرعت پاک کردن هر نویسه */
  deleteSpeed?: number;
  /** مکث پس از تایپ کامل هر عبارت */
  hold?: number;
  /** پس از آخرین عبارت متوقف شود (بدون حذف) */
  stopAtLast?: boolean;
  /** شروع با تأخیر */
  startDelay?: number;
  /** برچسب دسترس‌پذیری؛ متن کامل همیشه برای صفحه‌خوان موجود است */
  label?: string;
}

/**
 * افکت ماشین‌تحریر برای تیتر اصلی Hero.
 * با prefers-reduced-motion مستقیماً عبارت نهایی نمایش داده می‌شود.
 */
export function Typewriter({
  phrases,
  className,
  typeSpeed = 62,
  deleteSpeed = 34,
  hold = 1900,
  stopAtLast = false,
  startDelay = 420,
  label,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? phrases[phrases.length - 1] ?? "" : "");
  const [deleting, setDeleting] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setText(phrases[phrases.length - 1] ?? "");
      return;
    }
    if (phrases.length <= 1) {
      // یک عبارت: فقط تایپ می‌شود و می‌ماند
      const full = phrases[0] ?? "";
      let i = 0;
      let timer = 0;
      const tick = () => {
        i += 1;
        setText(full.slice(0, i));
        if (i < full.length) timer = window.setTimeout(tick, typeSpeed);
      };
      const start = window.setTimeout(tick, startDelay);
      return () => {
        window.clearTimeout(start);
        window.clearTimeout(timer);
      };
    }

    if (!started.current) {
      started.current = true;
      const start = window.setTimeout(() => setText(""), startDelay);
      return () => window.clearTimeout(start);
    }

    const full = phrases[index] ?? "";
    const isLast = index === phrases.length - 1;

    if (!deleting && text === full) {
      if (stopAtLast && isLast) return;
      const timer = window.setTimeout(() => setDeleting(true), hold);
      return () => window.clearTimeout(timer);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((current) => (current + 1) % phrases.length);
      return;
    }

    const timer = window.setTimeout(
      () => {
        setText(deleting ? full.slice(0, Math.max(0, text.length - 1)) : full.slice(0, text.length + 1));
      },
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, phrases, reduce, hold, typeSpeed, deleteSpeed, stopAtLast, startDelay]);

  const fullText = label ?? phrases.join(" / ");

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true" className="inline">
        {text}
        <span className="term-caret ms-0.5 align-middle" />
      </span>
    </span>
  );
}
