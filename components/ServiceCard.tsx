// components/ServiceCard.tsx
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export default function ServiceCard({ 
  icon, 
  title, 
  description, 
  href = '/service',
  className = ''
}: ServiceCardProps) {
  const CardContent = (
    <div className={`group block bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full ${className}`}>
      <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}