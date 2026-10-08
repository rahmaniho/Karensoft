import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Img } from "@/components/ui/Img";
import { formatJalali, toPersianDigits } from "@/lib/utils";

export interface BlogCardData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readingTime: number;
}

export function BlogCard({ post, priority = false }: { post: BlogCardData; priority?: boolean }) {
  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-electric-400/40 hover:shadow-[0_24px_60px_-24px_rgb(0_240_255/0.55)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-ink-850">
        <Img src={post.image} alt="" priority={priority} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <Badge tone="blue" className="absolute start-4 top-4 backdrop-blur-md">{post.category}</Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-xs text-mist-400">
          <time dateTime={post.date}>{formatJalali(post.date)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {toPersianDigits(post.readingTime)} دقیقه مطالعه
          </span>
        </div>
        <h3 className="mt-3 text-lg font-extrabold leading-8 text-white">
          <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 after:content-['']">{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 leading-8 text-mist-400">{post.excerpt}</p>
        <span className="mt-4 text-sm font-bold text-electric-300 transition-colors group-hover:text-white">ادامه مطلب ←</span>
      </div>
    </article>
  );
}
