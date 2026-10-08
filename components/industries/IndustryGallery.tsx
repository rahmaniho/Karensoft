"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Smartphone, Tablet } from "lucide-react";
import { INDUSTRIES, INDUSTRY_CATEGORIES, type IndustryCategory } from "@/lib/industries";
import { cn, toPersianDigits } from "@/lib/utils";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

type Device = "desktop" | "tablet" | "mobile";

const DEVICES: { id: Device; label: string; Icon: typeof Monitor; width: string }[] = [
  { id: "desktop", label: "دسکتاپ", Icon: Monitor, width: "100%" },
  { id: "tablet", label: "تبلت", Icon: Tablet, width: "66%" },
  { id: "mobile", label: "موبایل", Icon: Smartphone, width: "40%" },
];

function Preview({ industryIndex, device }: { industryIndex: number; device: Device }) {
  const industry = INDUSTRIES[industryIndex];
  if (!industry) return null;
  const p = industry.palette;
  const width = DEVICES.find((d) => d.id === device)?.width ?? "100%";
  return (
    <div className="grid place-items-center overflow-hidden rounded-xl bg-ink-850 p-3" aria-hidden="true">
      <div className="w-full origin-top overflow-hidden rounded-lg border transition-[width] duration-500 ease-out" style={{ width, background: p.bg, borderColor: p.border }}>
        <div className="flex h-7 items-center gap-1.5 border-b px-2.5" style={{ borderColor: p.border, background: p.surface }}>
          <span className="size-1.5 rounded-full bg-rose-400" />
          <span className="size-1.5 rounded-full bg-amber-400" />
          <span className="size-1.5 rounded-full bg-emerald-400" />
        </div>
        <div className="p-3" style={{ background: p.gradient }}>
          <span className="block text-[9px] font-extrabold" style={{ color: p.primary }}>{industry.hero.badge}</span>
          <strong className="mt-1.5 block text-xs leading-snug" style={{ color: p.text }}>
            {industry.hero.title} {industry.hero.highlight}
          </strong>
          <span className="mt-2 inline-block rounded-md px-2.5 py-1 text-[8px] font-bold" style={{ background: p.primary, color: p.onPrimary }}>
            {industry.hero.primaryCta}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-3">
          {industry.gallery.slice(0, 3).map((item) => (
            <span key={item.title} className="block aspect-square rounded-md" style={{ background: item.hue }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** گالری نمونه‌های صنایع با فیلتر دسته و پیش‌نمایش دستگاه */
export function IndustryGallery() {
  const [category, setCategory] = useState<IndustryCategory | "all">("all");
  const [device, setDevice] = useState<Device>("desktop");

  const visible = useMemo(
    () => INDUSTRIES.map((industry, index) => ({ industry, index })).filter(({ industry }) => category === "all" || industry.category === category),
    [category],
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <FilterTabs
          label="دسته‌بندی صنایع"
          value={category}
          onChange={setCategory}
          options={INDUSTRY_CATEGORIES.map((c) => ({ value: c.id, label: c.label }))}
          className="sm:justify-start"
        />
        <div className="flex items-center gap-1 self-start rounded-full border border-white/12 bg-white/5 p-1" role="group" aria-label="پیش‌نمایش دستگاه">
          {DEVICES.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setDevice(id)}
              aria-pressed={device === id}
              className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors", device === id ? "bg-electric-500 text-white" : "text-mist-400 hover:text-white")}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mb-5 text-sm text-mist-400">
        {toPersianDigits(visible.length)} نمونه طراحی نمایش داده می‌شود.
      </p>

      <Stagger key={category} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ industry, index }) => (
          <StaggerItem key={industry.slug} lift>
            <article className="glass flex h-full flex-col overflow-hidden rounded-2xl p-4">
              <Preview industryIndex={index} device={device} />
              <div className="mt-4 flex flex-1 flex-col">
                <span className="text-xs font-extrabold text-electric-300">{industry.categoryLabel}</span>
                <h3 className="mt-1 text-lg font-extrabold text-white">{industry.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-7 text-mist-400">{industry.aesthetic}</p>
                <Link
                  href={`/industries/${industry.slug}/`}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-electric-500 text-sm font-extrabold text-white transition-colors hover:bg-electric-600"
                >
                  مشاهده نمونه کامل
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
