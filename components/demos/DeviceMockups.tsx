import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  src: string;
  alt: string;
  /** نوشتهٔ نوار آدرس */
  url?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  /** رنگ نوار بالا */
  barClassName?: string;
}

/** قاب مرورگر دسکتاپ */
export function BrowserMockup({ src, alt, url = "karen-soft.ir", className, priority, width, height, barClassName }: BrowserMockupProps) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-white/12 bg-navy-900 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.85)]", className)}>
      <div className={cn("flex items-center gap-3 border-b border-white/10 bg-navy-800/90 px-4 py-3", barClassName)} aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-400/90" />
          <span className="size-2.5 rounded-full bg-amber-400/90" />
          <span className="size-2.5 rounded-full bg-emerald-400/90" />
        </span>
        <span className="mx-auto max-w-[70%] flex-1 truncate rounded-md bg-black/25 px-3 py-1 text-center text-xs text-slate-400" dir="ltr">{url}</span>
        <span className="w-10" />
      </div>
      <Img src={src} alt={alt} width={width} height={height} priority={priority} className="block w-full" />
    </figure>
  );
}

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  frameClassName?: string;
}

/** قاب موبایل */
export function PhoneMockup({ src, alt, className, priority, width, height, frameClassName }: PhoneMockupProps) {
  return (
    <figure className={cn("relative mx-auto w-[min(100%,15rem)] rounded-[2.4rem] border-[7px] border-slate-800 bg-slate-900 p-1 shadow-[0_40px_80px_-24px_rgb(0_0_0/0.9)]", frameClassName, className)}>
      <span className="absolute inset-x-0 top-2 z-10 mx-auto h-4 w-20 rounded-full bg-black" aria-hidden="true" />
      <div className="overflow-hidden rounded-[1.9rem] bg-black">
        <Img src={src} alt={alt} width={width} height={height} priority={priority} className="block aspect-[9/19] w-full object-cover object-top" />
      </div>
    </figure>
  );
}
