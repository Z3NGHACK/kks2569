'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { EASE_OUT } from '@/components/motion/Reveal';
import { inquiryHref } from '@/lib/inquiry';
import type { InquiryType } from '@/lib/company';

export interface QuickViewProduct {
  id: number | string;
  category: string;
  name: string;
  description: string;
  image: string;
  price?: string;
}

interface ProductQuickViewProps {
  product: QuickViewProduct | null;
  onClose: () => void;
  /** Inquiry type to pre-select on the contact form, e.g. 'buying'. */
  inquiryType?: InquiryType;
  inquiryLabel: string;
}

/**
 * A lightweight "detail view" for list items that don't have their own route
 * (unlike plastics, fertilizers, excavators, tractors and parts, which do).
 * Clicking a card opens this instead of the small "Inquiry" link doing all
 * the work — the product name still travels into the contact form either way.
 */
export default function ProductQuickView({ product, onClose, inquiryType, inquiryLabel }: ProductQuickViewProps) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="quick-view"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 bg-gray-100 md:h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition-colors hover:bg-white md:hidden"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative flex flex-col p-8">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-6 top-6 hidden h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 md:flex"
                >
                  <X size={18} />
                </button>

                <span className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                  {product.category}
                </span>
                <h2 className="mb-3 text-2xl font-bold text-gray-900">{product.name}</h2>
                <p className="mb-6 leading-relaxed text-gray-600">{product.description}</p>

                {product.price && <p className="mb-6 font-semibold text-primary">{product.price}</p>}

                <Link
                  href={inquiryHref({ product: product.name, type: inquiryType })}
                  className="group mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-white transition-all duration-200 hover:bg-dark active:scale-[0.98]"
                >
                  {inquiryLabel}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}