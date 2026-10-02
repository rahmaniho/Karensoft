"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  as?: "div" | "section" | "li" | "article" | "header";
}

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
  header: motion.header,
} as const;

/** نمایش نرم هنگام اسکرول (یک‌بار) */
export function Reveal({ children, className, delay = 0, y = 28, x = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** والد استگر: فرزندان با تأخیر پله‌ای ظاهر می‌شوند */
export function Stagger({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" }) {
  const reduce = useReducedMotion();
  const Tag = as === "ul" ? motion.ul : motion.div;
  return (
    <Tag
      className={className}
      variants={container}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as = "div", lift = false }: { children: ReactNode; className?: string; as?: "div" | "li"; lift?: boolean }) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} variants={item} {...(lift ? { whileHover: { y: -6 }, transition: { type: "spring", stiffness: 300, damping: 22 } } : {})}>
      {children}
    </Tag>
  );
}
