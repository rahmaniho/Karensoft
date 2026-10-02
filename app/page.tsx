import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AboutTeaser, BlogSection, DemosSection, HomeFaq, IndustriesTeaser, ProcessSection, ProductsSection, ServicesSection, TaxiBanner } from "@/components/sections/HomeSections";
import { CTASection } from "@/components/shared/CTASection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  ...buildMetadata({ title: siteConfig.title, description: siteConfig.description, path: "/" }),
  title: { absolute: siteConfig.title },
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <TaxiBanner />
      <ProductsSection />
      <ServicesSection />
      <DemosSection />
      <AboutTeaser />
      <ProcessSection />
      <IndustriesTeaser />
      <BlogSection />
      <HomeFaq />
      <CTASection />
    </main>
  );
}
