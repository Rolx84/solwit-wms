'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function AnimatedNumber({ value, suffix }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericValue * eased;

            if (value.includes('.')) {
              setDisplay(current.toFixed(1));
            } else {
              setDisplay(Math.round(current).toString());
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            setDisplay(value);
          } else {
            requestAnimationFrame(animate);
          }

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-mono font-bold text-3xl sm:text-4xl text-purple-brand">
      {display}
      {suffix}
    </span>
  );
}

function PainRow({
  pain,
  solution,
  metric,
  metricLabel,
  index,
}: {
  pain: string;
  solution: string;
  metric: string;
  metricLabel: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 md:gap-8 items-center
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Pain side */}
      <div className="glass-card rounded-card p-6 border-red-200/50 bg-red-50/30">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p className="text-text-secondary line-through decoration-red-300/60 font-mono">
            {pain}
          </p>
        </div>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-center justify-center">
        <svg
          className="w-8 h-8 text-purple-bright"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>

      {/* Solution side */}
      <div className="glass-card rounded-card p-6 border-purple-brand/10 bg-purple-50/30 shadow-purple-brand/5 shadow-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-purple-bright flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="text-text-primary font-mono font-semibold mb-2">{solution}</p>
            <div className="flex items-baseline gap-2">
              <AnimatedNumber value={metric} />
              <span className="text-text-dim font-mono text-xs">{metricLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PainToSolution() {
  const t = useTranslations('painSolution');

  const pains = ['1', '2', '3'] as const;

  return (
    <section id="pain-solution" className="section-padding relative" aria-label={t('title')}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] gradient-blob opacity-30" />
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-tag mb-3 block">{t('sectionTag')}</span>
          <h2 className="heading-lg">{t('title')}</h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {pains.map((key, index) => (
            <PainRow
              key={key}
              pain={t(`pains.${key}.pain`)}
              solution={t(`pains.${key}.solution`)}
              metric={t(`pains.${key}.metric`)}
              metricLabel={t(`pains.${key}.metricLabel`)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
