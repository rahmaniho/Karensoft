import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Car, Gavel, Home, Layers, Mail, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد",
  robots: { index: false, follow: true },
};

const SHORTCUTS = [
  { href: "/products/", label: "محصولات", Icon: Layers },
  { href: "/portfolio/", label: "نمونه‌کارها", Icon: Home },
  { href: "/products/law-office/", label: "نرم‌افزار دفتر وکالت", Icon: Gavel },
  { href: "/services/printing/", label: "کارن چاپ", Icon: Printer },
  { href: "/products/taxi-software/", label: "نرم‌افزار تاکسی", Icon: Car },
  { href: "/blog/", label: "وبلاگ", Icon: BookOpen },
  { href: "/contact/", label: "تماس با ما", Icon: Mail },
];

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-[80vh] items-center overflow-hidden px-4 pb-16 pt-36">
      <div className="bg-aurora absolute inset-0 -z-10" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-gradient-blue text-[7rem] font-black leading-none sm:text-[10rem]" aria-hidden="true">۴۰۴</p>
        <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-9 text-mist-400">
          ممکن است نشانی را اشتباه وارد کرده باشید یا صفحه جابه‌جا شده باشد. از میان میان‌برهای زیر ادامه دهید.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" size="lg">بازگشت به صفحه اصلی<ArrowLeft className="size-5" aria-hidden="true" /></Button>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SHORTCUTS.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link href={href} className="glass flex h-full flex-col items-center gap-2 rounded-2xl px-3 py-5 text-sm font-bold text-mist-100 transition-all hover:-translate-y-1 hover:border-electric-400/50 hover:text-white">
                <Icon className="size-6 text-electric-300" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
