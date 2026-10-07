/**
 * نمونهٔ امن و مستقل برای کپی به app/api/contact/route.ts در یک میزبانی Next.js سمت‌سرور.
 * این فایل عمداً بیرون از app/ قرار دارد؛ پروژهٔ اصلی با output: export ساخته می‌شود و API route ندارد.
 */

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const hits = new Map<string, { count: number; resetAt: number }>();
const MAX_BODY_BYTES = 20_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDigits(value: string): string {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  return value
    .replace(/[۰-۹]/g, (digit) => String(persian.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabic.indexOf(digit)));
}

function normalizePhone(value: string): string {
  let digits = normalizeDigits(value).replace(/\D/g, "");
  if (digits.startsWith("0098")) digits = `0${digits.slice(4)}`;
  else if (digits.startsWith("98")) digits = `0${digits.slice(2)}`;
  else if (digits.length === 10 && digits.startsWith("9")) digits = `0${digits}`;
  return digits;
}

function parseContactPayload(value: unknown): ContactPayload | null {
  if (!isRecord(value)) return null;

  const name = asString(value["name"]);
  const phone = normalizePhone(asString(value["phone"]));
  const email = asString(value["email"]);
  const subject = asString(value["subject"]);
  const message = asString(value["message"]);

  if (name.length < 3 || name.length > 120) return null;
  if (!/^0\d{10}$/.test(phone)) return null;
  if (email.length > 254 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))) return null;
  if (subject.length < 2 || subject.length > 120) return null;
  if (message.length < 10 || message.length > 10_000) return null;

  return { name, phone, email, subject, message };
}

function corsHeaders(request: Request): Headers {
  const headers = new Headers({
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  });
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env["CONTACT_ALLOWED_ORIGIN"]?.replace(/\/$/, "");
  if (origin && allowedOrigin && origin === allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  return headers;
}

function json(request: Request, body: Record<string, unknown>, status = 200): Response {
  const headers = corsHeaders(request);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(body), { status, headers });
}

function originIsAllowed(request: Request): boolean {
  const allowedOrigin = process.env["CONTACT_ALLOWED_ORIGIN"]?.replace(/\/$/, "");
  const origin = request.headers.get("origin");
  return Boolean(allowedOrigin && (!origin || origin === allowedOrigin));
}

function isRateLimited(key: string, now = Date.now()): boolean {
  for (const [id, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(id);
  }

  const existing = hits.get(key);
  if (existing) {
    existing.count += 1;
    return existing.count > MAX_REQUESTS_PER_WINDOW;
  }
  if (hits.size >= 5_000) return true;
  hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
  return false;
}

class BodyTooLargeError extends Error {}

async function readBodyLimited(request: Request): Promise<string> {
  if (!request.body) throw new Error("empty_body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    if (!value) continue;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new BodyTooLargeError("request_too_large");
    }
    chunks.push(value);
  }

  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

export function OPTIONS(request: Request): Response {
  if (!originIsAllowed(request)) return json(request, { ok: false, error: "origin_not_allowed" }, 403);
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request): Promise<Response> {
  if (!originIsAllowed(request)) return json(request, { ok: false, error: "origin_not_allowed" }, 403);

  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["CONTACT_FROM"];
  const to = process.env["CONTACT_TO"];
  if (!apiKey || !from || !to) return json(request, { ok: false, error: "email_service_not_configured" }, 503);

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return json(request, { ok: false, error: "request_too_large" }, 413);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json(request, { ok: false, error: "unsupported_media_type" }, 415);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")
    ?? "anonymous";
  if (isRateLimited(`contact:${ip}`)) {
    return json(request, { ok: false, error: "rate_limited" }, 429);
  }

  let body: unknown;
  try {
    body = JSON.parse(await readBodyLimited(request)) as unknown;
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return json(request, { ok: false, error: "request_too_large" }, 413);
    }
    return json(request, { ok: false, error: "invalid_json" }, 400);
  }

  const payload = parseContactPayload(body);
  if (!payload) return json(request, { ok: false, error: "invalid_fields" }, 422);

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email || undefined,
        subject: `پیام جدید از سایت — ${payload.subject}`,
        text: [
          `نام: ${payload.name}`,
          `تلفن: ${payload.phone}`,
          `ایمیل: ${payload.email || "-"}`,
          "",
          payload.message,
        ].join("\n"),
      }),
    });

    if (!providerResponse.ok) {
      return json(request, { ok: false, error: "email_provider_rejected_request" }, 502);
    }
  } catch {
    return json(request, { ok: false, error: "email_delivery_failed" }, 502);
  }

  return json(request, { ok: true });
}
