'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Recycle, Factory, Package, CheckCircle, ChevronRight } from 'lucide-react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

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
}> = {
  pet: {
    code: 'PET',
    name: 'PET',
    fullName: 'Polyethylene Terephthalate',
    description: 'PET is a clear, strong, and lightweight plastic that is widely used for packaging foods and beverages, especially convenience-sized soft drinks, juices and water. It is also popular for packaging salad dressings, peanut butter, cooking oils, cosmetics and household cleaners.',
    properties: [
      'Excellent clarity and transparency',
      'Strong and lightweight',
      'Good barrier against gases and moisture',
      'Resistant to impact',
      'Recyclable and environmentally friendly',
      'FDA approved for food contact'
    ],
    applications: [
      'Beverage bottles (water, soda, juice)',
      'Food containers and trays',
      'Cosmetic packaging',
      'Household cleaning product bottles',
      'Textile fibers (polyester)',
      'Film and sheet applications'
    ],
    recyclingProcess: [
      'Collection and sorting of PET waste',
      'Washing and removal of labels/caps',
      'Shredding into small flakes',
      'Float-sink separation to remove contaminants',
      'Melting and extrusion into pellets',
      'Quality testing and packaging'
    ],
    buyingInfo: 'We purchase all forms of PET waste including bottles, containers, factory scraps, and post-industrial waste. Competitive pricing based on quality and quantity.',
    sellingInfo: 'We sell premium recycled PET pellets suitable for bottle-to-bottle recycling, fiber production, and sheet manufacturing. Available in various grades and colors.',
    images: ['/images/pet/pet1.jpg', '/images/pet/pet2.jpg', '/images/pet/pet3.jpg'],
    color: 'from-green-400 to-green-600'
  },
  hdpe: {
    code: 'HDPE',
    name: 'HDPE',
    fullName: 'High-Density Polyethylene',
    description: 'HDPE is a versatile thermoplastic with excellent strength-to-density ratio. It is resistant to many different solvents and has a wide variety of applications including plastic bottles, corrosion-resistant piping, and plastic lumber.',
    properties: [
      'High strength-to-density ratio',
      'Excellent chemical resistance',
      'Low moisture absorption',
      'Good impact resistance',
      'Easy to process and mold',
      'UV resistant grades available'
    ],
    applications: [
      'Milk and juice jugs',
      'Detergent and bleach bottles',
      'Pipe and fittings',
      'Plastic lumber and decking',
      'Garbage bins and containers',
      'Fuel tanks and industrial packaging'
    ],
    recyclingProcess: [
      'Sorting by grade and color',
      'Grinding into flakes',
      'Washing and separation',
      'Melt filtration to remove contaminants',
      'Pelletizing with additives if needed',
      'Cooling and quality control'
    ],
    buyingInfo: 'Buying HDPE in all forms: bottles, pipes, containers, film, and industrial scrap. Best prices for clean, sorted material.',
    sellingInfo: 'High-quality HDPE pellets for blow molding, injection molding, and pipe extrusion. Custom compounds available upon request.',
    images: ['/images/hdpe/hdpe1.jpg', '/images/hdpe/hdpe2.jpg', '/images/hdpe/hdpe3.jpg'],
    color: 'from-blue-400 to-blue-600'
  },
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
    images: ['/images/pp/pp1.jpg', '/images/pp/pp2.jpg', '/images/pp/pp3.jpg'],
    color: 'from-orange-400 to-orange-600'
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
    images: ['/images/pvc/pvc1.jpg', '/images/pvc/pvc2.jpg', '/images/pvc/pvc3.jpg'],
    color: 'from-purple-400 to-purple-600'
  },
  ldpe: {
    code: 'LDPE',
    name: 'LDPE',
    fullName: 'Low-Density Polyethylene',
    description: 'LDPE is a flexible, lightweight plastic known for its excellent moisture barrier properties. It is commonly used for film applications, plastic bags, and flexible packaging.',
    properties: [
      'High flexibility and toughness',
      'Excellent moisture barrier',
      'Good chemical resistance',
      'Low temperature resistance',
      'Easy to process',
      'Good clarity in film form'
    ],
    applications: [
      'Plastic bags and shopping bags',
      'Stretch wrap and shrink film',
      'Squeeze bottles',
      'Agricultural film',
      'Coatings for paper and cardboard',
      'Flexible lids and closures'
    ],
    recyclingProcess: [
      'Collection of film and bags',
      'Agglomeration to densify material',
      'Washing to remove contaminants',
      'Melt filtration',
      'Pelletizing with antioxidant additives',
      'Quality testing for film applications'
    ],
    buyingInfo: 'We buy LDPE film, bags, and flexible packaging waste. Best prices for clean, dry material without excessive contamination.',
    sellingInfo: 'Recycled LDPE pellets for film extrusion, injection molding, and compounding. Suitable for garbage bags, agricultural film, and packaging.',
    images: ['/images/ldpe/ldpe1.jpg', '/images/ldpe/ldpe2.jpg', '/images/ldpe/ldpe3.jpg'],
    color: 'from-pink-400 to-pink-600'
  },
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
    color: 'from-yellow-400 to-yellow-600'
  },
  abs: {
    code: 'ABS',
    name: 'ABS',
    fullName: 'Acrylonitrile Butadiene Styrene',
    description: 'ABS is a tough, rigid thermoplastic with excellent impact resistance and machinability. It is widely used in automotive parts, electronics housings, and consumer goods.',
    properties: [
      'Excellent impact resistance',
      'Good heat resistance',
      'Easy to machine and finish',
      'High surface quality',
      'Good dimensional stability',
      'Can be painted and glued'
    ],
    applications: [
      'Automotive interior and exterior parts',
      'Electronics housings (computers, TVs)',
      'Lego bricks and toys',
      'Luggage and cases',
      'Kitchen appliances',
      'Pipes and fittings'
    ],
    recyclingProcess: [
      'Sorting by color and grade',
      'Removal of metal inserts and coatings',
      'Size reduction and washing',
      'Melt filtration',
      'Pelletizing with stabilization',
      'Testing for impact strength'
    ],
    buyingInfo: 'We purchase ABS from automotive, electronics, and consumer goods waste. Premium prices for clean, sorted material.',
    sellingInfo: 'High-quality recycled ABS for injection molding and extrusion. Available in natural, black, and custom colors with specified impact properties.',
    images: ['/images/abs/abs1.jpg', '/images/abs/abs2.jpg', '/images/abs/abs3.jpg'],
    color: 'from-red-400 to-red-600'
  },
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
    color: 'from-cyan-400 to-cyan-600'
  }
};

