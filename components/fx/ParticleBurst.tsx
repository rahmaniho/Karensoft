"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ParticleBurstProps {
  /** با هر تغییر، یک انفجار ذرات تازه پخش می‌شود */
  trigger: number;
  count?: number;
  className?: string;
  color?: string;
}

/**
 * ذرات نورانی که لحظه‌ای از یک نقطه ساطع و محو می‌شوند؛
 * برای بازخورد بصری کلیک روی آیکون‌های سایدبار.
 */
export function ParticleBurst({ trigger, count = 10, className, color = "#00f0ff" }: ParticleBurstProps) {
  const [particles, setParticles] = useState<{ id: number; angle: number; distance: number; size: number }[]>([]);

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        angle: Math.random() * Math.PI * 2,
        distance: 18 + Math.random() * 26,
        size: 2 + Math.random() * 2.5,
      })),
    // فقط هنگام mount تولید می‌شوند تا رندر سرور و کلاینت یکسان بماند
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  );

  useEffect(() => {
    if (trigger <= 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setParticles(seeds.map((seed, index) => ({ id: trigger * 100 + index, ...seed })));
    const timer = window.setTimeout(() => setParticles([]), 720);
    return () => window.clearTimeout(timer);
  }, [trigger, seeds]);

  return (
    <span aria-hidden="true" className={className}>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            initial={{ opacity: 0.95, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: Math.cos(particle.angle) * particle.distance,
              y: Math.sin(particle.angle) * particle.distance,
              scale: 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute start-1/2 top-1/2 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: color,
              boxShadow: `0 0 10px 2px ${color}66`,
            }}
          />
        ))}
      </AnimatePresence>
    </span>
  );
}
