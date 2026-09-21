'use client';

import { useId, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Loader2, RotateCcw } from 'lucide-react';
import { useTr } from '@/lib/useTr';
import { COMPANY, INQUIRY_TYPES, findPerson, isInquiryType, type InquiryType } from '@/lib/company';
import { EASE_OUT } from '@/components/motion/Reveal';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15';

interface FormState {
  name: string;
  email: string;
  phone: string;
  type: '' | InquiryType;
  message: string;
  privacy: boolean;
}

const EMPTY: FormState = { name: '', email: '', phone: '', type: '', message: '', privacy: false };

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const tr = useTr();
  const searchParams = useSearchParams();
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  // The recipient is resolved from our own list. The `email` URL param is deliberately ignored,
  // otherwise a crafted link could aim the form at any address.
  const person = findPerson(searchParams.get('to'));
  const recipientEmail = person?.email ?? COMPANY.generalEmail;

  const [form, setForm] = useState<FormState>(() => {
    const preset = searchParams.get('type');
    return { ...EMPTY, type: isInquiryType(preset) ? preset : '' };
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const typeLabels = tr.record('CONTACT.FORM.TYPE_OPTIONS');
  const typeLabel = (key: string) => typeLabels[key] || key;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          website: honeypot, // honeypot, must stay empty
          recipient: person?.id ?? 'info',
          toEmail: recipientEmail, // kept so your current API route keeps working; see lib/contactValidation.ts
        }),
      });

      if (response.ok) {
        setStatus('success');
        setForm(EMPTY);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Who the message goes to */}
      {person && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="mb-6 flex items-center justify-between gap-4 rounded-xl bg-primary p-4 text-white"
        >
          <div className="min-w-0">
            <p className="text-sm opacity-90">{tr('CONTACT.SENDING_TO')}</p>
            <p className="truncate font-bold">
              {person.name} ({tr(person.roleKey)})
            </p>
          </div>
          <Link
            href="/contact"
            scroll={false}
            className="shrink-0 rounded-lg bg-white/20 px-3 py-1.5 text-sm transition-colors hover:bg-white/30"
          >
            {tr('CONTACT.SWITCH_TO_GENERAL')}
          </Link>
        </motion.div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="py-10 text-center"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
                />
              </svg>
            </div>
            <p className="mx-auto max-w-sm text-lg font-semibold text-gray-800">
              {tr('CONTACT.FORM.SUCCESS')}
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary"
            >
              <RotateCcw size={16} />
              {tr('CONTACT.FORM.SEND_ANOTHER', 'Send another message')}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Honeypot: invisible to people, tempting to bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>
            </div>

            <Field id={id('name')} label={tr('CONTACT.FORM.NAME')} required>
              <input
                id={id('name')}
                type="text"
                required
                autoComplete="name"
                maxLength={100}
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className={inputClass}
                placeholder={tr('CONTACT.FORM.NAME_PLACEHOLDER')}
              />
            </Field>

            <Field id={id('email')} label={tr('CONTACT.FORM.EMAIL')} required>
              <input
                id={id('email')}
                type="email"
                required
                autoComplete="email"
                maxLength={200}
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className={inputClass}
                placeholder={tr('CONTACT.FORM.EMAIL_PLACEHOLDER')}
              />
            </Field>

            <Field id={id('phone')} label={tr('CONTACT.FORM.PHONE')}>
              <input
                id={id('phone')}
                type="tel"
                autoComplete="tel"
                maxLength={50}
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className={inputClass}
                placeholder={tr('CONTACT.FORM.PHONE_PLACEHOLDER')}
              />
            </Field>

            <Field id={id('type')} label={tr('CONTACT.FORM.TYPE')} required>
              <select
                id={id('type')}
                required
                value={form.type}
                onChange={(e) => update('type', e.target.value as FormState['type'])}
                className={inputClass}
              >
                <option value="">{typeLabel('SELECT')}</option>
                {INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {typeLabel(t.toUpperCase())}
                  </option>
                ))}
              </select>
            </Field>

            <Field id={id('message')} label={tr('CONTACT.FORM.MESSAGE')} required>
              <textarea
                id={id('message')}
                required
                rows={5}
                maxLength={5000}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder={tr('CONTACT.FORM.MESSAGE_PLACEHOLDER')}
              />
            </Field>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id={id('privacy')}
                required
                checked={form.privacy}
                onChange={(e) => update('privacy', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 accent-primary"
              />
              <label htmlFor={id('privacy')} className="text-sm text-gray-600">
                <a href="#privacy-policy" className="text-primary underline hover:no-underline">
                  {tr('CONTACT.FORM.PRIVACY_LINK')}
                </a>
                {tr('CONTACT.FORM.PRIVACY')} <span className="text-red-500">*</span>
              </label>
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-red-700">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p>{tr('CONTACT.FORM.ERROR')}</p>
                      <a
                        href={`mailto:${recipientEmail}`}
                        className="mt-1 inline-block font-semibold underline"
                      >
                        {recipientEmail}
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white transition-all duration-200 hover:bg-dark hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  {tr('CONTACT.FORM.SENDING')}
                </>
              ) : (
                <>
                  {tr('CONTACT.FORM.SUBMIT')}
                  <ArrowRight
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    size={20}
                  />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}