export default function PlasticDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  const type = params.type as string;
  const data = plasticData[type];

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  if (!data) {
    return <div>Plastic type not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${data.color} text-white py-16`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-6xl font-black">{data.code}</span>
            <div>
              <h1 className="text-4xl font-bold">{data.name}</h1>
              <p className="text-xl text-white/90">{data.fullName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/service" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {getString('PLASTIC_DETAIL.BACK_TO_SERVICES')}
        </Link>
        
        {/* Description */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{getString('PLASTIC_DETAIL.ABOUT')} {data.name}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{data.description}</p>
        </section>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Properties */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="text-primary mr-2" size={24} />
              {getString('PLASTIC_DETAIL.PROPERTIES.TITLE')}
            </h3>
            <ul className="space-y-3">
              {data.properties.map((prop, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{prop}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Applications */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Package className="text-primary mr-2" size={24} />
              {getString('PLASTIC_DETAIL.APPLICATIONS.TITLE')}
            </h3>
            <ul className="space-y-3">
              {data.applications.map((app, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{app}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Recycling Process */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Recycle className="text-primary mr-2" size={24} />
            {getString('PLASTIC_DETAIL.PROCESS.TITLE')}
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.recyclingProcess.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-50 rounded-xl p-4 h-full border-2 border-gray-100 hover:border-primary transition-colors">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
                {index < data.recyclingProcess.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={24} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Image Gallery */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">{getString('PLASTIC_DETAIL.GALLERY.TITLE')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.images.map((img, index) => (
              <div key={index} className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src={img}
                  alt={`${data.name} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Buy/Sell Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-green-50 rounded-2xl shadow-lg p-8 border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <Factory className="mr-2" size={24} />
              {getString('PLASTIC_DETAIL.BUY.TITLE')} {data.name}
            </h3>
            <p className="text-gray-700 mb-4">{data.buyingInfo}</p>
            <Link href="/contact" className="inline-flex items-center text-green-700 font-semibold hover:underline">
              {getString('PLASTIC_DETAIL.BUY.GET_QUOTE')} <ArrowLeft className="ml-2 rotate-180" size={16} />
            </Link>
          </section>

          <section className="bg-blue-50 rounded-2xl shadow-lg p-8 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <Package className="mr-2" size={24} />
              {getString('PLASTIC_DETAIL.SELL.TITLE')} {data.name} Pellets
            </h3>
            <p className="text-gray-700 mb-4">{data.sellingInfo}</p>
            <Link href="/contact" className="inline-flex items-center text-blue-700 font-semibold hover:underline">
              {getString('PLASTIC_DETAIL.SELL.REQUEST_SAMPLE')} <ArrowLeft className="ml-2 rotate-180" size={16} />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}