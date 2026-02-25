'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Package, Truck, Factory, Phone } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

const copperProducts = [
  {
    title: 'Copper Wire Scrap',
    description: 'Clean, uncoated copper wire without insulation. Highest grade copper scrap with maximum recovery value.',
    image: '/images/copper-wire.jpg',
    grade: 'Millberry'
  },
  {
    title: 'Copper Pipe & Tube',
    description: 'Plumbing and industrial copper pipes, clean without solder or paint. Includes both hard and soft copper tubing.',
    image: '/images/copper-pipe.jpg',
    grade: 'No.1 Copper'
  },
  {
    title: 'Copper Sheets & Plates',
    description: 'Industrial copper sheets, roofing copper, and decorative plates. Clean material with minimal oxidation.',
    image: '/images/copper-sheet.jpg',
    grade: 'No.2 Copper'
  },
  {
    title: 'Copper Cathodes',
    description: 'Electrolytic copper cathodes with 99.99% purity. Premium grade for industrial manufacturing and export.',
    image: '/images/copper-cathode.jpg',
    grade: 'A Grade'
  }
];

export default function CopperPage() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('COPPER.PAGE_TITLE')}
        subtitle={getString('COPPER.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/service" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {getString('COPPER.BACK_TO_SERVICES')}
        </Link>

        {/* Introduction */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{getString('COPPER.HERO.TITLE')}</h2>
              <p className="text-lg text-orange-100 mb-6">
                {getString('COPPER.HERO.DESCRIPTION')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-bold">Cu 99.9%+</span>
                  <span className="block text-sm text-orange-200">{getString('COPPER.HERO.PURITY')}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-bold">Export Grade</span>
                  <span className="block text-sm text-orange-200">{getString('COPPER.HERO.GRADE')}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-bold">Competitive</span>
                  <span className="block text-sm text-orange-200">{getString('COPPER.HERO.PRICE')}</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/copper-hero.jpg"
                alt="Copper products"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">{getString('COPPER.PRODUCTS.TITLE')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {copperProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-800">{product.title}</h4>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.grade}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Link href="/contact" className="text-primary font-semibold hover:underline flex items-center">
                    {getString('COPPER.PRODUCTS.REQUEST_QUOTE')} <ArrowLeft className="ml-2 rotate-180" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Factory className="text-orange-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('COPPER.SERVICES.BUY.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('COPPER.SERVICES.BUY.DESC')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-blue-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('COPPER.SERVICES.SELL.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('COPPER.SERVICES.SELL.DESC')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="text-green-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('COPPER.SERVICES.EXPORT.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('COPPER.SERVICES.EXPORT.DESC')}
            </p>
          </div>
        </div>

        {/* Recycling Process */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{getString('COPPER.PROCESS.TITLE')}</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="relative">
                <div className="bg-gray-50 rounded-xl p-6 h-full border-2 border-gray-100">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {step}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{getString(`COPPER.PROCESS.STEP_${step}.TITLE`)}</h4>
                  <p className="text-sm text-gray-600">{getString(`COPPER.PROCESS.STEP_${step}.DESC`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">{getString('COPPER.CTA.TITLE')}</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {getString('COPPER.CTA.DESCRIPTION')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-dark transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2" size={20} />
              {getString('COPPER.CTA.GET_QUOTE')}
            </Link>
            <Link href="/plan" className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              {getString('COPPER.CTA.VIEW_PRICING')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}