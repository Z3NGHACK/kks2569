'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Mail, MapPin, Phone } from 'lucide-react';
import Hero from '@/components/Hero';
import { EASE_OUT, Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useTr } from '@/lib/useTr';
import { COMPANY, PEOPLE, initials, telHref } from '@/lib/company';

const mapUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

function ProfileRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 px-6 py-6 transition-colors duration-200 hover:bg-gray-50/70 sm:grid-cols-3 sm:gap-6 md:px-8">
      <dt className="text-base font-semibold text-gray-700">{label}</dt>
      <dd className="text-gray-900 sm:col-span-2">{children}</dd>
    </div>
  );
}

export default function AboutPage() {
  const tr = useTr();

  const addresses = [tr('ABOUT.INFO.ADDRESS_NARA'), tr('ABOUT.INFO.ADDRESS_OSAKA')];
  const businessItems = tr.list('ABOUT.INFO.BUSINESS_ITEMS');

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        variant="page"
        title={tr('ABOUT.PAGE_TITLE')}
        subtitle={tr('ABOUT.PAGE_SUBTITLE')}
      />

      {/* ===== Message from the President ===== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-offset,0px)+2rem)]">
                <h2 className="text-3xl font-bold leading-tight text-primary md:text-4xl">
                  {tr('ABOUT.MESSAGE.TITLE')}
                </h2>
              </div>
            </Reveal>

            <div className="relative lg:col-span-8">
              {/* Accent line draws down as the text comes into view */}
              <motion.span
                aria-hidden
                className="absolute left-0 top-1 h-full w-1 origin-top rounded-full bg-gradient-to-b from-primary to-amber-300"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE_OUT }}
              />

              <Stagger
                className="space-y-6 pl-6 text-lg leading-8 text-gray-700 md:pl-10"
                stagger={0.14}
              >
                {['P1', 'P2', 'P3', 'P4'].map((k) => (
                  <StaggerItem key={k}>
                    <p>{tr(`ABOUT.MESSAGE.${k}`)}</p>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal className="mt-10 pl-6 text-right md:pl-10" delay={0.1}>
                <p className="font-medium text-gray-800">{tr('ABOUT.MESSAGE.COMPANY')}</p>
                <p className="mt-2 text-2xl font-bold text-primary">{tr('ABOUT.MESSAGE.PRESIDENT')}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Company profile ===== */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-bold text-primary md:text-4xl">
              {tr('ABOUT.INFO.TITLE')}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
              <ProfileRow label={tr('ABOUT.INFO.COMPANY_NAME')}>
                {tr('ABOUT.INFO.COMPANY_NAME_VALUE')}
              </ProfileRow>

              <ProfileRow label={tr('ABOUT.INFO.HEAD_OFFICE_BRANCH')}>
                <div className="grid gap-3 md:grid-cols-2">
                  {addresses.map((address, i) => (
                    <a
                      key={i}
                      href={mapUrl(address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4 text-sm leading-relaxed transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-green-50/60 hover:shadow-md"
                    >
                      <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                      <span className="flex-1">{address}</span>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-gray-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </a>
                  ))}
                </div>
              </ProfileRow>

              <ProfileRow label={tr('ABOUT.INFO.CONTACT')}>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                      <Mail size={16} className="text-gray-400" />
                      {tr('ABOUT.INFO.EMAIL')}:
                    </span>
                    <a
                      href={`mailto:${COMPANY.generalEmail}`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {COMPANY.generalEmail}
                    </a>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-dark active:scale-[0.97]"
                    >
                      {tr('ABOUT.EMAIL_BUTTON_DEFAULT')}
                      <ArrowUpRight
                        size={13}
                        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="flex items-center gap-2 font-medium text-gray-700">
                      <Globe size={16} className="text-gray-400" />
                      {tr('ABOUT.INFO.WEBSITE')}:
                    </span>
                    <a
                      href={COMPANY.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {COMPANY.website}
                    </a>
                  </div>
                </div>
              </ProfileRow>

              <ProfileRow label={tr('ABOUT.INFO.BUSINESS')}>
                <Stagger className="flex flex-wrap gap-2" stagger={0.05}>
                  {businessItems.map((item, i) => (
                    <StaggerItem key={i}>
                      <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary hover:text-white">
                        {item}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </ProfileRow>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ===== Leadership ===== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-bold text-primary md:text-4xl">
              {tr('ABOUT.INFO.CO_FOUNDERS')}
            </h2>
          </Reveal>

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {PEOPLE.map((person) => (
              <StaggerItem key={person.id} className="h-full">
                <div className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-dark text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                      {initials(person.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {tr(person.roleKey)}
                      </p>
                      <h3 className="text-lg font-bold leading-snug text-gray-900">{person.name}</h3>
                    </div>
                  </div>

                  <ul className="mb-6 space-y-2.5 text-sm text-gray-600">
                    <li>
                      <a
                        href={`mailto:${person.email}`}
                        className="flex items-center gap-2.5 break-all transition-colors hover:text-primary"
                      >
                        <Mail size={16} className="shrink-0 text-gray-400" />
                        {person.email}
                      </a>
                    </li>
                    {person.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={telHref(phone)}
                          className="flex items-center gap-2.5 transition-colors hover:text-primary"
                        >
                          <Phone size={16} className="shrink-0 text-gray-400" />
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/contact?to=${person.id}`}
                    className="group/btn mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-dark hover:shadow-lg active:scale-[0.98]"
                  >
                    <Mail size={16} />
                    {tr('ABOUT.EMAIL_BUTTON')} {person.name.split(' ').pop()}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}