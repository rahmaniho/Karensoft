import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { collectionLd } from "@/lib/schema";
import { IndustryGallery } from "@/components/industries/IndustryGallery";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";

const DESC = "نمونه طراحی وب‌سایت برای ۱۲ صنعت: سالن زیبایی، رستوران، دفتر وکالت، املاک، باشگاه ورزشی، کلینیک، آموزش، سفر، فروشگاه، ساختمانی، آژانس دیجیتال و SaaS.";

export const metadata: Metadata = buildMetadata({ title: "صنایع", description: DESC, path: "/industries/" });

export default function IndustriesPage() {
  return (
    <main id="main">
      <JsonLd data={collectionLd({ name: "نمونه طراحی صنایع", description: DESC, path: "/industries/" })} />
      <PageHero eyebrow="صنایع" title="هر صنعت، زبان طراحی خودش را دارد" description="دوازده نمونهٔ طراحی مفهومی با رنگ، تایپوگرافی و ساختار مخصوص هر کسب‌وکار. نام‌ها، قیمت‌ها و آمار این نمونه‌ها فرضی است و فقط برای نمایش سبک طراحی نوشته شده." breadcrumbs={[{ name: "صنایع", path: "/industries/" }]} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><h2 className="sr-only">فهرست نمونه‌های طراحی</h2>
        <IndustryGallery /></section>
      <CTASection title="طرح مخصوص صنعت شما را می‌خواهید؟" />
    </main>
  );
}
