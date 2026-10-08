import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PRODUCT_STATUS_LABEL, productHref, type Product } from "@/lib/products";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const active = product.status === "active";
  return (
    <article className={cn("glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-electric-400/40 hover:shadow-[0_24px_60px_-24px_rgb(0_240_255/0.55)]", className)}>
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-electric-500/15 text-electric-300 ring-1 ring-inset ring-electric-400/25 transition-transform duration-300 group-hover:scale-110">
          {product.image && product.slug === "karen-net" ? <Img src={product.image} alt="" className="size-9 rounded-md object-contain" /> : <Icon name={product.icon} className="size-7" />}
        </span>
        <div className="flex flex-wrap justify-end gap-2">
          {product.free ? <Badge tone="green">رایگان</Badge> : null}
          <Badge tone={active ? "green" : "amber"}>{PRODUCT_STATUS_LABEL[product.status]}</Badge>
        </div>
      </div>
      <h3 className="mt-5 text-xl font-extrabold leading-8 text-white">
        <Link href={productHref(product)} className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-2xl">
          {product.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 leading-8 text-mist-400">{product.short}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="ویژگی‌های کلیدی">
        {product.chips.map((c) => (
          <li key={c} className="rounded-lg bg-white/6 px-2.5 py-1 text-xs font-semibold text-mist-400">{c}</li>
        ))}
      </ul>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-electric-300 transition-all group-hover:gap-3 group-hover:text-white">
        {active ? "مشاهده و شروع" : "اطلاعات بیشتر"}
        <ArrowLeft className="size-4" aria-hidden="true" />
      </span>
    </article>
  );
}
