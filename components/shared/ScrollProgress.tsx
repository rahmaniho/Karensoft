"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** نوار پیشرفت اسکرول بالای صفحه */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "100% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-to-l from-cyan-glow via-electric-500 to-electric-300"
    />
  );
}
