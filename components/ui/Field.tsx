"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert } from "lucide-react";
import { useSoundFx } from "@/components/fx/SoundProvider";
import { cn } from "@/lib/utils";

interface BaseFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-err`;
  if (hint) return `${id}-hint`;
  return undefined;
}

/** بازخورد مشترک فیلدها: راهنما، خطای زنده و لرزش هنگام خطا */
function FieldFeedback({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  const { play } = useSoundFx();
  const announced = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (error && announced.current !== error) {
      announced.current = error;
      play("error");
    }
    if (!error) announced.current = undefined;
  }, [error, play]);

  return (
    <div className="min-h-[1.25rem]">
      <AnimatePresence mode="wait" initial={false}>
        {error ? (
          <motion.p
            key="error"
            id={`${id}-err`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-xs font-semibold text-red-300"
          >
            <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        ) : hint ? (
          <motion.p
            key="hint"
            id={`${id}-hint`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="text-xs text-mist-500"
          >
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * فیلدهای فرم با برچسب شناور (Floating Label)، اعتبارسنجی زنده و انیمیشن لرزش.
 */
export function Input({ id, label, error, hint, wrapperClassName, className, required, ...rest }: BaseFieldProps & Omit<ComponentPropsWithoutRef<"input">, "id">) {
  return (
    <div className={cn("space-y-1.5", wrapperClassName)}>
      <motion.div
        className="field-float"
        animate={error ? { x: [0, -7, 6, -4, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.42, ease: "easeInOut" }}
      >
        <input
          id={id}
          name={rest.name ?? id}
          required={required}
          placeholder={rest.placeholder ?? " "}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn("field-input", className)}
          {...rest}
        />
        <label htmlFor={id}>
          {label}
          {required ? <span className="ms-1 text-electric-400" aria-hidden="true">*</span> : null}
        </label>
      </motion.div>
      <FieldFeedback id={id} error={error} hint={hint} />
    </div>
  );
}

export function Textarea({ id, label, error, hint, wrapperClassName, className, required, ...rest }: BaseFieldProps & Omit<ComponentPropsWithoutRef<"textarea">, "id">) {
  return (
    <div className={cn("space-y-1.5", wrapperClassName)}>
      <motion.div
        className="field-float"
        animate={error ? { x: [0, -7, 6, -4, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.42, ease: "easeInOut" }}
      >
        <textarea
          id={id}
          name={rest.name ?? id}
          required={required}
          rows={rest.rows ?? 5}
          placeholder={rest.placeholder ?? " "}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn("field-input resize-y", className)}
          {...rest}
        />
        <label htmlFor={id}>
          {label}
          {required ? <span className="ms-1 text-electric-400" aria-hidden="true">*</span> : null}
        </label>
      </motion.div>
      <FieldFeedback id={id} error={error} hint={hint} />
    </div>
  );
}

export function Select({ id, label, error, hint, wrapperClassName, className, required, children, ...rest }: BaseFieldProps & Omit<ComponentPropsWithoutRef<"select">, "id">) {
  const [filled, setFilled] = useState(false);
  return (
    <div className={cn("space-y-1.5", wrapperClassName)}>
      <motion.div
        className="field-float"
        data-filled={filled ? "true" : "false"}
        animate={error ? { x: [0, -7, 6, -4, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.42, ease: "easeInOut" }}
      >
        <select
          id={id}
          name={rest.name ?? id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn("field-input", className)}
          onChange={(event) => {
            setFilled(Boolean(event.currentTarget.value));
            rest.onChange?.(event);
          }}
          {...rest}
        >
          {children}
        </select>
        <label htmlFor={id}>
          {label}
          {required ? <span className="ms-1 text-electric-400" aria-hidden="true">*</span> : null}
        </label>
      </motion.div>
      <FieldFeedback id={id} error={error} hint={hint} />
    </div>
  );
}

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

/** پوستهٔ سازگار با نسخهٔ پیشین (برچسب ثابت بالای فیلد) */
export function FieldShell({ id, label, required, error, hint, children, className }: FieldShellProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-bold text-mist-100">
        {label}
        {required ? <span className="ms-1 text-electric-400" aria-hidden="true">*</span> : null}
      </label>
      {children}
      <FieldFeedback id={id} error={error} hint={hint} />
    </div>
  );
}
