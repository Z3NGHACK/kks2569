'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Recycle, Factory, Package, CheckCircle, ChevronRight, PackageSearch } from 'lucide-react';
import Hero from '@/components/Hero';
import { EASE_OUT, Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import Lightbox from '@/components/service/Lightbox';
import { useTr } from '@/lib/useTr';
import { inquiryHref } from '@/lib/inquiry';

const plasticData: Record<string, {
  code: string;
  name: string;
  fullName: string;
  description: string;
  properties: string[];
  applications: string[];
  recyclingProcess: string[];
  buyingInfo: string;
  sellingInfo: string;
  images: string[];
  color: string;
  glow: string;
}> = {
  // pet: {
  //   code: 'PET',
  //   name: 'PET',
  //   fullName: 'Polyethylene Terephthalate',
  //   description: 'PET is a clear, strong, and lightweight plastic that is widely used for packaging foods and beverages, especially convenience-sized soft drinks, juices and water. It is also popular for packaging salad dressings, peanut butter, cooking oils, cosmetics and household cleaners.',
  //   properties: [
  //     'Excellent clarity and transparency',
  //     'Strong and lightweight',
  //     'Good barrier against gases and moisture',
  //     'Resistant to impact',
  //     'Recyclable and environmentally friendly',
  //     'FDA approved for food contact'
  //   ],
  //   applications: [
  //     'Beverage bottles (water, soda, juice)',
  //     'Food containers and trays',
  //     'Cosmetic packaging',
  //     'Household cleaning product bottles',
  //     'Textile fibers (polyester)',
  //     'Film and sheet applications'
  //   ],
  //   recyclingProcess: [
  //     'Collection and sorting of PET waste',
  //     'Washing and removal of labels/caps',
  //     'Shredding into small flakes',
  //     'Float-sink separation to remove contaminants',
  //     'Melting and extrusion into pellets',
  //     'Quality testing and packaging'
  //   ],
  //   buyingInfo: 'We purchase all forms of PET waste including bottles, containers, factory scraps, and post-industrial waste. Competitive pricing based on quality and quantity.',
  //   sellingInfo: 'We sell premium recycled PET pellets suitable for bottle-to-bottle recycling, fiber production, and sheet manufacturing. Available in various grades and colors.',
  //   images: ['/images/pet/pet1.jpg', '/images/pet/pet2.jpg', '/images/pet/pet3.jpg',
  //     '/images/pet/pet4.jpg', '/images/pet/pet5.jpg', '/images/pet/pet6.jpg',
  //     '/images/pet/pet7.jpg', '/images/pet/pet8.jpg', '/images/pet/pet9.jpg'],
  //   color: 'from-green-400 to-green-600',
  //   glow: 'rgba(34, 197, 94, 0.16)'
  // },
  // hdpe: {
  //   code: 'HDPE',
  //   name: 'HDPE',
  //   fullName: 'High-Density Polyethylene',
  //   description: 'HDPE is a versatile thermoplastic with excellent strength-to-density ratio. It is resistant to many different solvents and has a wide variety of applications including plastic bottles, corrosion-resistant piping, and plastic lumber.',
  //   properties: [
  //     'High strength-to-density ratio',
  //     'Excellent chemical resistance',
  //     'Low moisture absorption',
  //     'Good impact resistance',
  //     'Easy to process and mold',
  //     'UV resistant grades available'
  //   ],
  //   applications: [
  //     'Milk and juice jugs',
  //     'Detergent and bleach bottles',
  //     'Pipe and fittings',
  //     'Plastic lumber and decking',
  //     'Garbage bins and containers',
  //     'Fuel tanks and industrial packaging'
  //   ],
  //   recyclingProcess: [
  //     'Sorting by grade and color',
  //     'Grinding into flakes',
  //     'Washing and separation',
  //     'Melt filtration to remove contaminants',
  //     'Pelletizing with additives if needed',
  //     'Cooling and quality control'
  //   ],
  //   buyingInfo: 'Buying HDPE in all forms: bottles, pipes, containers, film, and industrial scrap. Best prices for clean, sorted material.',
  //   sellingInfo: 'High-quality HDPE pellets for blow molding, injection molding, and pipe extrusion. Custom compounds available upon request.',
  //   images: ['/images/hdpe/hdpe1.jpg', '/images/hdpe/hdpe2.jpg', '/images/hdpe/hdpe3.jpg',
  //     '/images/hdpe/hdpe4.png', '/images/hdpe/hdpe5.jpg', '/images/hdpe/hdpe6.jpg',
  //   ],
  //   color: 'from-blue-400 to-blue-600',
  //   glow: 'rgba(59, 130, 246, 0.16)'
  // },
  pp: {
    code: 'PP',
    name: 'PP',
    fullName: 'Polypropylene',
    description: 'Polypropylene is a tough, rigid plastic with excellent chemical resistance. It is one of the most widely produced plastics globally and is used in packaging, automotive parts, textiles, and countless other applications.',
    properties: [
      'Excellent chemical resistance',
      'High melting point (160°C)',
      'Rigid and tough',
      'Fatigue resistant',
      'Good electrical insulation',
      'Lightweight and durable'
    ],
    applications: [
      'Food containers and packaging',
      'Automotive bumpers and interior parts',
      'Textile fibers (carpets, upholstery)',
      'Medical devices and syringes',
      'Battery cases',
      'Living hinges and closures'
    ],
    recyclingProcess: [
      'Collection and sorting by type',
      'Size reduction and washing',
      'Separation of contaminants',
      'Melt processing with stabilization',
      'Pelletizing with MFI control',
      'Testing for mechanical properties'
    ],
    buyingInfo: 'We buy PP in all forms: injection molded parts, film, fiber, and industrial waste. Competitive pricing for homopolymer and copolymer grades.',
    sellingInfo: 'Recycled PP pellets for automotive, packaging, and consumer goods. Available in various melt flow indexes and with custom additives.',
    images: ['/images/pp/pp1.jpg', '/images/pp/pp2.jpg', '/images/pp/pp3.jpg',
      '/images/pp/pp4.jpg', '/images/pp/pp5.jpg', '/images/pp/pp6.jpg'
    ],
    color: 'from-orange-400 to-orange-600',
    glow: 'rgba(249, 115, 22, 0.16)'
  },
  pvc: {
    code: 'PVC',
    name: 'PVC',
    fullName: 'Polyvinyl Chloride',
    description: 'PVC is a durable, long-lasting material used in construction, healthcare, and everyday products. It can be made flexible or rigid and is known for its chemical stability and fire resistance.',
    properties: [
      'High chemical resistance',
      'Fire retardant properties',
      'Durable and long-lasting',
      'Excellent electrical insulation',
      'Versatile (rigid or flexible)',
      'Cost-effective'
    ],
    applications: [
      'Pipes and fittings (plumbing, electrical)',
      'Window and door frames',
      'Flooring and wall coverings',
      'Cable insulation',
      'Medical tubing and bags',
      'Vinyl siding and roofing'
    ],
    recyclingProcess: [
      'Separation from other plastics',
      'Removal of metal and rubber contaminants',
      'Grinding and washing',
      'Separation of rigid and flexible types',
      'Compounding with heat stabilizers',
      'Pelletizing for reuse'
    ],
    buyingInfo: 'Purchasing PVC pipes, profiles, film, and industrial scrap. We handle both rigid and flexible PVC waste streams.',
    sellingInfo: 'Recycled PVC compounds for construction, wire/cable, and flooring applications. Custom formulations with specific additives available.',
    images: ['/images/pvc/pvc1.jpg', '/images/pvc/pvc2.jpg', '/images/pvc/pvc3.jpg',
      '/images/pvc/pvc4.jpg', '/images/pvc/pvc5.jpg', '/images/pvc/pvc6.jpeg'
    ],
    color: 'from-purple-400 to-purple-600',
    glow: 'rgba(168, 85, 247, 0.16)'
  },
  // ldpe: {
  //   code: 'LDPE',
  //   name: 'LDPE',
  //   fullName: 'Low-Density Polyethylene',
  //   description: 'LDPE is a flexible, lightweight plastic known for its excellent moisture barrier properties. It is commonly used for film applications, plastic bags, and flexible packaging.',
  //   properties: [
  //     'High flexibility and toughness',
  //     'Excellent moisture barrier',
  //     'Good chemical resistance',
  //     'Low temperature resistance',
  //     'Easy to process',
  //     'Good clarity in film form'
  //   ],
  //   applications: [
  //     'Plastic bags and shopping bags',
  //     'Stretch wrap and shrink film',
  //     'Squeeze bottles',
  //     'Agricultural film',
  //     'Coatings for paper and cardboard',
  //     'Flexible lids and closures'
  //   ],
  //   recyclingProcess: [
  //     'Collection of film and bags',
  //     'Agglomeration to densify material',
  //     'Washing to remove contaminants',
  //     'Melt filtration',
  //     'Pelletizing with antioxidant additives',
  //     'Quality testing for film applications'
  //   ],
  //   buyingInfo: 'We buy LDPE film, bags, and flexible packaging waste. Best prices for clean, dry material without excessive contamination.',
  //   sellingInfo: 'Recycled LDPE pellets for film extrusion, injection molding, and compounding. Suitable for garbage bags, agricultural film, and packaging.',
  //   images: ['/images/ldpe/ldpe1.jpg', '/images/ldpe/ldpe2.jpg', '/images/ldpe/ldpe3.jpg',
  //     '/images/ldpe/ldpe4.jpg', '/images/ldpe/ldpe5.jpg', '/images/ldpe/ldpe6.jpg'
  //   ],
  //   color: 'from-pink-400 to-pink-600',
  //   glow: 'rgba(236, 72, 153, 0.16)'
  // },
  ps: {
    code: 'PS',
    name: 'PS',
    fullName: 'Polystyrene',
    description: 'Polystyrene is a versatile plastic that can be rigid or foamed. It is widely used for protective packaging, foodservice packaging, and consumer products.',
    properties: [
      'Excellent thermal insulation (foam)',
      'Rigid and brittle (solid)',
      'Good moisture resistance',
      'Easy to process and mold',
      'Lightweight (foam)',
      'Cost-effective'
    ],
    applications: [
      'Foam packaging and protective inserts',
      'Disposable cups and food containers',
      'CD and DVD cases',
      'Insulation boards',
      'Yogurt and dairy containers',
      'Laboratory ware'
    ],
    recyclingProcess: [
      'Separation of EPS foam and solid PS',
      'Densification of foam using heat or solvent',
      'Grinding and washing',
      'Removal of food residue and labels',
      'Extrusion and pelletizing',
      'Compounding with impact modifiers'
    ],
    buyingInfo: 'Buying EPS foam, food containers, and industrial PS scrap. We handle both expanded and solid polystyrene.',
    sellingInfo: 'Recycled PS pellets for packaging, disposable products, and insulation. Available in general purpose and high-impact grades.',
    images: ['/images/ps/ps1.jpg', '/images/ps/ps2.jpg', '/images/ps/ps3.jpg'],
    color: 'from-yellow-400 to-yellow-600',
    glow: 'rgba(234, 179, 8, 0.18)'
  },
  // abs: {
  //   code: 'ABS',
  //   name: 'ABS',
  //   fullName: 'Acrylonitrile Butadiene Styrene',
  //   description: 'ABS is a tough, rigid thermoplastic with excellent impact resistance and machinability. It is widely used in automotive parts, electronics housings, and consumer goods.',
  //   properties: [
  //     'Excellent impact resistance',
  //     'Good heat resistance',
  //     'Easy to machine and finish',
  //     'High surface quality',
  //     'Good dimensional stability',
  //     'Can be painted and glued'
  //   ],
  //   applications: [
  //     'Automotive interior and exterior parts',
  //     'Electronics housings (computers, TVs)',
  //     'Lego bricks and toys',
  //     'Luggage and cases',
  //     'Kitchen appliances',
  //     'Pipes and fittings'
  //   ],
  //   recyclingProcess: [
  //     'Sorting by color and grade',
  //     'Removal of metal inserts and coatings',
  //     'Size reduction and washing',
  //     'Melt filtration',
  //     'Pelletizing with stabilization',
  //     'Testing for impact strength'
  //   ],
  //   buyingInfo: 'We purchase ABS from automotive, electronics, and consumer goods waste. Premium prices for clean, sorted material.',
  //   sellingInfo: 'High-quality recycled ABS for injection molding and extrusion. Available in natural, black, and custom colors with specified impact properties.',
  //   images: ['/images/abs/abs1.jpg', '/images/abs/abs2.jpg', '/images/abs/abs3.jpg'],
  //   color: 'from-red-400 to-red-600',
  //   glow: 'rgba(239, 68, 68, 0.16)'
  // },
  pc: {
    code: 'PC',
    name: 'PC',
    fullName: 'Polycarbonate',
    description: 'Polycarbonate is an extremely durable, transparent plastic with high impact resistance. It is used in applications requiring clarity, strength, and heat resistance.',
    properties: [
      'Extremely high impact strength',
      'Excellent optical clarity',
      'High heat resistance (147°C)',
      'UV resistant grades available',
      'Lightweight compared to glass',
      'Easy to fabricate'
    ],
    applications: [
      'Eyeglass lenses and optical discs',
      'Bulletproof glass and security glazing',
      'Automotive headlight lenses',
      'Medical devices and equipment',
      'Greenhouses and skylights',
      'Electronic device screens'
    ],
    recyclingProcess: [
      'Careful sorting to prevent contamination',
      'Removal of coatings and films',
      'Gentle washing to preserve clarity',
      'Melt filtration with fine screens',
      'Pelletizing with UV stabilizers',
      'Optical quality testing'
    ],
    buyingInfo: 'Buying PC from automotive, electronics, and optical applications. Highest prices for clear, uncontaminated material.',
    sellingInfo: 'Premium recycled PC pellets for optical, automotive, and electronic applications. Clear and colored grades available with maintained impact properties.',
    images: ['/images/pc/pc1.jpg', '/images/pc/pc2.jpg', '/images/pc/pc3.jpg'],
    color: 'from-cyan-400 to-cyan-600',
    glow: 'rgba(6, 182, 212, 0.16)'
  }
};

export default function PlasticDetailPage() {
  const params = useParams();
  const tr = useTr();
  const type = (params.type as string)?.toLowerCase();
  const data = plasticData[type];
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="mb-6 text-lg text-gray-600">
            {tr('PLASTIC_DETAIL.NOT_FOUND', 'This plastic type could not be found.')}
          </p>
          <Link
            href="/service"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-dark"
          >
            <ArrowLeft size={18} />
            {tr('PLASTIC_DETAIL.BACK_TO_SERVICES')}
          </Link>
        </div>
      </div>
    );
  }

  const gallery = data.images.map((src, i) => ({
    src,
    alt: `${data.name} ${i + 1}`,
    title: `${data.name} — ${data.fullName}`,
    description: '',
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${data.color} py-16 text-white md:py-24`}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="container relative mx-auto px-4">
          <motion.div
            className="flex flex-wrap items-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <span className="text-6xl font-black leading-none md:text-7xl">{data.code}</span>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">{data.name}</h1>
              <p className="text-lg text-white/90 md:text-xl">{data.fullName}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Link
          href="/service"
          className="group mb-8 inline-flex items-center text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          {tr('PLASTIC_DETAIL.BACK_TO_SERVICES')}
        </Link>

        {/* Description */}
        <Reveal className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {tr('PLASTIC_DETAIL.ABOUT')} {data.name}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">{data.description}</p>
        </Reveal>

        <div className="mb-8 grid gap-8 lg:grid-cols-2">
          {/* Properties */}
          <Reveal className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-800">
              <CheckCircle className="mr-2 text-primary" size={24} />
              {tr('PLASTIC_DETAIL.PROPERTIES.TITLE')}
            </h3>
            <Stagger className="space-y-3" stagger={0.06}>
              {data.properties.map((prop, index) => (
                <StaggerItem key={index} className="flex items-start">
                  <span className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-gray-700">{prop}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          {/* Applications */}
          <Reveal className="rounded-2xl bg-white p-8 shadow-lg" delay={0.1}>
            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-800">
              <Package className="mr-2 text-primary" size={24} />
              {tr('PLASTIC_DETAIL.APPLICATIONS.TITLE')}
            </h3>
            <Stagger className="space-y-3" stagger={0.06}>
              {data.applications.map((app, index) => (
                <StaggerItem key={index} className="flex items-start">
                  <span className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-gray-700">{app}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>

        {/* Recycling Process */}
        <Reveal className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
          <h3 className="mb-6 flex items-center text-xl font-bold text-gray-800">
            <Recycle className="mr-2 text-primary" size={24} />
            {tr('PLASTIC_DETAIL.PROCESS.TITLE')}
          </h3>
          <Stagger className="grid gap-4 md:grid-cols-3 lg:grid-cols-6" stagger={0.08}>
            {data.recyclingProcess.map((step, index) => (
              <StaggerItem key={index} className="relative">
                <div className="h-full rounded-xl border-2 border-gray-100 bg-gray-50 p-4 transition-colors hover:border-primary">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
                {index < data.recyclingProcess.length - 1 && (
                  <ChevronRight
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 transform text-gray-300 lg:block"
                    size={24}
                  />
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        {/* Gallery */}
        {gallery.length > 0 && (
          <Reveal className="mb-8">
            <h3 className="mb-6 text-xl font-bold text-gray-800">{tr('PLASTIC_DETAIL.GALLERY.TITLE')}</h3>
            <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.08}>
              {gallery.map((img, index) => (
                <StaggerItem key={img.src}>
                  <button
                    type="button"
                    onClick={() => setLightbox(index)}
                    aria-label={`${img.title} – open larger`}
                    className="group relative h-64 w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-lg outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        )}

        {/* Buy / Sell — each links straight into the contact form with this material pre-filled */}
        <Stagger className="grid gap-8 md:grid-cols-2" stagger={0.12}>
          <StaggerItem>
            <div className="h-full rounded-2xl border-2 border-green-200 bg-green-50 p-8 shadow-lg">
              <h3 className="mb-4 flex items-center text-xl font-bold text-green-800">
                <Factory className="mr-2" size={24} />
                {tr('PLASTIC_DETAIL.BUY.TITLE')} {data.name}
              </h3>
              <p className="mb-6 text-gray-700">{data.buyingInfo}</p>
              <Link
                href={inquiryHref({ product: `${data.name} (${data.fullName}) — selling to KKS`, type: 'buying' })}
                className="group inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-green-700 active:scale-[0.98]"
              >
                {tr('PLASTIC_DETAIL.BUY.GET_QUOTE')}
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="h-full rounded-2xl border-2 border-blue-200 bg-blue-50 p-8 shadow-lg">
              <h3 className="mb-4 flex items-center text-xl font-bold text-blue-800">
                <PackageSearch className="mr-2" size={24} />
                {tr('PLASTIC_DETAIL.SELL.TITLE')} {data.name} Pellets
              </h3>
              <p className="mb-6 text-gray-700">{data.sellingInfo}</p>
              <Link
                href={inquiryHref({ product: `${data.name} (${data.fullName}) recycled pellets`, type: 'quote' })}
                className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 active:scale-[0.98]"
              >
                {tr('PLASTIC_DETAIL.SELL.REQUEST_SAMPLE')}
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      <Lightbox images={gallery} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
    </div>
  );
}