"use client";

import { useCallback, useMemo, useState } from "react";
import { Clock, Lightbulb, Zap } from "lucide-react";
import { PRINT_CATEGORIES, PRINT_PRODUCTS } from "@/lib/printing";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FormspreeForm, type FormFieldConfig } from "@/components/shared/FormspreeForm";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

const CATEGORY_ICON: Record<string, string> = {
  printer: "Printer",
  stamp: "Stamp",
  book: "BookOpen",
  gift: "Package",
  flag: "Target",
  news: "Newspaper",
  award: "Award",
};

const QUOTE_FIELDS: FormFieldConfig[] = [
  { name: "name", label: "نام و نام خانوادگی", required: true },
  { name: "phone", label: "شماره تماس", type: "tel", required: true, placeholder: "۰۹۱۲۱۲۳۴۵۶۷" },
  { name: "quantity", label: "تیراژ / تعداد", placeholder: "مثلاً ۱۰۰۰ عدد" },
  { name: "size", label: "سایز و جنس کاغذ (اختیاری)", placeholder: "مثلاً A5، گلاسه ۱۳۵ گرم" },
  { name: "message", label: "توضیحات سفارش", type: "textarea", rows: 4, full: true, placeholder: "مشخصات، زمان مورد نیاز و هر نکتهٔ دیگر…" },
];

interface QuoteTarget {
  name: string;
  category: string;
  turnaround?: string;
  rush?: string;
  tips?: string[];
}

/** کاتالوگ خدمات چاپ با فیلتر دسته و مودال درخواست قیمت (Formspree) */
export function PrintCatalog() {
  const [active, setActive] = useState<string>(PRINT_CATEGORIES[0].id);
  const [target, setTarget] = useState<QuoteTarget | null>(null);
  const close = useCallback(() => setTarget(null), []);

  const category = PRINT_CATEGORIES.find((c) => c.id === active) ?? PRINT_CATEGORIES[0];
  const products = useMemo(() => PRINT_PRODUCTS.filter((p) => p.category === category.id), [category.id]);

  return (
    <div>
      <div role="tablist" aria-label="دسته‌بندی خدمات چاپ" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {PRINT_CATEGORIES.map((c) => {
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              id={`print-tab-${c.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls="print-panel"
              onClick={() => setActive(c.id)}
              className={cn("inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-all", isActive ? "border-electric-500 bg-electric-600 text-white shadow-[0_8px_24px_-8px_rgb(37_99_235/0.9)]" : "border-white/12 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white")}
            >
              <Icon name={CATEGORY_ICON[c.icon] ?? "Printer"} className="size-4" />
              {c.title}
            </button>
          );
        })}
      </div>

      <div id="print-panel" role="tabpanel" aria-labelledby={`print-tab-${category.id}`} className="mt-10">
        <div className="glass grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]">
          {category.image ? (
            <Img src={category.image} alt={category.title} className="aspect-[4/3] w-full rounded-2xl object-cover" />
          ) : (
            <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-gradient-to-br from-electric-600/25 to-navy-800" aria-hidden="true">
              <Icon name={CATEGORY_ICON[category.icon] ?? "Printer"} className="size-20 text-electric-300" strokeWidth={1.25} />
            </div>
          )}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-extrabold text-white">{category.title}</h3>
            <p className="mt-3 leading-8 text-slate-300">{category.desc}</p>
            <ul className="mt-5 space-y-2">
              {category.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-slate-200"><Icon name="Check" className="mt-1.5 size-4 shrink-0 text-electric-400" />{b}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Button onClick={() => setTarget({ name: category.title, category: category.title })}>درخواست قیمت این دسته</Button>
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <Stagger key={category.id} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <StaggerItem key={p.id} lift>
                <article className="glass flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="grid aspect-[16/10] place-items-center overflow-hidden bg-navy-800">
                    {p.image ? (
                      <Img src={p.image} alt={p.name} className="size-full object-cover" />
                    ) : p.icon ? (
                      <Img src={p.icon} alt={p.name} className="size-24 object-contain" />
                    ) : (
                      <span className="text-6xl" aria-hidden="true">{p.emoji}</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="text-lg font-extrabold text-white">{p.name}</h4>
                    <p className="mt-1 text-xs font-bold text-electric-300">{p.tag}</p>
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{p.desc}</p>
                    <p className="mt-4 flex items-center gap-2 text-sm text-slate-300"><Clock className="size-4 text-electric-300" aria-hidden="true" />{p.turnaround}</p>
                    <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => setTarget({ name: p.name, category: category.title, turnaround: p.turnaround, rush: p.rush, tips: p.tips })}>
                      سفارش و درخواست قیمت
                    </Button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}
      </div>

      <Modal open={target !== null} onClose={close} title={target ? `درخواست قیمت: ${target.name}` : "درخواست قیمت"}>
        {target ? (
          <div>
            <h3 className="pe-12 text-2xl font-extrabold text-white">درخواست قیمت: {target.name}</h3>
            {target.turnaround ? (
              <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2"><Clock className="size-4 text-electric-300" aria-hidden="true" />زمان تحویل: {target.turnaround}</span>
                {target.rush ? <span className="inline-flex items-center gap-2"><Zap className="size-4 text-amber-300" aria-hidden="true" />فوری: {target.rush}</span> : null}
              </p>
            ) : null}
            {target.tips && target.tips.length > 0 ? (
              <ul className="mt-4 space-y-2 rounded-xl bg-white/5 p-4 text-sm leading-7 text-slate-200">
                {target.tips.map((t) => (
                  <li key={t} className="flex items-start gap-2"><Lightbulb className="mt-1 size-4 shrink-0 text-amber-300" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            ) : null}
            <FormspreeForm
              formId="print-quote"
              className="mt-6"
              fields={QUOTE_FIELDS}
              subject={`درخواست قیمت کارن چاپ: ${target.name}`}
              hidden={{ product: target.name, category: target.category }}
              submitLabel="ارسال درخواست قیمت"
              successTitle="درخواست شما ثبت شد"
              successMessage="کارشناسان کارن چاپ پس از بررسی با شما تماس می‌گیرند و پیش‌فاکتور ارسال می‌کنند."
            />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
