"use client";

import { useMemo, useState } from "react";
import { PORTFOLIO_CATEGORY_LABEL, PORTFOLIO_ITEMS, type PortfolioCategory } from "@/lib/portfolio";
import { PortfolioCard } from "@/components/shared/PortfolioCard";
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
            <PortfolioCard item={item} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
