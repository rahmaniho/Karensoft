"use client";

import { useMemo, useState } from "react";
import { DEMOS, DEMO_CATEGORY_LABEL, type DemoCategory } from "@/lib/demos";
import { DemoCard } from "@/components/shared/DemoCard";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

type Cat = DemoCategory | "all";

export function DemosExplorer() {
  const [cat, setCat] = useState<Cat>("all");
  const options = (Object.keys(DEMO_CATEGORY_LABEL) as Cat[]).map((value) => ({
    value,
    label: DEMO_CATEGORY_LABEL[value],
    count: value === "all" ? DEMOS.length : DEMOS.filter((d) => d.category === value).length,
  }));
  const visible = useMemo(() => (cat === "all" ? DEMOS : DEMOS.filter((d) => d.category === cat)), [cat]);
  return (
    <div>
      <FilterTabs label="دسته‌بندی دموها" options={options.filter((o) => o.count > 0)} value={cat} onChange={setCat} />
      <Stagger key={cat} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((d) => (
          <StaggerItem key={d.slug}><DemoCard demo={d} /></StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
