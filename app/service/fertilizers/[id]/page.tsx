'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Droplets,
  Leaf,
  ShieldCheck,
  Sprout,
  Sun,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import Hero from '@/components/Hero';
import { EASE_OUT, Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useTr } from '@/lib/useTr';
import { inquiryHref } from '@/lib/inquiry';

// --- DATA ---
const fertilizerProducts: {
  id: string;
  name: string;
  jaName: string;
  type: string;
  description: string;
  image: string;
  specs: { label: string; value: string; max: number; color: string; icon: LucideIcon }[];
  highlight: string;
  application: string[];
  storage: string;
}[] = [
  {
    id: 'ka2-tt',
    name: 'KA2-tt',
    jaName: '発酵鶏ふん (KA2-tt)',
    type: 'Special Granula',
    description:
      'High-quality fermented chicken manure granules. Optimized for root development with balanced Phosphorus and Potassium. Ideal for early-stage crops and root vegetables.',
    image: '/images/fertilizer/KA2-tt.jpg',
    specs: [
      { label: 'Nitrogen (N)', value: '2.4', max: 10, color: 'bg-green-500', icon: Wind },
      { label: 'Phosphorus (P₂O₅)', value: '4.55', max: 10, color: 'bg-blue-500', icon: Sun },
      { label: 'Potassium (K₂O)', value: '3.7', max: 10, color: 'bg-orange-500', icon: Droplets },
      { label: 'Moisture', value: '17.1', max: 30, color: 'bg-cyan-500', icon: Droplets },
      { label: 'C/N Ratio', value: '9.5', max: 20, color: 'bg-purple-500', icon: Wind },
      { label: 'Organic Matter', value: '0', max: 60, color: 'bg-yellow-500', icon: Leaf },
    ],
    highlight: 'High Solubility',
    application: [
      'Apply 150-200kg per 10 acres for base fertilizer.',
      'Top dressing during vegetative stage.',
      'Water moderately after application to activate solubility.',
    ],
    storage: 'Store in a dry, ventilated place. Avoid direct sunlight and rain. Seal bag tightly after opening.',
  },
  {
    id: 'nib-pt',
    name: 'NIB-pt',
    jaName: '発酵鶏ふん (NIB-pt)',
    type: 'Special Granula',
    description:
      'Premium organic fertilizer rich in Organic Matter (51.5%). Ensures fast nutrient release and significant soil structure improvement. Perfect for degraded soils and long-term crops.',
    image: '/images/fertilizer/NIB-pt.jpg',
    specs: [
      { label: 'Nitrogen (N)', value: '3.0', max: 10, color: 'bg-green-500', icon: Wind },
      { label: 'Phosphorus (P₂O₅)', value: '5.0', max: 10, color: 'bg-blue-500', icon: Sun },
      { label: 'Potassium (K₂O)', value: '4.0', max: 10, color: 'bg-orange-500', icon: Droplets },
      { label: 'Moisture', value: '13.5', max: 30, color: 'bg-cyan-500', icon: Droplets },
      { label: 'C/N Ratio', value: '7.0', max: 20, color: 'bg-purple-500', icon: Wind },
      { label: 'Organic Matter', value: '51.5', max: 60, color: 'bg-yellow-500', icon: Leaf },
    ],
    highlight: 'Rich in Organic Matter',
    application: [
      'Apply 200-250kg per 10 acres as base fertilizer.',
      'Mix thoroughly into soil before planting.',
      'Reduces need for chemical nitrogen top-dressing.',
    ],
    storage: 'Keep below 25°C. High organic matter content can degrade if exposed to excessive heat and moisture.',
  },
];

const npkBenefits: { key: string; icon: LucideIcon; border: string; iconColor: string }[] = [
  { key: 'N', icon: Wind, border: 'border-green-500', iconColor: 'text-green-500' },
  { key: 'P', icon: Sun, border: 'border-blue-500', iconColor: 'text-blue-500' },
  { key: 'K', icon: Droplets, border: 'border-orange-500', iconColor: 'text-orange-500' },
];

