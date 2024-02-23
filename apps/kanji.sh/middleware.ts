import { Locale } from 'apps/kanji.sh/i18n';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: Locale.locales,
    defaultLocale: Locale.defaultLocale,
    localePrefix: 'as-needed'
});

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
