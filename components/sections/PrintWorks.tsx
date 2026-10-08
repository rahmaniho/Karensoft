"use client";

import { useMemo, useState } from "react";
import { PRINT_WORKS, PRINT_WORK_FILTERS } from "@/lib/printing";
import { Badge } from "@/components/ui/Badge";
import { Img } from "@/components/ui/Img";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

/** نمونه‌کارهای کارن چاپ با فیلتر (فقط دسته‌هایی که نمونه دارند) */
export function PrintWorks() {
  const [cat, setCat] = useState("all");
  const filters = useMemo(
    () => PRINT_WORK_FILTERS.filter((f) => f.id === "all" || PRINT_WORKS.some((w) => w.category === f.id)),
    [],
  );
  const visible = useMemo(() => PRINT_WORKS.filter((w) => w.image && (cat === "all" || w.category === cat)), [cat]);

  return (
    <div>
      <FilterTabs label="دسته‌بندی نمونه‌کارها" options={filters.map((f) => ({ value: f.id, label: f.label }))} value={cat} onChange={setCat} />
      <Stagger key={cat} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((w) => (
          <StaggerItem key={w.title} lift>
            <figure className="glass group overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-850">
                {w.image ? <Img src={w.image} alt={w.alt} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /> : null}
                <Badge className="absolute start-4 top-4 backdrop-blur-md">{w.badge}</Badge>
              </div>
              <figcaption className="p-5">
                <p className="font-extrabold text-white">{w.title}</p>
                <p className="mt-1 text-sm leading-7 text-mist-400">{w.desc}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
