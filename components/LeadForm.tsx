'use client';

import { useTranslations } from 'next-intl';
import { useState, type FormEvent } from 'react';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
}

export default function LeadForm() {
  const t = useTranslations('leadForm');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('required');
    }
    if (!formData.company.trim()) {
      newErrors.company = t('required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log('Form submission:', formData);

    setSubmitted(true);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-card-sm border transition-all duration-200 font-mono text-sm
    bg-white/60 backdrop-blur-sm
    focus:outline-none focus:ring-2 focus:ring-purple-brand/30 focus:border-purple-brand
    ${hasError ? 'border-red-400' : 'border-purple-brand/10 hover:border-purple-brand/20'}`;

  return (
    <section id="lead-form" className="section-padding relative" aria-label={t('title')}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] gradient-blob opacity-30" />
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-tag mb-3 block">{t('sectionTag')}</span>
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="text-text-secondary font-mono text-lg">{t('subtitle')}</p>
        </div>

        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="glass-card rounded-card p-8 sm:p-12 text-center animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-bright/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-purple-bright"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-mono font-bold text-xl text-text-primary">{t('success')}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-card p-6 sm:p-8 space-y-5"
              noValidate
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-mono font-medium text-text-primary mb-1.5">
                  {t('fields.name')} *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputClass(!!errors.name)}
                  required
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 font-mono">{errors.name}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-mono font-medium text-text-primary mb-1.5">
                  {t('fields.company')} *
                </label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  className={inputClass(!!errors.company)}
                  required
                  autoComplete="organization"
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1 font-mono">{errors.company}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-mono font-medium text-text-primary mb-1.5">
                  {t('fields.email')} *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={inputClass(!!errors.email)}
                  required
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-mono font-medium text-text-primary mb-1.5">
                  {t('fields.phone')}
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={inputClass(false)}
                  autoComplete="tel"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-mono font-medium text-text-primary mb-1.5">
                  {t('fields.message')}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className={`${inputClass(false)} min-h-[100px] resize-y`}
                  rows={4}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-purple-brand hover:bg-purple-bright text-white font-mono font-bold text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                {t('submit')}
              </button>
            </form>
          )}

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {(['experience', 'clients', 'consultation'] as const).map((key) => (
              <div key={key} className="flex items-center gap-2 text-text-dim">
                <svg
                  className="w-4 h-4 text-purple-bright"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-mono text-xs">{t(`trust.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-toast-in">
          <div className="glass-card rounded-card-sm px-6 py-4 shadow-xl border-purple-bright/20 flex items-center gap-3">
            <svg
              className="w-5 h-5 text-purple-bright flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-text-primary font-mono text-sm font-medium">
              {t('success')}
            </p>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-text-dim hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
