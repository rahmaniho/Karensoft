import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { collectionLd } from "@/lib/schema";
import { PortfolioExplorer } from "@/components/sections/PortfolioExplorer";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";

const DESC = "نمونه‌کارهای آنلاین کارن سافت: سامانه دستمزد آرمانی، کتاب قانون، کنترل کیفیت چاپ، اتوماسیون صنعتی، HSE و وب‌سایت‌های خانه وکلا و لیلا آبکه؛ همراه با لینک مشاهده نسخه زنده و مخزن کد.";

export const metadata: Metadata = buildMetadata({ title: "نمونه‌کارها", description: DESC, path: "/portfolio/" });

export default function PortfolioPage() {
  return (
    <main id="main">
      <JsonLd data={collectionLd({ name: "نمونه‌کارهای کارن سافت", description: DESC, path: "/portfolio/" })} />
      <PageHero eyebrow="نمونه‌کارها" title="پروژه‌هایی که می‌توانید خودتان امتحان کنید" description="وب‌سایت‌ها، ابزارهای نرم‌افزاری و داشبوردهایی از پروژه‌های کارن سافت؛ لینک نسخهٔ آنلاین و مخزن کد هرجا در دسترس باشد کنار هم آمده است." breadcrumbs={[{ name: "نمونه‌کارها", path: "/portfolio/" }]} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p role="note" className="mb-8 rounded-2xl border border-amber-300/20 bg-amber-400/5 px-5 py-4 text-sm leading-7 text-amber-100/90">
          بعضی پیوندها نسخهٔ دمو یا پیش‌نمایش هستند. لطفاً برای آزمایش، اطلاعات واقعی موکلان، کارکنان یا کسب‌وکار خود را در سامانه‌های نمایشی وارد نکنید.
        </p>
        <h2 className="sr-only">فهرست نمونه‌کارها</h2>
        <PortfolioExplorer />
      </section>
      <CTASection title="نوبت سایت شماست" description="پروژهٔ بعدی می‌تواند کسب‌وکار شما باشد. نیازتان را بگویید تا برآورد اولیه رایگان انجام شود." />
    </main>
  );
}
