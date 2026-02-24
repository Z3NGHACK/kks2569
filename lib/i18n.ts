// lib/i18n.ts
import ja from './translations/ja.json';
import en from './translations/en.json';
import vi from './translations/vi.json';
import kh from './translations/kh.json';

export const translations = {
  ja,
  en,
  vi,
  kh,
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof ja;

export const defaultLanguage: Language = 'ja';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'kh', name: 'ភាសាខ្មែរ', flag: '🇰🇭' },
];

export function getTranslation(lang: Language) {
  return translations[lang] || translations[defaultLanguage];
}