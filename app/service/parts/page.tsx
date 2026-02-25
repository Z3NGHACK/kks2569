'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Cog, Wrench, Package, Phone, Search } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

const partCategories = [
  {
    title: 'Engine Parts',
    items: ['Engines', 'Turbochargers', 'Fuel Injectors', 'Pistons', 'Crankshafts', 'Cylinder Heads'],
    image: '/images/engine-parts.jpg'
  },
  {
    title: 'Hydraulic Components',
    items: ['Pumps', 'Motors', 'Cylinders', 'Valves', 'Hoses', 'Seals'],
    image: '/images/hydraulic-parts.jpg'
  },
  {
    title: 'Undercarriage',
    items: ['Tracks', 'Rollers', 'Idlers', 'Sprockets', 'Track Shoes', 'Rubber Pads'],
    image: '/images/undercarriage.jpg'
  },
  {
    title: 'Electrical Parts',
    items: ['Controllers', 'Sensors', 'Alternators', 'Starters', 'Monitors', 'Wiring Harnesses'],
    image: '/images/electrical-parts.jpg'
  }
];

const brands = [
  'Caterpillar', 'Komatsu', 'Hitachi', 'Kobelco', 'Kubota', 
  'John Deere', 'Hyundai', 'Volvo', 'Doosan', 'Sumitomo'
];

export default function PartsPage() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('PARTS.PAGE_TITLE')}
        subtitle={getString('PARTS.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/service" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {getString('PARTS.BACK_TO_SERVICES')}
        </Link>

        {/* Introduction */}
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{getString('PARTS.HERO.TITLE')}</h2>
              <p className="text-gray-600 mb-6">
                {getString('PARTS.HERO.DESCRIPTION')}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">{getString('PARTS.HERO.GENUINE')}</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">{getString('PARTS.HERO.AFTERMARKET')}</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">{getString('PARTS.HERO.OEM')}</span>
              </div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image
                src="/images/parts-hero.jpg"
                alt="Heavy equipment parts"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Part Categories */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">{getString('PARTS.CATEGORIES.TITLE')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {partCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-40 h-40 flex-shrink-0">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">{category.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span key={item} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brands */}
        <section className="bg-gray-900 text-white rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-bold mb-6 text-center">{getString('PARTS.BRANDS.TITLE')}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((brand) => (
              <span key={brand} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                {brand}
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-blue-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('PARTS.SERVICES.SOURCING.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('PARTS.SERVICES.SOURCING.DESC')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-green-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('PARTS.SERVICES.BULK.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('PARTS.SERVICES.BULK.DESC')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="text-orange-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('PARTS.SERVICES.SUPPORT.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('PARTS.SERVICES.SUPPORT.DESC')}
            </p>
          </div>
        </div>

        {/* CTA */}
        <section className="bg-primary text-white rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">{getString('PARTS.CTA.TITLE')}</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            {getString('PARTS.CTA.DESCRIPTION')}
          </p>
          <Link href="/contact" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
            <Phone className="mr-2" size={20} />
            {getString('PARTS.CTA.REQUEST_QUOTE')}
          </Link>
        </section>
      </div>
    </div>
  );
}