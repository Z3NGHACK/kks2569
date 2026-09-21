// components/Footer.tsx
'use client';

import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail, Phone, MapPin, ArrowUpRight, ArrowUp } from 'lucide-react';
import { useTr } from '@/lib/useTr';
import { COMPANY } from '@/lib/company';
import { EASE_OUT, Reveal, Stagger, StaggerItem } from './motion/Reveal';

const linkUnderline =
  "relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

export default function Footer() {
  const tr = useTr();
  const { instagram, line } = COMPANY.social;

  const navItems = [
    { href: '/', label: tr('HEADER.NAV.TOP') },
    { href: '/about', label: tr('HEADER.NAV.ABOUT') },
    { href: '/service', label: tr('HEADER.NAV.SERVICE') },
    { href: '/plan', label: tr('HEADER.NAV.PLAN') },
    { href: '/contact', label: tr('HEADER.NAV.CONTACT') },
  ];

  const email = tr('FOOTER.EMAIL');
  const phone = tr('FOOTER.PHONE');
  const location = tr('FOOTER.LOCATION');

  const contacts = [
    { icon: Mail, text: email, href: email.includes('@') ? `mailto:${email}` : undefined },
    { icon: Phone, text: phone, href: /\d/.test(phone) ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined },
    { icon: MapPin, text: location, href: undefined },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <footer className="relative overflow-hidden bg-dark text-white">
        <div className="container mx-auto px-4">
          {/* Closing call to action */}
          <Reveal className="flex flex-col gap-8 border-b border-white/10 py-16 md:flex-row md:items-end md:justify-between md:py-24">
            <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
              {tr('FOOTER.CTA_TITLE', 'Buying, selling or exporting? Talk to our team.')}
            </h2>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-8 py-4 font-bold text-dark transition-all duration-200 hover:bg-amber-300 active:scale-[0.98] md:self-auto"
            >
              {tr('HEADER.CONTACT_BUTTON')}
              <ArrowUpRight
                size={20}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>

          {/* Columns */}
          <Stagger className="grid grid-cols-1 gap-10 py-14 md:grid-cols-12">
            <StaggerItem className="md:col-span-5">
              <h3 className="mb-4 text-xl font-bold">{tr('HEADER.COMPANY_NAME')}</h3>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
                {tr('FOOTER.DESCRIPTION')}
              </p>
              <div className="flex space-x-3">
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-200 hover:-translate-y-1 hover:bg-pink-500 hover:text-white"
                >
                  <Instagram size={18} />
                </a>
                )}
                {line && (
                  <a href={line} target="_blank" rel="noopener noreferrer" aria-label="Chat"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-200 hover:-translate-y-1 hover:bg-green-500 hover:text-white"
                >
                  <MessageCircle size={18} />
                </a>
                )}
              </div>
            </StaggerItem>

            <StaggerItem className="md:col-span-3">
              <h3 className="mb-4 text-lg font-bold">{tr('FOOTER.MENU')}</h3>
              <ul className="space-y-3 text-sm text-white/60">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={`${linkUnderline} transition-colors hover:text-white`}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem className="md:col-span-4">
              <h3 className="mb-4 text-lg font-bold">{tr('FOOTER.CONTACT_INFO')}</h3>
              <ul className="space-y-4 text-sm text-white/60">
                {contacts.map(({ icon: Icon, text, href }, i) => {
                  const body = (
                    <>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 group-hover:bg-amber-300 group-hover:text-dark">
                        <Icon size={16} />
                      </span>
                      <span className="pt-2 leading-snug">{text}</span>
                    </>
                  );
                  return (
                    <li key={i}>
                      {href ? (
                        <a href={href} className="group flex items-start gap-3 transition-colors hover:text-white">
                          {body}
                        </a>
                      ) : (
                        <div className="group flex items-start gap-3">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </StaggerItem>
          </Stagger>

          {/* Bottom bar */}
          <div className="flex items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/50">
            <p>{tr('FOOTER.COPYRIGHT')}</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={tr('FOOTER.BACK_TO_TOP', 'Back to top')}
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-amber-300 hover:bg-amber-300 hover:text-dark"
            >
              <ArrowUp size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Oversized outline wordmark, rises into view once */}
        <motion.div
          aria-hidden
          className="pointer-events-none -mb-[2vw] select-none whitespace-nowrap text-center text-[10.5vw] font-black leading-none tracking-tighter text-transparent"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.14)' }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_OUT }}
        >
          KHMER KANSAI
        </motion.div>
      </footer>
    </MotionConfig>
  );
}