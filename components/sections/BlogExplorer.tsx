"use client";

import { useMemo, useState } from "react";
import { BlogCard, type BlogCardData } from "@/components/shared/BlogCard";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { toPersianDigits } from "@/lib/utils";

/** فهرست مقالات با فیلتر دسته‌بندی (فقط داده‌های خلاصه به کلاینت می‌رسد، نه متن کامل) */
export function BlogExplorer({ posts, categories }: { posts: BlogCardData[]; categories: string[] }) {
  const [category, setCategory] = useState<string>("all");

  const options = useMemo(
    () => [
      { value: "all", label: "همه", count: posts.length },
      ...categories.map((c) => ({ value: c, label: c, count: posts.filter((p) => p.category === c).length })),
    ],
    [posts, categories],
  );
  const visible = useMemo(() => (category === "all" ? posts : posts.filter((p) => p.category === category)), [posts, category]);

  return (
    <div>
      <FilterTabs label="دسته‌بندی مقالات" options={options} value={category} onChange={setCategory} />
      <p className="sr-only" aria-live="polite">{toPersianDigits(visible.length)} مقاله نمایش داده می‌شود</p>
      <Stagger key={category} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <StaggerItem key={p.slug}>
            <BlogCard post={p} priority={i < 3} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
