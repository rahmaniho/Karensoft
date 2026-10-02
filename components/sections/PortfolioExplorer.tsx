"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PORTFOLIO_CATEGORY_LABEL, PORTFOLIO_ITEMS, type PortfolioCategory } from "@/lib/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Img } from "@/components/ui/Img";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

type Cat = PortfolioCategory | "all";

/** شبکهٔ فیلترپذیر نمونه‌کارها */
export function PortfolioExplorer() {
  const [cat, setCat] = useState<Cat>("all");
  const options = (Object.keys(PORTFOLIO_CATEGORY_LABEL) as Cat[]).map((value) => ({
    value,
    label: PORTFOLIO_CATEGORY_LABEL[value],
    count: value === "all" ? PORTFOLIO_ITEMS.length : PORTFOLIO_ITEMS.filter((i) => i.category === value).length,
  }));
  const visible = useMemo(() => (cat === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.category === cat)), [cat]);

  return (
    <div>
      <FilterTabs label="دسته‌بندی نمونه‌کارها" options={options} value={cat} onChange={setCat} />
      <Stagger key={cat} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <StaggerItem key={item.slug}>
            <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-electric-400/40 hover:shadow-[0_24px_60px_-24px_rgb(37_99_235/0.55)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-800">
                <Img src={item.image} alt={item.imageAlt} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <Badge className="absolute start-4 top-4 backdrop-blur-md">{PORTFOLIO_CATEGORY_LABEL[item.category]}</Badge>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold leading-8 text-white">
                  <Link href={item.href} className="after:absolute after:inset-0 after:content-['']">{item.title}</Link>
                </h3>
                <p className="mt-1 text-sm font-semibold text-electric-300">{item.client}</p>
                <p className="mt-3 flex-1 leading-8 text-slate-300">{item.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="برچسب‌ها">
                  {item.tags.map((t) => <li key={t} className="rounded-lg bg-white/6 px-2.5 py-1 text-xs font-semibold text-slate-300">{t}</li>)}
                </ul>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-electric-300 transition-all group-hover:gap-3 group-hover:text-white">{item.cta}<ArrowLeft className="size-4" aria-hidden="true" /></span>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
