'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const FallingText = dynamic(() => import('./FallingText'), { ssr: false });

export default function Hero() {
  const t = useTranslations('hero');
  const [isMobile, setIsMobile] = useState(false);
  const [textFallen, setTextFallen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // When text falls, wait 1s then reveal video
  useEffect(() => {
    if (textFallen) {
      const timer = setTimeout(() => {
        setShowVideo(true);
        videoRef.current?.play();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [textFallen]);

  // Detect mouse move or scroll to trigger the fall
  useEffect(() => {
    const trigger = () => {
      setTextFallen(true);
      window.removeEventListener('mousemove', trigger);
      window.removeEventListener('scroll', trigger);
    };
    window.addEventListener('mousemove', trigger, { once: true });
    window.addEventListener('scroll', trigger, { once: true });
    return () => {
      window.removeEventListener('mousemove', trigger);
      window.removeEventListener('scroll', trigger);
    };
  }, []);

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToForm = () => {
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* Video — hidden initially, fades in after text falls */}
      <div
        className={`absolute inset-0 z-0 transition-opacity ease-in-out ${
          showVideo ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
        style={{ transitionDuration: '1500ms' }}
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/4292300-hd_1280_720_50fps.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full gradient-blob opacity-60" />
        <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full gradient-blob opacity-40" />
      </div>

      {/* Falling text — max-w-xl forces 2 lines, tall container for physics */}
      {!showVideo && (
        <div className="relative z-10 w-full max-w-xl h-[60vh] min-h-[400px] mx-auto overflow-hidden">
          <FallingText
            text={t('fallingText')}
            highlightWords={['Haoss', 'chaos', 'Хаос']}
            trigger={isMobile ? 'scroll' : 'hover'}
            gravity={1.2}
            fontSize="clamp(1.5rem, 3.5vw, 2.8rem)"
            backgroundColor="transparent"
            mouseConstraintStiffness={0.2}
          />
        </div>
      )}

      {/* Subtitle and CTAs */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-4">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="heading-xl mb-8 max-w-2xl">
            {t('subtitle')}
          </h1>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-purple-brand hover:bg-purple-bright text-white font-mono font-bold text-lg rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('ctaPrimary')}
          </button>
          <button
            onClick={scrollToFeatures}
            className="px-8 py-4 border-2 border-purple-brand/30 hover:border-purple-brand text-purple-brand font-mono font-semibold text-lg rounded-full transition-all duration-200 hover:bg-purple-brand/5"
          >
            {t('ctaSecondary')}
          </button>
        </div>
      </div>
    </section>
  );
}
