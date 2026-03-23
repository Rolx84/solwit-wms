'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const locales = ['lv', 'ru', 'en'] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  }

  return (
    <div className="flex items-center rounded-full bg-bg-secondary/80 p-0.5" role="radiogroup" aria-label="Language">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          role="radio"
          aria-checked={locale === loc}
          className={`
            px-3 py-1.5 text-xs font-mono uppercase rounded-full transition-all duration-200
            ${locale === loc
              ? 'bg-purple-brand text-white shadow-sm'
              : 'text-text-secondary hover:text-purple-brand'
            }
          `}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
