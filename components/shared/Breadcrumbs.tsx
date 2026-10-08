import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { BreadcrumbItem } from "@/lib/types";
import { breadcrumbLd } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";

/** مسیر ناوبری + JSON-LD (BreadcrumbList) */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(items)} />
      <nav aria-label="مسیر صفحه" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-mist-400">
          <li>
            <Link href="/" className="rounded px-1 transition-colors hover:text-white">خانه</Link>
          </li>
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                <ChevronLeft className="size-3.5 text-mist-500" aria-hidden="true" />
                {last ? (
                  <span aria-current="page" className="px-1 font-semibold text-mist-100">{item.name}</span>
                ) : (
                  <Link href={item.path} className="rounded px-1 transition-colors hover:text-white">{item.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
