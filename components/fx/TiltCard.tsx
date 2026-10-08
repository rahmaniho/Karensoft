"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** بیشینهٔ چرخش بر حسب درجه */
  maxTilt?: number;
  /** هالهٔ نور دنبال‌کنندهٔ مکان‌نما */
  glare?: boolean;
  /** پخش تیک ملایم هنگام ورود مکان‌نما */
  sound?: boolean;
  /** افکت سه‌بعدی غیرفعال شود (مثلاً برای سلول‌های بزرگ بنتو) */
  disabled?: boolean;
}

/**
 * کارت با چرخش سه‌بعدی نرم در برابر حرکت موس + لایهٔ نور دنبال‌کننده.
 * برای کاربران prefers-reduced-motion و دستگاه‌های لمسی، فقط هاور ساده می‌ماند.
 */
export function TiltCard({ children, className, maxTilt = 7, glare = true, sound = false, disabled = false }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [transform, setTransform] = useState<string | undefined>(undefined);
  const [glow, setGlow] = useState<{ x: number; y: number } | null>(null);
  const [inside, setInside] = useState(false);
  const { play } = useSoundFx();

  const interactive = !disabled && !reduce;

  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setGlow({ x: px * 100, y: py * 100 });
    setTransform(
      `perspective(1000px) rotateX(${((0.5 - py) * maxTilt).toFixed(2)}deg) rotateY(${((px - 0.5) * maxTilt).toFixed(2)}deg) scale3d(1.015,1.015,1.015)`,
    );
  }

  function onLeave() {
    setTransform(undefined);
    setGlow(null);
    setInside(false);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => {
        setInside(true);
        if (sound) play("hover");
      }}
      onPointerLeave={onLeave}
      style={transform ? { transform, ["--mx" as string]: `${glow?.x ?? 50}%`, ["--my" as string]: `${glow?.y ?? 50}%` } : undefined}
      className={cn("relative [transform-style:preserve-3d]", interactive && "transition-transform duration-200 ease-out will-change-transform", className)}
    >
      {children}
      {glare && inside && !reduce ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70 transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${glow?.x ?? 50}% ${glow?.y ?? 50}%, rgb(0 240 255 / 0.13), rgb(139 92 246 / 0.06) 42%, transparent 68%)`,
          }}
        />
      ) : null}
    </motion.div>
  );
}
