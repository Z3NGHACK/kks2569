'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Recycle, ShoppingBag, Factory, ArrowRight, ChevronRight, ExternalLink, Leaf } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTr } from '@/lib/useTr';
import { EASE_OUT, Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import ParallaxImage from '@/components/motion/ParallaxImage';
import SpotlightLink from '@/components/motion/SpotlightLink';
import SectionNav from '@/components/service/SectionNav';
import Lightbox from '@/components/service/Lightbox';

// Product Gallery Images
const serviceImages = [
  { src: "/images/i3.jpg", alt: "Construction Machinery", title: "Construction Machinery", description: "Heavy equipment for construction projects" },
  { src: "/images/i2.png", alt: "Aluminum Products", title: "Aluminum Products", description: "Various aluminum materials and scrap" },
  { src: "/images/i4.jpg", alt: "Dinnerware", title: "Plastic Dinnerware", description: "Recycled plastic household items" },
  { src: "/images/i5.jpg", alt: "Automotive Parts", title: "Automotive Parts", description: "Vehicle components and spare parts" },
  { src: "/images/i6.jpg", alt: "Recycling Materials", title: "Recycling Materials", description: "Raw materials for recycling process" },
  { src: "/images/i7.jpg", alt: "Construction Vehicle", title: "Construction Vehicles", description: "Heavy machinery and vehicles" },
  { src: "/images/i8.jpg", alt: "Used Bicycle", title: "Used Bicycles", description: "Refurbished bicycles for resale" },
  { src: "/images/i9.png", alt: "Aluminum Can", title: "Aluminum Cans", description: "Recycled aluminum packaging" },
  { src: "/images/i10.jpg", alt: "Car Parts", title: "Car Parts", description: "Automotive spare parts and components" },
];

// Plastic Types Data
const plasticTypes = [
  // { 
  //   code: 'PET', 
  //   name: 'Polyethylene Terephthalate', 
  //   jaName: 'ポリエチレンテレフタレート',
  //   desc: 'Bottles, containers, packaging materials',
  //   jaDesc: 'ボトル・容器・包装材料',
  //   color: 'from-green-400 to-green-600',
  //   bgColor: 'bg-green-50',
  //   borderColor: 'border-green-200'
  // },
  // { 
  //   code: 'HDPE', 
  //   name: 'High-Density Polyethylene', 
  //   jaName: '高密度ポリエチレン',
  //   desc: 'Milk jugs, detergent bottles, pipes',
  //   jaDesc: 'ミルク瓶・洗剤ボトル・パイプ',
  //   color: 'from-blue-400 to-blue-600',
  //   bgColor: 'bg-blue-50',
  //   borderColor: 'border-blue-200'
  // },
  { 
    code: 'PP', 
    name: 'Polypropylene', 
    jaName: 'ポリプロピレン',
    desc: 'Food containers, auto parts, textiles',
    jaDesc: '食品容器・自動車部品・繊維',
    color: 'from-orange-400 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    glow: 'rgba(249, 115, 22, 0.16)',
  },
  { 
    code: 'PVC', 
    name: 'Polyvinyl Chloride', 
    jaName: '塩化ビニル',
    desc: 'Pipes, windows, flooring, cables',
    jaDesc: 'パイプ・窓・床材・ケーブル',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    glow: 'rgba(168, 85, 247, 0.16)',
  },
  // { 
  //   code: 'LDPE', 
  //   name: 'Low-Density Polyethylene', 
  //   jaName: '低密度ポリエチレン',
  //   desc: 'Plastic bags, films, wraps',
  //   jaDesc: 'ビニール袋・フィルム・ラップ',
  //   color: 'from-pink-400 to-pink-600',
  //   bgColor: 'bg-pink-50',
  //   borderColor: 'border-pink-200'
  // },
  { 
    code: 'PS', 
    name: 'Polystyrene', 
    jaName: 'ポリスチレン',
    desc: 'Foam packaging, disposable cups',
    jaDesc: '発泡包装・使い捨てカップ',
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    glow: 'rgba(234, 179, 8, 0.18)',
  },
  // { 
  //   code: 'ABS', 
  //   name: 'Acrylonitrile Butadiene Styrene', 
  //   jaName: 'ABS樹脂',
  //   desc: 'Lego bricks, electronics housings',
  //   jaDesc: 'レゴ・電子機器外装',
  //   color: 'from-red-400 to-red-600',
  //   bgColor: 'bg-red-50',
  //   borderColor: 'border-red-200'
  // },
  { 
    code: 'PC', 
    name: 'Polycarbonate', 
    jaName: 'ポリカーボネート',
    desc: 'Eyeglasses, CDs, bulletproof glass',
    jaDesc: '眼鏡・CD・防弾ガラス',
    color: 'from-cyan-400 to-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    glow: 'rgba(6, 182, 212, 0.16)',
  },
];

// Machinery Data
const machineryItems = [
  {
    id: 'excavators',
    title: 'Excavators',
    jaTitle: '油圧ショベル',
    description: 'CAT, Komatsu, Hitachi, Kobelco models. We buy used and refurbished units for export to Southeast Asia.',
    jaDescription: 'キャタピラー、コマツ、日立、コベルコモデル。中古・再生機を東南アジアに輸出。',
    image: '/images/constr/excavator.png',
    link: '/service/excavators'
  },
  {
    id: 'tractors',
    title: 'Tractors & Combines',
    jaTitle: 'トラクター・コンバイン',
    description: 'Agricultural machinery including tractors, harvesters, tillage equipment from major brands.',
    jaDescription: '主要メーカーのトラクター、コンバイン、耕耘機などの農業機械。',
    image: '/images/constr/tractor.png',
    link: '/service/tractors'
  },
  {
    id: 'parts',
    title: 'Parts & Components',
    jaTitle: '部品・コンポーネント',
    description: 'Spare parts, engines, hydraulic components, attachments, and accessories.',
    jaDescription: '予備部品、エンジン、油圧部品、アタッチメント、アクセサリー。',
    image: '/images/constr/partsC.png',
    link: '/service/parts'
  }
];

// Fertilizer Products Data
const fertilizerProducts = [
  {
    id: 'ka2-tt',
    name: 'KA2-tt',
    jaName: '発酵鶏ふん (KA2-tt)',
    type: 'KA2_TT.TYPE',

    description: 'KA2_TT.DESCRIPTION',
    image: '/images/fertilizer/KA2-tt.jpg', // Make sure to save your image as this name
    specs: [
        { label: 'SPECS.NITROGEN', value: '2.4%' }, // Label is a KEY
        { label: 'SPECS.PHOSPHORUS', value: '4.55%' },
        { label: 'SPECS.POTASSIUM', value: '3.7%' },
        { label: 'SPECS.MOISTURE', value: '17.1%' },
        { label: 'SPECS.CN_RATIO', value: '9.5' },
        { label: 'SPECS.ORGANIC_MATTER', value: '-' },
      ],
    highlight: 'KA2_TT.HIGHLIGHT'
  },
  {
    id: 'nib-pt',
    name: 'NIB-pt',
    jaName: '発酵鶏ふん (NIB-pt)',
    type: 'NIB_PT.TYPE',
    description: 'NIB_PT.DESCRIPTION',
    image: '/images/fertilizer/NIB-pt.jpg', // Make sure to save your image as this name
    specs: [
      { label: 'SPECS.NITROGEN', value: '3.0%' },
      { label: 'SPECS.PHOSPHORUS', value: '5.0%' },
      { label: 'SPECS.POTASSIUM', value: '4.0%' },
      { label: 'SPECS.MOISTURE', value: '13.5%' },
      { label: 'SPECS.CN_RATIO', value: '7.0' },
      { label: 'SPECS.ORGANIC_MATTER', value: '51.5%' },
    ],
    highlight: 'NIB_PT.HIGHLIGHT'
  }
];

/* -------------------------------------------------------------------------- */
/*  N-P-K bars: shows each fertilizer's nutrient balance at a glance           */
/* -------------------------------------------------------------------------- */

const NPK = [
  { key: 'SPECS.NITROGEN', symbol: 'N', bar: 'bg-emerald-500' },
  { key: 'SPECS.PHOSPHORUS', symbol: 'P', bar: 'bg-amber-500' },
  { key: 'SPECS.POTASSIUM', symbol: 'K', bar: 'bg-sky-500' },
];
const NPK_SCALE_MAX = 6; // percent that fills a bar completely

function NpkBars({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="mb-6 space-y-2.5" role="group" aria-label="N-P-K">
      {NPK.map((nutrient, i) => {
        const spec = specs.find((s) => s.label === nutrient.key);
        const value = spec ? parseFloat(spec.value) : NaN;
        if (!spec || Number.isNaN(value)) return null;

        return (
          <div key={nutrient.key} className="flex items-center gap-3 text-xs">
            <span className="w-4 font-bold text-gray-700">{nutrient.symbol}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className={`h-full origin-left rounded-full ${nutrient.bar}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: Math.min(value / NPK_SCALE_MAX, 1) }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.25 + i * 0.12, ease: EASE_OUT }}
              />
            </div>
            <span className="w-12 text-right tabular-nums text-gray-500">{spec.value}</span>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export default function ServicePage() {
  const tr = useTr();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  // SectionNav only re-subscribes when the ids change, so it's fine to rebuild this every render.
  const sectionItems = [
    { id: 'plastic', label: tr('SERVICE.NAV.PLASTIC', 'Plastic recycling') },
    { id: 'fertilizer', label: tr('SERVICE.NAV.FERTILIZER', 'Fertilizer') },
    { id: 'metal', label: tr('SERVICE.NAV.METAL', 'Metals') },
    { id: 'machinery', label: tr('SERVICE.NAV.MACHINERY', 'Machinery') },
    { id: 'other', label: tr('SERVICE.NAV.GALLERY', 'Gallery') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={tr('SERVICE.PAGE_TITLE')}
        subtitle={tr('SERVICE.PAGE_SUBTITLE')}
      />

      <SectionNav items={sectionItems} />

      <div className="container mx-auto max-w-7xl space-y-28 px-4 py-16">
        
        {/* ===== PLASTIC RECYCLING - PRIORITY SECTION ===== */}
        <section id="plastic" className="relative scroll-mt-36">
          <div className="absolute -top-4 left-0 z-10 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-1 text-sm font-bold text-white shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            MAIN BUSINESS / 主力事業
          </div>
          
          <Reveal className="mb-8 mt-4 flex items-center">
            <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-xl">
              <Factory className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                {tr('SERVICE.PLASTIC_RECYCLE.TITLE')}
              </h2>
              <p className="mt-2 text-lg text-gray-500">
                プラスチック再生・製造 | From Waste to Premium Pellets
              </p>
            </div>
          </Reveal>
          
          {/* Main Description */}
          <Reveal className="mb-10 rounded-3xl bg-white p-8 shadow-xl md:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  {tr('SERVICE.PLASTIC_RECYCLE.DESCRIPTION')}
                </p>
                
                <Stagger className="space-y-4" stagger={0.12} delay={0.1}>
                  <StaggerItem className="flex items-start space-x-4 rounded-xl bg-green-50 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-500">
                      <Recycle className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {tr('SERVICE.PLASTIC_RECYCLE.BUYING.TITLE')}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {tr('SERVICE.PLASTIC_RECYCLE.BUYING.DESC')}
                      </p>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem className="flex items-start space-x-4 rounded-xl bg-blue-50 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500">
                      <Factory className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {tr('SERVICE.PLASTIC_RECYCLE.MANUFACTURING.TITLE')}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {tr('SERVICE.PLASTIC_RECYCLE.MANUFACTURING.DESC')}
                      </p>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem className="flex items-start space-x-4 rounded-xl bg-orange-50 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500">
                      <ShoppingBag className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {tr('SERVICE.PLASTIC_RECYCLE.SELLING.TITLE')}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {tr('SERVICE.PLASTIC_RECYCLE.SELLING.DESC')}
                      </p>
                    </div>
                  </StaggerItem>
                </Stagger>
              </div>
              
              {/* Process Image (drifts slowly as you scroll past) */}
              <ParallaxImage
                src="/services/manufac.png"
                alt="Plastic Recycling Process"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-80 rounded-2xl shadow-lg"
              >
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="text-white">
                    <p className="text-xl font-bold">Manufacturing Process</p>
                    <p className="text-sm opacity-90">From raw waste to premium pellets</p>
                  </div>
                </div>
              </ParallaxImage>
            </div>
          </Reveal>

          {/* Plastic Types Grid */}
          <Reveal>
            <h3 className="mb-6 flex items-center text-2xl font-bold text-gray-800">
              <span className="mr-3 h-1 w-8 rounded-full bg-green-500"></span>
              {tr('SERVICE.PLASTIC_TYPES.TITLE')}
              <span className="ml-3 text-sm font-normal text-gray-500">クリックして詳細を見る</span>
            </h3>
          </Reveal>
          
          <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {plasticTypes.map((plastic) => (
              <StaggerItem key={plastic.code} className="h-full">
                <SpotlightLink 
                  href={`/service/plastic/${plastic.code.toLowerCase()}`}
                  glow={plastic.glow}
                  className={`block h-full overflow-hidden rounded-2xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${plastic.bgColor} ${plastic.borderColor}`}
                >
                  <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${plastic.color}`}></div>
                  <div className="mb-3 flex items-start justify-between">
                    <span className={`bg-gradient-to-r bg-clip-text text-3xl font-black text-transparent ${plastic.color}`}>
                      {plastic.code}
                    </span>
                    <ArrowRight className="text-gray-400 transition-all duration-300 group-hover:-rotate-45 group-hover:text-gray-700" size={20} />
                  </div>
                  <h4 className="mb-1 text-sm font-bold text-gray-800">{plastic.name}</h4>
                  <p className="mb-2 text-xs text-gray-500">{plastic.jaName}</p>
                  <p className="line-clamp-2 text-xs text-gray-600">{plastic.desc}</p>
                  <p className="mt-1 text-[10px] text-gray-400">{plastic.jaDesc}</p>
                  
                  <div className="mt-4 flex items-center text-xs font-semibold text-gray-500 transition-colors group-hover:text-gray-800">
                    <span>View Details</span>
                    <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </SpotlightLink>
              </StaggerItem>
            ))}
          </Stagger>

          {/* View All Plastics Button */}
          {/* <div className="text-center mt-8">
            <Link 
              href="/service/plastics"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>{getString('SERVICE.PLASTIC_TYPES.VIEW_ALL')}</span>
              <span>→</span>
            </Link>
          </div> */}
        </section>
        
        {/* ===== FERTILIZER ===== */}
        <section id="fertilizer" className="relative scroll-mt-36">
          <Reveal className="mb-8 flex items-center">
            <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl">
              <Leaf className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                {tr('SERVICE.FERTILIZER.TITLE', 'Premium Fertilizers')}
              </h2>
              <p className="mt-2 text-lg text-gray-500">
                {tr('SERVICE.FERTILIZER.SUBDESC', 'Imported from Japan to Cambodia & Vietnam')}
              </p>
            </div>
          </Reveal>

          {/* Section Description */}
          <Reveal delay={0.1}>
            <p className="mb-10 max-w-4xl text-lg leading-relaxed text-gray-700">
              {tr(
                'SERVICE.FERTILIZER.DESCRIPTION',
                'We supply high-quality organic special granulas imported directly from Japan. Click on a product to view its full technical specifications and solubility data.'
              )}
            </p>
          </Reveal>

          {/* Product Grid - Scales well for 2, 3, or more items */}
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fertilizerProducts.map((product) => (
              <StaggerItem key={product.id} className="h-full">
                <SpotlightLink 
                  href={`/service/fertilizers/${product.id}`}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Product Header Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full border border-green-100 bg-white/90 px-3 py-1 shadow-md backdrop-blur-sm">
                      <span className="text-xs font-bold uppercase tracking-wide text-green-700">
                        {tr(product.type)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {/* Product Title & Highlight */}
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-green-700">
                          {tr(product.name)}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-gray-500">{tr(product.jaName)}</p>
                      </div>
                      <span className="inline-block rounded-md border border-green-100 bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700">
                        {tr(product.highlight)}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-600">
                      {tr(product.description)}
                    </p>

                    {/* Nutrient balance */}
                    <NpkBars specs={product.specs} />

                    {/* Call to Action */}
                    <div className="mt-auto flex items-center text-sm font-semibold text-green-600 group-hover:text-green-700">
                      <span>{tr('SERVICE.FERTILIZER.BUTTON', 'View Specifications')} </span>
                      <ChevronRight className="ml-1 transition-transform group-hover:translate-x-1" size={16} />
                    </div>
                  </div>
                </SpotlightLink>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== METAL TRADING ===== */}
        <section id="metal" className="relative scroll-mt-36">
          <Reveal className="mb-8 flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 shadow-lg">
              <Recycle className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                {tr('SERVICE.METAL.TITLE')}
              </h2>
              <p className="mt-1 text-gray-500">金属買取・販売 | Copper & Aluminum Specialists</p>
            </div>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.15}>
            {/* Copper Card */}
            <StaggerItem className="h-full">
              <Link 
                href="/service/copper"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gray-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/copper.png"
                    alt="Copper scrap and products"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <ExternalLink className="text-white" size={20} />
                  </div>
                </div>
                <div className="relative flex flex-grow flex-col p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {tr('SERVICE.METAL.COPPER.TITLE')}
                    </h3>
                    <span className="text-3xl font-bold text-orange-400">Cu</span>
                  </div>
                  <p className="mb-4 flex-grow text-gray-300">
                    {tr('SERVICE.METAL.COPPER.DESC')}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center font-semibold text-orange-400">
                      <span>高価買取・販売</span>
                    </div>
                    <div className="flex items-center text-white transition-transform group-hover:translate-x-2">
                      <span className="mr-2 text-sm">View Details</span>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>

            {/* Aluminum Card */}
            <StaggerItem className="h-full">
              <Link 
                href="/service/aluminum"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gray-800 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/aluminum.png"
                    alt="Aluminum scrap and products"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <ExternalLink className="text-white" size={20} />
                  </div>
                </div>
                <div className="relative flex flex-grow flex-col p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {tr('SERVICE.METAL.ALUMINUM.TITLE')}
                    </h3>
                    <span className="text-3xl font-bold text-gray-400">Al</span>
                  </div>
                  <p className="mb-4 flex-grow text-gray-300">
                    {tr('SERVICE.METAL.ALUMINUM.DESC')}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center font-semibold text-gray-300">
                      <span>高価買取・販売</span>
                    </div>
                    <div className="flex items-center text-white transition-transform group-hover:translate-x-2">
                      <span className="mr-2 text-sm">View Details</span>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          </Stagger>
        </section>

        {/* ===== MACHINERY ===== */}
        <section id="machinery" className="relative scroll-mt-36">
          <Reveal className="flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-dark shadow-lg">
              <ShoppingBag className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                {tr('SERVICE.MACHINERY.TITLE')}
              </h2>
              <p className="mt-1 text-gray-500">建設機械・農機具 | Buy, Refurbish, Sell</p>
            </div>
          </Reveal>

          {/* Featured Machinery with Images */}
          <Stagger className="mb-10 mt-6 grid gap-6 md:grid-cols-3">
            {machineryItems.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <SpotlightLink
                  href={item.link}
                  className="block h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <span className="inline-flex items-center text-sm font-semibold text-white">
                        View Details <ArrowRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-lg font-bold text-gray-800">{item.title}</h3>
                    <p className="mb-3 text-xs text-gray-500">{item.jaTitle}</p>
                    <p className="line-clamp-2 text-sm text-gray-600">{item.description}</p>
                  </div>
                </SpotlightLink>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== PRODUCT GALLERY ===== */}
        <section id="other" className="relative scroll-mt-36 pb-10">
          <Reveal className="mb-10 flex items-center justify-center">
            <div className="text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                {tr('SERVICE.GALLERY.TITLE')}
              </h2>
              <p className="text-gray-500">
                {tr('SERVICE.GALLERY.SUBTITLE')}
              </p>
              <motion.div
                className="mx-auto mt-4 h-1 w-24 origin-center rounded-full bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
              />
            </div>
          </Reveal>
          
          <Stagger className="grid grid-cols-2 gap-6 md:grid-cols-3" stagger={0.06}>
            {serviceImages.map((image, index) => (
              <StaggerItem key={image.src}>
                <button
                  type="button"
                  onClick={() => setLightbox(index)}
                  aria-label={`${image.title} – open larger`}
                  className="group relative h-64 w-full cursor-zoom-in overflow-hidden rounded-2xl bg-white text-left shadow-lg outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="mb-1 text-lg font-bold text-white">
                      {image.title}
                    </h3>
                    <p className="line-clamp-2 translate-y-4 text-sm text-white/80 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {image.description}
                    </p>
                    <div className="mt-3 h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-full"></div>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xl text-white">+</span>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </Stagger>

          {/* View More Button */}
          <Reveal className="mt-10 text-center">
            <Link 
              href="/products"
              className="group inline-flex items-center space-x-2 rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-dark hover:shadow-xl active:scale-[0.98]"
            >
              <span>{tr('SERVICE.GALLERY.VIEW_ALL')}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          {/* Global Export Banner */}
          <Reveal className="mt-8 rounded-2xl bg-gradient-to-r from-primary to-dark p-6 text-center text-white shadow-lg">
            <p className="text-lg font-medium">
              {tr('SERVICE.MACHINERY.QUOTE')}
            </p>
          </Reveal>
        </section>
      </div>

      <Lightbox
        images={serviceImages}
        index={lightbox}
        onClose={closeLightbox}
        onChange={setLightbox}
      />
    </div>
  );
}