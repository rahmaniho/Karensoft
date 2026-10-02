import type { Metadata } from "next";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { collectionLd } from "@/lib/schema";
import { toPersianDigits } from "@/lib/utils";
import { BlogExplorer } from "@/components/sections/BlogExplorer";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";

const DESC = "مقالات کارن سافت دربارهٔ نرم‌افزار دفتر وکالت، مدیریت تاکسی تلفنی، اتوماسیون، امنیت، فروشگاه اینترنتی و رشد کسب‌وکار.";

export const metadata: Metadata = buildMetadata({ title: "وبلاگ", description: DESC, path: "/blog/" });

export default function BlogPage() {
  const cards = BLOG_POSTS.map(({ slug, title, excerpt, category, date, image, readingTime }) => ({ slug, title, excerpt, category, date, image, readingTime }));
  return (
    <main id="main">
      <JsonLd data={collectionLd({ name: "وبلاگ کارن سافت", description: DESC, path: "/blog/" })} />
      <PageHero
        eyebrow="وبلاگ"
        title="دانش و تجربهٔ ما، در اختیار شما"
        description={`${toPersianDigits(BLOG_POSTS.length)} مقاله دربارهٔ فناوری، نرم‌افزار و مدیریت کسب‌وکار؛ ساده و کاربردی.`}
        breadcrumbs={[{ name: "وبلاگ", path: "/blog/" }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="sr-only">فهرست مقالات</h2>
        <BlogExplorer posts={cards} categories={BLOG_CATEGORIES} />
      </section>
      <CTASection />
    </main>
  );
}
