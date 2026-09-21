// components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Menu, X, Instagram, MessageCircle, ChevronDown, Check, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/components/LanguageProvider';
import { languages, Language } from '@/lib/i18n';
import { useTr } from '@/lib/useTr';
import { COMPANY } from '@/lib/company';
import { EASE_OUT } from '@/components/motion/Reveal';

const HEADER_TALL = 80; // px, at the top of the page
const HEADER_SHORT = 64; // px, once the visitor has scrolled

const menuItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { language, setLanguage } = useTranslation();
  const tr = useTr();

  // ---- Scroll behaviour -------------------------------------------------
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (Math.abs(y - prev) < 6) return; // ignore tiny jitters (trackpads, mobile bounce)
    setHidden(y > prev && y > 160); // hide going down, show going up
  });

  const shouldHide = hidden && !isMenuOpen && !isLangOpen;

  // Publish the header's visible height so sticky elements (e.g. the service
  // page section nav) can sit right underneath it and follow it up/down.
  useEffect(() => {
    const h = shouldHide ? 0 : scrolled ? HEADER_SHORT : HEADER_TALL;
    document.documentElement.style.setProperty('--header-offset', `${h}px`);
  }, [shouldHide, scrolled]);

  // ---- Close things ------------------------------------------------------
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsLangOpen(false);
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Lock page scroll behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // ---- Data --------------------------------------------------------------
  const { instagram, line } = COMPANY.social;
  const hasSocial = Boolean(instagram || line);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  const navItems = [
    { href: '/', label: tr('HEADER.NAV.TOP') },
    { href: '/about', label: tr('HEADER.NAV.ABOUT') },
    { href: '/service', label: tr('HEADER.NAV.SERVICE') },
    { href: '/plan', label: tr('HEADER.NAV.PLAN') },
    { href: '/contact', label: tr('HEADER.NAV.CONTACT') },
  ];

  const isActiveRoute = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <MotionConfig reducedMotion="user">
      {/* Keeps page content below the fixed header, and stays constant while the header shrinks */}
      <div aria-hidden className="h-20" />

      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? 'bg-white/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl'
            : 'bg-white shadow-sm'
        }`}
        initial={false}
        animate={{ y: shouldHide ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ${
              scrolled ? 'h-16' : 'h-20'
            }`}
          >
            {/* Logo */}
            <Link href="/" className="group flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-dark shadow-lg transition-all duration-300 group-hover:rotate-6 group-hover:shadow-xl">
                <Image
                  src="/images/kinsei_logo.png"
                  alt="KKS Logo"
                  width={50}
                  height={50}
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
              <div className="hidden md:block">
                <p className="text-xl font-bold text-gray-800 transition-colors group-hover:text-primary">
                  {tr('HEADER.COMPANY_NAME')}
                </p>
                <p className="text-xs tracking-wider text-gray-500">KHMER KANSAI CO., LTD.</p>
              </div>
            </Link>

            {/* Desktop navigation: a soft pill follows the cursor, a dot marks the current page */}
            <nav
              aria-label="Main"
              className="hidden items-center gap-1 lg:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {hovered === item.href && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-full bg-gray-100"
                        transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-0.5 flex justify-center">
                        <motion.span
                          layoutId="nav-dot"
                          className="h-1 w-1 rounded-full bg-primary"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="hidden items-center space-x-5 lg:flex">
              {/* Language switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isLangOpen}
                  className={`flex items-center space-x-2.5 rounded-full border-2 px-3.5 py-2 transition-all duration-200 ${
                    isLangOpen
                      ? 'border-primary bg-green-50 text-primary'
                      : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                  }`}
                >
                  <div className="relative h-6 w-6 overflow-hidden rounded-full shadow-sm">
                    <Image
                      src={`/flags/${currentLang.code}.png`}
                      alt={currentLang.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="min-w-[28px] text-sm font-semibold">
                    {currentLang.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isLangOpen ? 'rotate-180 text-primary' : 'text-gray-400'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      role="listbox"
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: EASE_OUT }}
                      style={{ transformOrigin: 'top right' }}
                      className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white py-3 shadow-2xl"
                    >
                      <div className="mb-2 border-b border-gray-100 px-4 py-2">
                        <p className="text-xs font-semibold tracking-wider text-gray-400">
                          {tr('LANGUAGES.SELECT', 'Select language')}
                        </p>
                      </div>

                      {languages.map((lang) => {
                        const selected = language === lang.code;
                        return (
                          <button
                            key={lang.code}
                            role="option"
                            aria-selected={selected}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`group flex w-full items-center justify-between border-l-4 px-4 py-3 transition-colors duration-200 ${
                              selected
                                ? 'border-primary bg-gradient-to-r from-green-50 to-transparent'
                                : 'border-transparent hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`relative h-8 w-8 overflow-hidden rounded-full shadow-md transition-transform ${
                                  selected ? 'scale-110' : 'group-hover:scale-105'
                                }`}
                              >
                                <Image
                                  src={`/flags/${lang.code}.png`}
                                  alt={lang.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-left">
                                <p
                                  className={`text-sm font-semibold ${
                                    selected ? 'text-primary' : 'text-gray-700'
                                  }`}
                                >
                                  {lang.name}
                                </p>
                                <p className="text-xs text-gray-400">{lang.code.toUpperCase()}</p>
                              </div>
                            </div>

                            {selected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                              >
                                <Check size={14} className="text-white" strokeWidth={3} />
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {hasSocial && <div className="h-8 w-px bg-gray-200" />}

              {/* Social */}
              <div className={hasSocial ? 'flex items-center space-x-2' : 'hidden'}>
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-100 hover:text-pink-600"
                >
                  <Instagram size={20} />
                </a>
                )}
                {line && (
                  <a href={line} target="_blank" rel="noopener noreferrer" aria-label="Chat"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-100 hover:text-green-600"
                >
                  <MessageCircle size={20} />
                </a>
                )}
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-dark px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 active:scale-[0.98]"
              >
                {tr('HEADER.CONTACT_BUTTON')}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={tr('HEADER.MENU', 'Menu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMenuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-primary to-amber-300"
        />
      </motion.header>

      {/* Mobile menu: opens as a circle growing from the menu button.
          It's a sibling of the header (not a child) so the header's transform can't offset it. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            className="fixed inset-0 z-40 overflow-y-auto bg-white pt-20 lg:hidden"
            initial={{ clipPath: 'circle(0px at 92% 40px)' }}
            animate={{ clipPath: 'circle(1800px at 92% 40px)' }}
            exit={{ clipPath: 'circle(0px at 92% 40px)' }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <motion.nav
              aria-label="Mobile"
              className="container mx-auto flex flex-col px-4 py-6"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
            >
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <motion.div key={item.href} variants={menuItem}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center justify-between border-b border-gray-100 py-4 text-2xl font-bold transition-colors ${
                        isActive ? 'text-primary' : 'text-gray-800 hover:text-primary'
                      }`}
                    >
                      {item.label}
                      <ArrowUpRight size={22} className={isActive ? 'text-primary' : 'text-gray-300'} />
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile language switcher */}
              <motion.div variants={menuItem} className="py-6">
                <p className="mb-4 text-sm font-semibold tracking-wider text-gray-400">
                  {tr('LANGUAGES.LABEL', 'Language')}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all duration-200 active:scale-95 ${
                        language === lang.code
                          ? 'border-primary bg-green-50 text-primary shadow-md'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative mb-2 h-10 w-10 overflow-hidden rounded-full shadow-sm">
                        <Image
                          src={`/flags/${lang.code}.png`}
                          alt={lang.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold">{lang.code.toUpperCase()}</span>
                      <span className="mt-0.5 text-[10px] text-gray-500">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Mobile social */}
              <motion.div variants={menuItem} className={hasSocial ? 'flex justify-center space-x-4 pb-8 pt-2' : 'pb-8'}>
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-pink-100 hover:text-pink-600"
                >
                  <Instagram size={24} />
                </a>
                )}
                {line && (
                  <a href={line} target="_blank" rel="noopener noreferrer" aria-label="Chat"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-green-100 hover:text-green-600"
                >
                  <MessageCircle size={24} />
                </a>
                )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}