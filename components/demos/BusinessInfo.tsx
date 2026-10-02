import { Clock, Instagram, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/shared/Reveal";

interface BusinessInfoProps {
  title: string;
  lead: string;
  address: string;
  phone: string;
  tel: string;
  hours: string;
  instagram: string;
  facts: string[];
}

/** اطلاعات واقعی کسب‌وکار مشتری در صفحهٔ نمونه‌کار */
export function BusinessInfo({ title, lead, address, phone, tel, hours, instagram, facts }: BusinessInfoProps) {
  const rows = [
    { Icon: MapPin, label: "نشانی", value: address },
    { Icon: Phone, label: "تلفن", value: phone, href: `tel:${tel}` },
    { Icon: Clock, label: "ساعات کاری", value: hours },
    { Icon: Instagram, label: "اینستاگرام", value: `@${instagram}`, href: `https://www.instagram.com/${instagram}`, ltr: true },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="biz-title">
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <h2 id="biz-title" className="text-3xl font-black text-white">{title}</h2>
          <p className="mt-4 text-lg leading-9 text-slate-300">{lead}</p>
          <ul className="mt-6 space-y-3">
            {facts.map((f) => (
              <li key={f} className="flex items-start gap-3 text-slate-200"><span className="mt-3 size-1.5 shrink-0 rounded-full bg-cyan-glow" aria-hidden="true" />{f}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="p-6 sm:p-8">
            <h3 className="mb-5 text-lg font-extrabold text-white">اطلاعات کسب‌وکار</h3>
            <ul className="space-y-5">
              {rows.map(({ Icon, label, value, href, ltr }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-electric-600/15 text-electric-300"><Icon className="size-5" aria-hidden="true" /></span>
                  <div>
                    <p className="text-xs text-slate-400">{label}</p>
                    {href ? (
                      <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} dir={ltr ? "ltr" : undefined} className="font-bold text-white hover:text-electric-300">{value}</a>
                    ) : (
                      <p className="font-bold text-white">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
