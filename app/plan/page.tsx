// app/plan/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Banknote,
  Car,
  Check,
  HelpCircle,
  Recycle,
  Search,
  ShoppingBag,
  Tractor,
  Truck,
  Tv,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react';
import Hero from '@/components/Hero';
import { EASE_OUT, Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useTr } from '@/lib/useTr';

const features: { key: string; icon: LucideIcon }[] = [
  { key: 'VISIT', icon: Truck },
  { key: 'CASH', icon: Banknote },
  { key: 'BRING_IN', icon: Check },
];

const itemCategories: { key: string; icon: LucideIcon }[] = [
  { key: 'APPLIANCES', icon: Tv },
  { key: 'METAL', icon: Wrench },
  { key: 'PLASTIC', icon: Recycle },
  { key: 'VEHICLES', icon: Car },
  { key: 'MACHINERY', icon: Tractor },
  { key: 'LEATHER', icon: ShoppingBag },
];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Wraps the part of `text` that matches `query` in a highlight. */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'i'));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-amber-200 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function PlanPage() {
  const tr = useTr();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  // Filter: a category stays if its title matches (then it shows everything) or any item matches.
  const categories = itemCategories
    .map((cat) => {
      const title = tr(`PLAN.ITEMS.${cat.key}.TITLE`);
      const all = tr.list(`PLAN.ITEMS.${cat.key}.ITEMS`);
      const titleMatch = q !== '' && title.toLowerCase().includes(q);
      const items = !q || titleMatch ? all : all.filter((i) => i.toLowerCase().includes(q));
      return { ...cat, title, items, visible: !q || titleMatch || items.length > 0 };
    })
    .filter((c) => c.visible);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        variant="page"
        title={tr('PLAN.PAGE_TITLE')}
        subtitle={tr('PLAN.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
        {/* Intro */}
        <Reveal className="mb-14 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-4xl">
            {tr('PLAN.INTRO.TITLE')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">{tr('PLAN.INTRO.SUBTITLE')}</p>
        </Reveal>

        {/* Three ways to sell to us */}
        <Stagger className="mb-20 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {features.map(({ key, icon: Icon }) => (
            <StaggerItem key={key} className="h-full">
              <div className="group h-full rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-dark shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="text-white" size={30} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  {tr(`PLAN.FEATURES.${key}.TITLE`)}
                </h3>
                <p className="text-gray-600">{tr(`PLAN.FEATURES.${key}.DESC`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* What we buy */}
        <Reveal className="mb-16 rounded-3xl bg-white p-6 shadow-xl md:p-10">
          <h3 className="mb-2 text-center text-2xl font-bold text-primary md:text-3xl">
            {tr('PLAN.ITEMS.TITLE')}
          </h3>
          <p className="mb-8 text-center text-sm text-gray-500">
            {tr('PLAN.ITEMS.SEARCH_HINT', 'Type an item to see if we buy it.')}
          </p>

          {/* Search */}
          <div className="relative mx-auto mb-10 max-w-xl">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              inputMode="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tr('PLAN.ITEMS.SEARCH', 'Search items')}
              aria-label={tr('PLAN.ITEMS.SEARCH', 'Search items')}
              className="w-full rounded-full border border-gray-300 bg-white py-3.5 pl-12 pr-12 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <p className="sr-only" aria-live="polite">
            {q ? `${categories.length}` : ''}
          </p>

          {/* Category cards: reflow smoothly as the filter changes */}
          <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {categories.map(({ key, icon: Icon, title, items }) => (
                <motion.div
                  key={key}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="group rounded-2xl border border-gray-100 bg-gray-50/70 p-5 transition-colors duration-200 hover:border-primary/30 hover:bg-green-50/50"
                >
                  <h4 className="mb-4 flex items-center gap-3 font-bold text-gray-800">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon size={20} />
                    </span>
                    <Highlight text={title} query={q} />
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={14} className="mt-1 shrink-0 text-primary" />
                        <span>
                          <Highlight text={item} query={q} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Nothing matched: point to the next step instead of a dead end */}
          <AnimatePresence>
            {q && categories.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="mx-auto max-w-md py-8 text-center"
              >
                <p className="mb-1 font-semibold text-gray-800">
                  {tr('PLAN.ITEMS.EMPTY_TITLE', 'Not on our list?')}
                </p>
                <p className="mb-5 text-sm text-gray-600">
                  {tr('PLAN.ITEMS.EMPTY_DESC', 'We may still be able to help. Send us the details and we will check.')}
                </p>
                <Link
                  href="/contact?type=quote"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-dark active:scale-[0.98]"
                >
                  {tr('PLAN.CTA.BUTTON')}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>

        {/* CTA */}
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-dark p-10 text-center text-white shadow-2xl md:p-14">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
              backgroundSize: '22px 22px',
            }}
          />
          <div className="relative">
            <HelpCircle className="mx-auto mb-5" size={44} />
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">{tr('PLAN.CTA.TITLE')}</h3>
            <p className="mx-auto mb-8 max-w-xl text-green-100">{tr('PLAN.CTA.DESC')}</p>
            <Link
              href="/contact?type=quote"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary shadow-lg transition-all duration-200 hover:bg-amber-300 hover:text-dark active:scale-[0.98]"
            >
              {tr('PLAN.CTA.BUTTON')}
              <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}