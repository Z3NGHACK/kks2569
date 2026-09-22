'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Wrench, Package, Phone, Search } from 'lucide-react';
import Hero from '@/components/Hero';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useTr } from '@/lib/useTr';
import { inquiryHref } from '@/lib/inquiry';

const partCategories = [
  {
    title: 'Engine Parts',
    items: ['Engines', 'Turbochargers', 'Fuel Injectors', 'Pistons', 'Crankshafts', 'Cylinder Heads'],
    image: '/images/engine-parts.jpg',
  },
  {
    title: 'Hydraulic Components',
    items: ['Pumps', 'Motors', 'Cylinders', 'Valves', 'Hoses', 'Seals'],
    image: '/images/hydraulic-parts.jpg',
  },
  {
    title: 'Undercarriage',
    items: ['Tracks', 'Rollers', 'Idlers', 'Sprockets', 'Track Shoes', 'Rubber Pads'],
    image: '/images/undercarriage.jpg',
  },
  {
    title: 'Electrical Parts',
    items: ['Controllers', 'Sensors', 'Alternators', 'Starters', 'Monitors', 'Wiring Harnesses'],
    image: '/images/electrical-parts.jpg',
  },
];

const brands = [
  'Caterpillar', 'Komatsu', 'Hitachi', 'Kobelco', 'Kubota',
  'John Deere', 'Hyundai', 'Volvo', 'Doosan', 'Sumitomo',
];

export default function PartsPage() {
  const tr = useTr();

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        variant="page"
        title={tr('PARTS.PAGE_TITLE')}
        subtitle={tr('PARTS.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Link
          href="/service#machinery"
          className="group mb-8 inline-flex items-center text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          {tr('PARTS.BACK_TO_SERVICES')}
        </Link>

        {/* Introduction */}
        <Reveal className="mb-12 rounded-3xl bg-white p-8 shadow-xl md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-gray-800">{tr('PARTS.HERO.TITLE')}</h2>
              <p className="mb-6 text-gray-600">{tr('PARTS.HERO.DESCRIPTION')}</p>
              <div className="flex flex-wrap gap-3">
                {['GENUINE', 'AFTERMARKET', 'OEM'].map((k) => (
                  <span key={k} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    {tr(`PARTS.HERO.${k}`)}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl">
              <Image src="/images/parts-hero.jpg" alt="Heavy equipment parts" fill className="object-cover" />
            </div>
          </div>
        </Reveal>

        {/* Part Categories */}
        <section className="mb-12">
          <Reveal>
            <h3 className="mb-8 text-2xl font-bold text-gray-800">{tr('PARTS.CATEGORIES.TITLE')}</h3>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.1}>
            {partCategories.map((category, index) => (
              <StaggerItem key={index} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl md:flex-row">
                  <div className="relative h-40 w-full flex-shrink-0 md:h-auto md:w-40">
                    <Image src={category.image} alt={category.title} fill sizes="160px" className="object-cover" />
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <h4 className="mb-3 text-lg font-bold text-gray-800">{category.title}</h4>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span key={item} className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">
                          {item}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={inquiryHref({ product: category.title, type: 'quote' })}
                      className="mt-auto text-sm font-semibold text-primary hover:underline"
                    >
                      {tr('PARTS.ASK_ABOUT', 'Request a quote')} →
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Brands */}
        <Reveal className="mb-12 rounded-2xl bg-gray-900 p-8 text-white">
          <h3 className="mb-6 text-center text-xl font-bold">{tr('PARTS.BRANDS.TITLE')}</h3>
          <Stagger className="flex flex-wrap justify-center gap-3" stagger={0.04}>
            {brands.map((brand) => (
              <StaggerItem key={brand}>
                <span className="block rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">{brand}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        {/* Services */}
        <Stagger className="mb-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {[
            { key: 'SOURCING', icon: Search, bg: 'bg-blue-100', color: 'text-blue-600' },
            { key: 'BULK', icon: Package, bg: 'bg-green-100', color: 'text-green-600' },
            { key: 'SUPPORT', icon: Wrench, bg: 'bg-orange-100', color: 'text-orange-600' },
          ].map(({ key, icon: Icon, bg, color }) => (
            <StaggerItem key={key} className="h-full">
              <div className="h-full rounded-2xl bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${bg}`}>
                  <Icon className={color} size={32} />
                </div>
                <h4 className="mb-2 text-lg font-bold text-gray-800">{tr(`PARTS.SERVICES.${key}.TITLE`)}</h4>
                <p className="text-sm text-gray-600">{tr(`PARTS.SERVICES.${key}.DESC`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* CTA */}
        <Reveal className="rounded-2xl bg-primary p-8 text-center text-white md:p-12">
          <h3 className="mb-4 text-2xl font-bold">{tr('PARTS.CTA.TITLE')}</h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-200">{tr('PARTS.CTA.DESCRIPTION')}</p>
          <Link
            href={inquiryHref({ product: 'Machinery parts', type: 'quote' })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-gray-100"
          >
            <Phone size={20} />
            {tr('PARTS.CTA.REQUEST_QUOTE')}
          </Link>
        </Reveal>
      </div>
    </div>
  );
}