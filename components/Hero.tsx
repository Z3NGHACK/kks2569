// components/Hero.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTr } from '@/lib/useTr';
import { EASE_OUT } from '@/components/motion/Reveal';

interface HeroProps {
  variant?: 'home' | 'page';
  title?: string;
  subtitle?: string;
  description?: string;
  showButtons?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Home hero                                                                  */
/* -------------------------------------------------------------------------- */

const SLIDE_MS = 6000;

// Each slide is one of the company's business lines, so the progress bars
// at the bottom double as a navigator ("what does KKS do?").
const SLIDES = [
  {
    id: 'machinery',
    src: '/banner/homepage/machinery-showcase.jpg',
    alt: 'Japanese Machinery',
    labelKey: 'HOME.HERO.SLIDE_MACHINERY',
    label: 'Machinery',
    href: '/service#machinery',
  },
  {
    id: 'fertilizer',
    src: '/banner/homepage/fertlizer-farm.jpg',
    alt: 'Premium Fertilizers',
    labelKey: 'HOME.HERO.SLIDE_FERTILIZER',
    label: 'Fertilizer',
    href: '/service#fertilizer',
  },
  {
    id: 'recycling',
    src: '/banner/homepage/recycling-plant.jpg',
    alt: 'Sustainable Recycling',
    labelKey: 'HOME.HERO.SLIDE_RECYCLING',
    label: 'Plastic recycling',
    href: '/service#plastic',
  },
  {
    id: 'team',
    src: '/banner/homepage/header3.png',
    alt: 'Khmer Kansai Team',
    labelKey: 'HOME.HERO.SLIDE_TEAM',
    label: 'Our team',
    href: '/about',
  },
] as const;

// Materials the company actually trades. Symbols are language-neutral;
// translate the names if you like.
const TICKER = [
  { code: 'Cu', name: 'Copper' },
  { code: 'Al', name: 'Aluminum' },
  { code: 'PP', name: 'Polypropylene' },
  { code: 'PVC', name: 'Polyvinyl chloride' },
  { code: 'PS', name: 'Polystyrene' },
  { code: 'PC', name: 'Polycarbonate' },
  { code: 'NPK', name: 'Organic fertilizer' },
  { code: 'CAT', name: 'Excavators' },
  { code: 'AGRI', name: 'Tractors & combines' },
];

function HomeHero({ showButtons }: { showButtons: boolean }) {
  const tr = useTr();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0); // 0 -> 1 over SLIDE_MS, drives the active bar without re-rendering

  const go = useCallback(
    (i: number) => {
      setIndex((i + SLIDES.length) % SLIDES.length);
      progress.set(0);
    },
    [progress]
  );

  useAnimationFrame((_, delta) => {
    if (paused || reduceMotion) return;
    const next = progress.get() + Math.min(delta, 100) / SLIDE_MS;
    if (next >= 1) go(index + 1);
    else progress.set(next);
  });

  const slide = SLIDES[index];

  return (
    <section className="relative flex min-h-[max(36rem,calc(100svh-5rem))] flex-col overflow-hidden bg-dark text-white">
      {/* Slides: crossfade + slow push-in */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{
              opacity: 1,
              scale: 1.02,
              transition: { opacity: { duration: 1.2 }, scale: { duration: 9, ease: 'linear' } },
            }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              quality={85}
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legibility: dark on the text side, fading out toward the picture */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-dark/90 via-dark/55 to-dark/10" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-dark/80 to-transparent" />

      {/* Content */}
      <div className="container relative z-20 mx-auto flex flex-1 items-center px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
            >
              {tr('HOME.HERO.TITLE_1')}
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
            >
              {tr('HOME.HERO.TITLE_2')}
              <span className="relative inline-block text-amber-300">
                {tr('HOME.HERO.TITLE_HIGHLIGHT')}
                <motion.span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[0.09em] origin-left rounded-full bg-amber-300/80"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT }}
                />
              </span>
              {tr('HOME.HERO.TITLE_3')}
            </motion.span>
          </h1>

          <motion.p
            className="mb-8 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
          >
            {tr('HOME.HERO.DESCRIPTION')}
          </motion.p>

          {showButtons && (
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE_OUT }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-bold text-primary shadow-lg transition-all duration-200 hover:bg-amber-300 hover:text-dark active:scale-[0.98]"
              >
                {tr('HOME.HERO.BUTTON_PRIMARY')}
                <ArrowRight
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                  size={20}
                />
              </Link>
              <Link
                href="/service"
                className="group inline-flex items-center justify-center rounded-full border-2 border-white/50 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white hover:text-primary active:scale-[0.98]"
              >
                {tr('HOME.HERO.BUTTON_SECONDARY')}
                <ArrowRight
                  className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                  size={20}
                />
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Slide navigator */}
      <motion.div
        className="container relative z-20 mx-auto px-4 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="flex items-end justify-between gap-8">
          <div className="flex max-w-2xl flex-1 gap-3 sm:gap-5">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={tr(s.labelKey, s.label)}
                aria-current={i === index}
                className="group flex-1 py-2 text-left"
              >
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/25">
                  {i === index ? (
                    <motion.span
                      className="block h-full origin-left rounded-full bg-amber-300"
                      style={{ scaleX: reduceMotion ? 1 : progress }}
                    />
                  ) : (
                    <span
                      className={`block h-full rounded-full bg-amber-300 ${i < index ? 'w-full' : 'w-0'}`}
                    />
                  )}
                </span>
                <span
                  className={`mt-3 hidden text-sm font-medium transition-colors duration-300 sm:block ${
                    i === index ? 'text-white' : 'text-white/55 group-hover:text-white'
                  }`}
                >
                  {tr(s.labelKey, s.label)}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden pb-1 md:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href={slide.href}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-amber-300"
                >
                  {tr('HOME.HERO.EXPLORE', 'Explore')} {tr(slide.labelKey, slide.label)}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Materials ticker */}
      <div
        aria-hidden
        className="marquee relative z-20 overflow-hidden border-t border-white/15 bg-dark/70 backdrop-blur-sm"
      >
        <div className="marquee-track flex w-max items-center py-3.5">
          {[...TICKER, ...TICKER].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 whitespace-nowrap text-sm">
              <span className="font-bold text-amber-300">{item.code}</span>
              <span className="text-white/70">{item.name}</span>
              <span className="mx-6 h-1 w-1 rotate-45 bg-white/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Inner-page hero                                                            */
/* -------------------------------------------------------------------------- */

function PageHero({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-dark text-white">
      {/* Dot grid that fades out toward the right */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to right, black, transparent 75%)',
          WebkitMaskImage: 'linear-gradient(to right, black, transparent 75%)',
        }}
      />

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <motion.h1
          className="mb-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl"
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="max-w-2xl text-lg text-green-100"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Hairline that draws itself in */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT }}
      />
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export default function Hero({
  variant = 'home',
  title,
  subtitle,
  showButtons = true,
}: HeroProps) {
  if (variant === 'page') return <PageHero title={title} subtitle={subtitle} />;
  return <HomeHero showButtons={showButtons} />;
}