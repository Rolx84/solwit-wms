import { getRequestConfig } from 'next-intl/server';

const locales = ['lv', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'lv';
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
