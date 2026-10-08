"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * بافت و عمق پس‌زمینهٔ سراسری سایت:
 * گرادیان شفق + شبکهٔ متحرک کمرنگ + نویز بسیار محو + پارالاکس ملایم با اسکرول.
 */
export function GlobalBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-900">
      {/* شفق نئونی */}
      <motion.div style={{ y: glowY }} className="absolute inset-0 bg-aurora opacity-90" />

      {/* هاله‌های شناور */}
      <div
        className="absolute -end-40 top-[-12rem] size-[34rem] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgb(0 240 255 / 0.16), transparent 68%)" }}
      />
      <div
        className="absolute -start-52 top-[38%] size-[30rem] rounded-full opacity-50 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgb(139 92 246 / 0.16), transparent 70%)" }}
      />

      {/* شبکهٔ متحرک */}
      <motion.div
        style={{ y }}
        className={`absolute inset-[-20%] bg-grid-live opacity-[0.55] ${reduce ? "" : ""}`}
      />

      {/* بافت نویز */}
      <div className="bg-noise absolute inset-0 opacity-[0.045] mix-blend-soft-light" />

      {/* وینیت برای خوانایی متن */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(5_5_6/0.72)_100%)]" />
    </div>
  );
}
