'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const checkKeys = ['1', '2', '3', '4', '5', '6'] as const;

export default function SituationChecker() {
  const t = useTranslations('checker');
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const count = checked.size;
  const progress = (count / checkKeys.length) * 100;

  let resultLevel: 'low' | 'medium' | 'high';
  if (count <= 1) resultLevel = 'low';
  else if (count <= 3) resultLevel = 'medium';
  else resultLevel = 'high';

  const scrollToForm = () => {
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="checker" className="section-padding relative" aria-label={t('title')}>
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-tag mb-3 block">{t('sectionTag')}</span>
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="text-text-secondary font-mono text-lg">{t('subtitle')}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Checklist */}
          <div className="space-y-3 mb-8">
            {checkKeys.map((key) => (
              <label
                key={key}
                className={`
                  flex items-center gap-4 p-4 rounded-card-sm cursor-pointer transition-all duration-200
                  ${checked.has(key)
                    ? 'glass-card border-purple-brand/20 shadow-md'
                    : 'bg-white/40 border border-transparent hover:bg-white/60'
                  }
                `}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={checked.has(key)}
                    onChange={() => toggle(key)}
                    className="sr-only"
                    aria-label={t(`items.${key}`)}
                  />
                  <div
                    className={`
                      w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200
                      ${checked.has(key)
                        ? 'bg-purple-brand border-purple-brand'
                        : 'border-text-dim/40'
                      }
                    `}
                  >
                    {checked.has(key) && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className={`font-mono transition-colors ${
                    checked.has(key) ? 'text-text-primary font-medium' : 'text-text-secondary'
                  }`}
                >
                  {t(`items.${key}`)}
                </span>
              </label>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background:
                    resultLevel === 'low'
                      ? '#9e93b0'
                      : resultLevel === 'medium'
                        ? '#9D51E9'
                        : '#62358F',
                }}
              />
            </div>
          </div>

          {/* Result message */}
          <div
            className={`
              text-center p-6 rounded-card transition-all duration-300
              ${resultLevel === 'high'
                ? 'glass-card border-purple-brand/30 bg-purple-brand/5'
                : 'glass-card'
              }
            `}
          >
            <p
              className={`font-mono text-lg mb-4 ${
                resultLevel === 'high'
                  ? 'text-text-primary font-semibold'
                  : 'text-text-secondary'
              }`}
            >
              {t(`results.${resultLevel}`)}
            </p>

            {resultLevel === 'high' && (
              <button
                onClick={scrollToForm}
                className="px-8 py-3 bg-purple-brand hover:bg-purple-bright text-white font-mono font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('results.cta')}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
