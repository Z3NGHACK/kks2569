'use client';

import { useEffect, useState, useRef, type RefObject } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Truck, Leaf, Phone, Droplets, Wind, Sun, ShieldCheck, Sprout, Clock } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

// --- SCROLL ANIMATION HOOK ---
function useInView(options = { threshold: 0.15 }): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); if (ref.current) observer.unobserve(ref.current); }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold]);
  return [ref, isInView];
}

// --- DATA (Enhanced with application and storage details) ---
const fertilizerProducts = [
  {
    id: 'ka2-tt',
    name: 'KA2-tt',
    jaName: '発酵鶏ふん (KA2-tt)',
    type: 'Special Granula',
    description: 'High-quality fermented chicken manure granules. Optimized for root development with balanced Phosphorus and Potassium. Ideal for early-stage crops and root vegetables.',
    image: '/images/fertilizer/KA2-tt.jpg',
    specs: [
      { label: 'Nitrogen (N)', value: '2.4', max: 10, color: 'bg-green-500', icon: <Wind size={18} /> },
      { label: 'Phosphorus (P₂O₅)', value: '4.55', max: 10, color: 'bg-blue-500', icon: <Sun size={18} /> },
      { label: 'Potassium (K₂O)', value: '3.7', max: 10, color: 'bg-orange-500', icon: <Droplets size={18} /> },
      { label: 'Moisture', value: '17.1', max: 30, color: 'bg-cyan-500', icon: <Droplets size={18} /> },
      { label: 'C/N Ratio', value: '9.5', max: 20, color: 'bg-purple-500', icon: <Wind size={18} /> },
      { label: 'Organic Matter', value: '0', max: 60, color: 'bg-yellow-500', icon: <Leaf size={18} /> },
    ],
    highlight: 'High Solubility',
    application: ['Apply 150-200kg per 10 acres for base fertilizer.', 'Top dressing during vegetative stage.', 'Water moderately after application to activate solubility.'],
    storage: 'Store in a dry, ventilated place. Avoid direct sunlight and rain. Seal bag tightly after opening.'
  },
  {
    id: 'nib-pt',
    name: 'NIB-pt',
    jaName: '発酵鶏ふん (NIB-pt)',
    type: 'Special Granula',
    description: 'Premium organic fertilizer rich in Organic Matter (51.5%). Ensures fast nutrient release and significant soil structure improvement. Perfect for degraded soils and long-term crops.',
    image: '/images/fertilizer/NIB-pt.jpg',
    specs: [
      { label: 'Nitrogen (N)', value: '3.0', max: 10, color: 'bg-green-500', icon: <Wind size={18} /> },
      { label: 'Phosphorus (P₂O₅)', value: '5.0', max: 10, color: 'bg-blue-500', icon: <Sun size={18} /> },
      { label: 'Potassium (K₂O)', value: '4.0', max: 10, color: 'bg-orange-500', icon: <Droplets size={18} /> },
      { label: 'Moisture', value: '13.5', max: 30, color: 'bg-cyan-500', icon: <Droplets size={18} /> },
      { label: 'C/N Ratio', value: '7.0', max: 20, color: 'bg-purple-500', icon: <Wind size={18} /> },
      { label: 'Organic Matter', value: '51.5', max: 60, color: 'bg-yellow-500', icon: <Leaf size={18} /> },
    ],
    highlight: 'Rich in Organic Matter',
    application: ['Apply 200-250kg per 10 acres as base fertilizer.', 'Mix thoroughly into soil before planting.', 'Reduces need for chemical nitrogen top-dressing.'],
    storage: 'Keep below 25°C. High organic matter content can degrade if exposed to excessive heat and moisture.'
  }
];

