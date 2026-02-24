// app/plan/page.tsx
'use client';

import { Check, Truck, Banknote, HelpCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

export default function PlanPage() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  const getArray = (key: string): string[] => {
    const value = t(key);
    return Array.isArray(value) ? value : [];
  };

  const itemCategories = [
    { key: 'APPLIANCES', icon: '📺' },
    { key: 'METAL', icon: '🔧' },
    { key: 'PLASTIC', icon: '♻️' },
    { key: 'VEHICLES', icon: '🚗' },
    { key: 'MACHINERY', icon: '🚜' },
    { key: 'LEATHER', icon: '👜' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('PLAN.PAGE_TITLE')}
        subtitle={getString('PLAN.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {getString('PLAN.INTRO.TITLE')}
          </h2>
          <p className="text-gray-600 text-lg">
            {getString('PLAN.INTRO.SUBTITLE')}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {getString('PLAN.FEATURES.VISIT.TITLE')}
            </h3>
            <p className="text-gray-600">{getString('PLAN.FEATURES.VISIT.DESC')}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Banknote className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {getString('PLAN.FEATURES.CASH.TITLE')}
            </h3>
            <p className="text-gray-600">{getString('PLAN.FEATURES.CASH.DESC')}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {getString('PLAN.FEATURES.BRING_IN.TITLE')}
            </h3>
            <p className="text-gray-600">{getString('PLAN.FEATURES.BRING_IN.DESC')}</p>
          </div>
        </div>

        {/* Items Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">
            {getString('PLAN.ITEMS.TITLE')}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itemCategories.map((cat) => {
              const items = getArray(`PLAN.ITEMS.${cat.key}.ITEMS`);
              return (
                <div key={cat.key} className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">{cat.icon}</span>
                    {getString(`PLAN.ITEMS.${cat.key}.TITLE`)}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {items.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-dark rounded-2xl shadow-lg p-8 text-center text-white">
          <HelpCircle className="mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-4">{getString('PLAN.CTA.TITLE')}</h3>
          <p className="mb-6 text-green-100">
            {getString('PLAN.CTA.DESC')}
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            {getString('PLAN.CTA.BUTTON')}
          </a>
        </div>
      </div>
    </div>
  );
}