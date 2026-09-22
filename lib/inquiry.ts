import type { InquiryType } from './company';

/**
 * Every "Buy this", "Get a quote", "Request a sample" button across the site
 * should build its /contact link with this helper, so the contact form
 * always knows *what* the visitor is asking about — not just that they
 * clicked a generic "Contact us" link.
 *
 *   <Link href={inquiryHref({ product: 'KA2-tt Fertilizer', type: 'quote' })}>
 *     Request a quote
 *   </Link>
 *
 * On /contact, ContactForm reads the `product` (and `type`) query params,
 * shows a small "Asking about: KA2-tt Fertilizer" banner, and pre-fills the
 * message so the visitor only has to add their name, phone/email and any
 * extra details.
 */
export interface InquiryRef {
  /** Shown in the contact banner, folded into the pre-filled message, and sent to the API/email. */
  product: string;
  /** Pre-selects the inquiry type dropdown. */
  type?: InquiryType;
}

export function inquiryHref({ product, type }: InquiryRef): string {
  const params = new URLSearchParams({ product });
  if (type) params.set('type', type);
  return `/contact?${params.toString()}`;
}