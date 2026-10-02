"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { NAV_CTA, NAV_FREE, NAV_ITEMS } from "@/lib/constants";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { Img } from "@/components/ui/Img";

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href);
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="کارن سافت — صفحه اصلی" className={cn("group flex items-center gap-3 rounded-xl", className)}>
      <Img src="/images/icon/ks-mark.png" alt="" width={40} height={40} priority className="size-10 rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-4deg]" />
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-black text-white">{siteConfig.name}</span>
        <span className="text-[0.7rem] font-semibold tracking-wide text-electric-300" dir="ltr">Karen Soft</span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "border-b border-white/10 bg-navy-950/80 backdrop-blur-xl" : "border-b border-transparent")}>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav aria-label="منوی اصلی" className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors", active ? "text-white" : "text-slate-300 hover:text-white")}
              >
                {item.label}
                {active ? <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-l from-cyan-glow to-electric-500" /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={NAV_FREE.href} className="hidden items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20 lg:inline-flex">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            {NAV_FREE.label}
          </Link>
          <Link href={NAV_CTA.href} className="hidden h-10 items-center gap-2 rounded-xl bg-electric-600 px-5 text-sm font-bold text-white ring-1 ring-inset ring-white/15 transition-all hover:-translate-y-0.5 hover:bg-electric-700 sm:inline-flex">
            <Phone className="size-4" aria-hidden="true" />
            {NAV_CTA.label}
          </Link>
          <button
            type="button"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-white transition hover:bg-white/10 xl:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            data-lenis-prevent
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-navy-950/95 px-4 pb-8 pt-4 xl:hidden"
          >
            <nav aria-label="منوی موبایل" className="mx-auto max-w-lg">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={cn("block rounded-xl px-4 py-3.5 text-base font-bold transition-colors", isActive(pathname, item.href) ? "bg-electric-600/20 text-white" : "text-slate-200 hover:bg-white/8")}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-5 grid gap-3">
                <Link href={NAV_FREE.href} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 font-bold text-emerald-300">
                  <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  نرم‌افزار رایگان تاکسی تلفنی
                </Link>
                <Link href={NAV_CTA.href} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-electric-600 font-bold text-white">
                  <Phone className="size-4" aria-hidden="true" />
                  {NAV_CTA.label}
                </Link>
                <a href={`tel:${siteConfig.phone}`} className="text-center text-sm font-semibold text-slate-300">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
