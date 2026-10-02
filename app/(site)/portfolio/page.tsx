import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { collectionLd } from "@/lib/schema";
import { PortfolioExplorer } from "@/components/sections/PortfolioExplorer";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";

const DESC = "نمونه‌کارهای کارن سافت: وب‌سایت خانه وکلا، سایت‌های سالن زیبایی سحر نجفی، نرم‌افزار دفتر وکالت، نرم‌افزار مدیریت تاکسی تلفنی و کارن چاپ.";

export const metadata: Metadata = buildMetadata({ title: "نمونه‌کارها", description: DESC, path: "/portfolio/" });

export default function PortfolioPage() {
  return (
    <main id="main">
      <JsonLd data={collectionLd({ name: "نمونه‌کارهای کارن سافت", description: DESC, path: "/portfolio/" })} />
      <PageHero eyebrow="نمونه‌کارها" title="پروژه‌هایی که ساخته‌ایم" description="وب‌سایت، نرم‌افزار و خدمات چاپ؛ پروژه‌های واقعی با نتیجهٔ قابل مشاهده." breadcrumbs={[{ name: "نمونه‌کارها", path: "/portfolio/" }]} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><h2 className="sr-only">فهرست نمونه‌کارها</h2>
        <PortfolioExplorer /></section>
      <CTASection title="نوبت سایت شماست" description="پروژهٔ بعدی می‌تواند کسب‌وکار شما باشد. نیازتان را بگویید تا برآورد اولیه رایگان انجام شود." />
    </main>
  );
}
