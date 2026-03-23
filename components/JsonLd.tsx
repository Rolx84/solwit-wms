'use client';

import { useTranslations } from 'next-intl';
import Script from 'next/script';

interface JsonLdProps {
  locale: string;
}

export default function JsonLd({ locale }: JsonLdProps) {
  const t = useTranslations();

  const faqItems = ['1', '2', '3', '4', '5', '6', '7'].map((key) => ({
    '@type': 'Question' as const,
    name: t(`faq.items.${key}.question`),
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: t(`faq.items.${key}.answer`),
    },
  }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems,
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Solwit Systems',
    legalName: 'Solcraft, SIA',
    url: 'https://solwit.eu',
    logo: 'https://wms.solwit.lv/solwit-logo.svg',
    foundingDate: '1993',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vienības gatve 109, 5th floor',
      addressLocality: 'Rīga',
      addressCountry: 'LV',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+371-67277708',
      contactType: 'sales',
      email: 'info@solwit.lv',
      availableLanguage: ['Latvian', 'Russian', 'English'],
    },
    sameAs: ['https://solwit.eu'],
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Solwit WMS',
    description: t('meta.description'),
    brand: {
      '@type': 'Brand',
      name: 'Solwit Systems',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Solcraft, SIA',
    },
    category: 'Warehouse Management Software',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      url: `https://wms.solwit.lv/${locale}`,
    },
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
