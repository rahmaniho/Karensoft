"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "com" | "key" | "str" | "fn" | "num" | "punc" | "plain";

interface Segment {
  t: string;
  c?: Tone;
}

interface TerminalScript {
  file: string;
  caption: string;
  lines: Segment[][];
  result: string;
}

const SCRIPTS: TerminalScript[] = [
  {
    file: "karen-soft.ts",
    caption: "ساخت پروفایل پروژهٔ مشتری",
    lines: [
      [
        { t: "// Karen Soft — project bootstrap", c: "com" },
      ],
      [
        { t: "import", c: "key" },
        { t: " { createProject } ", c: "plain" },
        { t: "from", c: "key" },
        { t: " ", c: "plain" },
        { t: '"@karen/core"', c: "str" },
        { t: ";", c: "punc" },
      ],
      [],
      [
        { t: "const", c: "key" },
        { t: " project ", c: "plain" },
        { t: "=", c: "punc" },
        { t: " ", c: "plain" },
        { t: "await", c: "key" },
        { t: " ", c: "plain" },
        { t: "createProject", c: "fn" },
        { t: "({", c: "punc" },
      ],
      [
        { t: "  client", c: "plain" },
        { t: ": ", c: "punc" },
        { t: '"کسب‌وکار شما"', c: "str" },
        { t: ",", c: "punc" },
      ],
      [
        { t: "  stack", c: "plain" },
        { t: ": ", c: "punc" },
        { t: "[", c: "punc" },
        { t: '"Next.js"', c: "str" },
        { t: ", ", c: "punc" },
        { t: '"Tailwind"', c: "str" },
        { t: "]", c: "punc" },
        { t: ",", c: "punc" },
      ],
      [
        { t: "  support", c: "plain" },
        { t: ": ", c: "punc" },
        { t: "true", c: "num" },
        { t: ",", c: "punc" },
      ],
      [
        { t: "});", c: "punc" },
      ],
    ],
    result: "پروژه آمادهٔ تحویل است ✓",
  },
  {
    file: "taxi-fare.ts",
    caption: "محاسبهٔ کرایهٔ سفر — نرم‌افزار رایگان تاکسی تلفنی",
    lines: [
      [
        { t: "// free taxi dispatch — fare engine", c: "com" },
      ],
      [
        { t: "export", c: "key" },
        { t: " ", c: "plain" },
        { t: "function", c: "key" },
        { t: " ", c: "plain" },
        { t: "calculateFare", c: "fn" },
        { t: "(km: ", c: "punc" },
        { t: "number", c: "key" },
        { t: ") {", c: "punc" },
      ],
      [
        { t: "  const", c: "key" },
        { t: " base ", c: "plain" },
        { t: "=", c: "punc" },
        { t: " ", c: "plain" },
        { t: "12000", c: "num" },
        { t: ";", c: "punc" },
      ],
      [
        { t: "  const", c: "key" },
        { t: " perKm ", c: "plain" },
        { t: "=", c: "punc" },
        { t: " ", c: "plain" },
        { t: "4500", c: "num" },
        { t: ";", c: "punc" },
      ],
      [
        { t: "  return", c: "key" },
        { t: " ", c: "plain" },
        { t: "Math", c: "fn" },
        { t: ".", c: "punc" },
        { t: "round", c: "fn" },
        { t: "(base ", c: "punc" },
        { t: "+", c: "plain" },
        { t: " km ", c: "plain" },
        { t: "*", c: "punc" },
        { t: " perKm);", c: "plain" },
      ],
      [
        { t: "}", c: "punc" },
      ],
    ],
    result: "کرایهٔ سفر ۱۲ کیلومتری: ۶۶٬۰۰۰ تومان",
  },
  {
    file: "deploy.sh",
    caption: "استقرار وب‌سایت مشتری",
    lines: [
      [
        { t: "#!/usr/bin/env bash", c: "com" },
      ],
      [
        { t: "$ ", c: "fn" },
        { t: "npm run build", c: "plain" },
      ],
      [
        { t: "✓ compiled successfully ", c: "str" },
        { t: "in 8.4s", c: "num" },
      ],
      [
        { t: "$ ", c: "fn" },
        { t: "karen deploy --client ", c: "plain" },
        { t: '"qazvin-tasvir"', c: "str" },
      ],
      [
        { t: "→ uploading static assets …", c: "punc" },
      ],
      [
        { t: "→ lighthouse: ", c: "punc" },
        { t: "100 / 100 / 100 / 100", c: "num" },
      ],
    ],
    result: "سایت روی دامنهٔ مشتری منتشر شد ✓",
  },
];

/** انتخاب امن اسکریپت (با noUncheckedIndexedAccess) */
function scriptAt(index: number): TerminalScript {
  return SCRIPTS[index] ?? SCRIPTS[0]!;
}

const TONE_CLASS: Record<Tone, string> = {
  com: "term-com",
  key: "term-key",
  str: "term-str",
  fn: "term-fn",
  num: "term-num",
  punc: "term-punc",
  plain: "text-mist-100/85",
};

