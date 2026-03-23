'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Cubes = dynamic(() => import('./Cubes'), { ssr: false });

export default function CubeSection() {
  const t = useTranslations('cubes');
  const [gridSize, setGridSize] = useState(8);

  useEffect(() => {
    const check = () => setGridSize(window.innerWidth < 768 ? 6 : 8);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="cubes" className="section-padding relative overflow-hidden bg-purple-brand" aria-label={t('title')}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(157,81,233,0.8), transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(176,106,255,0.8), transparent 70%)' }} />
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-lg mb-4 text-white">{t('title')}</h2>
          <p className="text-white/70 font-mono text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center justify-center" style={{ height: '500px' }}>
          <Cubes
            gridSize={gridSize}
            maxAngle={45}
            radius={3}
            borderStyle="2px solid rgba(30,10,60,0.6)"
            faceColor="#4a2278"
            rippleColor="#ffffff"
            rippleSpeed={1.5}
            autoAnimate
            rippleOnClick
          />
        </div>
      </div>
    </section>
  );
}
