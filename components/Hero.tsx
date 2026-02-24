// components/Hero.tsx
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from './LanguageProvider';

interface HeroProps {
  variant?: 'home' | 'page';
  title?: string;
  subtitle?: string;
  description?: string;
  showButtons?: boolean;
}

export default function Hero({ 
  variant = 'home',
  title,
  subtitle,
  description,
  showButtons = true 
}: HeroProps) {
  // Safe hook usage
  let t: (key: string) => any = (key) => key;
  
  try {
    const ctx = useTranslation();
    t = ctx.t;
  } catch (e) {
    // Context not available, use key as fallback
  }

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  if (variant === 'page') {
    return (
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-green-100">{subtitle}</p>}
        </div>
      </div>
    );
  }

  // Home variant
  return (
    <section className="relative bg-gradient-to-br from-primary to-dark text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {getString('HOME.HERO.TITLE_1')}<br />
            {getString('HOME.HERO.TITLE_2')}
            <span className="text-yellow-300">{getString('HOME.HERO.TITLE_HIGHLIGHT')}</span>
            {getString('HOME.HERO.TITLE_3')}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-green-100 leading-relaxed">
            {getString('HOME.HERO.DESCRIPTION')}
          </p>
          {showButtons && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                {getString('HOME.HERO.BUTTON_PRIMARY')}
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/service"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-primary transition-colors"
              >
                {getString('HOME.HERO.BUTTON_SECONDARY')}
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mb-32 -mr-32"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300 opacity-10 rounded-full"></div>
    </section>
  );
}