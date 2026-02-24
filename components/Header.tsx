// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, Instagram, MessageCircle, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '@/components/LanguageProvider';
import { languages, Language } from '@/lib/i18n';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  
  const { t, language, setLanguage } = useTranslation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  const navItems = [
    { href: '/', label: getString('HEADER.NAV.TOP') },
    { href: '/about', label: getString('HEADER.NAV.ABOUT') },
    { href: '/service', label: getString('HEADER.NAV.SERVICE') },
    { href: '/plan', label: getString('HEADER.NAV.PLAN') },
    { href: '/contact', label: getString('HEADER.NAV.CONTACT') },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="
              w-12 h-12 
              bg-gradient-to-br from-primary to-dark 
              rounded-full 
              flex items-center justify-center 
              shadow-lg 
              group-hover:shadow-xl 
              transition-shadow
              overflow-hidden           
            ">
              <Image
                src="/images/kinsei_logo.png"
                alt="KKS Logo"          
                width={50}           
                height={50}
                className="
                  object-contain         
                  drop-shadow-lg         
                  group-hover:drop-shadow-2xl 
                  transition-shadow     
                "
                priority               
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                {getString('HEADER.COMPANY_NAME')}
              </h1>
              <p className="text-xs text-gray-500 tracking-wider">KHMER KANSAI CO., LTD.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-600 hover:text-primary transition-colors duration-200 text-sm font-medium py-2 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side: Language + Social + Contact */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Switcher - Redesigned */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-full border-2 transition-all duration-200 ${
                  isLangOpen 
                    ? 'border-primary bg-green-50 text-primary' 
                    : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                }`}
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden shadow-sm">
                  <Image
                    src={`/flags/${currentLang.code}.png`}
                    alt={currentLang.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-semibold min-w-[40px]">{currentLang.code.toUpperCase()}</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180 text-primary' : 'text-gray-400'}`} 
                />
              </button>

              {/* Dropdown - Modern Design */}
              {isLangOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {getString('LANGUAGES.SELECT') || 'Select Language'}
                    </p>
                  </div>
                  
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center justify-between px-4 py-3 transition-all duration-200 group ${
                        language === lang.code 
                          ? 'bg-gradient-to-r from-green-50 to-transparent border-l-4 border-primary' 
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`relative w-8 h-8 rounded-full overflow-hidden shadow-md transition-transform ${language === lang.code ? 'scale-110' : 'group-hover:scale-105'}`}>
                          <Image
                            src={`/flags/${lang.code}.png`}
                            alt={lang.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className={`font-semibold text-sm ${language === lang.code ? 'text-primary' : 'text-gray-700'}`}>
                            {lang.name}
                          </p>
                          <p className="text-xs text-gray-400">{lang.code.toUpperCase()}</p>
                        </div>
                      </div>
                      
                      {language === lang.code && (
                        <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                          <Check size={14} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-all duration-200 hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition-all duration-200 hover:scale-110"
              >
                <MessageCircle size={20} />
              </a>
            </div>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="bg-gradient-to-r from-primary to-dark text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              {getString('HEADER.CONTACT_BUTTON')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary py-3 border-b border-gray-100 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="py-6 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                {getString('LANGUAGES.LABEL') || 'Language'}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                      language === lang.code 
                        ? 'border-primary bg-green-50 text-primary shadow-md' 
                        : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm mb-2">
                      <Image
                        src={`/flags/${lang.code}.svg`}
                        alt={lang.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold">{lang.code.toUpperCase()}</span>
                    <span className="text-[10px] text-gray-500 mt-0.5">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Social */}
            <div className="flex space-x-4 pt-4 justify-center">
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors">
                <MessageCircle size={24} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}