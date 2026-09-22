'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Tractor, Wrench, Phone, Sprout } from 'lucide-react';
import Hero from '@/components/Hero';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useTr } from '@/lib/useTr';
import { inquiryHref } from '@/lib/inquiry';

const tractorTypes = [
  {
    type: 'Compact Tractors',
    hp: '20-50 HP',
    brands: ['Kubota', 'Yanmar', 'Iseki', 'Mitsubishi'],
    description: 'Ideal for small farms and orchards. 4WD with power steering and rotary tiller compatibility.',
    image: '/images/compact-tractor.jpg',
  },
  {
    type: 'Utility Tractors',
    hp: '50-100 HP',
    brands: ['Kubota', 'John Deere', 'Massey Ferguson', 'New Holland'],
    description: 'Versatile machines for medium-sized farms. Compatible with various implements.',
    image: '/images/utility-tractor.jpg',
  },
  {
    type: 'Agricultural Tractors',
    hp: '100-200 HP',
    brands: ['John Deere', 'Case IH', 'Kubota', 'New Holland'],
    description: 'Heavy-duty tractors for large-scale farming. High horsepower for demanding applications.',
    image: '/images/agricultural-tractor.jpg',
  },
  {
    type: 'Combine Harvesters',
    models: ['Kubota DC', 'Yanmar CA', 'Iseki HF'],
    description: 'Rice and wheat combines. We handle both self-propelled and head-feeder types.',
    image: '/images/combine-harvester.jpg',
  },
];

const implementsList = [
  'Rotary Tillers', 'Plows', 'Harrows', 'Seeders',
  'Transplanters', 'Mowers', 'Loaders', 'Backhoes',
  'Trailers', 'Sprayers', 'Cultivators', 'Rice Dryers',
];

export default function TractorsPage() {
  const tr = useTr();

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        variant="page"
        title={tr('TRACTORS.PAGE_TITLE')}
        subtitle={tr('TRACTORS.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Link
          href="/service#machinery"
          className="group mb-8 inline-flex items-center text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          {tr('TRACTORS.BACK_TO_SERVICES')}
        </Link>

        {/* Introduction */}
        <Reveal className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 to-green-800 p-8 text-white shadow-xl md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold">{tr('TRACTORS.HERO.TITLE')}</h2>
              <p className="mb-6 text-lg text-green-100">{tr('TRACTORS.HERO.DESCRIPTION')}</p>
              <div className="flex flex-wrap gap-3">
                {['TRACTOR_RANGE', 'COMBINES', 'IMPLEMENTS'].map((k) => (
                  <span key={k} className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm">
                    {tr(`TRACTORS.HERO.${k}`)}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl">
              <Image src="/images/tractor-hero.jpg" alt="Agricultural tractors" fill className="object-cover" />
            </div>
          </div>
        </Reveal>

        {/* Tractor Types */}
        <section className="mb-12">
          <Reveal>
            <h3 className="mb-8 text-2xl font-bold text-gray-800">{tr('TRACTORS.CATEGORIES.TITLE')}</h3>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.1}>
            {tractorTypes.map((item, index) => (
              <StaggerItem key={index} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl md:flex-row">
                  <div className="relative h-48 w-full flex-shrink-0 md:h-auto md:w-48">
                    <Image src={item.image} alt={item.type} fill sizes="192px" className="object-cover" />
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="text-xl font-bold text-gray-800">{item.type}</h4>
                      {item.hp && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                          {item.hp}
                        </span>
                      )}
                    </div>
                    <p className="mb-3 text-gray-600">{item.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {(item.brands || item.models)?.map((brand) => (
                        <span key={brand} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          {brand}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={inquiryHref({ product: item.type, type: 'buying' })}
                      className="mt-auto text-sm font-semibold text-primary hover:underline"
                    >
                      {tr('TRACTORS.ASK_ABOUT', 'Ask about this category')} →
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Implements */}
        <Reveal className="mb-12 rounded-2xl bg-white p-8 shadow-lg">
          <h3 className="mb-6 flex items-center text-2xl font-bold text-gray-800">
            <Sprout className="mr-2 text-green-600" size={28} />
            {tr('TRACTORS.IMPLEMENTS.TITLE')}
          </h3>
          <p className="mb-6 text-gray-600">{tr('TRACTORS.IMPLEMENTS.DESCRIPTION')}</p>
          <Stagger className="grid grid-cols-3 gap-4 md:grid-cols-4" stagger={0.03}>
            {implementsList.map((implement) => (
              <StaggerItem key={implement}>
                <div className="rounded-lg bg-gray-50 p-3 text-center transition-colors hover:bg-green-50">
                  <span className="text-sm font-medium text-gray-700">{implement}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        {/* Services */}
        <Stagger className="mb-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {[
            { key: 'BUY', icon: Tractor, bg: 'bg-green-100', color: 'text-green-600' },
            { key: 'MAINTENANCE', icon: Wrench, bg: 'bg-orange-100', color: 'text-orange-600' },
            { key: 'EXPORT', icon: CheckCircle, bg: 'bg-blue-100', color: 'text-blue-600' },
          ].map(({ key, icon: Icon, bg, color }) => (
            <StaggerItem key={key} className="h-full">
              <div className="h-full rounded-2xl bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${bg}`}>
                  <Icon className={color} size={32} />
                </div>
                <h4 className="mb-2 text-lg font-bold text-gray-800">{tr(`TRACTORS.SERVICES.${key}.TITLE`)}</h4>
                <p className="text-sm text-gray-600">{tr(`TRACTORS.SERVICES.${key}.DESC`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* CTA */}
        <Reveal className="rounded-2xl bg-gray-900 p-8 text-center text-white md:p-12">
          <h3 className="mb-4 text-2xl font-bold">{tr('TRACTORS.CTA.TITLE')}</h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-300">{tr('TRACTORS.CTA.DESCRIPTION')}</p>
          <Link
            href={inquiryHref({ product: 'Tractors & Combines', type: 'buying' })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-dark"
          >
            <Phone size={20} />
            {tr('TRACTORS.CTA.CONTACT')}
          </Link>
        </Reveal>
      </div>
    </div>
  );
}