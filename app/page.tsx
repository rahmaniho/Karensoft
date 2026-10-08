import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProductsBento } from "@/components/sections/ProductsBento";
import { ServicesOutline } from "@/components/sections/ServicesOutline";
import { KarenChapSection } from "@/components/sections/KarenChapSection";
import { FounderSpotlight } from "@/components/sections/FounderSpotlight";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { BlogSection, HomeFaq, IndustriesTeaser, ProcessSection, TaxiBanner } from "@/components/sections/HomeSections";
import { CTASection } from "@/components/shared/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { collectionLd } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  ...buildMetadata({ title: siteConfig.title, description: siteConfig.description, path: "/" }),
  title: { absolute: siteConfig.title },
};

/** بخشی از نمونه‌کارها برای صفحهٔ اصلی */
function PortfolioHighlights() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="live-work-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="start"
          eyebrow="PORTFOLIO / نمونه‌کارها"
          title={<span id="live-work-title">محصول را از نزدیک ببینید</span>}
          description="وب‌سایت‌ها و نرم‌افزارهایی که آنلاین‌اند؛ روی هر کارت بزنید تا جزئیات پروژه، نقش ما و لینک نسخهٔ زنده را ببینید."
        />
        <PortfolioGrid limit={5} withFilters={false} className="mt-12" />
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd data={collectionLd({ name: "نمونه‌کارهای کارن سافت", description: siteConfig.description, path: "/" })} />
      <Hero />
      <StatsSection />
      <TaxiBanner />
      <ProductsBento />
      <ServicesOutline />
      <KarenChapSection />
      <PortfolioHighlights />
      <FounderSpotlight />
      <ProcessSection />
      <IndustriesTeaser />
      <BlogSection />
      <HomeFaq />
      <CTASection />
    </main>
  );
}
