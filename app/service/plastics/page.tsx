// app/service/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Recycle, ShoppingBag, Factory, ArrowRight, ChevronRight, ExternalLink, Leaf } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

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
  { 
    code: 'PET', 
    name: 'Polyethylene Terephthalate', 
    jaName: 'ポリエチレンテレフタレート',
    desc: 'Bottles, containers, packaging materials',
    jaDesc: 'ボトル・容器・包装材料',
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  { 
    code: 'HDPE', 
    name: 'High-Density Polyethylene', 
    jaName: '高密度ポリエチレン',
    desc: 'Milk jugs, detergent bottles, pipes',
    jaDesc: 'ミルク瓶・洗剤ボトル・パイプ',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  { 
    code: 'PP', 
    name: 'Polypropylene', 
    jaName: 'ポリプロピレン',
    desc: 'Food containers, auto parts, textiles',
    jaDesc: '食品容器・自動車部品・繊維',
    color: 'from-orange-400 to-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  { 
    code: 'PVC', 
    name: 'Polyvinyl Chloride', 
    jaName: '塩化ビニル',
    desc: 'Pipes, windows, flooring, cables',
    jaDesc: 'パイプ・窓・床材・ケーブル',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  { 
    code: 'LDPE', 
    name: 'Low-Density Polyethylene', 
    jaName: '低密度ポリエチレン',
    desc: 'Plastic bags, films, wraps',
    jaDesc: 'ビニール袋・フィルム・ラップ',
    color: 'from-pink-400 to-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  { 
    code: 'PS', 
    name: 'Polystyrene', 
    jaName: 'ポリスチレン',
    desc: 'Foam packaging, disposable cups',
    jaDesc: '発泡包装・使い捨てカップ',
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  { 
    code: 'ABS', 
    name: 'Acrylonitrile Butadiene Styrene', 
    jaName: 'ABS樹脂',
    desc: 'Lego bricks, electronics housings',
    jaDesc: 'レゴ・電子機器外装',
    color: 'from-red-400 to-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  { 
    code: 'PC', 
    name: 'Polycarbonate', 
    jaName: 'ポリカーボネート',
    desc: 'Eyeglasses, CDs, bulletproof glass',
    jaDesc: '眼鏡・CD・防弾ガラス',
    color: 'from-cyan-400 to-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
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
    image: '/images/excavator.png',
    link: '/service/excavators'
  },
  {
    id: 'tractors',
    title: 'Tractors & Combines',
    jaTitle: 'トラクター・コンバイン',
    description: 'Agricultural machinery including tractors, harvesters, tillage equipment from major brands.',
    jaDescription: '主要メーカーのトラクター、コンバイン、耕耘機などの農業機械。',
    image: '/images/tractor.png',
    link: '/service/tractors'
  },
  {
    id: 'parts',
    title: 'Parts & Components',
    jaTitle: '部品・コンポーネント',
    description: 'Spare parts, engines, hydraulic components, attachments, and accessories.',
    jaDescription: '予備部品、エンジン、油圧部品、アタッチメント、アクセサリー。',
    image: '/images/parts.png',
    link: '/service/parts'
  }
];

// Additional Machinery for Retail Grid
const additionalMachinery = [
  { src: "/images/i3.jpg", title: " Bulldozers", description: "Heavy earthmoving equipment" },
  { src: "/images/i7.jpg", title: "Wheel Loaders", description: "Loading and moving materials" },
  { src: "/images/i6.jpg", title: "Crane Trucks", description: "Lifting and transport solutions" },
  { src: "/images/i10.jpg", title: "Generator Sets", description: "Power generation equipment" },
];

// Fertilizer Products Data
const fertilizerProducts = [
  {
    id: 'ka2-tt',
    name: 'KA2-tt',
    jaName: '発酵鶏ふん (KA2-tt)',
    type: 'Special Granula',
    description: 'High-quality fermented chicken manure granules. Optimized for root development with balanced Phosphorus and Potassium.',
    image: '/images/fertilizer-ka2.jpg', // Make sure to save your image as this name
    specs: [
      { label: 'Nitrogen (N)', value: '2.4%' },
      { label: 'Phosphorus (P₂O₅)', value: '4.55%' },
      { label: 'Potassium (K₂O)', value: '3.7%' },
      { label: 'Moisture', value: '17.1%' },
      { label: 'C/N Ratio', value: '9.5' },
      { label: 'Organic Matter', value: '-' }, // As per your spec
    ],
    highlight: 'High Solubility'
  },
  {
    id: 'nib-pt',
    name: 'NIB-pt',
    jaName: '発酵鶏ふん (NIB-pt)',
    type: 'Special Granula',
    description: 'Premium organic fertilizer rich in Organic Matter. Ensures fast nutrient release and improved soil structure.',
    image: '/images/fertilizer-nib.jpg', // Make sure to save your image as this name
    specs: [
      { label: 'Nitrogen (N)', value: '3.0%' },
      { label: 'Phosphorus (P₂O₅)', value: '5.0%' },
      { label: 'Potassium (K₂O)', value: '4.0%' },
      { label: 'Moisture', value: '13.5%' },
      { label: 'C/N Ratio', value: '7.0' },
      { label: 'Organic Matter', value: '51.5%' },
    ],
    highlight: 'Rich in Organic Matter'
  }
];

export default function ServicePage() {
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('SERVICE.PAGE_TITLE')}
        subtitle={getString('SERVICE.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl space-y-28">
        
        {/* ===== PLASTIC RECYCLING - PRIORITY SECTION ===== */}
        <section className="relative">
          <div className="absolute -top-4 left-0 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            MAIN BUSINESS / 主力事業
          </div>
          
          <div className="flex items-center mb-8 mt-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <Factory className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                {getString('SERVICE.PLASTIC_RECYCLE.TITLE') || 'Plastic Recycling & Manufacturing'}
              </h2>
              <p className="text-gray-500 mt-2 text-lg">
                プラスチック再生・製造 | From Waste to Premium Pellets
              </p>
            </div>
          </div>
          
          {/* Main Description */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {getString('SERVICE.PLASTIC_RECYCLE.DESCRIPTION') || 
                    'We are a leading plastic recycling manufacturer. We purchase various types of waste plastic, process them through advanced sorting, cleaning, shredding, and pelletizing to produce high-quality reusable plastic pellets for industrial manufacturing.'}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Recycle className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {getString('SERVICE.PLASTIC_RECYCLE.BUYING.TITLE') || 'We Buy All Types:'}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {getString('SERVICE.PLASTIC_RECYCLE.BUYING.DESC') || 
                          'Industrial waste, post-consumer plastic, mixed plastics, factory scraps'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Factory className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {getString('SERVICE.PLASTIC_RECYCLE.MANUFACTURING.TITLE') || 'Manufacturing:'}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {getString('SERVICE.PLASTIC_RECYCLE.MANUFACTURING.DESC') || 
                          'State-of-the-art pelletizing facilities producing premium quality granules'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {getString('SERVICE.PLASTIC_RECYCLE.SELLING.TITLE') || 'We Sell:'}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {getString('SERVICE.PLASTIC_RECYCLE.SELLING.DESC') || 
                          'Virgin-quality recycled pellets, custom compounds, color-matched materials'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Process Image */}
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/plastic-process.png"
                  alt="Plastic Recycling Process"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="font-bold text-xl">Manufacturing Process</p>
                    <p className="text-sm opacity-90">From raw waste to premium pellets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plastic Types Grid - 8 Types */}
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-1 bg-green-500 rounded-full mr-3"></span>
            {getString('SERVICE.PLASTIC_TYPES.TITLE') || 'Plastic Types We Handle'}
            <span className="ml-3 text-sm font-normal text-gray-500">クリックして詳細を見る</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {plasticTypes.map((plastic, index) => (
              <Link 
                key={plastic.code}
                href={`/service/plastic/${plastic.code.toLowerCase()}`}
                className={`group relative ${plastic.bgColor} ${plastic.borderColor} border-2 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${plastic.color} rounded-t-2xl`}></div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-3xl font-black bg-gradient-to-r ${plastic.color} bg-clip-text text-transparent`}>
                    {plastic.code}
                  </span>
                  <ArrowRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={20} />
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1">{plastic.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{plastic.jaName}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{plastic.desc}</p>
                <p className="text-[10px] text-gray-400 mt-1">{plastic.jaDesc}</p>
                
                <div className="mt-4 flex items-center text-xs font-semibold text-gray-500 group-hover:text-gray-800 transition-colors">
                  <span>View Details</span>
                  <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* View All Plastics Button */}
          <div className="text-center mt-8">
            <Link 
              href="/service/plastics"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>View All Plastic Types</span>
              <span>→</span>
            </Link>
          </div>
        </section>


                {/* ===== FERTILIZER - NEW SECTION ===== */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <Leaf className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                {getString('SERVICE.FERTILIZER.TITLE') || 'Premium Fertilizers'}
              </h2>
              <p className="text-gray-500 mt-2 text-lg">
                日本製有機肥料 | Imported from Japan to Cambodia & Vietnam
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-10">
            <p className="text-gray-700 leading-relaxed mb-10 text-lg max-w-4xl">
              {getString('SERVICE.FERTILIZER.DESCRIPTION') || 
                'We supply high-quality organic special granulas imported directly from Japan. Our products, including KA2-tt and NIB-pt, are formulated to improve soil health and maximize crop yield in Southeast Asia.'}
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              {fertilizerProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  {/* Product Header Image */}
                  <div className="relative h-64 bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-md border border-green-100">
                      <span className="text-green-700 font-bold text-sm uppercase tracking-wide">
                        {product.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Product Title */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500 font-medium mt-1">{product.jaName}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                          {product.highlight}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed h-10">
                      {product.description}
                    </p>

                    {/* Technical Specs Table */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">
                        Technical Specifications
                      </h4>
                      <div className="space-y-2">
                        {product.specs.map((spec, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-200 last:border-0 pb-1 last:pb-0">
                            <span className="text-gray-500">{spec.label}</span>
                            <span className={`font-bold ${spec.value === '-' ? 'text-gray-400' : 'text-gray-800'}`}>
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Solubility Note */}
                    <div className="mt-4 flex items-center text-xs text-blue-600 bg-blue-50 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      High solubility observed within 45 minutes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== METAL TRADING - SECONDARY SECTION ===== */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Recycle className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {getString('SERVICE.METAL.TITLE') || 'Metal Trading'}
              </h2>
              <p className="text-gray-500 mt-1">金属買取・販売 | Copper & Aluminum Specialists</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Copper Card */}
            <Link 
              href="/service/copper"
              className="group relative bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-64">
                <Image
                  src="/images/copper.png"
                  alt="Copper scrap and products"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ExternalLink className="text-white" size={20} />
                </div>
              </div>
              <div className="relative p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {getString('SERVICE.METAL.COPPER.TITLE') || 'Copper'}
                  </h3>
                  <span className="text-3xl font-bold text-orange-400">Cu</span>
                </div>
                <p className="text-gray-300 mb-4 flex-grow">
                  {getString('SERVICE.METAL.COPPER.DESC') || 
                    'We buy and sell copper wires, pipes, sheets, and scrap. High market value with competitive pricing. Both recycled and prime quality available.'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-orange-400 font-semibold">
                    <span>高価買取・販売</span>
                  </div>
                  <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                    <span className="text-sm mr-2">View Details</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Aluminum Card */}
            <Link 
              href="/service/aluminum"
              className="group relative bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-64">
                <Image
                  src="/images/aluminum.png"
                  alt="Aluminum scrap and products"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ExternalLink className="text-white" size={20} />
                </div>
              </div>
              <div className="relative p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {getString('SERVICE.METAL.ALUMINUM.TITLE') || 'Aluminum'}
                  </h3>
                  <span className="text-3xl font-bold text-gray-400">Al</span>
                </div>
                <p className="text-gray-300 mb-4 flex-grow">
                  {getString('SERVICE.METAL.ALUMINUM.DESC') || 
                    'Cans, sheets, profiles, extrusions, and industrial scrap. We handle both recycled materials and prime aluminum products for various industries.'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-300 font-semibold">
                    <span>高価買取・販売</span>
                  </div>
                  <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                    <span className="text-sm mr-2">View Details</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ===== MACHINERY - WITH IMAGES ===== */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-dark rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <ShoppingBag className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {getString('SERVICE.MACHINERY.TITLE') || 'Construction & Agricultural Machinery'}
              </h2>
              <p className="text-gray-500 mt-1">建設機械・農機具 | Buy, Refurbish, Sell</p>
            </div>
          </div>

          {/* Featured Machinery with Images */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {machineryItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-flex items-center text-white text-sm font-semibold">
                      View Details <ArrowRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{item.jaTitle}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional Machinery Grid */}
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-6 h-1 bg-primary rounded-full mr-3"></span>
            More Equipment / その他の設備
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalMachinery.map((item, index) => (
              <div
                key={index}
                className="group relative h-48 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h4 className="text-white font-bold text-sm">{item.title}</h4>
                  <p className="text-white/80 text-xs mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-lg">+</span>
                </div>
              </div>
            ))}
          </div>

          {/* Global Export Banner */}
          <div className="mt-8 p-6 bg-gradient-to-r from-primary to-dark text-white rounded-2xl text-center shadow-lg">
            <p className="text-lg font-medium">
              {getString('SERVICE.MACHINERY.QUOTE') || 
                'Global export to Cambodia, Vietnam, and other Southeast Asian markets. We buy from auctions, direct sales, and trade-ins.'}
            </p>
          </div>
        </section>

        {/* ===== PRODUCT GALLERY ===== */}
        <section className="py-10">
          <div className="flex items-center justify-center mb-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {getString('SERVICE.GALLERY.TITLE') || 'Our Products & Materials'}
              </h2>
              <p className="text-gray-500">
                {getString('SERVICE.GALLERY.SUBTITLE') || '取扱商品・素材 | Products We Handle'}
              </p>
              <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {serviceImages.map((image, index) => (
              <div
                key={index}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="text-white font-bold text-lg mb-1 transform translate-y-0 transition-transform">
                    {image.title}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {image.description}
                  </p>
                  <div className="h-0.5 w-0 bg-white mt-3 group-hover:w-full transition-all duration-500"></div>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-white text-xl">+</span>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-10">
            <button className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <span>{getString('SERVICE.GALLERY.VIEW_MORE') || 'View All Products'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}