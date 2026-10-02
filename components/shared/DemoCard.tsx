import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DEMO_CATEGORY_LABEL, type Demo } from "@/lib/demos";
import { Badge } from "@/components/ui/Badge";
import { Img } from "@/components/ui/Img";

export function DemoCard({ demo }: { demo: Demo }) {
  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-electric-400/40 hover:shadow-[0_24px_60px_-24px_rgb(37_99_235/0.55)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-800">
        <Img src={demo.image} alt={demo.imageAlt} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" aria-hidden="true" />
        <Badge tone="blue" className="absolute start-4 top-4 backdrop-blur-md">{DEMO_CATEGORY_LABEL[demo.category]}</Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold leading-8 text-white">
          <Link href={demo.href} className="after:absolute after:inset-0 after:content-['']">{demo.title}</Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-electric-300">{demo.subtitle}</p>
        <p className="mt-3 flex-1 leading-8 text-slate-300">{demo.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="فناوری‌ها">
          {demo.tech.map((t) => (
            <li key={t} className="rounded-lg bg-white/6 px-2.5 py-1 text-xs font-semibold text-slate-300">{t}</li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-electric-300 transition-all group-hover:gap-3 group-hover:text-white">
          مشاهده دمو <ArrowLeft className="size-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
