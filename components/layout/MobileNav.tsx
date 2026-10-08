"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { NAV_CTA, NAV_FREE, NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { SoundToggle } from "@/components/fx/SoundToggle";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { isNavActive } from "@/components/layout/Sidebar";

const EASE = [0.22, 1, 0.36, 1] as const;

/** دکمهٔ همبرگری که به ضربدر تبدیل می‌شود (Morphing) */
export function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "بستن منو" : "باز کردن منو"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="relative inline-flex size-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-white transition-colors hover:border-electric-400/45"
    >
      <span className="relative block h-3.5 w-5">
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 block h-0.5 rounded-full bg-current"
          animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 block h-0.5 -translate-y-1/2 rounded-full bg-current"
          animate={open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.18 }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 block h-0.5 rounded-full bg-current"
          animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        />
      </span>
    </button>
  );
}

/** آیکون‌های محو پس‌زمینهٔ منو با پارالاکس ملایم هنگام اسکرول */
function MenuParallaxIcons({ scrollY }: { scrollY: MotionValue<number> }) {
  const y1 = useSpring(useTransform(scrollY, (value) => value * 0.22), { stiffness: 90, damping: 24 });
  const y2 = useSpring(useTransform(scrollY, (value) => value * -0.16), { stiffness: 90, damping: 24 });
  const y3 = useSpring(useTransform(scrollY, (value) => value * 0.34), { stiffness: 90, damping: 24 });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -start-8 top-14 text-white/[0.05]">
        <Icon name="Boxes" className="size-52" strokeWidth={1} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute -end-10 top-1/3 text-white/[0.045]">
        <Icon name="Code2" className="size-64" strokeWidth={1} />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-8 start-1/4 text-white/[0.04]">
        <Icon name="Printer" className="size-44" strokeWidth={1} />
      </motion.div>
      <div className="bg-noise absolute inset-0 opacity-[0.06]" />
      <span className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,rgb(0_240_255/0.16),transparent_70%)]" />
      <span className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(60%_100%_at_50%_100%,rgb(139_92_246/0.18),transparent_70%)]" />
    </div>
  );
}

/** نوار بالای موبایل + منوی تمام‌صفحه */
export function MobileNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { play } = useSoundFx();
  const first = useRef(true);
  const menuScroll = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    play("swoosh");
  }, [open, play]);

  function navigate() {
    play("click");
    setOpen(false);
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled || open ? "rgb(5 5 6 / 0.82)" : "rgb(5 5 6 / 0)",
          borderColor: scrolled || open ? "rgb(255 255 255 / 0.09)" : "rgb(255 255 255 / 0)",
        }}
        transition={{ duration: 0.28 }}
        className="fixed inset-x-0 top-0 z-[58] border-b backdrop-blur-xl xl:hidden"
      >
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" onClick={navigate} aria-label="کارن سافت — صفحه اصلی" className="group flex items-center gap-2.5">
            <Img src="/images/icon/ks-mark.png" alt="" width={36} height={36} className="size-9 rounded-lg ring-1 ring-white/12" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-black text-white">{siteConfig.name}</span>
              <span className="font-mono text-[0.55rem] tracking-[0.18em] text-electric-400">KAREN SOFT</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <SoundToggle compact className="xl:hidden" />
            <MenuButton open={open} onToggle={() => setOpen((current) => !current)} />
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-[64] xl:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/88 backdrop-blur-2xl" onClick={() => setOpen(false)} aria-hidden="true" />
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.34, ease: EASE }}
              className="relative flex h-full flex-col overflow-y-auto pb-8 pt-20 no-scrollbar"
              onScroll={(event) => menuScroll.set(event.currentTarget.scrollTop)}
            >
              <div className="absolute inset-0 -z-10">
                <MenuParallaxIcons scrollY={menuScroll} />
              </div>

              <nav aria-label="منوی موبایل" className="px-5 sm:px-8">
                <p className="font-mono text-[0.6rem] tracking-[0.24em] text-mist-500">{"// MENU"}</p>
                <ul className="mt-4 space-y-1">
                  {NAV_ITEMS.map((item, index) => {
                    const active = isNavActive(pathname, item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.045, duration: 0.42, ease: EASE }}
                      >
                        <Link
                          href={item.href}
                          onClick={navigate}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-lg font-extrabold transition-colors",
                            active
                              ? "border-electric-400/30 bg-electric-400/10 text-white"
                              : "border-white/6 bg-white/[0.02] text-mist-100 active:bg-white/8",
                          )}
                        >
                          <Icon
                            name={item.icon ?? "Sparkles"}
                            className={cn("size-5 shrink-0 transition-transform duration-300 group-hover:scale-110", active ? "text-electric-400" : "text-mist-400")}
                          />
                          {item.label}
                          <ArrowLeft className="ms-auto size-4 -scale-x-100 text-mist-500 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-electric-300" aria-hidden="true" />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.45, ease: EASE }}
                  className="mt-5 grid gap-3"
                >
                  <Link
                    href={NAV_FREE.href}
                    onClick={navigate}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-mint-500/30 bg-mint-500/12 py-3.5 font-extrabold text-mint-400"
                  >
                    <span className="size-2 rounded-full bg-mint-400" aria-hidden="true" />
                    نرم‌افزار رایگان تاکسی تلفنی
                  </Link>
                  <Link
                    href={NAV_CTA.href}
                    onClick={navigate}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-electric-500 to-violet-glow py-3.5 font-extrabold text-ink-950"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {NAV_CTA.label}
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.45, ease: EASE }}
                  className="glass mt-5 rounded-2xl p-4"
                >
                  <p className="font-mono text-[0.6rem] tracking-[0.2em] text-mist-500">{"// CONTACT"}</p>
                  <ul className="mt-3 space-y-2.5 text-sm text-mist-100">
                    <li>
                      <a href={`tel:${siteConfig.phone}`} onClick={navigate} className="flex items-center gap-3" dir="ltr">
                        <Phone className="size-4 text-electric-400" aria-hidden="true" />
                        <span className="font-mono">{siteConfig.phoneDisplay}</span>
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${siteConfig.email}`} onClick={navigate} className="flex items-center gap-3" dir="ltr">
                        <Mail className="size-4 text-electric-400" aria-hidden="true" />
                        <span className="font-mono">{siteConfig.email}</span>
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="size-4 shrink-0 text-electric-400" aria-hidden="true" />
                      <span dir="rtl">{siteConfig.address}</span>
                    </li>
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-2 border-t border-white/8 pt-4" aria-label="شبکه‌های اجتماعی">
                    {SOCIAL_LINKS.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => play("click")}
                          aria-label={`${social.label} کارن سافت`}
                          className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-mist-400 transition-colors hover:border-electric-400/40 hover:text-white"
                        >
                          <Icon name={social.icon} className="size-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
