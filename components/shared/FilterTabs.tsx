"use client";

import { cn } from "@/lib/utils";

interface FilterTabsProps<T extends string> {
  label: string;
  options: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/** تب‌های فیلتر (دکمه‌های aria-pressed) */
export function FilterTabs<T extends string>({ label, options, value, onChange, className }: FilterTabsProps<T>) {
  return (
    <div role="group" aria-label={label} className={cn("no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "shrink-0 rounded-full border px-5 py-2 text-sm font-bold transition-all duration-300",
              active
                ? "border-electric-500 bg-electric-600 text-white shadow-[0_8px_24px_-8px_rgb(37_99_235/0.9)]"
                : "border-white/12 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10 hover:text-white",
            )}
          >
            {o.label}
            {typeof o.count === "number" ? <span className={cn("ms-2 text-xs", active ? "text-white/80" : "text-slate-400")}>{o.count.toLocaleString("fa-IR")}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
