"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Boxes } from "lucide-react";
import { TiltCard } from "@/components/fx/TiltCard";
import { PRODUCTS, PRODUCT_STATUS_LABEL, productHref, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ActionButton } from "@/components/ui/ActionButton";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { ScrambleText } from "@/components/fx/ScrambleText";

const EASE = [0.22, 1, 0.36, 1] as const;

/** آیکون متحرک محصولات؛ با هاور به حرکت درمی‌آید */
function ProductIcon({ product, className }: { product: Product; className?: string }) {
  if (product.image && (product.slug === "karen-net" || product.slug === "taxi-software")) {
    return <Img src={product.image} alt="" className={cn("size-10 rounded-lg bg-white/90 p-1 object-contain", className)} />;
  }
  return (
    <motion.span
      className={cn("inline-flex", className)}
      whileHover={{ rotate: product.icon === "Printer" || product.icon === "Workflow" ? 180 : -8, scale: 1.12 }}
      transition={{ type: "spring", stiffness: 260, damping: 14 }}
    >
      <Icon name={product.icon} className="size-7" />
    </motion.span>
  );
}

interface CellProps {
  product: Product;
  className?: string;
  large?: boolean;
  index: number;
}

function BentoCell({ product, className, large = false, index }: CellProps) {
  const active = product.status === "active";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.62, delay: Math.min(index * 0.06, 0.3), ease: EASE }}
      className={cn("h-full", className)}
    >
      <TiltCard maxTilt={large ? 4 : 8} sound className="glass group relative h-full overflow-hidden rounded-3xl">
        {/* تصویر پس‌زمینهٔ سلول‌های بزرگ */}
        {large && product.image ? (
          <>
            <Img
              src={product.image}
              alt=""
              className="absolute inset-0 size-full object-cover opacity-22 transition-all duration-700 group-hover:scale-105 group-hover:opacity-32"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/45" />
          </>
        ) : null}

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -end-16 -top-16 size-52 rounded-full opacity-45 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: `radial-gradient(circle, ${product.accent}55, transparent 68%)` }}
        />

        <div className={cn("relative flex h-full flex-col", large ? "p-7 sm:p-9" : "p-6")}>
          <div className="flex items-start justify-between gap-3">
            <span
              className="inline-flex items-center justify-center rounded-2xl ring-1 ring-inset"
              style={{
                background: `linear-gradient(140deg, ${product.accent}26, transparent)`,
                boxShadow: `inset 0 0 22px -14px ${product.accent}`,
                borderColor: `${product.accent}40`,
                padding: large ? "0.85rem" : "0.7rem",
                color: product.accent,
              }}
            >
              <ProductIcon product={product} />
            </span>
            <span className="flex flex-wrap justify-end gap-2">
              {product.free ? (
                <span className="rounded-lg bg-mint-500/15 px-2.5 py-1 text-[0.68rem] font-extrabold text-mint-400 ring-1 ring-inset ring-mint-500/30">
                  رایگان
                </span>
              ) : null}
              <span
                className={cn(
                  "rounded-lg px-2.5 py-1 text-[0.68rem] font-extrabold ring-1 ring-inset",
                  active ? "bg-electric-400/12 text-electric-300 ring-electric-400/30" : "bg-white/5 text-mist-400 ring-white/10",
                )}
              >
                {PRODUCT_STATUS_LABEL[product.status]}
              </span>
            </span>
          </div>

          <h3 className={cn("mt-5 font-extrabold leading-snug text-white", large ? "text-2xl sm:text-3xl" : "text-lg")}>
            <Link href={productHref(product)} className="after:absolute after:inset-0 after:content-['']">
              {product.name}
            </Link>
          </h3>
          <p className={cn("mt-2.5 text-mist-400", large ? "max-w-xl text-base leading-8" : "text-sm leading-7")}>{product.short}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`فناوری‌ها و قابلیت‌های ${product.name}`}>
            {product.chips.map((chip) => (
              <li key={chip} className="rounded-lg bg-white/6 px-2.5 py-1 font-mono text-[0.68rem] text-mist-100/85 ring-1 ring-inset ring-white/8">
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-electric-300">
            <span className="transition-colors group-hover:text-white">{large ? "جزئیات محصول" : "مشاهده"}</span>
            <ArrowLeft className="size-4 -scale-x-100 transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/** محصولات در چیدمان نامتقارن Bento Grid */
export function ProductsBento() {
  const featured = PRODUCTS.filter((product) => product.featured);
  const rest = PRODUCTS.filter((product) => !product.featured);
  const heroes = [featured.find((p) => p.slug === "taxi-software"), featured.find((p) => p.slug === "law-office"), featured.find((p) => p.slug === "printing-management")].filter(
    (p): p is Product => Boolean(p),
  );
  const smalls = [...featured.filter((p) => !heroes.includes(p)), ...rest].slice(0, 5);

  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="products-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-glow/25 bg-violet-glow/8 px-4 py-1 font-mono text-[0.68rem] tracking-widest text-violet-soft">
              <Boxes className="size-3.5" aria-hidden="true" />
              PRODUCTS / محصولات
            </p>
            <h2 id="products-title" className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl lg:text-[2.7rem]">
              <ScrambleText text="نرم‌افزارهایی که از دل نیاز واقعی" as="span" />
              <br />
              <span className="text-gradient-animated">بازار ساخته شده‌اند</span>
            </h2>
            <p className="mt-4 text-base leading-8 text-mist-400 sm:text-lg">
              چند محصول فعال و بقیه در حال توسعه؛ ابتدا فرایند واقعی کسب‌وکار را می‌شناسیم، بعد نرم‌افزار را می‌سازیم.
            </p>
          </div>
          <ActionButton href="/products/" variant="outline" magnetic className="shrink-0">
            همهٔ محصولات
            <ArrowLeft className="size-4 -scale-x-100" aria-hidden="true" />
          </ActionButton>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {heroes.map((product, index) => {
            const span =
              index === 0
                ? "lg:col-span-7 lg:row-span-1"
                : index === 1
                  ? "sm:col-span-2 lg:col-span-5"
                  : "sm:col-span-2 lg:col-start-8 lg:col-span-5 lg:row-start-2";
            return (
              <BentoCell
                key={product.slug}
                product={product}
                index={index}
                large
                className={cn(span, index === 0 && "min-h-[22rem]")}
              />
            );
          })}

          {smalls.map((product, index) => (
            <BentoCell
              key={product.slug}
              product={product}
              index={index + heroes.length}
              className={cn(index === 0 ? "lg:col-start-2 lg:col-span-5 lg:row-start-2" : "lg:col-span-3")}
            />
          ))}

          {/* سلول دعوت به اقدام */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="sm:col-span-2 lg:col-span-3"
          >
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-electric-400/25 p-6">
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{ background: "linear-gradient(150deg, rgb(0 240 255 / 0.16), rgb(139 92 246 / 0.16) 55%, rgb(5 5 6 / 0.9))" }}
              />
              <span aria-hidden="true" className="bg-noise absolute inset-0 -z-10 opacity-[0.06]" />
              <div>
                <p className="font-mono text-[0.65rem] tracking-widest text-electric-200">CUSTOM BUILD</p>
                <h3 className="mt-3 text-lg font-extrabold leading-8 text-white">نرم‌افزار اختصاصی کسب‌وکار شما</h3>
                <p className="mt-2 text-sm leading-7 text-mist-100/80">
                  اگر محصول آمادهٔ ما دقیقاً اندازهٔ فرایند شما نیست، آن را برایتان می‌سازیم؛ مشاوره و برآورد اولیه رایگان است.
                </p>
              </div>
              <ActionButton href="/contact/" size="sm" className="mt-6 w-full">
                شروع گفتگو
                <ArrowLeft className="size-4 -scale-x-100" aria-hidden="true" />
              </ActionButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
