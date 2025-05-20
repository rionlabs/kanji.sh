import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    const messages = (await import(`./locales/${locale}.json`)).default;
    const nonTranslatableMessages = (await import(`./locales/x-translate.json`)).default;

    return {
        locale,
        messages: { ...messages, ...nonTranslatableMessages }
    };
});
