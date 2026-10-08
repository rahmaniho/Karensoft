import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  interactive?: boolean;
}

/** کارت شیشه‌ای */
export function Card({ className, interactive = false, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl",
        interactive && "transition-all duration-300 hover:-translate-y-1.5 hover:border-electric-400/40 hover:shadow-[0_24px_60px_-24px_rgb(0_240_255/0.55)]",
        className,
      )}
      {...rest}
    />
  );
}
