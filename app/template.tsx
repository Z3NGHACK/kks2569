'use client';

import { MotionConfig, motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Next.js re-mounts template.tsx on every navigation (unlike layout.tsx),
 * so this gives each page a soft entrance without any extra wiring.
 *
 * MotionConfig also makes every framer-motion animation below it respect the
 * visitor's "reduce motion" setting (transforms are skipped, fades stay).
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}