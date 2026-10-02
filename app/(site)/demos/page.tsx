import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { collectionLd } from "@/lib/schema";
import { DemosExplorer } from "@/components/sections/DemosExplorer";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";

const DESC = "دموهای زنده کارن سافت: خانه وکلا، سایت‌های سالن زیبایی سحر نجفی، اپ مدیریت تاکسی تلفنی و نرم‌افزار دفتر وکالت را همین حالا امتحان کنید.";

export const metadata: Metadata = buildMetadata({ title: "دموی زنده", description: DESC, path: "/demos/" });

export default function DemosPage() {
  return (
    <main id="main">
      <JsonLd data={collectionLd({ name: "دموهای زنده کارن سافت", description: DESC, path: "/demos/" })} />
      <PageHero eyebrow="دموی زنده" title="پیش از سفارش، کار را ببینید" description="هر دمو یک پروژهٔ واقعی یا نمونهٔ کاملاً اجراشده است؛ باز کنید، کلیک کنید و کیفیت را بسنجید." breadcrumbs={[{ name: "دموی زنده", path: "/demos/" }]} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><h2 className="sr-only">فهرست دموها</h2>
        <DemosExplorer /></section>
      <CTASection />
    </main>
  );
}
