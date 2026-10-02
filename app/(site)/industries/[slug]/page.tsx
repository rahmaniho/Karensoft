import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { IndustrySite } from "@/components/industries/IndustrySite";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return buildMetadata({ title: `نمونه طراحی سایت ${i.name}`, description: `${i.description} (نمونه طراحی مفهومی کارن سافت)`, path: `/industries/${i.slug}/` });
}

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  return (
    <main id="main">
      <div className="sr-only">
        <Breadcrumbs items={[{ name: "صنایع", path: "/industries/" }, { name: industry.name, path: `/industries/${industry.slug}/` }]} />
      </div>
      <IndustrySite industry={industry} />
    </main>
  );
}
