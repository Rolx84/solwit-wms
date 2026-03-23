'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';

const featureKeys = [
  'receiving',
  'putaway',
  'counting',
  'picking',
  'inventory',
  'shipping',
  'dashboard',
  'mobile',
  'automation',
  'ai',
] as const;

type FeatureKey = (typeof featureKeys)[number];

const featureIcons: Record<FeatureKey, string> = {
  receiving: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  putaway: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  counting: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  picking: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  inventory: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  shipping: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
  dashboard: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  mobile: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  automation: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  ai: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
};

function FeatureCard({
  featureKey,
  isExpanded,
  onHover,
  onLeave,
  onTap,
  index,
  isPurple,
  isLastCol,
}: {
  featureKey: FeatureKey;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
  onTap: () => void;
  index: number;
  isPurple: boolean;
  isLastCol: boolean;
}) {
  const t = useTranslations('features');
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
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const baseBg = isPurple
    ? 'bg-purple-brand border-purple-brand/50 hover:bg-purple-bright'
    : 'glass-card hover:border-purple-brand/20';

  return (
    <div
      ref={ref}
      className={`
        rounded-card cursor-pointer transition-all duration-500 overflow-hidden border
        ${baseBg}
        ${isExpanded && !isLastCol ? 'sm:col-span-2 shadow-xl z-10' : ''}
        ${isExpanded && isLastCol ? 'shadow-xl z-10' : ''}
        ${!isExpanded ? 'hover:shadow-lg' : ''}
        ${isExpanded && isPurple ? '!bg-purple-bright' : ''}
        ${isExpanded && !isPurple ? 'bg-white border-purple-bright/30 shadow-xl shadow-purple-brand/8' : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
        ...(isExpanded && isLastCol ? { gridColumn: 'span 2 / -1' } : {}),
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onTap}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isPurple ? 'bg-white/20' : 'bg-purple-brand/10'
          }`}>
            <svg
              className={`w-5 h-5 ${isPurple ? 'text-white' : 'text-purple-brand'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={featureIcons[featureKey]} />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`font-mono font-bold text-sm sm:text-base leading-tight ${isPurple ? 'text-white' : 'text-text-primary'}`}>
              {t(`items.${featureKey}.name`)}
            </h3>
            {!isExpanded && (
              <p className={`text-xs font-mono mt-1 line-clamp-2 ${isPurple ? 'text-white/60' : 'text-text-dim'}`}>
                {t(`items.${featureKey}.short`)}
              </p>
            )}
          </div>
        </div>

        {/* Expanded details — smooth height animation */}
        <div
          className={`grid transition-all duration-500 ease-out ${
            isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-white/10' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <p className={`text-xs sm:text-sm leading-relaxed font-mono ${isPurple ? 'text-white/80' : 'text-text-secondary'}`}>
              {t(`items.${featureKey}.details`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureExplorer() {
  const t = useTranslations('features');
  const [hoveredKey, setHoveredKey] = useState<FeatureKey | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = (key: FeatureKey) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHoveredKey(key), 300);
  };
  const handleLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHoveredKey(null), 200);
  };
  const handleTap = (key: FeatureKey) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHoveredKey(hoveredKey === key ? null : key);
  };

  return (
    <section id="features" className="section-padding relative" aria-label={t('title')}>
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16">
          <span className="section-tag mb-3 block">{t('sectionTag')}</span>
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="font-mono text-sm text-purple-bright">{t('tagline')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {featureKeys.map((key, index) => (
            <FeatureCard
              key={key}
              featureKey={key}
              isExpanded={hoveredKey === key}
              onHover={() => handleHover(key)}
              onLeave={handleLeave}
              onTap={() => handleTap(key)}
              index={index}
              isPurple={index % 2 === 0}
              isLastCol={index % 5 === 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
