'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Truck, Wrench, Phone } from 'lucide-react';
import Hero from '@/components/Hero';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useTr } from '@/lib/useTr';
import { inquiryHref } from '@/lib/inquiry';

// Real brand line-up, cycled across the 10 gallery photos.
// (The previous version had every card hard-coded to "Caterpillar" with the
// real Komatsu/Hitachi/Kobelco data commented out — restored here.)
const brandCycle = [
  {
    brand: 'Caterpillar',
    models: ['320D', '320E', '320-07A', '330D', '336E', '349E'],
    description: 'Popular CAT models known for reliability and fuel efficiency. We handle both standard and LGP configurations.',
  },
  {
    brand: 'Komatsu',
    models: ['PC200-8', 'PC220-8', 'PC300-8', 'PC400-8'],
    description: 'Japanese quality with excellent hydraulic performance. Low hour units preferred for export.',
  },
  {
    brand: 'Hitachi',
    models: ['ZX200', 'ZX210', 'ZX350', 'ZX470'],
    description: 'ZX series with Isuzu engines. We purchase both standard and long-reach configurations.',
  },
  {
    brand: 'Kobelco',
    models: ['SK200', 'SK210', 'SK350', 'SK480'],
    description: 'Fuel-efficient models with advanced hydraulics. Popular in Southeast Asian markets.',
  },
];

const excavatorModels = Array.from({ length: 10 }, (_, i) => ({
  ...brandCycle[i % brandCycle.length],
  image: `/images/excavator/ex${i + 1}.jpg`,
}));

export default function ExcavatorsPage() {
  const tr = useTr();

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        variant="page"
        title={tr('EXCAVATORS.PAGE_TITLE')}
        subtitle={tr('EXCAVATORS.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Link
          href="/service#machinery"
          className="group mb-8 inline-flex items-center text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          {tr('EXCAVATORS.BACK_TO_SERVICES')}
        </Link>

        {/* Hero Section */}
        <Reveal className="mb-12 overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <Image src="/images/excavator/excavator-hero.jpg" alt="Excavators" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <h2 className="mb-4 text-3xl font-bold text-gray-800">{tr('EXCAVATORS.HERO.TITLE')}</h2>
              <p className="mb-6 text-gray-600">{tr('EXCAVATORS.HERO.DESCRIPTION')}</p>
              <div className="flex flex-wrap gap-3">
                {['CLASS', 'INSPECTION', 'DOCUMENTATION'].map((k) => (
                  <span key={k} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    {tr(`EXCAVATORS.HERO.${k}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Models Grid */}
        <section className="mb-12">
          <Reveal>
            <h3 className="mb-8 text-2xl font-bold text-gray-800">{tr('EXCAVATORS.MODELS.TITLE')}</h3>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.08}>
            {excavatorModels.map((item, index) => (
              <StaggerItem key={index} className="h-full">
                <div className="h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.brand}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1 font-bold text-white">
                      {item.brand}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {item.models.map((model) => (
                        <span key={model} className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                          {model}
                        </span>
                      ))}
                    </div>
                    <p className="mb-4 text-gray-600">{item.description}</p>
                    <Link
                      href={inquiryHref({ product: `${item.brand} excavator (${item.models[0]} class)`, type: 'buying' })}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      {tr('EXCAVATORS.ASK_ABOUT', 'Ask about this model')} →
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Services */}
        <section className="mb-12">
          <Reveal>
            <h3 className="mb-8 text-2xl font-bold text-gray-800">{tr('EXCAVATORS.SERVICES_TITLE', 'Our Services')}</h3>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.1}>
            {[
              { key: 'BUY', icon: Truck, bg: 'bg-blue-100', color: 'text-blue-600' },
              { key: 'REFURBISHMENT', icon: Wrench, bg: 'bg-orange-100', color: 'text-orange-600' },
              { key: 'EXPORT', icon: CheckCircle, bg: 'bg-green-100', color: 'text-green-600' },
            ].map(({ key, icon: Icon, bg, color }) => (
              <StaggerItem key={key} className="h-full">
                <div className="h-full rounded-2xl bg-white p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1">
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${bg} ${color}`}>
                    <Icon size={32} />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-gray-800">{tr(`EXCAVATORS.SERVICES.${key}.TITLE`)}</h4>
                  <p className="text-sm text-gray-600">{tr(`EXCAVATORS.SERVICES.${key}.DESC`)}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Process */}
        <Reveal className="mb-12 rounded-2xl bg-white p-8 shadow-lg">
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-800">{tr('EXCAVATORS.PROCESS.TITLE')}</h3>
          <Stagger className="grid gap-6 md:grid-cols-4" stagger={0.1}>
            {[1, 2, 3, 4].map((step) => (
              <StaggerItem key={step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  {step}
                </div>
                <h4 className="mb-2 font-bold text-gray-800">{tr(`EXCAVATORS.PROCESS.STEP_${step}.TITLE`)}</h4>
                <p className="text-sm text-gray-600">{tr(`EXCAVATORS.PROCESS.STEP_${step}.DESC`)}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        {/* CTA */}
        <Reveal className="rounded-2xl bg-gradient-to-r from-primary to-dark p-8 text-center text-white md:p-12">
          <h3 className="mb-4 text-2xl font-bold">{tr('EXCAVATORS.CTA.TITLE')}</h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-200">{tr('EXCAVATORS.CTA.DESCRIPTION')}</p>
          <Link
            href={inquiryHref({ product: 'Excavators', type: 'buying' })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-gray-100"
          >
            <Phone size={20} />
            {tr('EXCAVATORS.CTA.CONTACT')}
          </Link>
        </Reveal>
      </div>
    </div>
  );
}