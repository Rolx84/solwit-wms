'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

const faqKeys = ['1', '2', '3', '4', '5', '6', '7'] as const;

function FAQItem({ questionKey }: { questionKey: string }) {
  const t = useTranslations('faq');
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-purple-brand/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left group"
        aria-expanded={isOpen}
      >
        <h3 className="font-mono font-bold text-lg sm:text-xl text-text-primary group-hover:text-purple-brand transition-colors">
          {t(`items.${questionKey}.question`)}
        </h3>
        <svg
          className={`w-5 h-5 text-purple-bright flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div ref={contentRef} className="pb-5 sm:pb-6">
          <p className="text-text-secondary font-mono leading-relaxed max-w-3xl">
            {t(`items.${questionKey}.answer`)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const t = useTranslations('faq');

  return (
    <section id="faq" className="section-padding relative" aria-label={t('title')}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] gradient-blob opacity-20" />
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-tag mb-3 block">{t('sectionTag')}</span>
          <h2 className="heading-lg">{t('title')}</h2>
        </div>

        <div className="max-w-3xl mx-auto glass-card rounded-card p-6 sm:p-8">
          {faqKeys.map((key) => (
            <FAQItem key={key} questionKey={key} />
          ))}
        </div>
      </div>
    </section>
  );
}
