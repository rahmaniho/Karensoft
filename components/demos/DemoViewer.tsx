"use client";

import { useState } from "react";
import { ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

type Device = "desktop" | "tablet" | "mobile";
const DEVICES: { id: Device; label: string; Icon: typeof Monitor; width: string }[] = [
  { id: "desktop", label: "دسکتاپ", Icon: Monitor, width: "100%" },
  { id: "tablet", label: "تبلت", Icon: Tablet, width: "768px" },
  { id: "mobile", label: "موبایل", Icon: Smartphone, width: "390px" },
];

interface DemoViewerProps {
  src: string;
  title: string;
  /** نمایش در برگهٔ جدید */
  href?: string;
}

/** نمایش دموی زنده داخل iframe با انتخاب اندازهٔ دستگاه. iframe فقط پس از کلیک بارگذاری می‌شود. */
export function DemoViewer({ src, title, href }: DemoViewerProps) {
  const [device, setDevice] = useState<Device>("desktop");
  const [loaded, setLoaded] = useState(false);
  const width = DEVICES.find((d) => d.id === device)?.width ?? "100%";

  return (
    <div className="glass-strong overflow-hidden rounded-3xl p-3 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-1 rounded-full border border-white/12 bg-white/5 p-1" role="group" aria-label="اندازه پیش‌نمایش">
          {DEVICES.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={device === id}
              onClick={() => setDevice(id)}
              className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors", device === id ? "bg-electric-500 text-white" : "text-mist-400 hover:text-white")}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sr-only sm:hidden">{label}</span>
            </button>
          ))}
        </div>
        <a href={href ?? src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-electric-300 transition-colors hover:text-white">
          باز کردن در برگه جدید
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
      <div className="grid place-items-center overflow-hidden rounded-2xl bg-ink-850 p-0 sm:p-3">
        <div className="relative h-[70vh] min-h-[28rem] max-w-full overflow-hidden rounded-xl border border-white/10 bg-white transition-[width] duration-500 ease-out" style={{ width }}>
          {loaded ? (
            <iframe src={src} title={title} loading="lazy" className="size-full border-0" referrerPolicy="no-referrer" />
          ) : (
            <div className="grid size-full place-items-center bg-ink-850 p-6 text-center">
              <div>
                <p className="mb-5 text-lg font-bold text-white">{title}</p>
                <button type="button" onClick={() => setLoaded(true)} className="inline-flex h-12 items-center gap-2 rounded-xl bg-electric-500 px-6 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-electric-600">
                  بارگذاری دموی زنده
                </button>
                <p className="mt-3 text-xs text-mist-400">برای صرفه‌جویی در حجم صفحه، دمو پس از کلیک بارگذاری می‌شود.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