export default function FertilizerDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  // Section Animation Refs
  const [specsRef, specsInView] = useInView();
  const [applyRef, applyInView] = useInView();
  const [benefitsRef, benefitsInView] = useInView();

  const product = fertilizerProducts.find((p) => p.id === params.id);
  const getString = (key: string): string => { const value = t(key); return typeof value === 'string' ? value : key; };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/service/fertilizers" className="text-green-600 font-semibold hover:underline">View All Fertilizers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero variant="page" title={product.name} subtitle={product.jaName} />

      <div className={`container mx-auto px-4 py-12 max-w-7xl transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <Link href="../" className="inline-flex items-center text-gray-500 hover:text-primary mb-10 transition-colors text-sm font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to All Fertilizers
        </Link>

        {/* ===== HERO SECTION ===== */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden mb-20 border border-gray-100">
          <div className="grid md:grid-cols-2">
            <div className="relative h-80 md:h-auto bg-gray-100 overflow-hidden group">
              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-green-100">
                <span className="text-green-700 font-bold text-xs uppercase tracking-wider flex items-center"><Leaf size={14} className="mr-1.5" />{product.type}</span>
              </div>
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-green-100/40 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-bold border border-green-100 mb-6">{product.highlight}</div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">{product.name}</h2>
                <p className="text-gray-500 text-lg mb-8">{product.jaName}</p>
                <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SPECIFICATIONS DASHBOARD ===== */}
        <section ref={specsRef as React.RefObject<HTMLDivElement>} className={`mb-20 transition-all duration-700 ease-out ${specsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h3 className="text-3xl font-bold text-gray-900 mb-10 flex items-center">
            <div className="w-2 h-10 bg-primary rounded-full mr-4"></div> Technical Data Sheet
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.specs.map((spec, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group" style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-bold text-gray-700">{spec.label}</span>
                  <span className="text-gray-400 group-hover:text-primary transition-colors">{spec.icon}</span>
                </div>
                <p className="text-4xl font-black text-gray-900 mb-3">{spec.value}{spec.label.includes('Ratio') || spec.label.includes('Matter') ? '%' : '%'}</p>
                {/* Visual Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className={`${spec.color} h-2.5 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${(parseFloat(spec.value) / spec.max) * 100}%`, transitionDelay: `${idx * 100 + 300}ms` }}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex items-center text-sm text-blue-700 bg-blue-50 p-5 rounded-xl border border-blue-100">
            <Clock className="h-5 w-5 mr-3 flex-shrink-0" /> High solubility observed within 45 minutes of application.
          </div>
        </section>

        {/* ===== APPLICATION & STORAGE ===== */}
        <section ref={applyRef as React.RefObject<HTMLDivElement>} className={`mb-20 transition-all duration-700 ease-out delay-200 ${applyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="grid md:grid-cols-5 gap-8">
            {/* Application Guide */}
            <div className="md:col-span-3 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center"><Sprout className="text-primary mr-3" /> Application Guide</h3>
              <div className="space-y-6">
                {product.application.map((step, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1 flex-shrink-0">{idx + 1}</div>
                    <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage & Safety */}
            <div className="md:col-span-2 bg-gray-800 text-white p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
              <h3 className="text-2xl font-bold mb-6 flex items-center relative z-10"><ShieldCheck className="text-green-400 mr-3" /> Storage & Safety</h3>
              <p className="text-gray-300 leading-relaxed relative z-10">{product.storage}</p>
              <div className="mt-8 pt-6 border-t border-gray-700 relative z-10">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Quality Guarantee</p>
                <p className="text-green-400 font-bold text-lg">Lab Tested in Japan</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHY NPK MATTERS ===== */}
        <section ref={benefitsRef as React.RefObject<HTMLDivElement>} className={`mb-20 transition-all duration-700 ease-out delay-400 ${benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">Why NPK Matters</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-green-500 text-center hover:-translate-y-2 transition-all duration-300">
              <Wind className="text-green-500 mx-auto mb-4" size={40} />
              <h4 className="font-bold text-gray-800 text-xl mb-3">Nitrogen (N)</h4>
              <p className="text-gray-600">Promotes rapid leaf and stem growth. Essential for chlorophyll production and lush, green foliage.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-blue-500 text-center hover:-translate-y-2 transition-all duration-300">
              <Sun className="text-blue-500 mx-auto mb-4" size={40} />
              <h4 className="font-bold text-gray-800 text-xl mb-3">Phosphorus (P)</h4>
              <p className="text-gray-600">Stimulates strong root development and flowering. Critical for energy transfer within the plant.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-orange-500 text-center hover:-translate-y-2 transition-all duration-300">
              <Droplets className="text-orange-500 mx-auto mb-4" size={40} />
              <h4 className="font-bold text-gray-800 text-xl mb-3">Potassium (K)</h4>
              <p className="text-gray-600">Enhances overall plant health. Improves drought resistance, disease immunity, and fruit quality.</p>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-3xl p-10 md:p-14 text-center shadow-xl relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <h3 className="text-3xl font-bold mb-4 relative z-10">Interested in {product.name}?</h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto relative z-10">Contact our sales team for pricing, bulk order discounts, and shipping schedules to Cambodia and Vietnam.</p>
          <Link href="/contact" className="relative z-10 inline-flex items-center bg-white text-green-700 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg hover:scale-105 transform transition-all duration-200">
            <Phone className="mr-2" size={20} /> Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}