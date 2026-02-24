// app/page.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Recycle, Truck, Wrench, Globe } from 'lucide-react';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { useTranslation } from '@/components/LanguageProvider';

export default function Home() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  return (
    <div>
      <Hero variant="home" />

      {/* Mission Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">{getString('HOME.MISSION.TITLE')}</h2>
          <p className="section-subtitle">
            {getString('HOME.MISSION.SUBTITLE')}
          </p>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">{getString('HOME.SERVICES.TITLE')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Recycle size={40} />}
              title={getString('HOME.SERVICES.RECYCLE.TITLE')}
              description={getString('HOME.SERVICES.RECYCLE.DESCRIPTION')}
              href="/service"
            />
            <ServiceCard
              icon={<Truck size={40} />}
              title={getString('HOME.SERVICES.BUYING.TITLE')}
              description={getString('HOME.SERVICES.BUYING.DESCRIPTION')}
              href="/service"
            />
            <ServiceCard
              icon={<Wrench size={40} />}
              title={getString('HOME.SERVICES.MACHINERY.TITLE')}
              description={getString('HOME.SERVICES.MACHINERY.DESCRIPTION')}
              href="/service"
            />
            <ServiceCard
              icon={<Globe size={40} />}
              title={getString('HOME.SERVICES.GLOBAL.TITLE')}
              description={getString('HOME.SERVICES.GLOBAL.DESCRIPTION')}
              href="/service"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {getString('HOME.CTA.TITLE')}
          </h2>
          <p className="text-lg mb-8 text-green-100 max-w-2xl mx-auto">
            {getString('HOME.CTA.SUBTITLE')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            {getString('HOME.CTA.BUTTON')}
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}