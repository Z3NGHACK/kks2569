'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Filter, Grid3X3, List } from 'lucide-react';
import Hero from '@/components/Hero';
import { EASE_OUT, Reveal } from '@/components/motion/Reveal';
import ProductQuickView, { type QuickViewProduct } from '@/components/products/ProductQuickView';
import { useTr } from '@/lib/useTr';
import { inquiryHref } from '@/lib/inquiry';
import type { InquiryType } from '@/lib/company';

// Product data - easy to add more items
const allProducts: QuickViewProduct[] = [
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

// Higher-value equipment gets routed as a "quote" request; consumables as a "buying" inquiry.
const inquiryTypeFor = (category: string): InquiryType => (category === 'Parts' ? 'quote' : 'buying');

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [active, setActive] = useState<QuickViewProduct | null>(null);
  const tr = useTr();

  const filteredProducts = useMemo(
    () => (selectedCategory === 'All' ? allProducts : allProducts.filter((p) => p.category === selectedCategory)),
    [selectedCategory]
  );

  const inquiryLabel = active ? tr('PRODUCTS.INQUIRY') : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        variant="page"
        title={tr('PRODUCTS.PAGE_TITLE')}
        subtitle={tr('PRODUCTS.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <Link
          href="/service"
          className="group mb-8 inline-flex items-center text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          {tr('PRODUCTS.BACK_TO_SERVICES')}
        </Link>

        {/* Filters */}
        <Reveal className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="flex-shrink-0 text-gray-400" size={20} />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                className={`rounded-lg p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                className={`rounded-lg p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Products Grid/List — every card opens a quick view; "Inquiry" jumps straight to it */}
        <motion.div layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    type="button"
                    layout
                    onClick={() => setActive(product)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="group overflow-hidden rounded-2xl bg-white text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="relative h-48">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-primary/90 px-3 py-1 text-xs text-white">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 font-bold text-gray-800 transition-colors group-hover:text-primary">
                        {product.name}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-gray-600">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">{product.price}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700 transition-colors group-hover:bg-primary group-hover:text-white">
                          {tr('PRODUCTS.INQUIRY')}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                layout
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    type="button"
                    layout
                    onClick={() => setActive(product)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="group flex w-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-lg transition-all hover:shadow-xl md:flex-row"
                  >
                    <div className="relative h-48 w-full flex-shrink-0 md:h-48 md:w-48">
                      <Image src={product.image} alt={product.name} fill sizes="192px" className="object-cover" />
                    </div>
                    <div className="flex flex-grow flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {product.category}
                        </span>
                        <h3 className="mb-2 mt-1 text-xl font-bold text-gray-800">{product.name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                      </div>
                      <div className="flex shrink-0 items-center space-x-4">
                        <span className="font-semibold text-primary">{product.price}</span>
                        <span className="rounded-full bg-primary px-6 py-2 text-white transition-colors group-hover:bg-dark">
                          {tr('PRODUCTS.INQUIRY')}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-500">{tr('PRODUCTS.NO_PRODUCTS')}</p>
          </div>
        )}

        {/* Contact prompt */}
        <Reveal className="mt-12 text-center">
          <p className="mb-4 text-gray-600">{tr('PRODUCTS.CONTACT_PROMPT')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-dark"
          >
            {tr('PRODUCTS.CONTACT_US')}
          </Link>
        </Reveal>
      </div>

      <ProductQuickView
        product={active}
        onClose={() => setActive(null)}
        inquiryType={active ? inquiryTypeFor(active.category) : undefined}
        inquiryLabel={inquiryLabel}
      />
    </div>
  );
}