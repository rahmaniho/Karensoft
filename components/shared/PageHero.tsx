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
    <section className="relative isolate overflow-hidden border-b border-white/6 pb-14 pt-28 sm:pb-20 sm:pt-36 xl:pt-24">
      <div className="bg-aurora absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="bg-noise absolute inset-0 -z-10 opacity-[0.04]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <Reveal className="max-w-4xl">
          {eyebrow ? (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-electric-400/25 bg-electric-400/8 px-4 py-1 font-mono text-[0.68rem] tracking-widest text-electric-300">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-black leading-[1.5] tracking-tight text-white sm:text-5xl sm:leading-[1.4] lg:text-[3.4rem]">{title}</h1>
          {description ? <p className="mt-6 max-w-3xl text-base leading-9 text-mist-400 sm:text-lg">{description}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
