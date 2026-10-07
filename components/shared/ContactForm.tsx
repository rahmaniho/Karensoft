"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, ExternalLink, Loader2, Mail, Send, TriangleAlert } from "lucide-react";
import {
  CONTACT_API_ENDPOINT,
  FORMSPREE_ENDPOINT,
  isContactApiConfigured,
  isFormspreeConfigured,
  siteConfig,
} from "@/lib/siteConfig";
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

interface ContactFormProps {
  /** شناسهٔ یکتا برای idها */
  formId: string;
  fields: FormFieldConfig[];
  /** عنوان ایمیلی که در صندوق تماس دریافت می‌شود */
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

type Status = "idle" | "sending" | "success" | "fallback" | "error";

const FA_TO_EN: Record<string, string> = {
  "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};
const normalizeDigits = (value: string) => value.replace(/[۰-۹٠-٩]/g, (digit) => FA_TO_EN[digit] ?? digit);

function normalizeIranPhone(raw: string): string {
  let digits = normalizeDigits(raw).replace(/\D/g, "");
  if (digits.startsWith("0098")) digits = `0${digits.slice(4)}`;
  else if (digits.startsWith("98")) digits = `0${digits.slice(2)}`;
  else if (digits.length === 10 && digits.startsWith("9")) digits = `0${digits}`;
  return digits;
}

function validate(field: FormFieldConfig, raw: string): string | undefined {
  const value = raw.trim();
  if (field.required && !value) return "تکمیل این فیلد الزامی است.";
  if (!value) return undefined;
  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "ایمیل واردشده معتبر نیست.";
  if (field.type === "tel") {
    const digits = normalizeDigits(value).replace(/[\s-]/g, "");
    if (!/^(\+98|0098|98|0)?9\d{9}$/.test(digits) && !/^0\d{10}$/.test(digits)) {
      return "شماره تماس معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷).";
    }
  }
  if (field.type === "textarea" && field.required && value.length < 10) {
    return "پیام را کمی کامل‌تر بنویسید (حداقل ۱۰ نویسه).";
  }
  return undefined;
}

function buildMailto(data: FormData, fields: FormFieldConfig[], hidden: Record<string, string> | undefined, subject: string): string {
  const rows = fields.map((field) => `${field.label}: ${String(data.get(field.name) ?? "—").trim() || "—"}`);
  if (hidden) rows.push(...Object.entries(hidden).map(([key, value]) => `${key}: ${value}`));
  rows.push(`نشانی صفحه: ${window.location.href}`);
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rows.join("\n"))}`;
}

/**
 * فرم مشترک: Formspree، API سروریِ امن (مثلاً Resend) یا fallback شفاف mailto.
 * کلید سرویس ایمیل هرگز از مرورگر درخواست نمی‌شود و در این کامپوننت قرار نمی‌گیرد.
 */
export function ContactForm({
  formId,
  fields,
  subject,
  submitLabel = "ارسال",
  successTitle = "پیام شما ارسال شد",
  successMessage = "به‌زودی با شما تماس می‌گیریم.",
  hidden,
  note,
  className,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // طعمهٔ ربات‌ها: فرم را بی‌سروصدا نادیده می‌گیریم.
    if (String(data.get("_gotcha") ?? "")) return;

    const nextErrors: Record<string, string> = {};
    for (const field of fields) {
      const error = validate(field, String(data.get(field.name) ?? ""));
      if (error) nextErrors[field.name] = error;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    for (const field of fields) {
      if (field.type === "tel") data.set(field.name, normalizeDigits(String(data.get(field.name) ?? "")));
    }
    data.set("_subject", subject);
    if (hidden) for (const [key, value] of Object.entries(hidden)) data.set(key, value);
    data.set("_source", window.location.href);

    if (!isContactApiConfigured && !isFormspreeConfigured) {
      window.location.assign(buildMailto(data, fields, hidden, subject));
      setStatus("fallback");
      return;
    }

    setStatus("sending");
    try {
      let response: Response;
      if (isContactApiConfigured) {
        const getValue = (name: string) => String(data.get(name) ?? "").trim();
        const detailRows = fields
          .filter((field) => !["name", "phone", "email", "message"].includes(field.name))
          .map((field) => `${field.label}: ${getValue(field.name) || "—"}`);
        if (hidden) detailRows.push(...Object.entries(hidden).map(([key, value]) => `${key}: ${value}`));
        detailRows.push(`نشانی صفحه: ${window.location.href}`);

        const message = [getValue("message") || subject, detailRows.length ? `جزئیات درخواست:\n${detailRows.join("\n")}` : ""]
          .filter(Boolean)
          .join("\n\n");
        const topic = getValue("topic");
        const payload = {
          name: getValue("name") || "کاربر سایت",
          phone: normalizeIranPhone(getValue("phone")),
          email: getValue("email"),
          subject: topic ? `${subject} — ${topic}` : subject,
          message,
        };

        response = await fetch(CONTACT_API_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
      }

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "fallback") {
    const usedMailClient = status === "fallback";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className={cn("glass rounded-2xl p-8 text-center sm:p-10", className)}
      >
        {usedMailClient ? (
          <Mail className="mx-auto size-14 text-electric-300" aria-hidden="true" />
        ) : (
          <CircleCheck className="mx-auto size-14 text-emerald-400" aria-hidden="true" />
        )}
        <h3 className="mt-5 text-2xl font-extrabold text-white">
          {usedMailClient ? "پیام در برنامهٔ ایمیل آماده شد" : successTitle}
        </h3>
        <p className="mt-3 leading-8 text-slate-300">
          {usedMailClient
            ? "ارسال نهایی را در برنامهٔ ایمیل خود تأیید کنید. اگر برنامه باز نشد، از ایمیل مستقیم یا شماره تماس پایین صفحه استفاده کنید."
            : successMessage}
        </p>
        {usedMailClient ? (
          <a href={`mailto:${siteConfig.email}`} className="mt-4 inline-flex items-center gap-2 font-bold text-electric-300 underline underline-offset-4">
            {siteConfig.email}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        ) : null}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-white/10"
        >
          ارسال پیام جدید
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={cn("space-y-5", className)} aria-label={subject}>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${formId}-${field.name}`;
          const shared = {
            id,
            name: field.name,
            label: field.label,
            required: field.required,
            hint: field.hint,
            error: errors[field.name],
            wrapperClassName: field.full || field.type === "textarea" ? "sm:col-span-2" : undefined,
          };
          if (field.type === "textarea") {
            return <Textarea key={field.name} {...shared} placeholder={field.placeholder} rows={field.rows} maxLength={10000} />;
          }
          if (field.type === "select") {
            return (
              <Select key={field.name} {...shared} defaultValue="">
                <option value="" disabled>انتخاب کنید…</option>
                {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
              </Select>
            );
          }
          return (
            <Input
              key={field.name}
              {...shared}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              inputMode={field.type === "tel" ? "tel" : field.type === "number" ? "numeric" : undefined}
              autoComplete={field.type === "tel" ? "tel" : field.type === "email" ? "email" : field.name === "name" ? "name" : undefined}
              dir={field.type === "tel" || field.type === "email" ? "ltr" : undefined}
              className={field.type === "tel" || field.type === "email" ? "text-end placeholder:text-end" : undefined}
              maxLength={field.type === "email" ? 254 : field.name === "name" ? 120 : undefined}
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
      {!isContactApiConfigured && !isFormspreeConfigured ? (
        <p role="note" className="rounded-xl border border-amber-300/20 bg-amber-400/5 px-4 py-3 text-xs leading-6 text-amber-100/90">
          فرم آنلاین هنوز به سرویس ارسال متصل نشده است؛ با ارسال، متن پیام در برنامهٔ ایمیل شما آماده می‌شود و باید آن را تأیید کنید.
        </p>
      ) : null}

      <AnimatePresence>
        {status === "error" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm leading-7 text-red-100"
          >
            <TriangleAlert className="mt-1 size-5 shrink-0 text-red-300" aria-hidden="true" />
            <p>
              ارسال فرم با خطا مواجه شد. دوباره تلاش کنید یا مستقیم تماس بگیرید:{" "}
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
