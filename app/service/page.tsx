// app/service/page.tsx
'use client';

import Image from 'next/image';
import { Recycle, ShoppingBag, Factory, Hammer, Package, Truck } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

const serviceImages = [
  { src: "/images/i3.jpg", alt: "Construction Machinery" },
  { src: "/images/i2.png", alt: "Aluminum Products" },
  { src: "/images/i4.jpg", alt: "Dinnerware" },
  { src: "/images/i5.jpg", alt: "Automotive Parts" },
  { src: "/images/i6.jpg", alt: "Recycling Materials" },
  { src: "/images/i7.jpg", alt: "Construction Vehicle" },
  { src: "/images/i8.jpg", alt: "Used Bicycle" },
  { src: "/images/i9.png", alt: "Aluminum Can" },
  { src: "/images/i10.jpg", alt: "Car Parts" },
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

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
        
        {/* Scrap Metal & Materials Buying/Selling */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <Hammer className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {getString('SERVICE.SCRAP.TITLE') || 'Scrap Metal & Materials Trading'}
              </h2>
              <p className="text-gray-500 mt-1">高価買取・販売 | High-Value Purchase & Sales</p>
            </div>
          </div>
          


          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              {getString('SERVICE.SCRAP.DESCRIPTION') || 
                'We specialize in buying and selling various scrap metals and recyclable materials. From copper wires to aluminum sheets, we offer competitive prices and professional handling.'}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Copper */}
              <div className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                <div className="relative h-48 md:h-56 flex-shrink-0">
                  <Image
                    src="/images/copper.png"
                    alt="Copper scrap"
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  {/* Optional subtle blur on image itself (if your copper.png is too sharp) */}
                  {/* <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                </div>
                
                <div className="relative p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/30">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {getString('SERVICE.SCRAP.COPPER.TITLE') || 'Copper'}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4 flex-grow">
                    {getString('SERVICE.SCRAP.COPPER.DESC') || 'Copper wires, pipes, and scrap. High market value.'}
                  </p>
                  <div className="flex items-center text-orange-400 font-semibold text-sm">
                    <span>高価買取</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </div>

              {/* Aluminum - same structure, change src later */}
              <div className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                <div className="relative h-48 md:h-56 flex-shrink-0">
                  <Image
                    src="/images/aluminum.png"  // ← replace with /images/aluminum.png later
                    alt="Aluminum scrap"
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                </div>
                <div className="relative p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/30">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {getString('SERVICE.SCRAP.ALUMINUM.TITLE') || 'Aluminum'}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4 flex-grow">
                    {getString('SERVICE.SCRAP.ALUMINUM.DESC') || 'Cans, sheets, profiles, and industrial scrap.'}
                  </p>
                  <div className="flex items-center text-gray-300 font-semibold text-sm">
                    <span>高価買取</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </div>

              {/* Iron/Steel */}
              <div className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                <div className="relative h-48 md:h-56 flex-shrink-0">
                  <Image
                    src="/images/iron.png"  // ← replace with /images/iron.png later
                    alt="Iron and steel scrap"
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                </div>
                <div className="relative p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/30">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {getString('SERVICE.SCRAP.IRON.TITLE') || 'Iron & Steel'}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4 flex-grow">
                    {getString('SERVICE.SCRAP.IRON.DESC') || 'Heavy machinery, structural steel, and mixed scrap.'}
                  </p>
                  <div className="flex items-center text-blue-300 font-semibold text-sm">
                    <span>高価買取</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </div>

              {/* Brass/Bronze */}
              <div className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                <div className="relative h-48 md:h-56 flex-shrink-0">
                  <Image
                    src="/images/brass.png"  // ← replace with /images/brass.png later
                    alt="Brass and bronze scrap"
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                </div>
                <div className="relative p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/30">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {getString('SERVICE.SCRAP.BRASS.TITLE') || 'Brass & Bronze'}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4 flex-grow">
                    {getString('SERVICE.SCRAP.BRASS.DESC') || 'Fittings, valves, and decorative items.'}
                  </p>
                  <div className="flex items-center text-yellow-300 font-semibold text-sm">
                    <span>高価買取</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </section>

        {/* Plastic Recycling */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <Factory className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {getString('SERVICE.PLASTIC_RECYCLE.TITLE') || 'Plastic Recycling & Pelletizing'}
              </h2>
              <p className="text-gray-500 mt-1">プラスチック再生・ペレット化 | Plastic to Reusable Pellets</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {getString('SERVICE.PLASTIC_RECYCLE.DESCRIPTION') || 
                    'We buy old and waste plastic, then process it into high-quality reusable plastic pellets. These pellets serve as raw materials for manufacturing new plastic products.'}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Package className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {getString('SERVICE.PLASTIC_RECYCLE.BUYING.TITLE') || 'We Buy:'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {getString('SERVICE.PLASTIC_RECYCLE.BUYING.DESC') || 
                          'PET bottles, HDPE containers, PP products, industrial plastic waste, and mixed plastics.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Recycle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {getString('SERVICE.PLASTIC_RECYCLE.PROCESS.TITLE') || 'Processing:'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {getString('SERVICE.PLASTIC_RECYCLE.PROCESS.DESC') || 
                          'Sorting, cleaning, shredding, melting, and pelletizing into uniform plastic granules.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Truck className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {getString('SERVICE.PLASTIC_RECYCLE.SELLING.TITLE') || 'We Sell:'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {getString('SERVICE.PLASTIC_RECYCLE.SELLING.DESC') || 
                          'High-quality recycled pellets: PET, HDPE, PP, and custom compounds for manufacturing.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Plastic Types Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                  <span className="text-3xl font-bold text-green-600 block mb-2">PET</span>
                  <p className="text-xs text-gray-600">Polyethylene Terephthalate</p>
                  <p className="text-xs text-gray-500 mt-1">ボトル・容器</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                  <span className="text-3xl font-bold text-blue-600 block mb-2">HDPE</span>
                  <p className="text-xs text-gray-600">High-Density Polyethylene</p>
                  <p className="text-xs text-gray-500 mt-1">硬質プラスチック</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-200">
                  <span className="text-3xl font-bold text-orange-600 block mb-2">PP</span>
                  <p className="text-xs text-gray-600">Polypropylene</p>
                  <p className="text-xs text-gray-500 mt-1">容器・自動車部品</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                  <span className="text-3xl font-bold text-purple-600 block mb-2">PVC</span>
                  <p className="text-xs text-gray-600">Polyvinyl Chloride</p>
                  <p className="text-xs text-gray-500 mt-1">パイプ・建材</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Construction & Agricultural Machinery */}
        <section>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <ShoppingBag className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {getString('SERVICE.MACHINERY.TITLE') || 'Construction & Agricultural Machinery'}
              </h2>
              <p className="text-gray-500 mt-1">建設機械・農機具 | Heavy Equipment Trading</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              {getString('SERVICE.MACHINERY.DESCRIPTION') || 
                'We buy and sell construction machinery and agricultural equipment. From excavators to tractors, we handle export to Southeast Asian markets.'}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-light to-white border border-green-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-3">
                  {getString('SERVICE.MACHINERY.EXCAVATORS.TITLE') || 'Excavators'}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {getString('SERVICE.MACHINERY.EXCAVATORS.DESC') || 
                    'CAT, Komatsu, Hitachi models. We buy used and refurbished units for export.'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-light to-white border border-green-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-3">
                  {getString('SERVICE.MACHINERY.TRACTORS.TITLE') || 'Tractors & Combines'}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {getString('SERVICE.MACHINERY.TRACTORS.DESC') || 
                    'Agricultural machinery including tractors, harvesters, and tillage equipment.'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-light to-white border border-green-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-3">
                  {getString('SERVICE.MACHINERY.PARTS.TITLE') || 'Parts & Components'}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {getString('SERVICE.MACHINERY.PARTS.DESC') || 
                    'Spare parts, engines, hydraulic components, and attachments.'}
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-primary text-white rounded-xl text-center">
              <p className="text-lg font-medium">
                {getString('SERVICE.MACHINERY.QUOTE') || 
                  'Global export to Cambodia, Vietnam, and other Southeast Asian markets.'}
              </p>
            </div>
          </div>
        </section>

        {/* Product Gallery Section */}
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
                className="relative h-64 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-white font-bold text-lg opacity-100 transform translate-y-0 transition-all duration-300">
                    {image.alt}
                  </p>
                  <div className="h-0.5 w-0 bg-white mt-2 group-hover:w-full transition-all duration-500"></div>
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
            <button className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-dark transition-colors duration-300 shadow-lg hover:shadow-xl">
              <span>{getString('SERVICE.GALLERY.VIEW_MORE') || 'View All Products'}</span>
              <span>→</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}