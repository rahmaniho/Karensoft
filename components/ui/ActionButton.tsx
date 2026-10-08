"use client";

import Link from "next/link";
import { useCallback, useRef, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type MouseEvent as ReactMouseEvent, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Magnetic } from "@/components/fx/Magnetic";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-xl font-bold whitespace-nowrap transition-all duration-300 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-l from-electric-400 to-violet-glow text-ink-950 shadow-[0_18px_44px_-20px_rgb(0_240_255/0.85)] hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-18px_rgb(139_92_246/0.9)]",
  secondary: "glass text-white hover:-translate-y-0.5 hover:border-electric-400/45 hover:bg-white/8",
  outline: "border border-electric-400/45 text-electric-300 hover:-translate-y-0.5 hover:border-electric-400 hover:bg-electric-400/10 hover:text-white",
  ghost: "text-mist-100 hover:bg-white/8 hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ActionButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  /** با href به لینک تبدیل می‌شود */
  href?: string;
  /** لینک خارجی (تب جدید) */
  external?: boolean;
  /** افکت جذب مغناکوتیسی به سمت مکان‌نما */
  magnetic?: boolean;
  /** پخش صدای کلیک (پیش‌فرض روشن) */
  sound?: boolean;
}

type NativeProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, "href" | "className" | "children" | "color">;

/**
 * دکمهٔ اصلی طراحی جدید: موج نور از نقطهٔ کلیک (Ripple)، صدای کلیک مکانیکی نرم
 * و در صورت نیاز جذب به سمت مکان‌نما (Magnetic).
 */
export function ActionButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  magnetic = false,
  sound = true,
  ...rest
}: ActionButtonProps & NativeProps) {
  const { play } = useSoundFx();
  const ref = useRef<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleInteraction = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (sound) play("click");
      const target = event.currentTarget;
      if (!target) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.1;
      const id = Date.now() + Math.random();
      setRipples((current) => [...current, { id, x: event.clientX - rect.left, y: event.clientY - rect.top, size }]);
      window.setTimeout(() => setRipples((current) => current.filter((ripple) => ripple.id !== id)), 700);
    },
    [play, sound],
  );

  const cls = cn(base, variants[variant], sizes[size], className);

  const decoration = (
    <>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            aria-hidden="true"
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.66, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute -z-10 rounded-full"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              background:
                variant === "primary"
                  ? "radial-gradient(circle, rgb(255 255 255 / 0.8), rgb(255 255 255 / 0) 62%)"
                  : "radial-gradient(circle, rgb(0 240 255 / 0.38), rgb(0 240 255 / 0) 62%)",
            }}
          />
        ))}
      </AnimatePresence>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
        style={{ background: "radial-gradient(120% 80% at 50% 0%, rgb(255 255 255 / 0.14), transparent 60%)" }}
      />
    </>
  );

  let node: ReactNode;

  if (href) {
    const isExternal = external || /^(https?:|mailto:|tel:)/.test(href);
    // فایل‌های استاتیک خارج از اپ (دموی زنده) نباید از Link عبور کنند
    const isStaticAsset = /^\/(live|taxi-app)\//.test(href);
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    if (isExternal || isStaticAsset) {
      const newTab = external || /^https?:/.test(href);
      node = (
        <a
          ref={ref as RefObject<HTMLAnchorElement | null>}
          href={href}
          className={cls}
          onClick={handleInteraction}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...linkProps}
        >
          {decoration}
          {children}
        </a>
      );
    } else {
      node = (
        <Link ref={ref as RefObject<HTMLAnchorElement | null>} href={href} className={cls} onClick={handleInteraction} {...linkProps}>
          {decoration}
          {children}
        </Link>
      );
    }
  } else {
    node = (
      <button
        ref={ref as RefObject<HTMLButtonElement | null>}
        type={(rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
        className={cls}
        onClick={handleInteraction}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {decoration}
        {children}
      </button>
    );
  }

  if (!magnetic) return <>{node}</>;
  return (
    <Magnetic strength={0.24} className="inline-flex">
      {node}
    </Magnetic>
  );
}
