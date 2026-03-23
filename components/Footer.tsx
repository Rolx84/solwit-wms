'use client';

import { useTranslations } from 'next-intl';
import SolwitLogo from './SolwitLogo';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary/50 border-t border-purple-brand/5">
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo and company info */}
          <div className="space-y-4">
            <SolwitLogo width={120} height={32} />
            <div className="space-y-1 text-text-secondary text-sm font-mono">
              <p className="font-semibold text-text-primary">{t('company')}</p>
              <p>{t('registration')}</p>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <h3 className="font-mono font-bold text-lg text-text-primary">
              {t('address')}
            </h3>
            <div className="space-y-2 text-text-secondary text-sm font-mono">
              <a
                href="mailto:info@solwit.lv"
                className="flex items-center gap-2 hover:text-purple-brand transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@solwit.lv
              </a>
              <a
                href="tel:+37167277708"
                className="flex items-center gap-2 hover:text-purple-brand transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +371 67277708
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <div className="space-y-2">
              <a
                href="https://solwit.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary text-sm font-mono hover:text-purple-brand transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                solwit.eu
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-purple-brand/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-text-dim text-xs font-mono">
            &copy; {currentYear} {t('company')}. {t('rights')}.
          </p>
          <a
            href="#"
            className="text-text-dim text-xs font-mono hover:text-purple-brand transition-colors"
          >
            {t('privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
}
