'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTr } from '@/lib/useTr';
import { EASE_OUT, Reveal } from '@/components/motion/Reveal';

const SECTIONS = [
  'SECTION1',
  'SECTION2',
  'SECTION3',
  'SECTION4',
  'SECTION5',
  'SECTION6',
  'SECTION7',
  'SECTION8',
] as const;
type Section = (typeof SECTIONS)[number];

const dlClass =
  'grid grid-cols-[minmax(6rem,28%)_1fr] gap-x-4 gap-y-2 rounded-xl bg-gray-50 p-4 text-gray-700';

function Body({ section }: { section: Section }) {
  const tr = useTr();
  const base = `CONTACT.PRIVACY_POLICY.${section}`;

  if (section === 'SECTION2') {
    return (
      <dl className={dlClass}>
        <dt className="font-semibold">{tr(`${base}.COMPANY_NAME`)}</dt>
        <dd>{tr('HEADER.COMPANY_NAME')}</dd>
        <dt className="font-semibold">{tr(`${base}.REPRESENTATIVE`)}</dt>
        <dd>{tr('ABOUT.INFO.REPRESENTATIVE_VALUE')}</dd>
      </dl>
    );
  }

  if (section === 'SECTION4') {
    return (
      <>
        <p>{tr(`${base}.CONTENT`)}</p>
        <ol className="mt-3 list-inside list-decimal space-y-1.5 pl-2">
          {tr.list(`${base}.PURPOSES`).map((purpose, i) => (
            <li key={i}>{purpose}</li>
          ))}
        </ol>
      </>
    );
  }

  if (section === 'SECTION8') {
    return (
      <>
        <p className="mb-3">{tr(`${base}.CONTENT`)}</p>
        <dl className={dlClass}>
          <dt className="font-semibold">{tr(`${base}.COMPANY_LABEL`)}</dt>
          <dd>{tr('HEADER.COMPANY_NAME')}</dd>
          <dt className="font-semibold">{tr(`${base}.EMAIL_LABEL`)}</dt>
          <dd className="break-all">{tr('FOOTER.EMAIL')}</dd>
        </dl>
      </>
    );
  }

  return <p>{tr(`${base}.CONTENT`)}</p>;
}

export default function PrivacyPolicy() {
  const tr = useTr();
  const [open, setOpen] = useState<Set<Section>>(new Set());

  // The form's "privacy policy" link points here: open everything when it's used.
  useEffect(() => {
    const check = () => {
      if (window.location.hash === '#privacy-policy') setOpen(new Set(SECTIONS));
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  const allOpen = open.size === SECTIONS.length;

  const toggle = (s: Section) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });

  return (
    <section id="privacy-policy" className="mt-20 scroll-mt-32">
      <Reveal className="rounded-3xl bg-white p-6 shadow-lg md:p-12">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{tr('CONTACT.PRIVACY_POLICY.TITLE')}</h2>
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(SECTIONS))}
            className="self-start text-sm font-semibold text-primary underline-offset-4 hover:underline sm:self-auto"
          >
            {allOpen
              ? tr('CONTACT.PRIVACY_POLICY.COLLAPSE_ALL', 'Collapse all')
              : tr('CONTACT.PRIVACY_POLICY.EXPAND_ALL', 'Expand all')}
          </button>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-gray-600">
          {tr('CONTACT.PRIVACY_POLICY.INTRO')}
        </p>

        <div className="divide-y divide-gray-100 border-y border-gray-100">
          {SECTIONS.map((section) => {
            const isOpen = open.has(section);
            const panelId = `privacy-${section}`;
            return (
              <div key={section}>
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(section)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors"
                  >
                    <span
                      className={`text-base font-bold transition-colors md:text-lg ${
                        isOpen ? 'text-primary' : 'text-gray-800 group-hover:text-primary'
                      }`}
                    >
                      {tr(`CONTACT.PRIVACY_POLICY.${section}.TITLE`)}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-primary' : 'text-gray-400'
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 text-sm leading-relaxed text-gray-600">
                        <Body section={section} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-gray-500">{tr('CONTACT.PRIVACY_POLICY.DATE')}</p>
      </Reveal>
    </section>
  );
}