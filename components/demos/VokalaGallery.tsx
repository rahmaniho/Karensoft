"use client";

import { useCallback, useState } from "react";
import { Maximize2 } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

/** گالری با نمایش بزرگ (lightbox) — رنگ‌های برند خانه وکلا */
export function VokalaGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const current = active === null ? null : items[active];

  return (
    <>
      <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, i) => (
          <StaggerItem as="li" key={item.src} className={i === 0 || i === 6 ? "col-span-2" : undefined}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`بزرگ‌نمایی: ${item.caption}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#C9A227]/25 bg-[#0B1F3A] focus-visible:outline-[#C9A227]"
            >
              <Img src={item.src} alt={item.alt} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-[#0B1F3A]/90 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-sm font-bold text-white">{item.caption}</span>
                <Maximize2 className="size-4 text-[#C9A227]" aria-hidden="true" />
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <Modal open={current !== null} onClose={close} title={current?.caption ?? "تصویر"} className="sm:max-w-4xl">
        {current ? (
          <figure>
            <Img src={current.src} alt={current.alt} className="w-full rounded-xl" />
            <figcaption className="mt-4 text-center text-lg font-bold text-[#C9A227]">{current.caption}</figcaption>
          </figure>
        ) : null}
      </Modal>
    </>
  );
}
