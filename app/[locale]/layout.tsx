import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Fragment_Mono } from 'next/font/google';
import '../globals.css';

const fragmentMono = Fragment_Mono({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-fragment',
  display: 'swap',
});

const locales = ['lv', 'ru', 'en'] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    return {};
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const meta = messages.meta;
  const baseUrl = 'https://wms.solwit.lv';

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `${baseUrl}/${locale}`,
      siteName: 'Solwit WMS',
      locale: locale === 'lv' ? 'lv_LV' : locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        lv: `${baseUrl}/lv`,
        ru: `${baseUrl}/ru`,
        en: `${baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={fragmentMono.variable}
    >
      <head>
        <link rel="alternate" hrefLang="lv" href="https://wms.solwit.lv/lv" />
        <link rel="alternate" hrefLang="ru" href="https://wms.solwit.lv/ru" />
        <link rel="alternate" hrefLang="en" href="https://wms.solwit.lv/en" />
        <link rel="alternate" hrefLang="x-default" href="https://wms.solwit.lv/lv" />
      </head>
      <body className="font-mono bg-bg-primary text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
