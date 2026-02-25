// app/about/page.tsx
'use client';

import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

export default function AboutPage() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  const getArray = (key: string): string[] => {
    const value = t(key);
    return Array.isArray(value) ? value : [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('ABOUT.PAGE_TITLE')}
        subtitle={getString('ABOUT.PAGE_SUBTITLE')}
      />

      {/* Message from President */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">
              {getString('ABOUT.MESSAGE.TITLE')}
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>{getString('ABOUT.MESSAGE.P1')}</p>
              <p>{getString('ABOUT.MESSAGE.P2')}</p>
              <p>{getString('ABOUT.MESSAGE.P3')}</p>
              <p>{getString('ABOUT.MESSAGE.P4')}</p>
            </div>

            <div className="mt-12 text-right">
              <p className="text-gray-800 font-medium">{getString('ABOUT.MESSAGE.COMPANY')}</p>
              <p className="text-xl font-bold text-primary mt-2">{getString('ABOUT.MESSAGE.PRESIDENT')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10 md:mb-12">
            {getString('ABOUT.INFO.TITLE')}
          </h2>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl">
            <dl className="divide-y divide-gray-100">
              {/* Company Name */}
              <div className="px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-6 hover:bg-gray-50/50 transition-colors">
                <dt className="text-base font-semibold text-gray-700 sm:col-span-1">
                  {getString('ABOUT.INFO.COMPANY_NAME')}
                </dt>
                <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
                  {getString('ABOUT.INFO.COMPANY_NAME_VALUE')}  {/* ← add this key too if you want to translate company name */}
                </dd>
              </div>

              {/* Co-Founders */}
              <div className="px-6 py-6 sm:grid sm:grid-cols-3 sm:gap-6 hover:bg-gray-50/50 transition-colors">
                <dt className="text-base font-semibold text-gray-700 sm:col-span-1 pt-1">
                  {getString('ABOUT.INFO.CO_FOUNDERS')}
                </dt>
                <dd className="mt-1 sm:col-span-2 sm:mt-0 space-y-6">
                  {/* President */}
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-medium text-gray-800 min-w-[127px]">
                        {getString('ABOUT.INFO.PRESIDENT')}:
                      </span>
                      <span className="text-gray-900">SOK SOPHANN</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 pl-[140px]">
                      s.phann@kks2026.com
                    </p>
                  </div>

                  {/* Vice President */}
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-medium text-gray-800 min-w-[127px]">
                        {getString('ABOUT.INFO.VICE_PRESIDENT')}:
                      </span>
                      <span className="text-gray-900">KEAN SOKKKHAN</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 pl-[140px]">
                      kks2026@k.sokhan.com • info@kks2026.com
                    </p>
                  </div>
                </dd>
              </div>

              {/* Location */}
              <div className="px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-6 hover:bg-gray-50/50 transition-colors">
                <dt className="text-base font-semibold text-gray-700 sm:col-span-1">
                  {getString('ABOUT.INFO.HEAD_OFFICE_BRANCH')}
                </dt>
                <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0 space-y-4 text-sm leading-relaxed">
                  <div>
                    {getString('ABOUT.INFO.ADDRESS_NARA')}
                  </div>
                  <div>
                    {getString('ABOUT.INFO.ADDRESS_OSAKA')}
                  </div>
                </dd>
              </div>

              {/* Contact */}
              <div className="px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-6 hover:bg-gray-50/50 transition-colors">
                <dt className="text-base font-semibold text-gray-700 sm:col-span-1">
                  {getString('ABOUT.INFO.CONTACT')}
                </dt>
                <dd className="mt-1 sm:col-span-2 sm:mt-0 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:gap-8">
                    <div>
                      <span className="font-medium text-gray-700">
                        {getString('ABOUT.INFO.TEL_PRESIDENT')}:
                      </span>{' '}
                      +855 85 998 299 / +855 90 995 6999
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        {getString('ABOUT.INFO.TEL_VICE_PRESIDENT')}:
                      </span>{' '}
                      +81 90 8521 5588
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      {getString('ABOUT.INFO.EMAIL')}:
                    </span>{' '}
                    <a href="mailto:info@kks2026.com" className="text-primary hover:underline">
                      info@kks2026.com
                    </a>
                    {' • '}
                    <a href="mailto:s.phann@kks2026.com" className="text-primary hover:underline">
                      s.phann@kks2026.com
                    </a>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      {getString('ABOUT.INFO.WEBSITE')}:
                    </span>{' '}
                    <a
                      href="https://www.kks2026.com"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.kks2026.com
                    </a>
                  </div>
                </dd>
              </div>

              {/* Business Areas */}
              <div className="px-6 py-6 sm:grid sm:grid-cols-3 sm:gap-6 hover:bg-gray-50/50 transition-colors">
                <dt className="text-base font-semibold text-gray-700 sm:col-span-1">
                  {getString('ABOUT.INFO.BUSINESS')}
                </dt>
                <dd className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex flex-wrap gap-2">
                    {getArray('ABOUT.INFO.BUSINESS_ITEMS').map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}