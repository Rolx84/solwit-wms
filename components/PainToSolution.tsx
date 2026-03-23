'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function AnimatedNumber({
  value,
  suffix,
  onComplete,
}: {
  value: string;
  suffix?: string;
  onComplete?: () => void;
}) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();
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
            } else {
              onComplete?.();
            }
          };

          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            setDisplay(value);
            onComplete?.();
          } else {
            requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, onComplete]);

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
  onStrikeComplete,
}: {
  pain: string;
  solution: string;
  metric: string;
  metricLabel: string;
  index: number;
  onStrikeComplete?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [struckOut, setStruckOut] = useState(false);

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
      {/* Pain side — strikethrough animates in when numbers finish */}
      <div className="glass-card rounded-card p-4 sm:p-6 border-red-200/50 bg-red-50/30">
        <div className="flex items-start gap-3">
          <svg
            className={`w-6 h-6 flex-shrink-0 mt-0.5 transition-colors duration-500 ${struckOut ? 'text-red-400' : 'text-text-dim'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="font-mono">
            {pain.split(' ').map((word, i) => (
              <span
                key={i}
                className="inline line-through decoration-2"
                style={{
                  textDecorationColor: struckOut ? 'rgba(239,68,68,0.7)' : 'transparent',
                  color: struckOut ? 'var(--text-dim, #9e93b0)' : 'var(--text-secondary, #6b5f80)',
                  transition: 'text-decoration-color 1.2s ease-in-out, color 1.2s ease-in-out',
                  transitionDelay: struckOut ? `${i * 250}ms` : '0ms',
                }}
              >
                {word}{' '}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Arrow — right on desktop, down on mobile */}
      <div className="flex items-center justify-center">
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-purple-bright rotate-90 md:rotate-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>

      {/* Solution side */}
      <div className="glass-card rounded-card p-4 sm:p-6 border-purple-brand/10 bg-purple-50/30 shadow-purple-brand/5 shadow-lg">
        <div className="flex items-start gap-3">
          <svg
            className={`w-6 h-6 flex-shrink-0 mt-0.5 transition-colors duration-500 ${struckOut ? 'text-purple-bright' : 'text-text-dim'}`}
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
              <AnimatedNumber value={metric} onComplete={() => {
                setTimeout(() => { setStruckOut(true); onStrikeComplete?.(); }, 500);
              }} />
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
  const [completedRows, setCompletedRows] = useState(0);

  const pains = ['1', '2', '3'] as const;
  const progress = completedRows / pains.length; // 0 → 1

  return (
    <section id="pain-solution" className="section-padding relative overflow-hidden" aria-label={t('title')}>
      {/* Grid background — broken on left (pain), clean on right (solution) */}
      {/* As rows complete, the clean grid spreads left, "healing" the broken one */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Broken/scattered grid on the left (pain side) — fades as rows complete */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 transition-all duration-1000"
          style={{
            opacity: 0.25 - progress * 0.2,
            backgroundImage: `
              linear-gradient(to right, rgba(239,68,68,0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(239,68,68,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '116px 106px, 126px 116px',
            backgroundPosition: '3px 5px, -2px 3px',
            maskImage: 'linear-gradient(to right, black 0%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 70%)',
            transform: `skewY(${2 - progress * 2}deg)`,
          }}
        />

        {/* Clean/aligned grid on the right (solution side) — grows as rows complete */}
        <div
          className="absolute inset-y-0 right-0 transition-all duration-1000"
          style={{
            width: `${35 + progress * 40}%`,
            opacity: 0.2 + progress * 0.25,
            backgroundImage: `
              linear-gradient(to right, rgba(98,53,143,0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(98,53,143,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            maskImage: 'linear-gradient(to left, black 0%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 70%)',
          }}
        />

        {/* Purple gradient glow from left — appears as pain resolves */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 transition-all duration-1500"
          style={{
            background: 'linear-gradient(to right, rgba(98,53,143,0.25), rgba(157,81,233,0.12) 50%, transparent)',
            opacity: progress,
          }}
        />
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-tag mb-3 block">{t('sectionTag')}</span>
          <h2 className="heading-lg">{t('title')}</h2>
        </div>

        <div className="space-y-10 sm:space-y-16 md:space-y-20 max-w-4xl mx-auto">
          {pains.map((key, index) => (
            <PainRow
              key={key}
              pain={t(`pains.${key}.pain`)}
              solution={t(`pains.${key}.solution`)}
              metric={t(`pains.${key}.metric`)}
              metricLabel={t(`pains.${key}.metricLabel`)}
              index={index}
              onStrikeComplete={() => setCompletedRows((prev) => Math.min(prev + 1, pains.length))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
