import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { collectionLd } from "@/lib/schema";
import { PORTFOLIO_CATEGORY_LABEL, PORTFOLIO_ITEMS } from "@/lib/portfolio";
import { toPersianDigits } from "@/lib/utils";
import { PortfolioExplorer } from "@/components/sections/PortfolioExplorer";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";

const DESC =
  "نمونه‌کارهای آنلاین کارن سافت: استودیو موسیقی آوا، لندینگ پیج ابوالفضل میرعمو، وب‌سایت شرکتی قزوین تصویر، بستنی سنتی زعفرونی، سامانه دستمزد آرمانی، کتاب قانون، کنترل کیفیت چاپ، اتوماسیون صنعتی، HSE و خانه وکلا؛ همراه با لینک نسخهٔ زنده و مخزن کد.";

export const metadata: Metadata = buildMetadata({ title: "نمونه‌کارها", description: DESC, path: "/portfolio/" });

export default function PortfolioPage() {
  const counts = (Object.keys(PORTFOLIO_CATEGORY_LABEL) as ("all" | keyof typeof PORTFOLIO_CATEGORY_LABEL)[])
    .filter((key) => key !== "all")
    .map((key) => ({
      label: PORTFOLIO_CATEGORY_LABEL[key],
      value: PORTFOLIO_ITEMS.filter((item) => item.category === key).length,
    }));

  return (
    <main id="main">
      <JsonLd data={collectionLd({ name: "نمونه‌کارهای کارن سافت", description: DESC, path: "/portfolio/" })} />
      <PageHero
        eyebrow="PORTFOLIO / نمونه‌کارها"
        title={
          <>
            پروژه‌هایی که می‌توانید <span className="text-gradient-animated">همین حالا</span> امتحان کنید
          </>
        }
        description="وب‌سایت‌ها، لندینگ‌پیج‌ها و نرم‌افزارهایی که کارن سافت ساخته و آنلاین‌اند. روی هر کارت بزنید تا جزئیات پروژه، نقش ما و لینک نسخهٔ زنده در یک مودال شیشه‌ای باز شود."
        breadcrumbs={[{ name: "نمونه‌کارها", path: "/portfolio/" }]}
      >
        <dl className="flex flex-wrap gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3">
            <dt className="font-mono text-[0.62rem] tracking-widest text-mist-500">کل پروژه‌ها</dt>
            <dd className="font-mono-tabular text-2xl font-black text-white">{toPersianDigits(PORTFOLIO_ITEMS.length)}</dd>
          </div>
          {counts.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-3">
              <dt className="font-mono text-[0.62rem] tracking-widest text-mist-500">{item.label}</dt>
              <dd className="font-mono-tabular text-2xl font-black text-electric-300">{toPersianDigits(item.value)}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p
          role="note"
          className="mb-8 rounded-2xl border border-amber-300/18 bg-amber-400/5 px-5 py-4 text-sm leading-7 text-amber-100/85"
        >
          بعضی پیوندها نسخهٔ دمو یا پیش‌نمایش‌اند. لطفاً برای آزمایش، اطلاعات واقعی موکلان، کارکنان یا کسب‌وکار خود را در
          سامانه‌های نمایشی وارد نکنید.
        </p>
        <h2 className="sr-only">فهرست نمونه‌کارها</h2>
        <PortfolioExplorer />
      </section>

      <CTASection
        title="نوبت سایت شماست"
        description="پروژهٔ بعدی می‌تواند کسب‌وکار شما باشد. نیازتان را بگویید تا برآورد اولیه رایگان انجام شود."
      />
    </main>
  );
}
