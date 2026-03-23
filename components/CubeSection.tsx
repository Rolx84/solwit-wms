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
    <section id="cubes" className="section-padding relative overflow-hidden" aria-label={t('title')}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] gradient-blob opacity-20" />
      </div>

      <div className="section-container relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="text-text-secondary font-mono text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center justify-center" style={{ height: '500px' }}>
          <Cubes
            gridSize={gridSize}
            maxAngle={45}
            radius={3}
            borderStyle="2px dashed #B19EEF"
            faceColor="#f0ecf5"
            rippleColor="#9D51E9"
            rippleSpeed={1.5}
            autoAnimate
            rippleOnClick
          />
        </div>
      </div>
    </section>
  );
}
