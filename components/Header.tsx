'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SolwitLogo from './SolwitLogo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('header');
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToForm = () => {
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="bg-white/70 backdrop-blur-lg border-b border-purple-brand/5">
        <nav className="section-container flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <a href="#" className="flex-shrink-0" aria-label="Solwit Systems">
            <SolwitLogo width={120} height={32} />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={scrollToForm}
              className="px-5 py-2.5 bg-purple-brand hover:bg-purple-bright text-white font-mono font-semibold text-sm rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              {t('bookDemo')}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t('menu')}
            aria-expanded={mobileOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-text-primary"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-purple-brand/5 bg-white/90 backdrop-blur-lg animate-slide-down">
            <div className="section-container py-4 flex flex-col gap-4 items-center">
              <LanguageSwitcher />
              <button
                onClick={scrollToForm}
                className="w-full px-5 py-3 bg-purple-brand hover:bg-purple-bright text-white font-mono font-semibold text-sm rounded-full transition-colors duration-200"
              >
                {t('bookDemo')}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
