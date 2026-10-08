import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FOOTER_GROUPS, NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";
import { CURRENT_JALALI_YEAR, siteConfig } from "@/lib/siteConfig";
import { toPersianDigits } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/8 bg-ink-950/70 backdrop-blur-xl">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-electric-400/70 to-transparent"
      />
      <span aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2.65fr]">
          {/* هویت */}
          <div>
            <Link href="/" aria-label="کارن سافت — صفحه اصلی" className="group inline-flex items-center gap-3 rounded-xl">
              <Img src="/images/icon/ks-mark.png" alt="" width={44} height={44} className="size-11 rounded-xl ring-1 ring-white/12 transition-transform duration-500 group-hover:rotate-[-6deg]" />
              <span className="flex flex-col leading-tight">
                <span className="text-xl font-black text-white">{siteConfig.name}</span>
                <span className="font-mono text-[0.62rem] tracking-[0.2em] text-electric-400">KAREN SOFT</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm leading-8 text-mist-400">
              شریک فناوری کسب‌وکارهای ایرانی؛ تأسیس {toPersianDigits(siteConfig.founded.jalali)} به مدیریت و بنیان‌گذاری{" "}
              <strong className="font-bold text-white">{siteConfig.founder}</strong>. نرم‌افزار حقوقی، نرم‌افزار رایگان مدیریت
              تاکسی تلفنی، چاپ و توسعهٔ وب.
            </p>

            {/* مدیر و بنیان‌گذار */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-3">
              <Img
                src={siteConfig.founderImage}
                alt={`${siteConfig.founder}، ${siteConfig.founderRole} کارن سافت`}
                width={923}
                height={739}
                className="size-14 rounded-xl object-cover ring-1 ring-white/12"
              />
              <div>
                <p className="text-sm font-extrabold text-white">{siteConfig.founder}</p>
                <p className="text-xs text-mist-400">{siteConfig.founderRole}</p>
                <a href={`tel:${siteConfig.phone}`} className="mt-0.5 inline-block font-mono text-[0.7rem] text-electric-300 transition-colors hover:text-white" dir="ltr">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="شبکه‌های اجتماعی">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} کارن سافت`}
                    className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mist-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-400/45 hover:bg-electric-400/10 hover:text-white"
                  >
                    <Icon name={social.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* پیوندها */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_GROUPS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-mono text-[0.66rem] tracking-[0.18em] text-electric-400">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-mist-400 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="font-mono text-[0.66rem] tracking-[0.18em] text-electric-400">تماس با ما</h2>
              <ul className="mt-5 space-y-3 text-sm text-mist-400">
                <li>
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                    <Phone className="size-4 shrink-0 text-electric-400" aria-hidden="true" />
                    <span className="font-mono" dir="ltr">{siteConfig.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                    <Mail className="size-4 shrink-0 text-electric-400" aria-hidden="true" />
                    <span className="font-mono" dir="ltr">{siteConfig.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-1 size-4 shrink-0 text-electric-400" aria-hidden="true" />
                  <span>{siteConfig.address}</span>
                </li>
              </ul>
              <ul className="mt-5 space-y-2 border-t border-white/8 pt-5 text-xs text-mist-500">
                {siteConfig.workingHours.map((slot) => (
                  <li key={slot.days} className="flex items-center justify-between gap-3">
                    <span>{slot.days}</span>
                    <span className="font-mono text-mist-400">{slot.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* نقشهٔ سریع سایت برای دسترس‌پذیری و سئو */}
        <nav aria-label="پیوندهای سریع" className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/8 pt-8 text-xs text-mist-500">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-electric-300">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-sm text-mist-500 sm:flex-row">
          <p>
            © {toPersianDigits(CURRENT_JALALI_YEAR)} {siteConfig.name} — تمام حقوق محفوظ است.
          </p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-mint-400 shadow-[0_0_10px_2px_rgb(52_211_153/0.7)]" />
            ساخته‌شده در {siteConfig.city} با Next.js و ❤
          </p>
        </div>
      </div>

      <p aria-hidden="true" className="pointer-events-none relative -mb-4 overflow-hidden text-center font-mono text-[13vw] font-black leading-none tracking-tighter text-white/[0.028] lg:text-[9rem]">
        KAREN&nbsp;SOFT
      </p>
    </footer>
  );
}