export default function FertilizerDetailPage() {
  const params = useParams();
  const tr = useTr();
  const product = fertilizerProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            {tr('FERTILIZER_DETAIL.NOT_FOUND', 'Product not found')}
          </h1>
          <Link href="/service#fertilizer" className="font-semibold text-green-600 hover:underline">
            {tr('FERTILIZER_DETAIL.VIEW_ALL', 'View all fertilizers')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero variant="page" title={product.name} subtitle={product.jaName} />

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <Link
          href="/service#fertilizer"
          className="group mb-10 inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
          {tr('FERTILIZER_DETAIL.BACK', 'Back to all fertilizers')}
        </Link>

        {/* ===== HERO SECTION ===== */}
        <Reveal className="mb-16 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="group relative h-80 overflow-hidden bg-gray-100 md:h-auto">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full border border-green-100 bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
                <span className="flex items-center text-xs font-bold uppercase tracking-wider text-green-700">
                  <Leaf size={14} className="mr-1.5" />
                  {product.type}
                </span>
              </div>
            </div>
            <div className="relative flex flex-col justify-center overflow-hidden p-10 md:p-14">
              <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-green-100/40 blur-3xl" />
              <div className="relative z-10">
                <div className="mb-6 inline-block rounded-lg border border-green-100 bg-green-50 px-4 py-1.5 text-sm font-bold text-green-700">
                  {product.highlight}
                </div>
                <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-black leading-tight text-transparent md:text-5xl">
                  {product.name}
                </h2>
                <p className="mb-8 text-lg text-gray-500">{product.jaName}</p>
                <p className="text-lg leading-relaxed text-gray-700">{product.description}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===== SPECIFICATIONS DASHBOARD ===== */}
        <section className="mb-20">
          <Reveal>
            <h3 className="mb-10 flex items-center text-3xl font-bold text-gray-900">
              <div className="mr-4 h-10 w-2 rounded-full bg-primary" />
              {tr('FERTILIZER_DETAIL.SPECS_TITLE', 'Technical Data Sheet')}
            </h3>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.08}>
            {product.specs.map((spec) => (
              <StaggerItem key={spec.label}>
                <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-base font-bold text-gray-700">{spec.label}</span>
                    <spec.icon size={18} className="text-gray-400 transition-colors group-hover:text-primary" />
                  </div>
                  <p className="mb-3 text-4xl font-black text-gray-900">{spec.value}%</p>
                  <div className="h-2.5 w-full rounded-full bg-gray-100">
                    <motion.div
                      className={`h-2.5 rounded-full ${spec.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(parseFloat(spec.value) / spec.max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: EASE_OUT }}
                    />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-8 flex items-center rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-700">
            <Clock className="mr-3 h-5 w-5 flex-shrink-0" />
            {tr('FERTILIZER_DETAIL.SOLUBILITY_NOTE', 'High solubility observed within 45 minutes of application.')}
          </Reveal>
        </section>

        {/* ===== APPLICATION & STORAGE ===== */}
        <section className="mb-20 grid gap-8 md:grid-cols-5">
          <Reveal className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:col-span-3 md:p-10">
            <h3 className="mb-8 flex items-center text-2xl font-bold text-gray-900">
              <Sprout className="mr-3 text-primary" />
              {tr('FERTILIZER_DETAIL.APPLICATION_TITLE', 'Application Guide')}
            </h3>
            <Stagger className="space-y-6" stagger={0.1}>
              {product.application.map((step, idx) => (
                <StaggerItem key={idx} className="flex items-start">
                  <div className="mr-4 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                    {idx + 1}
                  </div>
                  <p className="text-lg leading-relaxed text-gray-700">{step}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal
            className="relative overflow-hidden rounded-2xl bg-gray-800 p-8 text-white shadow-sm md:col-span-2 md:p-10"
            delay={0.15}
          >
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/5 blur-xl" />
            <h3 className="relative z-10 mb-6 flex items-center text-2xl font-bold">
              <ShieldCheck className="mr-3 text-green-400" />
              {tr('FERTILIZER_DETAIL.STORAGE_TITLE', 'Storage & Safety')}
            </h3>
            <p className="relative z-10 leading-relaxed text-gray-300">{product.storage}</p>
            <div className="relative z-10 mt-8 border-t border-gray-700 pt-6">
              <p className="mb-2 text-xs uppercase tracking-wider text-gray-500">
                {tr('FERTILIZER_DETAIL.QUALITY_LABEL', 'Quality Guarantee')}
              </p>
              <p className="text-lg font-bold text-green-400">
                {tr('FERTILIZER_DETAIL.QUALITY_VALUE', 'Lab Tested in Japan')}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== WHY NPK MATTERS ===== */}
        <section className="mb-20">
          <Reveal className="mb-10 text-center">
            <h3 className="text-3xl font-bold text-gray-900">
              {tr('FERTILIZER_DETAIL.NPK_TITLE', 'Why N-P-K Matters')}
            </h3>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.12}>
            {npkBenefits.map((benefit) => (
              <StaggerItem key={benefit.key}>
                <div
                  className={`h-full rounded-2xl border-t-4 ${benefit.border} bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2`}
                >
                  <benefit.icon className={`mx-auto mb-4 ${benefit.iconColor}`} size={40} />
                  <h4 className="mb-3 text-xl font-bold text-gray-800">
                    {tr(`FERTILIZER_DETAIL.NPK.${benefit.key}.TITLE`)}
                  </h4>
                  <p className="text-gray-600">{tr(`FERTILIZER_DETAIL.NPK.${benefit.key}.DESC`)}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== CTA — goes straight into the contact form with this product pre-filled ===== */}
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 to-emerald-700 p-10 text-center text-white shadow-xl md:p-14">
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <h3 className="relative z-10 mb-4 text-3xl font-bold">
            {tr('FERTILIZER_DETAIL.CTA_TITLE', 'Interested in')} {product.name}?
          </h3>
          <p className="relative z-10 mx-auto mb-8 max-w-2xl text-green-100">
            {tr(
              'FERTILIZER_DETAIL.CTA_DESC',
              'Contact our sales team for pricing, bulk order discounts, and shipping schedules to Cambodia and Vietnam.'
            )}
          </p>
          <Link
            href={inquiryHref({ product: `${product.name} Fertilizer`, type: 'quote' })}
            className="group relative z-10 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-bold text-green-700 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 active:scale-[0.98]"
          >
            {tr('FERTILIZER_DETAIL.CTA_BUTTON', 'Ask about this product')}
          </Link>
        </Reveal>
      </div>
    </div>
  );
}