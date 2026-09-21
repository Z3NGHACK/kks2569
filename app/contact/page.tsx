'use client';

import { Suspense, type ReactNode } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, PhoneCall } from 'lucide-react';
import Hero from '@/components/Hero';
import ContactForm from '@/components/contact/ContactForm';
import PrivacyPolicy from '@/components/contact/PrivacyPolicy';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useTr } from '@/lib/useTr';
import { COMPANY, extractPhone, telHref } from '@/lib/company';

function ContactFormSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-12 rounded-xl bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

function InfoRow({
  icon,
  label,
  href,
  children,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
  children: ReactNode;
}) {
  const content = (
    <>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>
      <div className="min-w-0">
        <h4 className="mb-1 font-medium text-gray-800">{label}</h4>
        <div className="break-words text-gray-600">{children}</div>
      </div>
    </>
  );

  return href ? (
    <a href={href} className="group flex items-start gap-4 rounded-xl transition-colors">
      {content}
    </a>
  ) : (
    <div className="group flex items-start gap-4">{content}</div>
  );
}

export default function ContactPage() {
  const tr = useTr();

  const email = tr('FOOTER.EMAIL');
  const phoneText = tr('FOOTER.PHONE');
  const phone = extractPhone(phoneText);
  const { line } = COMPANY.social;

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        variant="page"
        title={tr('CONTACT.PAGE_TITLE')}
        subtitle={tr('CONTACT.PAGE_SUBTITLE')}
      />

      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-3xl bg-white p-6 shadow-xl md:p-10">
              <h2 className="mb-8 text-2xl font-bold text-gray-800">{tr('CONTACT.FORM.TITLE')}</h2>

              <Suspense fallback={<ContactFormSkeleton />}>
                <ContactForm />
              </Suspense>

              <p className="mt-6 text-center text-sm text-gray-500">{tr('CONTACT.FORM.NOTE')}</p>
            </div>
          </Reveal>

          {/* Info column follows you down the page on desktop */}
          <div className="space-y-6 lg:sticky lg:top-[calc(var(--header-offset,0px)+1.5rem)] lg:col-span-2 lg:self-start">
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h3 className="mb-6 text-xl font-bold text-gray-800">{tr('CONTACT.INFO.TITLE')}</h3>

                <Stagger className="space-y-6" stagger={0.1} delay={0.2}>
                  <StaggerItem>
                    <InfoRow
                      icon={<Mail size={20} />}
                      label={tr('CONTACT.INFO.EMAIL_LABEL')}
                      href={email.includes('@') ? `mailto:${email}` : undefined}
                    >
                      <span className="font-medium text-primary">{email}</span>
                    </InfoRow>
                  </StaggerItem>

                  <StaggerItem>
                    <InfoRow
                      icon={<Phone size={20} />}
                      label={tr('CONTACT.INFO.PHONE_LABEL')}
                      href={phone ? telHref(phone) : undefined}
                    >
                      {tr('CONTACT.INFO.PHONE_DESC')}
                    </InfoRow>
                  </StaggerItem>

                  <StaggerItem>
                    <InfoRow icon={<MapPin size={20} />} label={tr('CONTACT.INFO.LOCATION_LABEL')}>
                      {tr('FOOTER.LOCATION')}
                    </InfoRow>
                  </StaggerItem>

                  <StaggerItem>
                    <InfoRow icon={<Clock size={20} />} label={tr('CONTACT.INFO.HOURS_LABEL')}>
                      {tr('CONTACT.INFO.HOURS_VALUE')}
                    </InfoRow>
                  </StaggerItem>
                </Stagger>
              </div>
            </Reveal>

            {/* Only shown if there's actually a way to act on it */}
            {(phone || line) && (
              <Reveal delay={0.2}>
                <div className="rounded-3xl bg-gradient-to-br from-primary to-dark p-8 text-white shadow-lg">
                  <h3 className="mb-3 text-xl font-bold">{tr('CONTACT.URGENT.TITLE')}</h3>
                  <p className="mb-6 text-green-100">{tr('CONTACT.URGENT.DESC')}</p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {phone && (
                      <a
                        href={telHref(phone)}
                        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-primary transition-all duration-200 hover:bg-amber-300 hover:text-dark active:scale-[0.98]"
                      >
                        <PhoneCall size={18} className="transition-transform group-hover:rotate-12" />
                        {tr('CONTACT.URGENT.PHONE_BUTTON')}
                      </a>
                    )}
                    {line && (
                      <a
                        href={line}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-bold text-white transition-all duration-200 hover:bg-green-400 active:scale-[0.98]"
                      >
                        <MessageCircle size={18} className="transition-transform group-hover:scale-110" />
                        {tr('CONTACT.URGENT.LINE_BUTTON')}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        <PrivacyPolicy />
      </div>
    </div>
  );
}