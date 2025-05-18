import React, { ReactNode } from 'react';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { setRequestLocale } from 'next-intl/server';

import { routing } from 'apps/kanji.sh/i18n/routing';
import { Footer } from 'apps/kanji.sh/src/components/layout/Footer';
import { Header } from 'apps/kanji.sh/src/components/layout/Header';
import { LocaleParams } from 'apps/kanji.sh/src/types/LocaleParams';

import '../tailwind.css';

type PageProps = {
    children: ReactNode;
} & LocaleParams;

export const generateStaticParams = () => {
    return routing.locales.map((locale) => ({
        locale
    }));
};

export default async function RootLayout({ children, params }: PageProps) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const analyticsId = process.env.NEXT_PUBLIC_G_ANALYTICS_ID;
    if (!analyticsId) {
        throw new Error('Google Analytics ID is not set');
    }
    // noinspection HtmlRequiredTitleElement
    return (
        <html lang={locale} data-theme="light" className="light">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/logo192.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <meta name="charset" content="utf-8" />
                <meta name="theme-color" content="#000" />
                <meta
                    name="viewport"
                    content="minimum-scale=1,initial-scale=1,width=device-width"
                />
            </head>
            <body className="grid grid-rows-sandwich min-h-screen">
                <Header />
                <main className="py-12 container">{children}</main>
                <Footer />
                <Analytics />
                <GoogleAnalytics gaId={analyticsId} />
            </body>
        </html>
    );
}
