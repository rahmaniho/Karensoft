"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

const links = [
  ["صفحه اصلی", "/"],
  ["درباره ما", "/about/"],
  ["خدمات", "/services/"],
  ["محصولات", "/products/"],
  ["نمونه‌کارها", "/portfolio/"],
  ["وبلاگ", "/blog/"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-[70] border-b border-white/10 bg-[#071b24]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="کارن سافت">
          <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[#22d3a7] to-[#1b8ed1] text-xl font-black text-white shadow-[0_8px_28px_-8px_#22d3a7]">K</span>
          <span className="leading-tight"><b className="block text-lg text-white">کارن سافت</b><small className="text-[10px] tracking-[.2em] text-[#7edac4]">KAREN SOFT</small></span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="منوی اصلی">
          {links.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-white/75 transition hover:text-[#58e0ba]">{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-sm text-white/70"><Phone className="size-4 text-[#52dcb5]" />{siteConfig.phoneDisplay}</a>
          <Link href="/contact/" className="flex items-center gap-2 rounded-full bg-[#28c99b] px-5 py-2.5 text-sm font-bold text-[#052019] transition hover:bg-[#55dfb9]">شروع همکاری <ArrowLeft className="size-4" /></Link>
        </div>
        <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-xl border border-white/15 text-white lg:hidden" aria-label="نمایش منو">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-white/10 bg-[#071b24] px-5 py-5 lg:hidden">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="block border-b border-white/5 py-3 text-white/80">{label}</Link>)}</nav>}
    </header>
  );
}
