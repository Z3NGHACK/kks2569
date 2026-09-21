'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Overlay content (captions, gradients) rendered above the image. */
  children?: ReactNode;
}

/**
 * The image is taller than its frame and drifts slowly as the frame scrolls
 * through the viewport, so the picture feels like it sits behind a window.
 */
export default function ParallaxImage({
  src,
  alt,
  className = '',
  sizes,
  priority,
  children,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[12%]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
      {children}
    </div>
  );
}