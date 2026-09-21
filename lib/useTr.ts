import { useTranslation } from '@/components/LanguageProvider';

/**
 * Small wrapper around your `t()` function.
 *
 *   const tr = useTr();
 *   tr('HEADER.NAV.TOP')                    // translated string, or the key if missing
 *   tr('FOOTER.CTA_TITLE', 'Talk to us')    // translated string, or "Talk to us" if the key is missing
 *   tr.list('PLAN.ITEMS.METAL.ITEMS')       // string[] (empty array if missing)
 *   tr.record('CONTACT.FORM.TYPE_OPTIONS')  // { KEY: 'label', ... } (empty object if missing)
 */
export function useTr() {
  const { t } = useTranslation();

  const tr = (key: string, fallback?: string): string => {
    const value = t(key);
    if (typeof value === 'string' && value !== key) return value;
    return fallback ?? key;
  };

  tr.list = (key: string): string[] => {
    const value = t(key);
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  };

  tr.record = (key: string): Record<string, string> => {
    const value = t(key);
    return value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, string>)
      : {};
  };

  return tr;
}