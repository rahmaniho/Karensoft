"use client";

import { useState } from "react";
import { Headset, Loader2, MessageCircle, Send } from "lucide-react";
import { isCrispConfigured, siteConfig } from "@/lib/siteConfig";

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

type ChatState = "idle" | "loading" | "error";
let crispLoadPromise: Promise<void> | undefined;

function openCrispChat(): Promise<void> {
  if (typeof window === "undefined" || !isCrispConfigured) {
    return Promise.reject(new Error("Crisp is not configured"));
  }

  window.$crisp = window.$crisp ?? [];
  window.CRISP_WEBSITE_ID = siteConfig.crispWebsiteId;

  if (!crispLoadPromise) {
    crispLoadPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.id = "karen-crisp-chat-script";
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      const timeout = window.setTimeout(() => {
        crispLoadPromise = undefined;
        script.remove();
        reject(new Error("Crisp chat timed out"));
      }, 15_000);
      script.onload = () => {
        window.clearTimeout(timeout);
        resolve();
      };
      script.onerror = () => {
        window.clearTimeout(timeout);
        crispLoadPromise = undefined;
        script.remove();
        reject(new Error("Unable to load Crisp chat"));
      };
      document.head.appendChild(script);
    });
  }

  return crispLoadPromise.then(() => {
    window.$crisp?.push(["do", "chat:open"]);
  });
}

/** چت Crisp استخراج‌شده از نسخهٔ برنامهٔ تاکسی؛ اسکریپت فقط با انتخاب کاربر دریافت می‌شود. */
export function CrispChat() {
  const [state, setState] = useState<ChatState>("idle");

  function handleOpenChat() {
    if (state === "loading") return;
    setState("loading");
    void openCrispChat()
      .then(() => setState("idle"))
      .catch(() => setState("error"));
  }

  return (
    <>
      {state === "error" ? (
        <aside
          role="alert"
          className="fixed bottom-[5.5rem] left-5 z-40 max-w-[min(22rem,calc(100vw-2.5rem))] rounded-2xl border border-white/15 bg-navy-900 p-4 text-sm leading-7 text-slate-200 shadow-2xl"
        >
          <p className="font-bold text-white">گفتگوی آنلاین موقتاً در دسترس نیست.</p>
          <a
            href={siteConfig.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 font-bold text-electric-300 underline underline-offset-4"
          >
            پیام در تلگرام
            <Send className="size-4" aria-hidden="true" />
          </a>
        </aside>
      ) : null}
      <button
        type="button"
        onClick={handleOpenChat}
        aria-label={state === "loading" ? "در حال اتصال به گفتگوی آنلاین" : "گفتگوی آنلاین با پشتیبانی کارن سافت"}
        aria-busy={state === "loading"}
        className="group fixed bottom-5 left-5 z-40 inline-flex h-14 items-center gap-3 rounded-full border border-white/15 bg-electric-600 px-5 text-sm font-extrabold text-white shadow-[0_16px_42px_-16px_rgb(37_99_235/0.95)] transition-all hover:-translate-y-1 hover:bg-electric-500 focus-visible:outline-offset-4"
      >
        <span className="grid size-9 place-items-center rounded-full bg-white/15">
          {state === "loading" ? (
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
          ) : state === "error" ? (
            <MessageCircle className="size-5" aria-hidden="true" />
          ) : (
            <Headset className="size-5" aria-hidden="true" />
          )}
        </span>
        <span>{state === "loading" ? "در حال اتصال…" : "گفتگوی آنلاین"}</span>
      </button>
    </>
  );
}
