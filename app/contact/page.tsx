// app/contact/page.tsx
'use client';

import { Mail, Phone, MapPin, Clock, HelpCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

export default function ContactPage() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  const getArray = (key: string): string[] => {
    const value = t(key);
    return Array.isArray(value) ? value : [];
  };

  // Safe object access for inquiry types
  const getInquiryType = (key: string): string => {
    const types = t('CONTACT.FORM.TYPE_OPTIONS');
    if (typeof types === 'object' && types !== null && !Array.isArray(types)) {
      return (types as Record<string, string>)[key] || key;
    }
    return key;
  };

  const privacySections = [
    'SECTION1', 'SECTION2', 'SECTION3', 'SECTION4', 
    'SECTION5', 'SECTION6', 'SECTION7', 'SECTION8'
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('CONTACT.PAGE_TITLE')}
        subtitle={getString('CONTACT.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {getString('CONTACT.FORM.TITLE')}
            </h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getString('CONTACT.FORM.NAME')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={getString('CONTACT.FORM.NAME_PLACEHOLDER')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getString('CONTACT.FORM.EMAIL')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={getString('CONTACT.FORM.EMAIL_PLACEHOLDER')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getString('CONTACT.FORM.PHONE')}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={getString('CONTACT.FORM.PHONE_PLACEHOLDER')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getString('CONTACT.FORM.TYPE')} <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="">{getInquiryType('SELECT')}</option>
                  <option value="buying">{getInquiryType('BUYING')}</option>
                  <option value="recycle">{getInquiryType('RECYCLE')}</option>
                  <option value="quote">{getInquiryType('QUOTE')}</option>
                  <option value="other">{getInquiryType('OTHER')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getString('CONTACT.FORM.MESSAGE')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder={getString('CONTACT.FORM.MESSAGE_PLACEHOLDER')}
                ></textarea>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  <a href="#privacy-policy" className="text-primary underline hover:no-underline">
                    {getString('CONTACT.FORM.PRIVACY_LINK')}
                  </a>
                  {getString('CONTACT.FORM.PRIVACY')} <span className="text-red-500">*</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-dark transition-colors duration-200"
              >
                {getString('CONTACT.FORM.SUBMIT')}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              {getString('CONTACT.FORM.NOTE')}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {getString('CONTACT.INFO.TITLE')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">{getString('CONTACT.INFO.EMAIL_LABEL')}</h4>
                    <p className="text-primary font-medium">{getString('FOOTER.EMAIL')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">{getString('CONTACT.INFO.PHONE_LABEL')}</h4>
                    <p className="text-gray-600">{getString('CONTACT.INFO.PHONE_DESC')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">{getString('CONTACT.INFO.LOCATION_LABEL')}</h4>
                    <p className="text-gray-600">{getString('FOOTER.LOCATION')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">{getString('CONTACT.INFO.HOURS_LABEL')}</h4>
                    <p className="text-gray-600">{getString('CONTACT.INFO.HOURS_VALUE')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-primary to-dark rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">{getString('CONTACT.URGENT.TITLE')}</h3>
              <p className="text-green-100 mb-6">
                {getString('CONTACT.URGENT.DESC')}
              </p>
              <div className="flex space-x-4">
                <button className="flex-1 bg-white text-primary py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  {getString('CONTACT.URGENT.PHONE_BUTTON')}
                </button>
                <button className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-colors">
                  {getString('CONTACT.URGENT.LINE_BUTTON')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Policy Section */}
        <section id="privacy-policy" className="mt-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              {getString('CONTACT.PRIVACY_POLICY.TITLE')}
            </h2>
            
            <div className="prose prose-gray max-w-none text-sm text-gray-600 space-y-6">
              <p>{getString('CONTACT.PRIVACY_POLICY.INTRO')}</p>

              {privacySections.map((section) => (
                <div key={section} className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">
                    {getString(`CONTACT.PRIVACY_POLICY.${section}.TITLE`)}
                  </h3>
                  {section === 'SECTION2' ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <th className="text-left py-2 w-1/4">
                              {getString(`CONTACT.PRIVACY_POLICY.${section}.COMPANY_NAME`)}
                            </th>
                            <td>{getString('HEADER.COMPANY_NAME')}</td>
                          </tr>
                          <tr>
                            <th className="text-left py-2">
                              {getString(`CONTACT.PRIVACY_POLICY.${section}.REPRESENTATIVE`)}
                            </th>
                            <td>{getString('ABOUT.INFO.REPRESENTATIVE_VALUE')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : section === 'SECTION4' ? (
                    <>
                      <p>{getString(`CONTACT.PRIVACY_POLICY.${section}.CONTENT`)}</p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        {getArray(`CONTACT.PRIVACY_POLICY.${section}.PURPOSES`).map((purpose, idx) => (
                          <li key={idx}>{purpose}</li>
                        ))}
                      </ol>
                    </>
                  ) : section === 'SECTION8' ? (
                    <>
                      <p>{getString(`CONTACT.PRIVACY_POLICY.${section}.CONTENT`)}</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <th className="text-left py-2 w-1/4">
                                {getString(`CONTACT.PRIVACY_POLICY.${section}.COMPANY_LABEL`)}
                              </th>
                              <td>{getString('HEADER.COMPANY_NAME')}</td>
                            </tr>
                            <tr>
                              <th className="text-left py-2">
                                {getString(`CONTACT.PRIVACY_POLICY.${section}.EMAIL_LABEL`)}
                              </th>
                              <td>{getString('FOOTER.EMAIL')}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <p>{getString(`CONTACT.PRIVACY_POLICY.${section}.CONTENT`)}</p>
                  )}
                </div>
              ))}

              <p className="text-xs text-gray-500 pt-4 border-t">
                {getString('CONTACT.PRIVACY_POLICY.DATE')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}