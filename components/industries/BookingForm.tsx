"use client";

import { useState, type CSSProperties, type FormEvent, useId } from "react";
import { CircleCheck } from "lucide-react";
import type { Industry } from "@/lib/industries";

/** فرم رزرو نمونه (فقط نمایشی؛ هیچ دیتایی ارسال یا ذخیره نمی‌شود) */
export function BookingForm({ industry }: { industry: Industry }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const palette = industry.palette;
  const uid = useId();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    window.setTimeout(() => setState("done"), 800);
  }

  const fieldStyle: CSSProperties = { background: palette.bg, borderColor: palette.border, color: palette.text };

  if (state === "done") {
    return (
      <div role="status" className="rounded-2xl border p-8 text-center" style={{ background: palette.surface, borderColor: palette.border, color: palette.text }}>
        <CircleCheck className="mx-auto size-10" style={{ color: palette.primary }} aria-hidden="true" />
        <p className="mt-3 text-lg font-extrabold">درخواست نمونه ثبت شد</p>
        <p className="mt-2 text-sm leading-7" style={{ color: palette.muted }}>
          این یک فرم نمایشی است؛ در سایت واقعی، درخواست شما به تیم همان کسب‌وکار ارسال می‌شود.
        </p>
        <button type="button" onClick={() => setState("idle")} className="mt-5 h-11 rounded-xl px-5 text-sm font-extrabold transition-opacity hover:opacity-90" style={{ background: palette.primary, color: palette.onPrimary }}>
          ثبت درخواست دیگر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border p-6 sm:p-8" style={{ background: palette.surface, borderColor: palette.border }}>
      <div className="grid gap-4 sm:grid-cols-2">
        {industry.booking.fields.map((field, index) => {
          const isLong = field.includes("توضیح") || field.includes("پیام");
          const id = `${uid}-f${index}`;
          const wide = isLong || index === industry.booking.fields.length - 1;
          return (
            <div key={field} className={wide ? "sm:col-span-2" : ""}>
              <label htmlFor={id} className="block text-sm font-extrabold" style={{ color: palette.text }}>{field}</label>
              {isLong ? (
                <textarea id={id} name={`f${index}`} rows={3} className="mt-2 w-full rounded-xl border p-3 text-base outline-none transition-colors focus:border-current focus-visible:outline-2" style={fieldStyle} />
              ) : (
                <input id={id} name={`f${index}`} className="mt-2 h-11 w-full rounded-xl border px-3 text-base outline-none transition-colors focus:border-current focus-visible:outline-2" style={fieldStyle} />
              )}
            </div>
          );
        })}
      </div>
      <button type="submit" disabled={state === "sending"} className="mt-5 h-12 w-full rounded-xl text-sm font-extrabold transition-opacity hover:opacity-90 disabled:opacity-60" style={{ background: palette.primary, color: palette.onPrimary }}>
        {state === "sending" ? "در حال ارسال…" : industry.booking.submit}
      </button>
      <p className="mt-3 text-center text-xs" style={{ color: palette.muted }}>
        این فرم نمونه است و اطلاعاتی ارسال یا ذخیره نمی‌شود.
      </p>
    </form>
  );
}
