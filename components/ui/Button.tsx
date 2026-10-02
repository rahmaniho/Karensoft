import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-xl font-bold whitespace-nowrap select-none transition-all duration-300 will-change-transform active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric-600 text-white shadow-[0_8px_28px_-8px_rgb(37_99_235/0.9)] hover:bg-electric-700 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgb(37_99_235/1)] ring-1 ring-inset ring-white/15",
  secondary: "glass text-white hover:bg-white/10 hover:-translate-y-0.5 hover:border-white/25",
  outline: "border border-electric-400/60 text-electric-300 hover:bg-electric-600/15 hover:text-white hover:-translate-y-0.5",
  ghost: "text-slate-200 hover:bg-white/8 hover:text-white",
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

/** دکمه/لینک یکپارچه. با href → لینک؛ بدون آن → <button>. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

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
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as CommonProps & ComponentPropsWithoutRef<"button">;
  void _v; void _s; void _c; void _ch;
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
