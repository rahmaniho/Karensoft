"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { MILESTONES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * خط زمان عمودی که با اسکرول پر می‌شود و نقطه‌های عطف کارن سافت را نشان می‌دهد.
 */
export function Timeline() {
  const containerRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 72%", "end 58%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const lineOpacity = useTransform(scrollYProgress, [0, 0.06], [0.25, 1]);

  return (
    <ol ref={containerRef} className="relative ms-4 border-s-0 ps-8 sm:ms-6 sm:ps-12">
      {/* ریل پس‌زمینه */}
      <span aria-hidden="true" className="absolute inset-y-0 start-0 w-px bg-white/9 sm:ms-0" />
      {/* ریل پرشونده با اسکرول */}
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : scaleY, opacity: reduce ? 1 : lineOpacity, transformOrigin: "top" }}
        className="absolute inset-y-0 start-0 w-px bg-gradient-to-b from-electric-400 via-violet-glow to-mint-400 shadow-[0_0_18px_2px_rgb(0_240_255/0.45)] sm:ms-0"
      />

      {MILESTONES.map((milestone, index) => (
        <motion.li
          key={milestone.year + milestone.title}
          initial={reduce ? false : { opacity: 0, x: 26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.25), ease: EASE }}
          className="relative pb-10 last:pb-0"
        >
          {/* گرهٔ تایم‌لاین */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute -start-8 top-2 grid size-7 place-items-center rounded-full border sm:-start-12 sm:size-9",
              milestone.highlight
                ? "border-electric-400/60 bg-ink-950 text-electric-300 shadow-[0_0_24px_2px_rgb(0_240_255/0.4)]"
                : "border-white/14 bg-ink-950 text-mist-400",
            )}
          >
            <Icon name={milestone.icon} className="size-3.5 sm:size-4" strokeWidth={1.8} />
          </span>

          <div
            className={cn(
              "group relative overflow-hidden rounded-3xl border p-6 transition-colors duration-500 sm:p-7",
              milestone.highlight
                ? "border-electric-400/25 bg-gradient-to-l from-electric-400/8 via-white/[0.03] to-transparent hover:border-electric-400/50"
                : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.045]",
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -end-16 -top-16 size-44 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
              style={{
                background: milestone.highlight
                  ? "radial-gradient(circle, rgb(0 240 255 / 0.3), transparent 70%)"
                  : "radial-gradient(circle, rgb(139 92 246 / 0.22), transparent 70%)",
              }}
            />
            <div className="relative flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "rounded-lg px-3 py-1 font-mono text-sm font-bold tracking-wider",
                  milestone.highlight ? "bg-electric-400/15 text-electric-300 ring-1 ring-inset ring-electric-400/30" : "bg-white/6 text-mist-100 ring-1 ring-inset ring-white/10",
                )}
              >
                {milestone.year}
              </span>
              {milestone.highlight ? (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-mint-500/12 px-2.5 py-1 text-[0.66rem] font-bold text-mint-400 ring-1 ring-inset ring-mint-500/25">
                  <span className="size-1.5 rounded-full bg-mint-400" aria-hidden="true" />
                  نقطهٔ عطف
                </span>
              ) : null}
            </div>
            <h3 className="relative mt-4 text-xl font-extrabold text-white sm:text-2xl">{milestone.title}</h3>
            <p className="relative mt-2.5 leading-8 text-mist-400">{milestone.desc}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
