import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export type GetRequestConfigParams = {
    locale: string;
};

export const Locale = {
    locales: ['en'],
    defaultLocale: 'en'
};

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
    // Validate that the incoming `locale` parameter is valid
    if (!Locale.locales.includes(locale)) notFound();

    const messages = (await import(`./i18n/locales/${locale}.json`)).default;
    const nonTranslatableMessages = (await import(`./i18n/locales/x-translate.json`)).default;
    return {
        messages: { ...messages, ...nonTranslatableMessages },
        onError: (error) => {
            console.error(error);
        }
    };
});
