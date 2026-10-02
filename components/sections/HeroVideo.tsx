"use client";

import { useEffect, useRef } from "react";

/**
 * ویدیوی پس‌زمینه: فقط روی صفحه‌های عریض و بدون prefers-reduced-motion و بدون Save-Data
 * بارگذاری می‌شود تا موبایل و Lighthouse درگیر ۲.۵ مگابایت ویدیو نشوند.
 */
export function HeroVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (!wide || reduce || saveData) return;
    video.src = src;
    void video.play().catch(() => undefined);
  }, [src]);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className="absolute inset-0 size-full object-cover opacity-25 mix-blend-screen"
    />
  );
}
