// app/page.tsx
'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Recycle, Leaf, Forklift, Cuboid, Shapes } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';
import SdgWheel from '@/components/SdgWheel';


// --- CUSTOM SCROLL ANIMATION HOOK --- // Make sure RefObject is imported
function useInView(options = { threshold: 0.1 }): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Ensure ref.current exists before unobserving
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options.threshold]); // Depend on threshold

  return [ref, isInView];
}

// --- DATA ---
const businessLines = [
  {
    id: 'recycle',
    icon: <Recycle size={36} />,
    titleKey: 'HOME.SERVICES.RECYCLE.TITLE',
    descKey: 'HOME.SERVICES.RECYCLE.DESCRIPTION',
    href: '/service#plastic',
    images: [
      '/images/home/recycle-1.jpg', '/images/home/recycle-2.jpg', '/images/home/recycle-3.jpg',
      '/images/home/recycle-4.jpg', '/images/home/recycle-5.jpg', '/images/home/recycle-6.jpg'
    ]
  },
  {
    id: 'fertilizer',
    icon: <Leaf size={36} />,
    titleKey: 'HOME.SERVICES.FERTILIZER.TITLE',
    descKey: 'HOME.SERVICES.FERTILIZER.DESCRIPTION',
    href: '/service#fertilizer',
    images: [
      '/images/home/fertilizer-1.jpg', '/images/home/fertilizer-2.jpg', '/images/home/fertilizer-3.jpg',
      '/images/home/fertilizer-4.jpg', '/images/home/fertilizer-5.jpg', '/images/home/fertilizer-6.jpg'
    ]
  },
  {
    id: 'machinery',
    icon: <Forklift size={36} />,
    titleKey: 'HOME.SERVICES.MACHINERY.TITLE',
    descKey: 'HOME.SERVICES.MACHINERY.DESCRIPTION',
    href: '/service#machinery',
    images: [
      '/images/home/machinery-1.jpg', '/images/home/machinery-2.jpg', '/images/home/machinery-3.jpg',
      '/images/home/machinery-4.jpg', '/images/home/machinery-5.jpg', '/images/home/machinery-6.jpg'
    ]
  },
  {
    id: 'metal',
    icon: <Cuboid size={36} />,
    titleKey: 'HOME.SERVICES.METAL.TITLE',
    descKey: 'HOME.SERVICES.METAL.DESCRIPTION',
    href: '/service#metal',
    images: [
      '/images/home/metal-1.jpg', '/images/home/metal-2.jpg', '/images/home/metal-3.jpg',
      '/images/home/metal-4.jpg', '/images/home/metal-5.jpg', '/images/home/metal-6.jpg'
    ]
  },
  {
    id: 'other',
    icon: <Shapes size={36} />,
    titleKey: 'HOME.SERVICES.OTHER.TITLE',
    descKey: 'HOME.SERVICES.OTHER.DESCRIPTION',
    href: '/service#other',
    images: [
      '/images/home/other-1.jpg', '/images/home/other-2.jpg', '/images/home/other-3.jpg',
      '/images/home/other-4.jpg', '/images/home/other-5.jpg', '/images/home/other-6.jpg'
    ]
  }
];

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

      {/* ===== VISUAL SERVICES SECTION ===== */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">{getString('HOME.SERVICES.TITLE')}</h2>
        </div>

        <div className="space-y-00">
          {businessLines.map((business, index) => {
            const isReversed = index % 2 !== 0; 
            // Hook triggers animation when section enters viewport
            const [sectionRef, isInView] = useInView({ threshold: 0.15 });

            return (
              // 1. Added 'relative' so the absolute glow stays inside this section
              <div 
                key={business.id} 
                ref={sectionRef as React.RefObject<HTMLDivElement>}
                className={`relative py-5 overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'}`}
              >
                
                {/* 2. Decorative Corner Glow (Moved to Main Section) */}
                <div className={`
                  absolute 
                  w-[1000px] h-[400px]             
                  bg-emerald-900/15               
                  rounded-full 
                  blur-3xl 
                  pointer-events-none
                  -bottom-[250px]                 
                  /* If text is left, glow bottom-left. If text is right, glow bottom-right */
                  ${isReversed ? '-right-[400px]' : '-left-[400px]'}
                `}></div>

                <div className="container mx-auto px-4">
                  <div className="grid lg:grid-cols-2 gap-8 items-center px-6">
                    
                    {/* Text Column - ANIMATED */}
                    {/* 3. Removed overflow-hidden and the glow div from here */}
                    <div className={`${isReversed ? 'lg:order-2' : 'lg:order-1'} transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${isReversed ? 'translate-x-24' : '-translate-x-24'}`}`}>
                      
                      {/* Content Wrapper */}
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                          {business.icon}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                          {getString(business.titleKey)}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                          {getString(business.descKey)}
                        </p>
                        <Link 
                          href={business.href}
                          className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-dark transition-all duration-300 shadow-lg group hover:scale-105*105"
                        >
                          Learn More
                          <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
                        </Link>
                      </div>
                    </div>

                    {/* Image Grid Column - ANIMATED */}
                    <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'} transition-all duration-1000 ease-out delay-300 ${isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${isReversed ? '-translate-x-24' : 'translate-x-24'}`}`}>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {business.images.map((imgSrc, imgIndex) => (
                          <div 
                            key={imgIndex} 
                            className={`
                              relative overflow-hidden rounded-xl shadow-md bg-gray-100 group
                              ${imgIndex === 0 || imgIndex === 3 ? 'h-52 md:h-64' : 'h-52 md:h-64'}
                              transition-all duration-700 ease-out
                              ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                            `}
                            style={{ transitionDelay: `${imgIndex * 100 + 400}ms` }}
                          >
                            <Image
                              src={imgSrc}
                              alt={`${business.id} image ${imgIndex + 1}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 768px) 50vw, 30vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 -translate-x-full"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
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