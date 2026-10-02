import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PROCESS_STEPS, SERVICES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { toPersianDigits } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

const DESC = "خدمات کارن سافت: طراحی و توسعه وب، نرم‌افزار اختصاصی، اتوماسیون هوشمند و خدمات چاپ، مهر و صحافی (کارن چاپ).";

export const metadata: Metadata = buildMetadata({ title: "خدمات", description: DESC, path: "/services/" });

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero eyebrow="خدمات" title="خدماتی که کسب‌وکار شما را جلو می‌برند" description="از وب‌سایت و نرم‌افزار اختصاصی تا اتوماسیون و چاپ؛ یک تیم، یک استاندارد." breadcrumbs={[{ name: "خدمات", path: "/services/" }]} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-label="فهرست خدمات">
        <Stagger className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <StaggerItem key={s.slug}>
              <Card interactive className="h-full p-8">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-electric-600/15 text-electric-300 ring-1 ring-inset ring-electric-400/25"><Icon name={s.icon} className="size-7" /></span>
                <h2 className="mt-5 text-2xl font-extrabold text-white">{s.title}</h2>
                <p className="mt-3 leading-8 text-slate-300">{s.desc}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-200"><Icon name="Check" className="size-4 shrink-0 text-electric-400" />{b}</li>
                  ))}
                </ul>
                {s.href ? (
                  <Link href={s.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-electric-300 transition-all hover:gap-3 hover:text-white">
                    اطلاعات بیشتر<ArrowLeft className="size-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="steps-title">
        <SectionHeading eyebrow="روش کار" title={<span id="steps-title">چگونه کار می‌کنیم</span>} />
        <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <StaggerItem as="li" key={s.title}>
              <div className="glass h-full rounded-2xl p-6">
                <span className="text-gradient-blue text-5xl font-black">{toPersianDigits(i + 1)}</span>
                <h3 className="mt-3 text-lg font-extrabold text-white">{s.title}</h3>
                <p className="mt-2 leading-8 text-slate-300">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <CTASection />
    </main>
  );
}
