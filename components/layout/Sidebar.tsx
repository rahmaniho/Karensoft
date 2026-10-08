"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, PanelLeftClose, PanelLeftOpen, Phone } from "lucide-react";
import { NAV_CTA, NAV_FREE, NAV_ITEMS } from "@/lib/constants";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { ParticleBurst } from "@/components/fx/ParticleBurst";
import { SoundToggle } from "@/components/fx/SoundToggle";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";

const STORAGE_KEY = "karensoft-sidebar";
const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 260;

/** مسیر فعال: برای خانه فقط تطابق دقیق، برای بقیه پیشوند مسیر */
export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

const SPRING = { type: "spring", stiffness: 240, damping: 28, mass: 0.7 } as const;

interface SidebarProps {
  onWidthChange?: (width: number) => void;
}

/**
 * سایدبار اصلی دسکتاپ (سمت راست، راست‌چین):
 * حالت باز ۲۶۰ پیکسل و حالت بسته ۷۰ پیکسل با Tooltip شیشه‌ای.
 */
export function Sidebar({ onWidthChange }: SidebarProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(true);
  const [restored, setRestored] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [burst, setBurst] = useState<{ key: string; trigger: number }>({ key: "", trigger: 0 });
  const { play } = useSoundFx();
  const firstRender = useRef(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "collapsed") setOpen(false);
    } catch {
      /* حافظهٔ مرورگر در دسترس نیست */
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    onWidthChange?.(open ? EXPANDED_WIDTH : COLLAPSED_WIDTH);
  }, [open, onWidthChange]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    play("swoosh");
  }, [open, play]);

  function toggle() {
    setOpen((current) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, current ? "collapsed" : "expanded");
      } catch {
        /* بی‌اثر */
      }
      return !current;
    });
  }

  function handleNavClick(href: string) {
    setBurst((current) => ({ key: href, trigger: current.trigger + 1 }));
    play("click");
  }

  const sidebarWidth = open ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

  return (
    <motion.aside
      aria-label="ناوبری اصلی"
      initial={false}
      animate={{ width: restored ? sidebarWidth : EXPANDED_WIDTH }}
      transition={SPRING}
      className="fixed inset-y-0 end-0 z-[62] hidden overflow-hidden border-s border-white/8 bg-ink-950/78 backdrop-blur-2xl xl:block"
    >
      {/* بافت‌های پس‌زمینه */}
      <span aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-[0.05]" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 55% at 100% 0%, rgb(0 240 255 / 0.12), transparent 62%), radial-gradient(90% 45% at 100% 100%, rgb(139 92 246 / 0.14), transparent 65%)",
        }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-0 w-px bg-gradient-to-b from-transparent via-electric-400/45 to-transparent" />

      <div className="relative flex h-full flex-col">
        {/* برند */}
        <div className={cn("flex shrink-0 items-center gap-3 px-4 pt-6", open ? "justify-start" : "justify-center")}>
          <Link href="/" onClick={() => handleNavClick("/")} aria-label="کارن سافت — صفحه اصلی" className="group flex items-center gap-3 rounded-xl">
            <Img
              src="/images/icon/ks-mark.png"
              alt=""
              width={40}
              height={40}
              priority
              className="size-10 shrink-0 rounded-xl ring-1 ring-white/12 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105"
            />
            <AnimatePresence initial={false}>
              {open ? (
                <motion.span
                  key="brand-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col leading-tight"
                >
                  <span className="text-base font-black text-white">{siteConfig.name}</span>
                  <span className="font-mono text-[0.62rem] font-semibold tracking-widest text-electric-400">KAREN SOFT</span>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </Link>
        </div>

        <div className={cn("mt-5 shrink-0 border-y border-white/8 py-2", open ? "px-4" : "px-3")}>
          <p className={cn("font-mono text-[0.6rem] tracking-[0.22em] text-mist-500", open ? "block" : "sr-only")}>
            {open ? "// NAVIGATION" : "منو"}
          </p>
        </div>

        {/* منو */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 no-scrollbar">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(pathname, item.href);
              const iconName = item.icon ?? "Sparkles";
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => handleNavClick(item.href)}
                    onPointerEnter={() => {
                      setHovered(item.href);
                      if (!active) play("hover");
                    }}
                    onPointerLeave={() => setHovered((current) => (current === item.href ? null : current))}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors duration-200",
                      active ? "text-white" : "text-mist-400 hover:text-white",
                      open ? "justify-start" : "justify-center px-0",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="sidebar-active"
                        transition={SPRING}
                        className="absolute inset-0 -z-10 rounded-xl border border-electric-400/25 bg-electric-400/10"
                        style={{ boxShadow: "inset 0 0 22px -12px rgb(0 240 255 / 0.9)" }}
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-2 start-0 w-0.5 rounded-full bg-gradient-to-b from-electric-400 to-violet-glow transition-opacity",
                        active ? "opacity-100" : "opacity-0",
                        open ? "" : "hidden",
                      )}
                    />
                    <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
                      <Icon
                        name={iconName}
                        className={cn(
                          "size-[1.15rem] transition-transform duration-300 group-hover:scale-110",
                          active ? "text-electric-400" : "text-mist-400 group-hover:text-electric-300",
                        )}
                      />
                      {burst.key === item.href ? (
                        <ParticleBurst trigger={burst.trigger} className="absolute inset-0" color={active ? "#00f0ff" : "#8b5cf6"} />
                      ) : null}
                    </span>
                    {open ? (
                      <span className="truncate">{item.label}</span>
                    ) : (
                      <span className="sr-only">{item.label}</span>
                    )}
                  </Link>

                  {/* Tooltip شیشه‌ای در حالت بسته */}
                  <AnimatePresence>
                    {!open && hovered === item.href ? (
                      <motion.span
                        key="tooltip"
                        initial={{ opacity: 0, x: 8, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 6, scale: 0.97 }}
                        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-strong pointer-events-none absolute end-[calc(100%+0.85rem)] top-1/2 z-20 -translate-y-1/2 rounded-xl px-3.5 py-2 text-xs font-bold whitespace-nowrap text-white"
                      >
                        {item.label}
                        {active ? <span className="ms-2 text-[0.6rem] font-semibold text-electric-400">صفحهٔ جاری</span> : null}
                        <span
                          aria-hidden="true"
                          className="absolute -end-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-e border-t border-white/12 bg-ink-800"
                        />
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* تاکسی رایگان */}
          <div className="mt-4">
            <Link
              href={NAV_FREE.href}
              onClick={() => handleNavClick(NAV_FREE.href)}
              onPointerEnter={() => play("hover")}
              className={cn(
                "group relative flex items-center gap-3 overflow-hidden rounded-xl border border-mint-500/30 bg-mint-500/10 px-3 py-2.5 text-sm font-extrabold text-mint-400 transition-colors hover:bg-mint-500/18 hover:text-white",
                open ? "justify-start" : "justify-center px-0",
              )}
            >
              {open ? (
                <>
                  <span className="relative flex size-2.5 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-400/70" aria-hidden="true" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-mint-400" aria-hidden="true" />
                  </span>
                  <span className="truncate">{NAV_FREE.label}</span>
                </>
              ) : (
                <>
                  <Icon name="Car" className="size-5 shrink-0 text-mint-400 transition-transform group-hover:scale-110" />
                  <span className="sr-only">{NAV_FREE.label}</span>
                </>
              )}
            </Link>
            {!open ? (
              <p className="mt-1 text-center font-mono text-[0.55rem] tracking-wider text-mint-400/80">رایگان</p>
            ) : null}
          </div>
        </nav>

        {/* تماس و کنترل‌ها */}
        <div className={cn("shrink-0 border-t border-white/8 px-3 pb-4 pt-3", open ? "" : "")}>
          <Link
            href={NAV_CTA.href}
            onClick={() => handleNavClick(NAV_CTA.href)}
            className={cn(
              "relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-l from-electric-500/90 to-violet-glow/85 px-4 py-3 text-sm font-extrabold text-ink-950 transition-transform duration-300 hover:-translate-y-0.5",
              open ? "" : "px-0",
            )}
            style={{ boxShadow: "0 16px 40px -22px rgb(0 240 255 / 0.9)" }}
          >
            <Phone className="size-4 shrink-0" aria-hidden="true" />
            {open ? <span>{NAV_CTA.label}</span> : <span className="sr-only">{NAV_CTA.label}</span>}
          </Link>

          <div className={cn("mt-3 space-y-2", open ? "block" : "hidden")}>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 font-mono text-[0.7rem] text-mist-400 transition-colors hover:text-electric-300"
              dir="ltr"
            >
              <Phone className="size-3.5 shrink-0" aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 font-mono text-[0.7rem] text-mist-400 transition-colors hover:text-electric-300"
              dir="ltr"
            >
              <Mail className="size-3.5 shrink-0" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>

          <div className={cn("mt-3 flex items-center gap-2", open ? "justify-between px-1" : "flex-col gap-2")}>
            <SoundToggle withLabel={open} compact={!open} />
            <button
              type="button"
              onClick={toggle}
              aria-label={open ? "بستن سایدبار" : "باز کردن سایدبار"}
              aria-expanded={open}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] font-bold text-mist-400 transition-colors hover:border-electric-400/40 hover:text-white",
                open ? "h-10 flex-1 px-3" : "size-9",
              )}
            >
              <motion.span
                key={open ? "collapse" : "expand"}
                initial={{ opacity: 0, rotate: -25 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.22 }}
              >
                {open ? <PanelLeftClose className="size-4" aria-hidden="true" /> : <PanelLeftOpen className="size-4" aria-hidden="true" />}
              </motion.span>
              {open ? <span className="text-xs">جمع کردن منو</span> : null}
            </button>
          </div>

          <p className={cn("mt-3 text-center font-mono text-[0.55rem] tracking-widest text-mist-500", open ? "block" : "hidden")}>
            {`v3.1 · ${siteConfig.founded.jalali}`}
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
