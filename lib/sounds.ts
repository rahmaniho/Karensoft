/**
 * موتور افکت صوتی کارن سافت.
 *
 * صداها به‌جای فایل آماده، در زمان اجرا به‌صورت موج PCM ساخته (سنتز) و به Howler
 * داده می‌شوند. نتیجه: صفر بایت دارایی صوتی در مخزن، حجم صفحهٔ پایین و کنترل
 * کامل روی بلندی و طول هر افکت.
 */
import { Howl, Howler } from "howler";

export type SoundName = "click" | "hover" | "swoosh" | "success" | "error" | "toggle";

const SAMPLE_RATE = 44100;

function writeAscii(view: DataView, offset: number, text: string) {
  for (let i = 0; i < text.length; i += 1) view.setUint8(offset + i, text.charCodeAt(i));
}

/** بسته‌بندی نمونه‌های شناور در قالب WAV (16-bit mono) و تبدیل به data URL */
function encodeWav(samples: Float32Array): string {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, samples.length * 2, true);

  for (let i = 0; i < samples.length; i += 1) {
    const clamped = Math.max(-1, Math.min(1, samples[i] ?? 0));
    view.setInt16(44 + i * 2, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
  }

  const bytes = new Uint8Array(buffer);
  const parts: string[] = [];
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    parts.push(String.fromCharCode(...bytes.subarray(i, i + chunk)));
  }
  return `data:audio/wav;base64,${btoa(parts.join(""))}`;
}

/** صدای کلیک مکانیکی نرم: دو ضربهٔ بسیار کوتاه + بدنهٔ فرکانس پایین */
function synthClick(): Float32Array {
  const duration = 0.075;
  const out = new Float32Array(Math.floor(SAMPLE_RATE * duration));
  for (let i = 0; i < out.length; i += 1) {
    const t = i / SAMPLE_RATE;
    const body = Math.sin(2 * Math.PI * 1180 * t) * Math.exp(-t * 90);
    const tick = (Math.random() * 2 - 1) * Math.exp(-t * 900) * 0.5;
    const thump = Math.sin(2 * Math.PI * 210 * t) * Math.exp(-t * 55) * 0.5;
    out[i] = (body * 0.55 + tick + thump) * 0.5;
  }
  return out;
}

/** تیک بسیار ملایم و فرکانس‌بالا برای هاور */
function synthHover(): Float32Array {
  const duration = 0.035;
  const out = new Float32Array(Math.floor(SAMPLE_RATE * duration));
  for (let i = 0; i < out.length; i += 1) {
    const t = i / SAMPLE_RATE;
    const sweep = 3200 + t * 12000;
    out[i] = Math.sin(2 * Math.PI * sweep * t) * Math.exp(-t * 190) * 0.16;
  }
  return out;
}

/** سووش سایبری: نویز فیلترشده با اوج‌گیری و فروکش سریع */
function synthSwoosh(): Float32Array {
  const duration = 0.3;
  const out = new Float32Array(Math.floor(SAMPLE_RATE * duration));
  let low = 0;
  for (let i = 0; i < out.length; i += 1) {
    const t = i / SAMPLE_RATE;
    const p = t / duration;
    const noise = Math.random() * 2 - 1;
    low += (noise - low) * (0.02 + p * 0.34);
    const envelope = Math.sin(Math.PI * Math.min(1, p * 1.08)) ** 1.7;
    out[i] = low * envelope * 0.5;
  }
  return out;
}

/** زنگ موفقیت: دو نُت هم‌زمان با هارمونیک و دم کوتاه */
function synthSuccess(): Float32Array {
  const duration = 0.75;
  const out = new Float32Array(Math.floor(SAMPLE_RATE * duration));
  const notes = [
    { freq: 880, gain: 0.3, decay: 8, delay: 0 },
    { freq: 1320, gain: 0.2, decay: 10, delay: 0.07 },
    { freq: 1760, gain: 0.12, decay: 14, delay: 0.14 },
  ];
  for (let i = 0; i < out.length; i += 1) {
    const t = i / SAMPLE_RATE;
    let value = 0;
    for (const note of notes) {
      const local = t - note.delay;
      if (local < 0) continue;
      const wave = Math.sin(2 * Math.PI * note.freq * local) + 0.3 * Math.sin(2 * Math.PI * note.freq * 2 * local);
      value += wave * Math.exp(-local * note.decay) * note.gain;
    }
    out[i] = value * 0.55;
  }
  return out;
}

/** بوق کوتاه و بم برای خطای اعتبارسنجی */
function synthError(): Float32Array {
  const duration = 0.24;
  const out = new Float32Array(Math.floor(SAMPLE_RATE * duration));
  for (let i = 0; i < out.length; i += 1) {
    const t = i / SAMPLE_RATE;
    const freq = 220 - t * 120;
    const envelope = Math.min(1, t * 90) * Math.exp(-t * 13);
    out[i] = (Math.sin(2 * Math.PI * freq * t) * 0.6 + Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.18) * envelope * 0.4;
  }
  return out;
}

/** پالس کوتاه برای کلیدهای حالت (صدا روشن/خاموش، باز/بسته شدن سایدبار) */
function synthToggle(): Float32Array {
  const duration = 0.13;
  const out = new Float32Array(Math.floor(SAMPLE_RATE * duration));
  for (let i = 0; i < out.length; i += 1) {
    const t = i / SAMPLE_RATE;
    const freq = 520 + t * 1500;
    out[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 34) * 0.32;
  }
  return out;
}

const SYNTHS: Record<SoundName, () => Float32Array> = {
  click: synthClick,
  hover: synthHover,
  swoosh: synthSwoosh,
  success: synthSuccess,
  error: synthError,
  toggle: synthToggle,
};

const VOLUMES: Record<SoundName, number> = {
  click: 0.38,
  hover: 0.2,
  swoosh: 0.3,
  success: 0.42,
  error: 0.34,
  toggle: 0.3,
};

let cache: Partial<Record<SoundName, Howl>> | null = null;

/** ساخت (یک‌بار) و بازگرداندن Howl هر افکت */
export function getSounds(): Partial<Record<SoundName, Howl>> {
  if (cache || typeof window === "undefined") return cache ?? {};
  cache = {};
  for (const name of Object.keys(SYNTHS) as SoundName[]) {
    try {
      cache[name] = new Howl({
        src: [encodeWav(SYNTHS[name]())],
        volume: VOLUMES[name],
        rate: name === "hover" ? 1.05 : 1,
        pool: name === "hover" ? 2 : 4,
      });
    } catch {
      // اگر ساخت صدا ممکن نبود، همان افکت بی‌صدا می‌ماند.
    }
  }
  return cache;
}

/**
 * آزادسازی Audio Context — فقط باید پس از اولین تعامل کاربر صدا زده شود
 * (سیاست‌های Autoplay مرورگرها).
 */
export function unlockAudio(): boolean {
  if (typeof window === "undefined") return false;
  try {
    getSounds();
    const ctx = Howler.ctx as AudioContext | null | undefined;
    if (ctx?.state === "suspended") void ctx.resume();
    return ctx?.state === "running";
  } catch {
    return false;
  }
}

export function playSound(name: SoundName, volume?: number): void {
  if (typeof window === "undefined") return;
  const sound = getSounds()[name];
  if (!sound) return;
  try {
    sound.volume(volume ?? VOLUMES[name]);
    sound.play();
  } catch {
    /* بی‌صدا نادیده می‌گیریم؛ صدا هرگز نباید جریان کاربری را بشکند */
  }
}
