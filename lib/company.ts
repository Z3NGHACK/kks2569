/**
 * Single source of truth for people and contact details.
 * Used by the About page, the Contact page, and the API route validation,
 * so a name/email is only ever edited in ONE place.
 */

export interface Person {
  /** Stable id used in URLs (?to=Sophan) and sent to the API as `recipient`. */
  id: string;
  name: string;
  /** i18n key for the job title. */
  roleKey: string;
  email: string;
  phones: string[];
}

export const PEOPLE: Person[] = [
  {
    id: 'Sophan',
    name: 'SOK SOPHANN',
    roleKey: 'ABOUT.INFO.PRESIDENT',
    email: 's.sophann@kks2569.com',
    phones: ['+855 85 998 299', '+855 90 995 6999'],
  },
  {
    id: 'Sokhan',
    name: 'KEAN SOKKHAN',
    roleKey: 'ABOUT.INFO.VICE_PRESIDENT',
    email: 'k.sokkhan@kks2569.com',
    phones: ['+81 90 8521 5588'],
  },
  {
    id: 'Sugimoto',
    name: 'HARUHISA SUGIMOTO',
    roleKey: 'ABOUT.INFO.VICE_PRESIDENT',
    email: 'h.sugimoto@kks2569.com',
    phones: ['+81 90 6660 9093'],
  },
];

export const COMPANY: {
  generalEmail: string;
  website: string;
  social: { instagram: string; line: string };
} = {
  generalEmail: 'info@kks2569.com',
  website: 'https://www.kks2569.com',
  /**
   * Paste your real profile links here (e.g. 'https://instagram.com/yourpage').
   * Leave a value empty and that icon is hidden everywhere, so there are no dead "#" links.
   */
  social: { instagram: '', line: '' },
};

/** Old links used "Sugumoto" (typo). Keep them working. */
const ID_ALIASES: Record<string, string> = { sugumoto: 'sugimoto' };

/** Case-insensitive lookup. Returns undefined for unknown ids (=> general inbox). */
export function findPerson(raw?: string | null): Person | undefined {
  if (!raw) return undefined;
  const key = raw.trim().toLowerCase();
  const id = ID_ALIASES[key] ?? key;
  return PEOPLE.find((p) => p.id.toLowerCase() === id);
}

export const INQUIRY_TYPES = ['buying', 'recycle', 'quote', 'other'] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export function isInquiryType(value: string | null | undefined): value is InquiryType {
  return !!value && (INQUIRY_TYPES as readonly string[]).includes(value);
}

/** "+855 85 998 299" -> "tel:+855859982999" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/** Pull the first phone-number-looking thing out of free text. */
export function extractPhone(text: string): string | null {
  const match = text.match(/\+?\d[\d\s\-()]{6,}\d/);
  return match ? match[0].trim() : null;
}

/** "SOK SOPHANN" -> "SS" */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}