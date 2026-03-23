'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const FallingText = dynamic(() => import('./FallingText'), { ssr: false });

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [isMobile, setIsMobile] = useState(false);
  const [textFallen, setTextFallen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [bgSlid, setBgSlid] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Sequence: text falls → 2s → bg slides away → 0.5s → video fades in → CTA slides up
  useEffect(() => {
    if (!textFallen) return;

    // Step 1: after 2s, slide the grid+stripe background away
    const t1 = setTimeout(() => setBgSlid(true), 2000);
    // Step 2: after 3s, show video
    const t2 = setTimeout(() => {
      setShowVideo(true);
      videoRef.current?.play();
    }, 3000);
    // Step 3: after 3.5s, animate CTA in
    const t3 = setTimeout(() => setCtaVisible(true), 3500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [textFallen]);

  // Detect interaction to trigger the fall
  // Desktop: mouse move | Mobile: touch or scroll
  useEffect(() => {
    if (isMobile) {
      // On mobile, auto-trigger after 2s (user has seen the text)
      const timer = setTimeout(() => setTextFallen(true), 2000);
      // But also trigger on first touch/scroll
      const onTouch = () => { setTextFallen(true); clearTimeout(timer); };
      window.addEventListener('touchstart', onTouch, { once: true });
      window.addEventListener('scroll', onTouch, { once: true });
      return () => {
        clearTimeout(timer);
        window.removeEventListener('touchstart', onTouch);
        window.removeEventListener('scroll', onTouch);
      };
    } else {
      const trigger = () => setTextFallen(true);
      window.addEventListener('mousemove', trigger, { once: true });
      return () => window.removeEventListener('mousemove', trigger);
    }
  }, [isMobile]);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* === BACKGROUND LAYER 1: Grid pattern fading from sides === */}
      <div
        className={`absolute inset-0 z-0 transition-transform duration-1000 ease-in-out ${
          bgSlid ? '-translate-x-full' : 'translate-x-0'
        }`}
        aria-hidden="true"
      >
        {/* Grid from left side */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 opacity-[0.15]"
          style={{
            backgroundImage: 'linear-gradient(to right, #62358F 1px, transparent 1px), linear-gradient(to bottom, #62358F 1px, transparent 1px)',
            backgroundSize: isMobile ? '80px 80px' : '160px 160px',
            maskImage: 'linear-gradient(to right, black 0%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 80%)',
          }}
        />
        {/* Grid from right side */}
        <div
          className="absolute inset-y-0 right-0 w-1/2 opacity-[0.15]"
          style={{
            backgroundImage: 'linear-gradient(to right, #62358F 1px, transparent 1px), linear-gradient(to bottom, #62358F 1px, transparent 1px)',
            backgroundSize: isMobile ? '80px 80px' : '160px 160px',
            maskImage: 'linear-gradient(to left, black 0%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 80%)',
          }}
        />

        {/* Purple diagonal stripe */}
        <div
          className="absolute top-0 right-0 w-[45%] h-full origin-top-right"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(98,53,143,0.08) 30%, rgba(157,81,233,0.15) 50%, rgba(98,53,143,0.08) 70%, transparent 100%)',
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        />
      </div>

      {/* === BACKGROUND LAYER 2: Video — fades in after bg slides away === */}
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

      {/* === Falling text === */}
      <div
        className="relative z-10 w-full max-w-xl h-[40vh] sm:h-[50vh] lg:h-[60vh] min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] mx-auto overflow-hidden transition-opacity duration-500"
        style={{ opacity: showVideo ? 0 : 1, pointerEvents: showVideo ? 'none' : 'auto' }}
      >
        <FallingText
          text={t('fallingText')}
          highlightWords={['Haoss', 'chaos', 'Хаос']}
          trigger={isMobile ? 'scroll' : 'hover'}
          gravity={1.2}
          fontSize={locale === 'ru' ? (isMobile ? '1.1rem' : 'clamp(1.2rem, 2.8vw, 2.2rem)') : (isMobile ? '1.3rem' : 'clamp(1.5rem, 3.5vw, 2.8rem)')}
          backgroundColor="transparent"
          mouseConstraintStiffness={0.2}
        />
      </div>

      {/* === Subtitle and CTAs — slide up after video appears === */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-4 mt-4 transition-all duration-700 ease-out ${
          ctaVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
        }`}
      >
        <h1 className={`heading-xl mb-6 sm:mb-8 max-w-2xl text-xl sm:text-2xl lg:text-4xl ${locale === 'ru' ? 'lg:text-3xl' : ''}`}>
          {t('subtitle')}
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={scrollToForm}
            className={`px-6 py-3 sm:px-8 sm:py-4 bg-purple-brand hover:bg-purple-bright text-white font-mono font-bold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base ${locale === 'ru' ? '' : 'lg:text-lg'}`}
          >
            {t('ctaPrimary')}
          </button>
          <button
            onClick={scrollToFeatures}
            className={`px-6 py-3 sm:px-8 sm:py-4 border-2 border-purple-brand/30 hover:border-purple-brand text-purple-brand font-mono font-semibold rounded-full transition-all duration-200 hover:bg-purple-brand/5 text-sm sm:text-base ${locale === 'ru' ? '' : 'lg:text-lg'}`}
          >
            {t('ctaSecondary')}
          </button>
        </div>
      </div>
    </section>
  );
}
