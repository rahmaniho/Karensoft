"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * هالهٔ نورانی ملایم که مکان‌نما را دنبال می‌کند.
 * فقط روی دستگاه‌های دارای ماوس و برای کاربرانی که کاهش حرکت نخواسته‌اند فعال است.
 */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        x.set(event.clientX);
        y.set(event.clientY);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgb(0 240 255 / 0.09) 0%, rgb(139 92 246 / 0.055) 38%, transparent 68%)",
        }}
      />
      <div
        className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-400/70 blur-[1px]"
        style={{ boxShadow: "0 0 18px 4px rgb(0 240 255 / 0.35)" }}
      />
    </motion.div>
  );
}
