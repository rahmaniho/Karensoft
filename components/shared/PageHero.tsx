import type { ReactNode } from "react";
import type { BreadcrumbItem } from "@/lib/types";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs: BreadcrumbItem[];
  children?: ReactNode;
}

/** سربرگ داخلی صفحات (h1 + مسیر ناوبری) */
export function PageHero({ eyebrow, title, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/5 pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="bg-aurora absolute inset-0 -z-10" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <Reveal className="max-w-4xl">
          {eyebrow ? <p className="mb-4 text-sm font-bold text-electric-300">{eyebrow}</p> : null}
          <h1 className="text-gradient text-4xl font-black leading-[1.45] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {description ? <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-300">{description}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
