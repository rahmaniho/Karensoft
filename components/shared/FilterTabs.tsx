"use client";

import { motion } from "framer-motion";
import { useSoundFx } from "@/components/fx/SoundProvider";
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
  const { play } = useSoundFx();
  return (
    <div role="group" aria-label={label} className={cn("no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <motion.button
            key={o.value}
            type="button"
            aria-pressed={active}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              play("click");
              onChange(o.value);
            }}
            className={cn(
              "shrink-0 rounded-full border px-5 py-2 text-sm font-bold transition-all duration-300",
              active
                ? "border-electric-400/60 bg-electric-400/14 text-white shadow-[0_10px_30px_-14px_rgb(0_240_255/0.9)]"
                : "border-white/10 bg-white/[0.03] text-mist-400 hover:border-electric-400/35 hover:bg-white/8 hover:text-white",
            )}
          >
            {o.label}
            {typeof o.count === "number" ? <span className={cn("ms-2 font-mono text-xs", active ? "text-electric-300" : "text-mist-500")}>{o.count.toLocaleString("fa-IR")}</span> : null}
          </motion.button>
        );
      })}
    </div>
  );
}
