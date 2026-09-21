'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface SectionNavItem {
  id: string;
  label: string;
}

/**
 * Sticky pill bar that highlights the section currently on screen and
 * jumps to a section when clicked. It sits directly under the Header and
 * follows it up and down (Header publishes --header-offset).
 */
export default function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const idKey = items.map((i) => i.id).join('|');

  useEffect(() => {
    const ids = idKey.split('|');
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    // A section becomes "active" when it crosses a band near the top third of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idKey]);

  return (
    <div className="sticky top-[var(--header-offset,0px)] z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl transition-[top] duration-[350ms]">
      <nav
        aria-label="Sections"
        className="no-scrollbar container mx-auto flex gap-1 overflow-x-auto px-4 py-2.5"
      >
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-gray-600 hover:text-primary'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="section-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}