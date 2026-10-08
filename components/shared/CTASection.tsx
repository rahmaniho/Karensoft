import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { siteConfig } from "@/lib/siteConfig";

interface CTASectionProps {
  title?: ReactNode;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CTASection({
  title = "پروژه بعدی‌تان را با ما شروع کنید",
  description = "مشاوره و برآورد اولیه رایگان است. نیازتان را بگویید تا بهترین مسیر را پیشنهاد دهیم.",
  primary = { label: "درخواست مشاوره", href: "/contact/" },
  secondary = { label: `تماس: ${siteConfig.phoneDisplay}`, href: `tel:${siteConfig.phone}` },
}: CTASectionProps) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal className="glass-strong relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-14 sm:py-20">
        <div className="bg-aurora absolute inset-0 -z-10 opacity-90" aria-hidden="true" />
        <h2 className="text-3xl font-black leading-[1.5] text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-mist-100">{description}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={primary.href} size="lg">{primary.label}</Button>
          <Button href={secondary.href} variant="secondary" size="lg">{secondary.label}</Button>
        </div>
      </Reveal>
    </section>
  );
}
