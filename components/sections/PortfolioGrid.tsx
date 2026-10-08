"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Code2, ExternalLink, Eye, Layers } from "lucide-react";
import { TiltCard } from "@/components/fx/TiltCard";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { PORTFOLIO_CATEGORY_LABEL, PORTFOLIO_ITEMS, type PortfolioCategory, type PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { ActionButton } from "@/components/ui/ActionButton";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";
import { FilterTabs } from "@/components/shared/FilterTabs";

const EASE = [0.22, 1, 0.36, 1] as const;
type Cat = PortfolioCategory | "all";

/** ترتیب نمایش: پروژه‌های ویژه و دارای تصویر زنده اول */
function sortItems(items: PortfolioItem[]): PortfolioItem[] {
  return [...items].sort((a, b) => {
    const score = (item: PortfolioItem) => (item.featured ? 2 : 0) + (item.image ? 1 : 0);
    return score(b) - score(a);
  });
}

function ItemVisual({ item, className }: { item: PortfolioItem; className?: string }) {
  if (item.image) {
    return (
      <Img
        src={item.image}
        alt={item.imageAlt ?? `پیش‌نمایش پروژهٔ ${item.title}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn("size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]", className)}
      />
    );
  }
  return (
    <div
      className={cn("relative grid size-full place-items-center overflow-hidden", className)}
      style={{
        background: `radial-gradient(circle at 76% 18%, ${item.accent}40, transparent 46%), linear-gradient(140deg, #12141a, #050506)`,
      }}
      aria-hidden="true"
    >
      <span className="bg-grid-live absolute inset-0 opacity-40" />
      <span className="absolute -end-10 -top-14 size-48 rounded-full border border-white/8" />
      <span className="absolute -bottom-24 -start-8 size-56 rounded-full border border-white/8" />
      <div className="relative flex flex-col items-center gap-3 rounded-3xl border border-white/12 bg-ink-950/55 px-8 py-6 text-center backdrop-blur-sm">
        <Icon name={item.icon} className="size-11" strokeWidth={1.4} />
        <span className="max-w-60 text-sm font-extrabold text-white">{item.title}</span>
      </div>
    </div>
  );
}

function PortfolioCardInteractive({ item, onOpen, wide = false }: { item: PortfolioItem; onOpen: () => void; wide?: boolean }) {
  const { play } = useSoundFx();
  return (
    <TiltCard maxTilt={wide ? 4 : 7} sound className="glass group relative h-full overflow-hidden rounded-3xl">
      <div className={cn("relative overflow-hidden bg-ink-850", wide ? "aspect-[16/8]" : "aspect-[16/10]")}>
        <ItemVisual item={item} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

        <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-ink-950/75 px-2.5 py-1 text-[0.68rem] font-bold text-mist-100 backdrop-blur-md ring-1 ring-inset ring-white/12">
          <Layers className="size-3" style={{ color: item.accent }} aria-hidden="true" />
          {PORTFOLIO_CATEGORY_LABEL[item.category]}
        </span>

        {item.statusLabel ? (
          <span className="absolute end-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink-950/75 px-3 py-1 text-[0.68rem] font-bold text-mint-400 backdrop-blur-md ring-1 ring-inset ring-mint-500/25">
            <span className="size-1.5 rounded-full bg-mint-400 shadow-[0_0_8px_2px_rgb(52_211_153/0.7)]" aria-hidden="true" />
            {item.statusLabel}
          </span>
        ) : null}

        {/* لایهٔ اقدام سریع هنگام هاور */}
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => {
              play("click");
              onOpen();
            }}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-white/92 text-sm font-extrabold text-ink-950 backdrop-blur-md transition-colors hover:bg-white"
          >
            <Eye className="size-4" aria-hidden="true" />
            جزئیات پروژه
          </button>
          {item.liveUrl ? (
            <a
              href={item.liveUrl}
              onClick={() => play("click")}
              {...(/^https?:\/\//i.test(item.liveUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-white/20 bg-ink-950/70 text-white backdrop-blur-md transition-colors hover:border-electric-400/60 hover:text-electric-300"
              aria-label={`مشاهدهٔ نسخهٔ آنلاین ${item.title}`}
            >
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col", wide ? "p-7" : "p-6")}>
        <h3 className={cn("font-extrabold leading-8 text-white", wide ? "text-2xl" : "text-lg")}>{item.title}</h3>
        <p className="mt-1 text-sm font-semibold" style={{ color: item.accent }}>
          {item.client}
        </p>
        <p className={cn("mt-3 flex-1 text-mist-400", wide ? "text-base leading-8" : "text-sm leading-7")}>{item.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`فناوری‌ها و قابلیت‌های ${item.title}`}>
          {item.tags.map((tag) => (
            <li key={tag} className="rounded-lg bg-white/5 px-2.5 py-1 font-mono text-[0.66rem] text-mist-100/80 ring-1 ring-inset ring-white/8">
              {tag}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            play("click");
            onOpen();
          }}
          className="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold text-electric-300 transition-colors hover:text-white lg:hidden"
        >
          جزئیات پروژه
          <ArrowLeft className="size-4 -scale-x-100" aria-hidden="true" />
        </button>
      </div>
    </TiltCard>
  );
}

function PortfolioModal({ item, onClose }: { item: PortfolioItem | null; onClose: () => void }) {
  return (
    <Modal open={Boolean(item)} onClose={onClose} title={item?.title ?? "جزئیات پروژه"} className="sm:max-w-3xl">
      {item ? (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-850">
            <div className={item.image ? "aspect-[16/8]" : "aspect-[16/7]"}>
              <ItemVisual item={item} />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{ background: `linear-gradient(to top, ${item.accent}1f, transparent)` }}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-white/6 px-2.5 py-1 text-[0.68rem] font-bold text-mist-100 ring-1 ring-inset ring-white/10">
                {PORTFOLIO_CATEGORY_LABEL[item.category]}
              </span>
              {item.statusLabel ? (
                <span className="rounded-lg bg-mint-500/12 px-2.5 py-1 text-[0.68rem] font-bold text-mint-400 ring-1 ring-inset ring-mint-500/25">
                  {item.statusLabel}
                </span>
              ) : null}
              {item.year ? (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/6 px-2.5 py-1 font-mono text-[0.68rem] text-mist-400 ring-1 ring-inset ring-white/10">
                  <CalendarDays className="size-3" aria-hidden="true" />
                  {item.year}
                </span>
              ) : null}
            </div>

            <h3 className="mt-4 text-2xl font-black leading-[1.6] text-white">{item.title}</h3>
            <p className="mt-1 text-sm font-bold" style={{ color: item.accent }}>
              {item.client}
            </p>
            <p className="mt-4 leading-9 text-mist-400">{item.summary}</p>
            {item.role ? (
              <p className="mt-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-mist-100/85">
                <span className="font-mono text-[0.65rem] tracking-widest text-electric-400">OUR ROLE</span>
                <br />
                {item.role}
              </p>
            ) : null}
          </div>

          {item.highlights?.length ? (
            <div>
              <h4 className="font-mono text-[0.68rem] tracking-widest text-electric-400">HIGHLIGHTS</h4>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {item.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm leading-7 text-mist-100/85">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: item.accent }} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ul className="flex flex-wrap gap-2" aria-label="فناوری‌ها">
            {item.tags.map((tag) => (
              <li key={tag} className="rounded-lg bg-white/5 px-3 py-1.5 font-mono text-xs text-mist-100/85 ring-1 ring-inset ring-white/10">
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2.5 border-t border-white/8 pt-5">
            {item.liveUrl ? (
              <ActionButton href={item.liveUrl} external={/^https?:\/\//i.test(item.liveUrl)} size="sm">
                مشاهدهٔ نسخهٔ آنلاین
                <ExternalLink className="size-4" aria-hidden="true" />
              </ActionButton>
            ) : null}
            {item.href ? (
              <ActionButton href={item.href} variant="secondary" size="sm">
                {item.cta ?? "صفحهٔ معرفی"}
                <ArrowLeft className="size-4 -scale-x-100" aria-hidden="true" />
              </ActionButton>
            ) : null}
            {item.repoUrl ? (
              <ActionButton href={item.repoUrl} variant="ghost" size="sm" external>
                <Code2 className="size-4" aria-hidden="true" />
                کد منبع
              </ActionButton>
            ) : null}
          </div>

          <p role="note" className="rounded-xl border border-amber-300/18 bg-amber-400/5 px-4 py-3 text-xs leading-6 text-amber-100/85">
            بعضی پیوندها نسخهٔ دمو یا پیش‌نمایش‌اند؛ لطفاً اطلاعات واقعی کسب‌وکار خود را در سامانه‌های نمایشی وارد نکنید.
          </p>
        </div>
      ) : null}
    </Modal>
  );
}

interface PortfolioGridProps {
  /** فقط چند نمونهٔ ویژه (برای صفحهٔ اصلی) */
  limit?: number;
  /** نمایش تب‌های دسته‌بندی */
  withFilters?: boolean;
  className?: string;
}

/** شبکهٔ تعاملی نمونه‌کارها با مودال شیشه‌ای جزئیات */
export function PortfolioGrid({ limit, withFilters = true, className }: PortfolioGridProps) {
  const [cat, setCat] = useState<Cat>("all");
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const { play } = useSoundFx();

  const options = (Object.keys(PORTFOLIO_CATEGORY_LABEL) as Cat[]).map((value) => ({
    value,
    label: PORTFOLIO_CATEGORY_LABEL[value],
    count: value === "all" ? PORTFOLIO_ITEMS.length : PORTFOLIO_ITEMS.filter((item) => item.category === value).length,
  }));

  const visible = useMemo(() => {
    const filtered = cat === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((item) => item.category === cat);
    return sortItems(filtered).slice(0, limit);
  }, [cat, limit]);

  return (
    <div className={className}>
      {withFilters ? (
        <FilterTabs label="دسته‌بندی نمونه‌کارها" options={options} value={cat} onChange={setCat} className="mb-10" />
      ) : null}

      <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <motion.div
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: EASE }}
              className={cn(index === 0 && !limit && "md:col-span-2 lg:col-span-2")}
            >
              <PortfolioCardInteractive item={item} wide={index === 0 && !limit} onOpen={() => setActive(item)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <PortfolioModal item={active} onClose={() => { play("toggle"); setActive(null); }} />
    </div>
  );
}
