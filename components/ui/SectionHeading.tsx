import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "center", as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-start", className)}>
      {eyebrow ? (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-electric-400/30 bg-electric-500/10 px-4 py-1 text-xs font-bold text-electric-300">
          <span className="size-1.5 rounded-full bg-electric-400" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl font-extrabold leading-[1.5] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">{title}</Tag>
      {description ? <p className="mt-4 text-base leading-8 text-mist-400 sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}
