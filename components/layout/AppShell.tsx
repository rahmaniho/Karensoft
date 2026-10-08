"use client";

import { motion, useSpring, useScroll } from "framer-motion";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/shared/SmoothScroll";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div aria-hidden style={{ scaleX, transformOrigin: "100%" }} className="fixed inset-x-0 top-0 z-[80] h-0.5 bg-[#31d7aa]" />;
}

export function AppShell({ children }: { children: ReactNode }) {
  return <SmoothScroll><ScrollProgress /><SiteHeader /><div className="flex min-h-dvh flex-col">{children}</div></SmoothScroll>;
}
