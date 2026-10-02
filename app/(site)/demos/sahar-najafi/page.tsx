import type { Metadata } from "next";
import { getDemo } from "@/lib/demos";
import { buildMetadata } from "@/lib/seo";
import { localBusinessLd } from "@/lib/schema";
import { BusinessInfo } from "@/components/demos/BusinessInfo";
import { DemoShowcase } from "@/components/demos/DemoShowcase";
import { JsonLd } from "@/components/ui/JsonLd";

const demo = getDemo("sahar-najafi");

export const metadata: Metadata = buildMetadata({
  title: "دموی سایت سالن و آکادمی ناخن سحر نجفی",
  description: "نمونه‌کار طراحی سایت برای سالن و آکادمی تخصصی ناخن سحر نجفی در قزوین: مانیکور روسی، پلی‌ژل، لمینت، پکیج عروس و دوره‌های آموزشی.",
  path: "/demos/sahar-najafi/",
  image: "/images/saharnajafi.webp",
});

export default function SaharNajafiPage() {
  if (!demo) return null;
  return (
    <>
      <JsonLd data={localBusinessLd({ name: "سالن و آکادمی ناخن سحر نجفی", description: demo.description, path: "/demos/sahar-najafi/", phone: "+989352421366", address: "قزوین، چهارراه محمد رسول‌الله، ساختمان محمد مهر، طبقه دوم", city: "قزوین", hours: "Sa-Th 09:00-20:00" })} />
      <DemoShowcase demo={demo}>
        <BusinessInfo
          title="دربارهٔ این پروژه"
          lead="وب‌سایت معرفی سالن و آکادمی ناخن سحر نجفی در قزوین؛ با تمرکز بر خدمات تخصصی، اعتمادسازی با تجربه و مدارک مربی، و ثبت سریع نوبت از طریق تماس یا واتس‌اپ."
          address="قزوین، چهارراه محمد رسول‌الله، ساختمان محمد مهر، طبقه دوم"
          phone="۰۹۳۵۲۴۲۱۳۶۶"
          tel="+989352421366"
          hours="شنبه تا پنجشنبه، ۹ تا ۲۰"
          instagram="saharnajafi.nailacademy"
          facts={[
            "خدمات: مانیکور روسی VIP، ژل و پلی‌ژل، لمینت ناخن، پکیج عروس، طراحی ناخن و پدیکور پزشکی",
            "مربی با تحصیلات کارشناسی ارشد شیمی و دوره‌های آموزشی در روسیه، ایتالیا و ترکیه",
            "بیش از ۱۰ سال سابقه، ۵۰۰+ مشتری و ۲۰۰+ هنرجو",
            "ثبت نوبت از طریق تماس تلفنی و واتس‌اپ",
          ]}
        />
      </DemoShowcase>
    </>
  );
}
