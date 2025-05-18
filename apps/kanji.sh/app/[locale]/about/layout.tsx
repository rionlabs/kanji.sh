import { LocaleParams } from 'apps/kanji.sh/src/types/LocaleParams';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import React from 'react';

type PageProps = {
    children: React.ReactNode;
} & LocaleParams;

export default async function AboutLayout({ children, params }: PageProps) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const messages = getMessages();
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="prose sm:prose-md max-w-none prose-headings:font-normal">
                {children}
            </div>
        </NextIntlClientProvider>
    );
}
