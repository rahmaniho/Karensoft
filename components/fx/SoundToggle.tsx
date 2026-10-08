"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { cn } from "@/lib/utils";

interface SoundToggleProps {
  className?: string;
  /** نمایش برچسب متنی (در سایدبار باز) */
  withLabel?: boolean;
  compact?: boolean;
}

/** کلید روشن/خاموش کردن افکت‌های صوتی رابط */
export function SoundToggle({ className, withLabel = false, compact = false }: SoundToggleProps) {
  const { enabled, toggle } = useSoundFx();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "خاموش کردن افکت‌های صوتی" : "روشن کردن افکت‌های صوتی"}
      title={enabled ? "صدا روشن است" : "صدا خاموش است"}
      className={cn(
        "group/sound relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] font-bold text-mist-400 transition-colors hover:border-electric-400/40 hover:text-white",
        compact ? "size-9" : "h-10 px-3",
        className,
      )}
    >
      <motion.span
        key={enabled ? "on" : "off"}
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 20 }}
        className={cn("inline-flex", enabled ? "text-electric-400" : "text-mist-500")}
      >
        {enabled ? <Volume2 className="size-4" aria-hidden="true" /> : <VolumeX className="size-4" aria-hidden="true" />}
      </motion.span>
      {withLabel ? <span className="text-xs">{enabled ? "صدا روشن" : "صدا خاموش"}</span> : null}
      {enabled ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/sound:opacity-100"
          style={{ background: "radial-gradient(circle at 50% 120%, rgb(0 240 255 / 0.22), transparent 70%)" }}
        />
      ) : null}
    </button>
  );
}
