/**
 * Server-side validation for /api/send-email.
 *
 * WHY: the browser used to send `toEmail`, and the server trusted it. Anyone
 * could POST { toEmail: "anyone@anywhere.com" } to your endpoint and use your
 * mail account to spam people. This helper ignores `toEmail` completely and
 * looks the recipient up from lib/company.ts instead.
 *
 * Usage in app/api/send-email/route.ts:
 *
 *   const result = parseContactPayload(await req.json());
 *   if (!result.ok) {
 *     // bots get a fake "success" so they don't retry
 *     return result.reason === 'spam'
 *       ? NextResponse.json({ ok: true })
 *       : NextResponse.json({ error: 'Invalid request' }, { status: 400 });
 *   }
 *   const { name, email, phone, type, message, toEmail } = result.data;
 *   // ...send the mail to `toEmail` with your existing mailer
 */
import { COMPANY, INQUIRY_TYPES, findPerson, type InquiryType } from '@/lib/company';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  type: InquiryType;
  message: string;
  /** Person id, or "info" for the general inbox. */
  recipientId: string;
  /** Trusted address, resolved on the server. */
  toEmail: string;
  /** The product/service the visitor clicked "inquire" on, e.g. "KA2-tt Fertilizer". Empty if none. */
  product: string;
}

export type ParseResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; reason: 'invalid' | 'spam' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Single-line text: strip CR/LF so values can't inject mail headers. */
const oneLine = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\r\n]+/g, ' ').trim().slice(0, max) : '';

export function parseContactPayload(body: unknown): ParseResult {
  if (!body || typeof body !== 'object') return { ok: false, reason: 'invalid' };
  const b = body as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field.
  if (typeof b.website === 'string' && b.website.trim() !== '') {
    return { ok: false, reason: 'spam' };
  }

  const name = oneLine(b.name, 100);
  const email = oneLine(b.email, 200);
  const phone = oneLine(b.phone, 50);
  const product = oneLine(b.product, 150);
  const message = typeof b.message === 'string' ? b.message.trim().slice(0, 5000) : '';
  const type =
    typeof b.type === 'string' && (INQUIRY_TYPES as readonly string[]).includes(b.type)
      ? (b.type as InquiryType)
      : null;

  if (!name || !EMAIL_RE.test(email) || !message || !type || b.privacy !== true) {
    return { ok: false, reason: 'invalid' };
  }

  const person = findPerson(typeof b.recipient === 'string' ? b.recipient : null);

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      type,
      message,
      recipientId: person?.id ?? 'info',
      toEmail: person?.email ?? COMPANY.generalEmail,
      product,
    },
  };
}