interface MockTerminalProps {
  className?: string;
}

/** ترمینال شبیه‌سازی‌شدهٔ Hero که کدهای واقعی محصولات کارن سافت را تایپ می‌کند */
export function MockTerminal({ className }: MockTerminalProps) {
  const reduce = useReducedMotion();
  const [scriptIndex, setScriptIndex] = useState(0);
  const [charCount, setCharCount] = useState(reduce ? Number.MAX_SAFE_INTEGER : 0);
  const [showResult, setShowResult] = useState(reduce);
  const timer = useRef(0);

  const script = scriptAt(scriptIndex);
  const total = useMemo(
    () => script.lines.reduce((sum, line) => sum + line.reduce((acc, seg) => acc + seg.t.length, 0), 0),
    [script],
  );

  useEffect(() => {
    if (reduce) {
      setCharCount(Number.MAX_SAFE_INTEGER);
      setShowResult(true);
      return;
    }
    setCharCount(0);
    setShowResult(false);
  }, [scriptIndex, reduce]);

  useEffect(() => {
    if (reduce) return;
    if (charCount >= total) {
      const hold = window.setTimeout(() => setShowResult(true), 260);
      const next = window.setTimeout(() => setScriptIndex((i) => (i + 1) % SCRIPTS.length), 4200);
      return () => {
        window.clearTimeout(hold);
        window.clearTimeout(next);
      };
    }
    timer.current = window.setTimeout(() => setCharCount((c) => c + 1), charCount > 0 ? 17 : 320);
    return () => window.clearTimeout(timer.current);
  }, [charCount, total, reduce]);

  // خطی که هم‌اکنون در حال تایپ است (برای قرار دادن مکان‌نما)
  const lineLengths = script.lines.map((line) => line.reduce((acc, seg) => acc + seg.t.length, 0));
  let running = 0;
  let activeLine = script.lines.length - 1;
  for (let i = 0; i < lineLengths.length; i += 1) {
    running += lineLengths[i] ?? 0;
    if (charCount < running) {
      activeLine = i;
      break;
    }
  }
  if (charCount >= total) activeLine = script.lines.length - 1;

  let remaining = charCount;

  return (
    <div
      className={cn(
        "glass-strong relative overflow-hidden rounded-2xl shadow-[0_40px_120px_-50px_rgb(0_240_255/0.45)]",
        className,
      )}
      dir="ltr"
    >
      {/* نوار عنوان ترمینال */}
      <div className="flex items-center gap-3 border-b border-white/8 bg-white/[0.03] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-amber-300/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
        </span>
        <span className="flex items-center gap-2 text-xs font-semibold text-mist-400">
          <TerminalSquare className="size-3.5 text-electric-400" aria-hidden="true" />
          <span className="font-mono">{script.file}</span>
        </span>
        <span className="ms-auto rounded-md bg-electric-400/10 px-2 py-0.5 font-mono text-[0.65rem] text-electric-300 ring-1 ring-inset ring-electric-400/25">
          karen-soft
        </span>
      </div>

      <div className="relative min-h-[19rem] bg-ink-950/70 px-4 py-4 sm:px-5" dir="rtl">
        {/* خط پویشگر */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-electric-400/[0.07] to-transparent" />

        <div className="space-y-0.5 overflow-hidden">
          {script.lines.map((line, lineIndex) => {
            const lineLength = line.reduce((acc, seg) => acc + seg.t.length, 0);
            const visible = Math.max(0, Math.min(lineLength, remaining));
            remaining -= lineLength;

            if (visible === 0 && !reduce && charCount < total) {
              return <div key={lineIndex} className="term-line min-h-[1.6em]" />;
            }

            let used = 0;
            return (
              <div key={lineIndex} className="term-line min-h-[1.6em]">
                {line.map((seg, segIndex) => {
                  const start = used;
                  used += seg.t.length;
                  const text = seg.t.slice(0, Math.max(0, Math.min(seg.t.length, visible - start)));
                  if (!text) return null;
                  return (
                    <span key={segIndex} className={TONE_CLASS[seg.c ?? "plain"]}>
                      {text}
                    </span>
                  );
                })}
                {lineIndex === activeLine ? <span className="term-caret ms-0.5" /> : null}
              </div>
            );
          })}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={showResult ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.4 }}
          className="mt-4 flex items-center gap-2 border-t border-white/8 pt-3 font-mono text-[0.72rem] text-mint-400"
        >
          <span className="size-1.5 rounded-full bg-mint-500 shadow-[0_0_10px_2px_rgb(16_185_129/0.6)]" aria-hidden="true" />
          {script.result}
        </motion.p>
      </div>

      <p className="border-t border-white/8 bg-white/[0.02] px-4 py-2.5 text-[0.72rem] font-semibold text-mist-400" dir="rtl">
        {script.caption}
      </p>
    </div>
  );
}
