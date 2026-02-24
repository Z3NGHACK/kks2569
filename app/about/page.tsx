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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            {getString('ABOUT.INFO.TITLE')}
          </h2>
          
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left bg-gray-100 w-1/3 font-medium text-gray-700">
                    {getString('ABOUT.INFO.COMPANY_NAME')}
                  </th>
                  <td className="px-6 py-4 text-gray-800">{getString('ABOUT.INFO.COMPANY_NAME_VALUE')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left bg-gray-100 font-medium text-gray-700">
                    {getString('ABOUT.INFO.REPRESENTATIVE')}
                  </th>
                  <td className="px-6 py-4 text-gray-800">{getString('ABOUT.INFO.REPRESENTATIVE_VALUE')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left bg-gray-100 font-medium text-gray-700">
                    {getString('ABOUT.INFO.LOCATION')}
                  </th>
                  <td className="px-6 py-4 text-gray-800">{getString('ABOUT.INFO.LOCATION_VALUE')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left bg-gray-100 font-medium text-gray-700">
                    {getString('ABOUT.INFO.EMAIL')}
                  </th>
                  <td className="px-6 py-4 text-gray-800">{getString('ABOUT.INFO.EMAIL_VALUE')}</td>
                </tr>
                <tr>
                  <th className="px-6 py-4 text-left bg-gray-100 font-medium text-gray-700">
                    {getString('ABOUT.INFO.BUSINESS')}
                  </th>
                  <td className="px-6 py-4 text-gray-800">
                    <ul className="list-disc list-inside space-y-1">
                      {getArray('ABOUT.INFO.BUSINESS_ITEMS').map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}