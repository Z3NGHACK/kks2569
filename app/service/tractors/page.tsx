'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Tractor, Wrench, Phone, Sprout } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

const tractorTypes = [
  {
    type: 'Compact Tractors',
    hp: '20-50 HP',
    brands: ['Kubota', 'Yanmar', 'Iseki', 'Mitsubishi'],
    description: 'Ideal for small farms and orchards. 4WD with power steering and rotary tiller compatibility.',
    image: '/images/compact-tractor.jpg'
  },
  {
    type: 'Utility Tractors',
    hp: '50-100 HP',
    brands: ['Kubota', 'John Deere', 'Massey Ferguson', 'New Holland'],
    description: 'Versatile machines for medium-sized farms. Compatible with various implements.',
    image: '/images/utility-tractor.jpg'
  },
  {
    type: 'Agricultural Tractors',
    hp: '100-200 HP',
    brands: ['John Deere', 'Case IH', 'Kubota', 'New Holland'],
    description: 'Heavy-duty tractors for large-scale farming. High horsepower for demanding applications.',
    image: '/images/agricultural-tractor.jpg'
  },
  {
    type: 'Combine Harvesters',
    models: ['Kubota DC', 'Yanmar CA', 'Iseki HF'],
    description: 'Rice and wheat combines. We handle both self-propelled and head-feeder types.',
    image: '/images/combine-harvester.jpg'
  }
];

const implementsList = [
  'Rotary Tillers', 'Plows', 'Harrows', 'Seeders',
  'Transplanters', 'Mowers', 'Loaders', 'Backhoes',
  'Trailers', 'Sprayers', 'Cultivators', 'Rice Dryers'
];

export default function TractorsPage() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('TRACTORS.PAGE_TITLE')}
        subtitle={getString('TRACTORS.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/service" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {getString('TRACTORS.BACK_TO_SERVICES')}
        </Link>

        {/* Introduction */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{getString('TRACTORS.HERO.TITLE')}</h2>
              <p className="text-lg text-green-100 mb-6">
                {getString('TRACTORS.HERO.DESCRIPTION')}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">{getString('TRACTORS.HERO.TRACTOR_RANGE')}</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">{getString('TRACTORS.HERO.COMBINES')}</span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">{getString('TRACTORS.HERO.IMPLEMENTS')}</span>
              </div>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image
                src="/images/tractor-hero.jpg"
                alt="Agricultural tractors"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Tractor Types */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">{getString('TRACTORS.CATEGORIES.TITLE')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {tractorTypes.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.type}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-800">{item.type}</h4>
                    {item.hp && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {item.hp}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(item.brands || item.models)?.map((brand) => (
                      <span key={brand} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Implements */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Sprout className="text-green-600 mr-2" size={28} />
            {getString('TRACTORS.IMPLEMENTS.TITLE')}
          </h3>
          <p className="text-gray-600 mb-6">
            {getString('TRACTORS.IMPLEMENTS.DESCRIPTION')}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {implementsList.map((implement) => (
              <div key={implement} className="bg-gray-50 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-gray-700">{implement}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tractor className="text-green-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('TRACTORS.SERVICES.BUY.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('TRACTORS.SERVICES.BUY.DESC')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="text-orange-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('TRACTORS.SERVICES.MAINTENANCE.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('TRACTORS.SERVICES.MAINTENANCE.DESC')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-blue-600" size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{getString('TRACTORS.SERVICES.EXPORT.TITLE')}</h4>
            <p className="text-gray-600 text-sm">
              {getString('TRACTORS.SERVICES.EXPORT.DESC')}
            </p>
          </div>
        </div>

        {/* CTA */}
        <section className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">{getString('TRACTORS.CTA.TITLE')}</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            {getString('TRACTORS.CTA.DESCRIPTION')}
          </p>
          <Link href="/contact" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-dark transition-colors inline-flex items-center justify-center">
            <Phone className="mr-2" size={20} />
            {getString('TRACTORS.CTA.CONTACT')}
          </Link>
        </section>
      </div>
    </div>
  );
}