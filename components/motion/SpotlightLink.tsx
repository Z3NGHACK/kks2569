'use client';

import Link from 'next/link';
import { useRef, type ComponentProps, type MouseEvent } from 'react';

type SpotlightLinkProps = ComponentProps<typeof Link> & {
  /** Any CSS colour. Keep the alpha low on light cards. */
  glow?: string;
};

/**
 * A <Link> that lights up under the cursor.
 * Give it `rounded-*` and `overflow-hidden` in className so the glow is clipped to the card.
 */
export default function SpotlightLink({
  glow = 'rgba(34, 197, 94, 0.16)',
  className = '',
  children,
  onMouseMove,
  ...rest
}: SpotlightLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
    onMouseMove?.(e);
  };

  return (
    <Link {...rest} ref={ref} onMouseMove={handleMove} className={`group relative ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 65%)`,
        }}
      />
      {children}
    </Link>
  );
}