import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function FieldShell({ id, label, required, error, hint, children, className }: FieldShellProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-bold text-slate-200">
        {label}
        {required ? <span className="ms-1 text-red-300" aria-hidden="true">*</span> : null}
      </label>
      {children}
      {hint && !error ? <p id={`${id}-hint`} className="text-xs text-slate-400">{hint}</p> : null}
      {error ? (
        <p id={`${id}-err`} role="alert" className="text-xs font-semibold text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

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

export function Input({ id, label, error, hint, wrapperClassName, className, required, ...rest }: BaseFieldProps & Omit<ComponentPropsWithoutRef<"input">, "id">) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
      <input id={id} name={rest.name ?? id} required={required} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} className={cn("field-input", className)} {...rest} />
    </FieldShell>
  );
}

export function Textarea({ id, label, error, hint, wrapperClassName, className, required, ...rest }: BaseFieldProps & Omit<ComponentPropsWithoutRef<"textarea">, "id">) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
      <textarea id={id} name={rest.name ?? id} required={required} rows={rest.rows ?? 5} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} className={cn("field-input resize-y", className)} {...rest} />
    </FieldShell>
  );
}

export function Select({ id, label, error, hint, wrapperClassName, className, required, children, ...rest }: BaseFieldProps & Omit<ComponentPropsWithoutRef<"select">, "id">) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={wrapperClassName}>
      <select id={id} name={rest.name ?? id} required={required} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} className={cn("field-input", className)} {...rest}>
        {children}
      </select>
    </FieldShell>
  );
}
