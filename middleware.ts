import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['lv', 'ru', 'en'],
  defaultLocale: 'lv',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(lv|ru|en)/:path*'],
};
