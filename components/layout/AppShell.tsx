"use client";

import { useCallback, useState, type ReactNode } from "react";
import { motion, useSpring, useScroll } from "framer-motion";
import { GlobalBackground } from "@/components/fx/GlobalBackground";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { SmoothScroll } from "@/components/shared/SmoothScroll";

/** نوار پیشرفت اسکرول، هم‌عرض با محتوای اصلی */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "100% 50%" }}
      className="fixed inset-x-0 top-0 z-[75] h-[2px] bg-gradient-to-l from-violet-glow via-electric-400 to-mint-400"
    />
  );
}

/**
 * پوستهٔ اصلی سایت: پس‌زمینهٔ سراسری + سایدبار دسکتاپ + ناوبری موبایل.
 * محتوای اصلی به اندازهٔ عرض سایدبار از سمت راست فاصله می‌گیرد (RTL).
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const handleWidth = useCallback((width: number) => setSidebarWidth(width), []);

  return (
    <SmoothScroll>
      <GlobalBackground />
      <ScrollProgress />
      <Sidebar onWidthChange={handleWidth} />
      <MobileNav />
      {/* فاصلهٔ محتوا از سایدبار فقط در دسکتاپ (xl) اعمال می‌شود */}
      <div
        className="flex min-h-dvh flex-col xl:me-(--ks-sidebar)"
        style={{ ["--ks-sidebar" as string]: `${sidebarWidth}px` }}
      >
        {children}
      </div>
    </SmoothScroll>
  );
}
