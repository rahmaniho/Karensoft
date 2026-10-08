import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/fx/CursorGlow";
import { SoundProvider } from "@/components/fx/SoundProvider";
import { CrispChat } from "@/components/shared/CrispChat";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationLd, websiteLd } from "@/lib/schema";
import { siteConfig } from "@/lib/siteConfig";

const vazirmatn = localFont({
  src: "../public/fonts/vazirmatn-var.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-vazirmatn",
});

/** فونت مونو برای قطعه‌کدها، آمار و اعداد (حس نرم‌افزاری) */
const jetbrainsMono = localFont({
  src: [
    { path: "../public/fonts/jetbrains-mono-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/jetbrains-mono-medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/jetbrains-mono-bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-jetbrains",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.name,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: `${siteConfig.url}${siteConfig.ogImage}`, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/icon/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[90] focus:rounded-xl focus:bg-electric-400 focus:px-5 focus:py-3 focus:font-bold focus:text-ink-950 focus:start-[calc(var(--ks-sidebar)+1rem)]"
        >
          پرش به محتوای اصلی
        </a>
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <SoundProvider>
          <AppShell>
            {children}
            <Footer />
          </AppShell>
          <CursorGlow />
          <CrispChat />
        </SoundProvider>
      </body>
    </html>
  );
}
