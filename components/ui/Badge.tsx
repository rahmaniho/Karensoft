import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "blue" | "green" | "amber" | "slate" | "cyan";

const tones: Record<Tone, string> = {
  blue: "bg-electric-600/20 text-electric-300 border-electric-400/30",
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  amber: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  cyan: "bg-cyan-400/10 text-cyan-300 border-cyan-300/30",
  slate: "bg-white/5 text-slate-300 border-white/12",
};

export function Badge({ children, tone = "blue", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold leading-6", tones[tone], className)}>
      {children}
    </span>
  );
}
