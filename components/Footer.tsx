// components/Footer.tsx
'use client';

import Link from 'next/link';
import { Instagram, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from './LanguageProvider';

export default function Footer() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  const navItems = [
    { href: '/', label: getString('HEADER.NAV.TOP') },
    { href: '/about', label: getString('HEADER.NAV.ABOUT') },
    { href: '/service', label: getString('HEADER.NAV.SERVICE') },
    { href: '/plan', label: getString('HEADER.NAV.PLAN') },
    { href: '/contact', label: getString('HEADER.NAV.CONTACT') },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{getString('HEADER.COMPANY_NAME')}</h3>
            <p className="text-gray-400 mb-4 text-sm">
              {getString('FOOTER.DESCRIPTION')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{getString('FOOTER.MENU')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{getString('FOOTER.CONTACT_INFO')}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>{getString('FOOTER.EMAIL')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>{getString('FOOTER.PHONE')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{getString('FOOTER.LOCATION')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>{getString('FOOTER.COPYRIGHT')}</p>
        </div>
      </div>
    </footer>
  );
}