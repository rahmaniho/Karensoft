import type { CSSProperties } from "react";
import { IMAGE_SIZES } from "@/lib/imageSizes";
import { cn } from "@/lib/utils";

interface ImgProps {
  /** مسیر داخل public، مثل /images/cover.webp */
  src: string;
  /** متن جایگزین — اجباری (برای تصاویر صرفاً تزئینی alt="" بدهید) */
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  /** تصاویر بالای صفحه (LCP) با eager بارگذاری می‌شوند */
  priority?: boolean;
  sizes?: string;
}

/**
 * تگ <img> ساده (طبق الزام پروژه: images.unoptimized و بدون next/image)
 * با width/height واقعی برای جلوگیری از CLS، lazy-loading و decoding=async.
 */
export function Img({ src, alt, width, height, className, style, priority = false, sizes }: ImgProps) {
  const known = IMAGE_SIZES[src];
  const w = width ?? known?.[0];
  const h = height ?? known?.[1];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn("max-w-full", className)}
      style={style}
    />
  );
}
