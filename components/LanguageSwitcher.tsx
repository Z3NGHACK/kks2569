// // components/LanguageSwitcher.tsx
// 'use client';

// import { useLocale, useTranslations } from 'next-intl';
// import { Link, useRouter, usePathname } from '@/src/i18n/navigation';
// import { useTransition } from 'react';
// import { ChevronDown } from 'lucide-react';

// const flagMap: Record<string, string> = {
//   ja: '🇯🇵',
//   en: '🇬🇧',   // or 🇺🇸
//   vi: '🇻🇳'
// };

// export default function LanguageSwitcher() {
//   const t = useTranslations('LanguageSwitcher');
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isPending, startTransition] = useTransition();

//   return (
//     <div className="relative inline-block text-left">
//       <button
//         className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-gray-100 transition disabled:opacity-50"
//         disabled={isPending}
//         onClick={() => {
//           // you can open dropdown logic here or use Menu from headui / radix
//           // for simplicity → we'll simulate with alert or real menu later
//         }}
//       >
//         <span>{flagMap[locale]}</span>
//         {/* <span className="hidden sm:inline">{localeNames[locale as keyof typeof localeNames]}</span> */}
//         <ChevronDown size={16} />
//       </button>

//       {/* Dropdown example – in real app use Radix Menu or Headless UI */}
//       {/* <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md"> ... */ }
//     </div>
//   );
// }


// 'use client';

// import { useLocale, useTranslations } from 'next-intl';
// import { useTransition } from 'react';
// import { ChevronDown, Globe } from 'lucide-react';
// import { useState, useRef, useEffect } from 'react';

// const languages = [
//   { code: 'ja', label: '日本語', flag: '🇯🇵' },
//   { code: 'en', label: 'English', flag: '🇬🇧' }
// ];

// export default function LanguageSwitcher() {
//   const t = useTranslations('LanguageSwitcher');
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const [pending, startTransition] = useTransition();
//   const ref = useRef<HTMLDivElement>(null);

//   const current = languages.find(l => l.code === locale) || languages[0];

//   const switchLocale = (newLocale: string) => {
//     startTransition(() => {
//       router.replace(pathname, { locale: newLocale });
//     });
//     setIsOpen(false);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         type="button"
//         className="flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:text-primary transition rounded-md hover:bg-gray-50 disabled:opacity-50"
//         onClick={() => setIsOpen(!isOpen)}
//         disabled={pending}
//         aria-label={t('label')}
//       >
//         <Globe size={20} />
//         <span className="hidden sm:inline font-medium">{current.label}</span>
//         <ChevronDown size={16} />
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg border border-gray-200 py-1 z-50">
//           {languages.map((lang) => (
//             <button
//               key={lang.code}
//               type="button"
//               className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-50 transition
//                 ${locale === lang.code ? 'bg-gray-100 font-medium' : ''}
//               `}
//               onClick={() => switchLocale(lang.code)}
//             >
//               <span className="text-base">{lang.flag}</span>
//               <span>{lang.label}</span>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }