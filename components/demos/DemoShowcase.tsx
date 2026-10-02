import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { Demo } from "@/lib/demos";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DemoViewer } from "@/components/demos/DemoViewer";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

interface DemoShowcaseProps {
  demo: Demo;
  /** بخش‌های اضافهٔ مخصوص هر دمو (بین پیش‌نمایش و فراخوان) */
  children?: ReactNode;
}

/** قالب مشترک صفحهٔ دمو: سربرگ + پیش‌نمایش زنده + ویژگی‌ها + فناوری‌ها */
export function DemoShowcase({ demo, children }: DemoShowcaseProps) {
  return (
    <main id="main">
      <PageHero
        eyebrow={demo.subtitle}
        title={demo.title}
        description={demo.description}
        breadcrumbs={[{ name: "دموی زنده", path: "/demos/" }, { name: demo.title, path: demo.href }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={demo.liveUrl} external size="lg">مشاهده دموی زنده</Button>
          <Button href="/contact/" variant="secondary" size="lg">سفارش پروژه مشابه</Button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="preview-title">
        <h2 id="preview-title" className="sr-only">پیش‌نمایش زنده</h2>
        <Reveal>
          <DemoViewer src={demo.liveUrl} title={demo.title} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="highlights-title">
        <SectionHeading eyebrow="ویژگی‌ها" title={<span id="highlights-title">آنچه در این پروژه می‌بینید</span>} />
        <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {demo.highlights.map((h) => (
            <StaggerItem as="li" key={h}>
              <div className="glass flex h-full items-center gap-3 rounded-2xl p-5">
                <Check className="size-5 shrink-0 text-electric-300" aria-hidden="true" />
                <span className="font-bold text-white">{h}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="فناوری‌ها">
          {demo.tech.map((t) => <li key={t}><Badge tone="slate">{t}</Badge></li>)}
        </ul>
      </section>

      {children}
      <CTASection />
    </main>
  );
}
