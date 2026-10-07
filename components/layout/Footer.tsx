import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FOOTER_GROUPS, SOCIAL_LINKS } from "@/lib/constants";
import { siteConfig } from "@/lib/siteConfig";
import { toPersianDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";

export function Footer() {
  const year = toPersianDigits(new Date().getFullYear() - 621);
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-navy-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-electric-500/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Link href="/" aria-label="کارن سافت — صفحه اصلی" className="inline-flex items-center gap-3 rounded-xl">
              <Img src="/images/icon/ks-mark.png" alt="" width={44} height={44} className="size-11 rounded-lg" />
              <span className="flex flex-col leading-tight">
                <span className="text-xl font-black text-white">{siteConfig.name}</span>
                <span className="text-xs font-semibold text-electric-300" dir="ltr">Karen Soft</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm leading-8 text-slate-300">
              شریک فناوری کسب‌وکارهای ایرانی از سال {toPersianDigits(siteConfig.founded.jalali)}؛ نرم‌افزار حقوقی، نرم‌افزار رایگان مدیریت تاکسی تلفنی، چاپ و توسعه وب.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="شبکه‌های اجتماعی">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} کارن سافت`} className="inline-flex size-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-electric-400/50 hover:bg-electric-600/20 hover:text-white">
                    <Icon name={s.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_GROUPS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-sm font-extrabold text-white">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-slate-300 transition-colors hover:text-white">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="text-sm font-extrabold text-white">تماس با ما</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li>
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                    <Phone className="size-4 shrink-0 text-electric-300" aria-hidden="true" />
                    <span>{siteConfig.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                    <Mail className="size-4 shrink-0 text-electric-300" aria-hidden="true" />
                    <span dir="ltr">{siteConfig.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-1 size-4 shrink-0 text-electric-300" aria-hidden="true" />
                  <span>{siteConfig.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
          <p>© {year} کارن سافت — تمام حقوق محفوظ است.</p>
          <p>ساخته‌شده با ❤ در قزوین</p>
        </div>
      </div>
    </footer>
  );
}
