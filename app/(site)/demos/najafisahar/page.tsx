import type { Metadata } from "next";
import { getDemo } from "@/lib/demos";
import { buildMetadata } from "@/lib/seo";
import { localBusinessLd } from "@/lib/schema";
import { BusinessInfo } from "@/components/demos/BusinessInfo";
import { DemoShowcase } from "@/components/demos/DemoShowcase";
import { JsonLd } from "@/components/ui/JsonLd";

const demo = getDemo("najafisahar");

export const metadata: Metadata = buildMetadata({
  title: "دموی لندینگ سالن زیبایی سحر نجفی",
  description: "نمونه‌کار لندینگ پیج سالن زیبایی سحر نجفی در قزوین: میکاپ عروس، رنگ و کراتین مو، مانیکور روسی، مژه، پاکسازی پوست و آکادمی آنلاین.",
  path: "/demos/najafisahar/",
  image: "/images/hero-sahar.webp",
});

export default function NajafiSaharPage() {
  if (!demo) return null;
  return (
    <>
      <JsonLd data={localBusinessLd({ name: "سالن زیبایی سحر نجفی", description: demo.description, path: "/demos/najafisahar/", phone: "+989352421366", address: "قزوین، چهارراه محمد رسول‌الله، ساختمان محمد مهر، طبقه دوم", city: "قزوین", hours: "Sa-Th 09:00-19:00" })} />
      <DemoShowcase demo={demo}>
        <BusinessInfo
          title="دربارهٔ این پروژه"
          lead="لندینگ تک‌صفحه‌ای سالن زیبایی سحر نجفی؛ طراحی‌شده برای تبدیل بازدیدکننده به مشتری: خدمات، نمونه‌کارها، نظر مشتریان، دوره‌های آنلاین آکادمی و دکمه‌های ثابت تماس و واتس‌اپ."
          address="قزوین، چهارراه محمد رسول‌الله، ساختمان محمد مهر، طبقه دوم"
          phone="۰۹۳۵۲۴۲۱۳۶۶"
          tel="+989352421366"
          hours="شنبه تا پنجشنبه، ۹ تا ۱۹"
          instagram="saharnajafi.nailacademy"
          facts={[
            "خدمات: پکیج عروس، رنگ و کراتین مو، مانیکور روسی، مژه، پاکسازی پوست و اسنیل تراپی",
            "دوره‌های آکادمی: جامع کاشت ناخن، مانیکور روسی و طراحی ناخن",
            "امتیاز مشتریان در سایت: ۴.۹ از ۵",
            "سئوی محلی و داده ساختاریافته برای کسب‌وکار محلی",
          ]}
        />
      </DemoShowcase>
    </>
  );
}
