'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Truck, Wrench, Phone, Calendar } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

const excavatorModels = [
  {
    brand: 'Caterpillar',
    models: ['320D', '320E', '320-07A', '330D', '336E', '349E'],
    description: 'Popular CAT models known for reliability and fuel efficiency. We handle both standard and LGP configurations.',
    image: '/images/cat-excavator.jpg'
  },
  {
    brand: 'Komatsu',
    models: ['PC200-8', 'PC220-8', 'PC300-8', 'PC400-8'],
    description: 'Japanese quality with excellent hydraulic performance. Low hour units preferred for export.',
    image: '/images/komatsu-excavator.jpg'
  },
  {
    brand: 'Hitachi',
    models: ['ZX200', 'ZX210', 'ZX350', 'ZX470'],
    description: 'ZX series with Isuzu engines. We purchase both standard and long-reach configurations.',
    image: '/images/hitachi-excavator.jpg'
  },
  {
    brand: 'Kobelco',
    models: ['SK200', 'SK210', 'SK350', 'SK480'],
    description: 'Fuel-efficient models with advanced hydraulics. Popular in Southeast Asian markets.',
    image: '/images/kobelco-excavator.jpg'
  }
];

export default function ExcavatorsPage() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('EXCAVATORS.PAGE_TITLE')}
        subtitle={getString('EXCAVATORS.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/service" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {getString('EXCAVATORS.BACK_TO_SERVICES')}
        </Link>

        {/* Hero Section */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <Image
                src="/images/excavator-hero.jpg"
                alt="Excavators"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{getString('EXCAVATORS.HERO.TITLE')}</h2>
              <p className="text-gray-600 mb-6">
                {getString('EXCAVATORS.HERO.DESCRIPTION')}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">{getString('EXCAVATORS.HERO.CLASS')}</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">{getString('EXCAVATORS.HERO.INSPECTION')}</span>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">{getString('EXCAVATORS.HERO.DOCUMENTATION')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Models Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">{getString('EXCAVATORS.MODELS.TITLE')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {excavatorModels.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.brand}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full font-bold">
                    {item.brand}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.models.map((model) => (
                      <span key={model} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                        {model}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('EXCAVATORS.SERVICES.BUY.TITLE')}</h4>
              <p className="text-gray-600 text-sm">{getString('EXCAVATORS.SERVICES.BUY.DESC')}</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('EXCAVATORS.SERVICES.REFURBISHMENT.TITLE')}</h4>
              <p className="text-gray-600 text-sm">{getString('EXCAVATORS.SERVICES.REFURBISHMENT.DESC')}</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('EXCAVATORS.SERVICES.EXPORT.TITLE')}</h4>
              <p className="text-gray-600 text-sm">{getString('EXCAVATORS.SERVICES.EXPORT.DESC')}</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{getString('EXCAVATORS.PROCESS.TITLE')}</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {step}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{getString(`EXCAVATORS.PROCESS.STEP_${step}.TITLE`)}</h4>
                <p className="text-sm text-gray-600">{getString(`EXCAVATORS.PROCESS.STEP_${step}.DESC`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary to-dark text-white rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">{getString('EXCAVATORS.CTA.TITLE')}</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            {getString('EXCAVATORS.CTA.DESCRIPTION')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2" size={20} />
              {getString('EXCAVATORS.CTA.CONTACT')}
            </Link>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center">
              <Calendar className="mr-2" size={20} />
              {getString('EXCAVATORS.CTA.SCHEDULE')}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}