import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User } from "lucide-react";
import { BLOG_POSTS, getPost, getRelatedPosts } from "@/lib/blog";
import { articleLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { formatJalali, toPersianDigits } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Img } from "@/components/ui/Img";
import { JsonLd } from "@/components/ui/JsonLd";
import { BlogCard } from "@/components/shared/BlogCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FaqList } from "@/components/shared/FaqList";
import { Reveal } from "@/components/shared/Reveal";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    keywords: post.tags,
  });
}

/** افزودن id به h2ها و ساخت فهرست مطالب */
function withToc(html: string): { html: string; toc: { id: string; text: string }[] } {
  const toc: { id: string; text: string }[] = [];
  const out = html.replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    const id = `section-${toc.length + 1}`;
    toc.push({ id, text: inner.replace(/<[^>]+>/g, "").trim() });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { html, toc } = withToc(post.content);
  const related = getRelatedPosts(post.slug);

  return (
    <main id="main">
      <JsonLd data={articleLd(post)} />
      <article>
        <header className="relative isolate overflow-hidden border-b border-white/5 pb-12 pt-32 sm:pt-40">
          <div className="bg-aurora absolute inset-0 -z-10" aria-hidden="true" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Breadcrumbs items={[{ name: "وبلاگ", path: "/blog/" }, { name: post.title, path: `/blog/${post.slug}/` }]} />
            <Badge>{post.category}</Badge>
            <h1 className="mt-5 text-3xl font-black leading-[1.6] text-white sm:text-4xl lg:text-[2.6rem]">{post.title}</h1>
            <p className="mt-5 text-lg leading-9 text-slate-300">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2"><User className="size-4" aria-hidden="true" />{post.author}</span>
              <time dateTime={post.date}>{formatJalali(post.date)}</time>
              <span className="inline-flex items-center gap-2"><Clock className="size-4" aria-hidden="true" />{toPersianDigits(post.readingTime)} دقیقه مطالعه</span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Img src={post.image} alt={post.title} priority className="-mt-1 mb-12 mt-10 w-full rounded-2xl border border-white/10 object-cover" />

          {toc.length > 2 ? (
            <nav aria-label="فهرست مطالب" className="glass mb-12 rounded-2xl p-6">
              <h2 className="text-base font-extrabold text-white">در این مقاله</h2>
              <ol className="mt-3 grid list-decimal gap-x-8 gap-y-1.5 ps-5 text-sm marker:text-electric-400 sm:grid-cols-2">
                {toc.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`} className="text-slate-300 transition-colors hover:text-white">{t.text}</a></li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="prose-karen" dangerouslySetInnerHTML={{ __html: html }} />

          {post.faq && post.faq.length > 0 ? (
            <section aria-labelledby="faq-heading" className="mt-16">
              <h2 id="faq-heading" className="mb-6 text-2xl font-extrabold text-white">پرسش‌های متداول</h2>
              <FaqList items={post.faq} />
            </section>
          ) : null}

          <ul className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-6" aria-label="برچسب‌ها">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full bg-white/6 px-3.5 py-1.5 text-sm text-slate-300">#{t}</li>
            ))}
          </ul>
        </div>
      </article>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="related-title">
        <Reveal>
          <h2 id="related-title" className="mb-8 text-2xl font-extrabold text-white">مقالات مرتبط</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((p) => <BlogCard key={p.slug} post={p} />)}
        </div>
        <p className="mt-8 text-center"><Link href="/blog/" className="font-bold text-electric-300 hover:text-white">بازگشت به همه مقالات ←</Link></p>
      </section>
      <CTASection />
    </main>
  );
}
