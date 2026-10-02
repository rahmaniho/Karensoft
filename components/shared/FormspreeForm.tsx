"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Loader2, Send, TriangleAlert } from "lucide-react";
import { FORMSPREE_ENDPOINT, siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { Input, Select, Textarea } from "@/components/ui/Field";

export interface FormFieldConfig {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "textarea" | "select" | "date" | "number";
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: string[];
  /** دو ستونه یا تمام‌عرض */
  full?: boolean;
  rows?: number;
  min?: number;
  max?: number;
}

interface FormspreeFormProps {
  /** شناسهٔ یکتا برای idها */
  formId: string;
  fields: FormFieldConfig[];
  /** عنوان ایمیلی که در Formspree دریافت می‌شود */
  subject: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  /** فیلدهای مخفی اضافه (مثلاً نام محصول) */
  hidden?: Record<string, string>;
  /** نوشتهٔ کوچک زیر دکمه */
  note?: string;
  className?: string;
}

type Status = "idle" | "sending" | "success" | "error";

const FA_TO_EN: Record<string, string> = { "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9", "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9" };
const normalizeDigits = (v: string) => v.replace(/[۰-۹٠-٩]/g, (d) => FA_TO_EN[d] ?? d);

function validate(field: FormFieldConfig, raw: string): string | undefined {
  const value = raw.trim();
  if (field.required && !value) return "تکمیل این فیلد الزامی است.";
  if (!value) return undefined;
  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "ایمیل واردشده معتبر نیست.";
  if (field.type === "tel") {
    const digits = normalizeDigits(value).replace(/[\s-]/g, "");
    if (!/^(\+98|0098|98|0)?9\d{9}$/.test(digits) && !/^0\d{10}$/.test(digits)) return "شماره تماس معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷).";
  }
  if (field.type === "textarea" && value.length < 10) return "پیام را کمی کامل‌تر بنویسید (حداقل ۱۰ نویسه).";
  return undefined;
}

/** فرم عمومی متصل به Formspree (بدون سرور) با اعتبارسنجی فارسی و مسیر جایگزین تماس */
export function FormspreeForm({
  formId,
  fields,
  subject,
  submitLabel = "ارسال",
  successTitle = "پیام شما ارسال شد",
  successMessage = "به‌زودی با شما تماس می‌گیریم.",
  hidden,
  note,
  className,
}: FormspreeFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // طعمهٔ ربات‌ها
    if (String(data.get("_gotcha") ?? "")) return;

    const nextErrors: Record<string, string> = {};
    for (const f of fields) {
      const err = validate(f, String(data.get(f.name) ?? ""));
      if (err) nextErrors[f.name] = err;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    for (const f of fields) {
      if (f.type === "tel") data.set(f.name, normalizeDigits(String(data.get(f.name) ?? "")));
    }
    data.set("_subject", subject);
    if (hidden) for (const [k, v] of Object.entries(hidden)) data.set(k, v);
    data.set("_source", typeof window !== "undefined" ? window.location.href : siteConfig.url);

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} role="status" className={cn("glass rounded-2xl p-8 text-center sm:p-10", className)}>
        <CircleCheck className="mx-auto size-14 text-emerald-400" aria-hidden="true" />
        <h3 className="mt-5 text-2xl font-extrabold text-white">{successTitle}</h3>
        <p className="mt-3 leading-8 text-slate-300">{successMessage}</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-white/10">
          ارسال پیام جدید
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn("space-y-5", className)} aria-label={subject}>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `${formId}-${f.name}`;
          const shared = { id, name: f.name, label: f.label, required: f.required, hint: f.hint, error: errors[f.name], wrapperClassName: f.full || f.type === "textarea" ? "sm:col-span-2" : undefined };
          if (f.type === "textarea") return <Textarea key={f.name} {...shared} placeholder={f.placeholder} rows={f.rows} />;
          if (f.type === "select")
            return (
              <Select key={f.name} {...shared} defaultValue="">
                <option value="" disabled>انتخاب کنید…</option>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            );
          return (
            <Input
              key={f.name}
              {...shared}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              min={f.min}
              max={f.max}
              inputMode={f.type === "tel" ? "tel" : f.type === "number" ? "numeric" : undefined}
              autoComplete={f.type === "tel" ? "tel" : f.type === "email" ? "email" : f.name === "name" ? "name" : undefined}
              dir={f.type === "tel" || f.type === "email" ? "ltr" : undefined}
              className={f.type === "tel" || f.type === "email" ? "text-end placeholder:text-end" : undefined}
            />
          );
        })}
      </div>

      {/* honeypot */}
      <div className="absolute -start-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          لطفاً این فیلد را خالی بگذارید
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-electric-600 px-8 text-base font-bold text-white shadow-[0_8px_28px_-8px_rgb(37_99_235/0.9)] ring-1 ring-inset ring-white/15 transition-all hover:-translate-y-0.5 hover:bg-electric-700 active:scale-[0.98] disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : <Send className="size-5 -scale-x-100" aria-hidden="true" />}
        {status === "sending" ? "در حال ارسال…" : submitLabel}
      </button>
      {note ? <p className="text-xs leading-6 text-slate-400">{note}</p> : null}

      <AnimatePresence>
        {status === "error" ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="flex gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm leading-7 text-red-100">
            <TriangleAlert className="mt-1 size-5 shrink-0 text-red-300" aria-hidden="true" />
            <p>
              ارسال فرم با خطا مواجه شد. لطفاً دوباره تلاش کنید یا مستقیم تماس بگیرید:{" "}
              <a href={`tel:${siteConfig.phone}`} className="font-bold underline underline-offset-4">{siteConfig.phoneDisplay}</a>{" "}
              یا{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-bold underline underline-offset-4">{siteConfig.email}</a>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
