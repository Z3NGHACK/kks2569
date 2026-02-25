'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Package, Truck, Factory, Phone } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

const aluminumProducts = [
  {
    title: 'Aluminum UBC (Used Beverage Cans)',
    description: 'Clean, empty aluminum cans without steel or significant contamination. Most common form of recycled aluminum.',
    image: '/images/aluminum-ubc.jpg',
    grade: 'UBC'
  },
  {
    title: 'Aluminum Extrusion 6063',
    description: 'Clean aluminum extrusions including window frames, door frames, and structural profiles. No steel or plastic attachments.',
    image: '/images/aluminum-extrusion.jpg',
    grade: '6063'
  },
  {
    title: 'Aluminum Wheels',
    description: 'Clean aluminum wheel rims without tires, valve stems, or lead weights. High-grade automotive aluminum.',
    image: '/images/aluminum-wheel.jpg',
    grade: 'Tense'
  },
  {
    title: 'Aluminum Ingot A7',
    description: 'Primary aluminum ingots with 99.7% purity. Standard for remelting and manufacturing applications.',
    image: '/images/aluminum-ingot.jpg',
    grade: 'A7'
  }
];

export default function AluminumPage() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('ALUMINUM.PAGE_TITLE')}
        subtitle={getString('ALUMINUM.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/service" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {getString('ALUMINUM.BACK_TO_SERVICES')}
        </Link>

        {/* Introduction */}
        <section className="bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{getString('ALUMINUM.HERO.TITLE')}</h2>
              <p className="text-lg text-gray-200 mb-6">
                {getString('ALUMINUM.HERO.DESCRIPTION')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-bold">Al 99.7%+</span>
                  <span className="block text-sm text-gray-300">{getString('ALUMINUM.HERO.PURITY')}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-bold">All Alloys</span>
                  <span className="block text-sm text-gray-300">{getString('ALUMINUM.HERO.ALLOYS')}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-bold">Export Ready</span>
                  <span className="block text-sm text-gray-300">{getString('ALUMINUM.HERO.EXPORT')}</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/images/aluminum-hero.jpg"
                alt="Aluminum products"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">{getString('ALUMINUM.PRODUCTS.TITLE')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {aluminumProducts.map((product, index) => (
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
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.grade}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Link href="/contact" className="text-primary font-semibold hover:underline flex items-center">
                    {getString('ALUMINUM.PRODUCTS.REQUEST_QUOTE')} <ArrowLeft className="ml-2 rotate-180" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Factory className="text-gray-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('ALUMINUM.SERVICES.BUY.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('ALUMINUM.SERVICES.BUY.DESC')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-blue-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('ALUMINUM.SERVICES.SELL.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('ALUMINUM.SERVICES.SELL.DESC')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="text-green-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('ALUMINUM.SERVICES.EXPORT.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('ALUMINUM.SERVICES.EXPORT.DESC')}
            </p>
          </div>
        </div>

        {/* Recycling Process */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{getString('ALUMINUM.PROCESS.TITLE')}</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="relative">
                <div className="bg-gray-50 rounded-xl p-6 h-full border-2 border-gray-100">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
                    {step}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{getString(`ALUMINUM.PROCESS.STEP_${step}.TITLE`)}</h4>
                  <p className="text-sm text-gray-600">{getString(`ALUMINUM.PROCESS.STEP_${step}.DESC`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">{getString('ALUMINUM.CTA.TITLE')}</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {getString('ALUMINUM.CTA.DESCRIPTION')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-dark transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2" size={20} />
              {getString('ALUMINUM.CTA.GET_QUOTE')}
            </Link>
            <Link href="/plan" className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              {getString('ALUMINUM.CTA.VIEW_PRICING')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}