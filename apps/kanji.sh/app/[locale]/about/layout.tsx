import { LocaleParams } from 'apps/kanji.sh/src/types/LocaleParams';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';

type PageProps = {
    children: React.ReactNode;
} & LocaleParams;

export default function AboutLayout({ children, params }: PageProps) {
    unstable_setRequestLocale(params.locale);
    const messages = useMessages();
    return (
        <NextIntlClientProvider locale={params.locale} messages={messages}>
            <div className="prose sm:prose-md max-w-none prose-headings:font-normal">
                {children}
            </div>
        </NextIntlClientProvider>
    );
}
