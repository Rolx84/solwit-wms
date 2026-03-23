'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function StatCard({
  value,
  prefix,
  suffix,
  label,
  index,
}: {
  value: string;
  prefix: string;
  suffix: string;
  label: string;
  index: number;
}) {
  const [display, setDisplay] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            const target = parseInt(value, 10);
            const duration = 2000;
            const startTime = performance.now();

            const prefersReducedMotion = window.matchMedia(
              '(prefers-reduced-motion: reduce)'
            ).matches;

            if (prefersReducedMotion) {
              setDisplay(target);
              return;
            }

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(target * eased));
              if (progress < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const formatted = display.toLocaleString();

  return (
    <div
      ref={ref}
      className={`
        glass-card rounded-card p-4 sm:p-5 text-center transition-all duration-700
        ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="mb-3">
        <span
          className="font-mono font-bold text-purple-brand whitespace-nowrap"
          style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)' }}
        >
          {prefix}{formatted}{suffix}
        </span>
      </div>
      <p className="text-text-secondary font-mono text-xs sm:text-sm leading-snug">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  const t = useTranslations('stats');

  const statKeys = ['1', '2', '3', '4', '5'] as const;

  return (
    <section id="stats" className="section-padding relative" aria-label={t('title')}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[500px] gradient-blob opacity-25" />
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-tag mb-3 block">{t('sectionTag')}</span>
          <h2 className="heading-lg">{t('title')}</h2>
        </div>

        {/* 2-col grid on mobile, 5-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {statKeys.map((key, index) => (
            <StatCard
              key={key}
              value={t(`items.${key}.value`)}
              prefix={t(`items.${key}.prefix`)}
              suffix={t(`items.${key}.suffix`)}
              label={t(`items.${key}.label`)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
