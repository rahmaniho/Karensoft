import {
  ArrowLeft,
  BookOpen,
  Car,
  Code2,
  ExternalLink,
  Factory,
  HardHat,
  Printer,
  Scale,
  ShieldCheck,
  Sparkles,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { PORTFOLIO_CATEGORY_LABEL, type PortfolioItem } from "@/lib/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";

const PROJECT_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Car,
  Factory,
  HardHat,
  Printer,
  Scale,
  ShieldCheck,
  Sparkles,
  WalletCards,
};

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const ProjectIcon = PROJECT_ICONS[item.icon] ?? Code2;

  return (
    <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-electric-400/40 hover:shadow-[0_24px_60px_-24px_rgb(0_240_255/0.45)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-850">
        {item.image ? (
          <Img
            src={item.image}
            alt={item.imageAlt ?? `تصویر پروژهٔ ${item.title}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="relative grid size-full place-items-center overflow-hidden"
            style={{
              background: `radial-gradient(circle at 78% 16%, ${item.accent}45, transparent 44%), linear-gradient(135deg, #0f1f44, #050b1a)`,
            }}
            aria-hidden="true"
          >
            <span className="absolute -end-9 -top-12 size-48 rounded-full border border-white/10" />
            <span className="absolute -bottom-24 -start-5 size-56 rounded-full border border-white/10" />
            <div className="relative flex flex-col items-center gap-3 rounded-3xl border border-white/15 bg-ink-950/45 px-8 py-6 text-center shadow-2xl backdrop-blur-sm">
              <ProjectIcon className="size-12" style={{ color: item.accent }} strokeWidth={1.5} />
              <span className="max-w-64 text-sm font-extrabold text-white">{item.title}</span>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/65 via-transparent to-transparent" aria-hidden="true" />
        <Badge tone="slate" className="absolute start-4 top-4 border-white/15 bg-ink-950/70 text-white backdrop-blur-md">
          {PORTFOLIO_CATEGORY_LABEL[item.category]}
        </Badge>
        {item.statusLabel ? (
          <span className="absolute end-4 top-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-ink-950/75 px-3 py-1.5 text-xs font-bold text-emerald-200 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
            {item.statusLabel}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold leading-8 text-white">{item.title}</h3>
        <p className="mt-1 text-sm font-semibold text-electric-300">{item.client}</p>
        <p className="mt-3 flex-1 leading-8 text-mist-400">{item.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`فناوری‌ها و قابلیت‌های ${item.title}`}>
          {item.tags.map((tag) => (
            <li key={tag} className="rounded-lg bg-white/6 px-2.5 py-1 text-xs font-semibold text-mist-400">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {item.liveUrl ? (
            <Button
              href={item.liveUrl}
              size="sm"
              external={/^https?:\/\//i.test(item.liveUrl)}
              aria-label={`مشاهده نسخهٔ آنلاین پروژهٔ ${item.title}`}
            >
              مشاهدهٔ نسخهٔ آنلاین
              <ExternalLink className="size-4" aria-hidden="true" />
            </Button>
          ) : null}
          {item.href ? (
            <Button href={item.href} size="sm" variant="secondary" aria-label={`${item.cta ?? "جزئیات"} — ${item.title}`}>
              {item.cta ?? "جزئیات پروژه"}
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
