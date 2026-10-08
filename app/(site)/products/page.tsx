import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { collectionLd } from "@/lib/schema";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ProductCard } from "@/components/shared/ProductCard";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";

const DESC = "محصولات کارن سافت: نرم‌افزار مدیریت دفتر وکالت، نرم‌افزار رایگان مدیریت تاکسی تلفنی و محصولات در حال توسعه برای املاک، رستوران، باشگاه و فروشگاه.";

export const metadata: Metadata = buildMetadata({ title: "محصولات", description: DESC, path: "/products/" });

export default function ProductsPage() {
  const active = PRODUCTS.filter((p) => p.status === "active");
  const upcoming = PRODUCTS.filter((p) => p.status !== "active");
  return (
    <main id="main">
      <JsonLd data={collectionLd({ name: "محصولات کارن سافت", description: DESC, path: "/products/" })} />
      <PageHero
        eyebrow="محصولات"
        title="نرم‌افزارهایی برای کسب‌وکارهای واقعی"
        description="دو محصول فعال و آمادهٔ استفاده، و چند محصول دیگر که در حال توسعه هستند."
        breadcrumbs={[{ name: "محصولات", path: "/products/" }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="active-title">
        <h2 id="active-title" className="mb-8 text-2xl font-extrabold text-white">محصولات فعال</h2>
        <Stagger className="grid gap-6 md:grid-cols-2">
          {active.map((p) => (
            <StaggerItem key={p.slug}><ProductCard product={p} /></StaggerItem>
          ))}
        </Stagger>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8" aria-labelledby="soon-title">
        <h2 id="soon-title" className="mb-2 text-2xl font-extrabold text-white">به‌زودی</h2>
        <p className="mb-8 text-mist-400">این محصولات در حال توسعه‌اند؛ برای اطلاع از انتشار، صفحهٔ هر محصول را ببینید و فرم اطلاع‌رسانی را پر کنید.</p>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((p) => (
            <StaggerItem key={p.slug}><ProductCard product={p} /></StaggerItem>
          ))}
        </Stagger>
      </section>
      <CTASection title="محصول مناسب کسب‌وکارتان را پیدا نکردید؟" description="نرم‌افزار اختصاصی هم می‌سازیم. نیازتان را بگویید تا برآورد اولیه رایگان انجام شود." />
    </main>
  );
}
