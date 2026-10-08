import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-bold whitespace-nowrap select-none transition-all duration-300 will-change-transform active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-l from-electric-400 to-violet-glow text-ink-950 shadow-[0_18px_44px_-20px_rgb(0_240_255/0.85)] hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-18px_rgb(139_92_246/0.9)]",
  secondary: "glass text-white hover:-translate-y-0.5 hover:border-electric-400/45 hover:bg-white/10",
  outline: "border border-electric-400/45 text-electric-300 hover:-translate-y-0.5 hover:border-electric-400 hover:bg-electric-400/10 hover:text-white",
  ghost: "text-mist-100 hover:bg-white/8 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ({ href: string; external?: boolean } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children"> | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">));

/**
 * دکمه/لینک یکپارچه (سازگار با Server Components).
 * با href → لینک؛ بدون آن → <button>. برای افکت‌های جذب مغناکوتیسی، موج نور و صدا
 * از ActionButton (کلاینت) استفاده کنید.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  const shine = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
      style={{ background: "radial-gradient(120% 80% at 50% 0%, rgb(255 255 255 / 0.15), transparent 60%)" }}
    />
  );

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as CommonProps & { href: string; external?: boolean } & ComponentPropsWithoutRef<"a">;
    void _v; void _s; void _c; void _ch;
    const isExternal = external || /^(https?:|mailto:|tel:)/.test(href);
    // لینک‌های داخلی که به فایل‌های استاتیک خارج از اپ اشاره می‌کنند (دموی زنده) نباید از Link عبور کنند
    const isStaticAsset = /^\/(live|taxi-app)\//.test(href);
    if (isExternal || isStaticAsset) {
      const newTab = external || /^https?:/.test(href);
      return (
        <a
          href={href}
          className={cls}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {shine}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {shine}
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as CommonProps & ComponentPropsWithoutRef<"button">;
  void _v; void _s; void _c; void _ch;
  return (
    <button type="button" className={cls} {...rest}>
      {shine}
      {children}
    </button>
  );
}
