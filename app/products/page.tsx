'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Filter, Grid3X3, List } from 'lucide-react';
import { useState } from 'react';
import Hero from '@/components/Hero';
import { useTranslation } from '@/components/LanguageProvider';

// Product data - easy to add more items
const allProducts = [
  // Plastic Pellets
  { id: 1, category: 'Plastic Pellets', name: 'PET Clear Pellets', description: 'Virgin-quality recycled PET for bottle manufacturing', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 2, category: 'Plastic Pellets', name: 'HDPE Natural Pellets', description: 'High-density polyethylene for blow molding', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 3, category: 'Plastic Pellets', name: 'PP Injection Grade', description: 'Polypropylene for injection molding applications', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 4, category: 'Plastic Pellets', name: 'PVC Compound', description: 'Flexible and rigid PVC compounds', image: '/images/products/i1.jpg', price: 'Contact for price' },
  
  // Metal Scrap
  { id: 5, category: 'Metal', name: 'Copper Wire Scrap', description: 'Millberry grade copper wire, 99.9% purity', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 6, category: 'Metal', name: 'Aluminum UBC', description: 'Used beverage cans, clean and sorted', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 7, category: 'Metal', name: 'Aluminum Extrusion 6063', description: 'Clean extrusion scrap without steel', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 8, category: 'Metal', name: 'Brass Scrap', description: 'Yellow brass from fittings and valves', image: '/images/products/i1.jpg', price: 'Contact for price' },
  
  // Machinery
  { id: 9, category: 'Machinery', name: 'CAT 320D Excavator', description: '2015 model, 4500 hours, excellent condition', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 10, category: 'Machinery', name: 'Komatsu PC200-8', description: '2012 model, 6800 hours, ready to work', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 11, category: 'Machinery', name: 'Kubota Tractor L3608', description: '36HP, 4WD, with rotary tiller', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 12, category: 'Machinery', name: 'Yanmar Combine', description: 'Rice combine harvester, head-feeder type', image: '/images/products/i1.jpg', price: 'Contact for price' },
  
  // Parts
  { id: 13, category: 'Parts', name: 'Hydraulic Pump', description: 'Main pump for excavators, various brands', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 14, category: 'Parts', name: 'Engine Rebuild Kit', description: 'Complete kit for CAT C7 engine', image: '/images/products/i1.jpg', price: 'Contact for price' },
  { id: 15, category: 'Parts', name: 'Track Link Assembly', description: 'Undercarriage parts for 20-ton class', image: '/images/products/i1.jpg', price: 'Contact for price' },
];

const categories = ['All', 'Plastic Pellets', 'Metal', 'Machinery', 'Parts'];

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { t } = useTranslation();

  const getString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero 
        variant="page" 
        title={getString('PRODUCTS.PAGE_TITLE')}
        subtitle={getString('PRODUCTS.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <Link href="/service" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          {getString('PRODUCTS.BACK_TO_SERVICES')}
        </Link>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="text-gray-400 flex-shrink-0" size={20} />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold text-sm">{product.price}</span>
                    <Link 
                      href="/contact"
                      className="text-xs bg-gray-100 hover:bg-primary hover:text-white text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {getString('PRODUCTS.INQUIRY')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-all">
                <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-1 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-primary font-semibold">{product.price}</span>
                    <Link 
                      href="/contact"
                      className="bg-primary text-white px-6 py-2 rounded-full hover:bg-dark transition-colors"
                    >
                      {getString('PRODUCTS.INQUIRY')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{getString('PRODUCTS.NO_PRODUCTS')}</p>
          </div>
        )}

        {/* Load More / Contact */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            {getString('PRODUCTS.CONTACT_PROMPT')}
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-dark transition-colors"
          >
            {getString('PRODUCTS.CONTACT_US')}
          </Link>
        </div>
      </div>
    </div>
  );
}