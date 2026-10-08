"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { cn } from "@/lib/utils";

/** تشخیص دستگاه دارای مکان‌نمای دقیق (ماوس) — پس از mount تا هیدریشن سالم بماند */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  return fine;
}

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** شدت جذب؛ هرچه بزرگ‌تر، عنصر بیشتر به سمت مکان‌نما کشیده می‌شود */
  strength?: number;
  /** پخش صدای تیک هنگام ورود مکان‌نما */
  sound?: boolean;
  as?: "div" | "span";
}

/** عنصری که با نزدیک شدن موس به سمت آن جذب می‌شود (Magnetic) */
export function Magnetic({ children, className, strength = 0.32, sound = false, as = "div" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const { play } = useSoundFx();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 210, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 210, damping: 16, mass: 0.4 });

  const active = fine && !reduce;
  const Tag = motion[as];

  function onMove(event: ReactPointerEvent<HTMLElement>) {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    my.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <Tag
      ref={ref}
      style={active ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerEnter={() => {
        if (sound) play("hover");
      }}
      className={cn(active && "will-change-transform", className)}
    >
      {children}
    </Tag>
  );
}
