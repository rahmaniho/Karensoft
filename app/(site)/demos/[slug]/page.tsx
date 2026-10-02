import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GENERIC_DEMOS, getDemo } from "@/lib/demos";
import { buildMetadata } from "@/lib/seo";
import { DemoShowcase } from "@/components/demos/DemoShowcase";

export const dynamicParams = false;

/** فقط دموهای بدون صفحهٔ اختصاصی (vokalahome، sahar-najafi و najafisahar صفحهٔ خودشان را دارند) */
export function generateStaticParams(): { slug: string }[] {
  return GENERIC_DEMOS.map((d) => ({ slug: d.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDemo(slug);
  if (!d) return {};
  return buildMetadata({ title: `دموی ${d.title}`, description: d.description, path: d.href, image: d.image });
}

export default async function DemoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();
  return <DemoShowcase demo={demo} />;
}
