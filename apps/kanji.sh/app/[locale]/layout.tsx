import { Locale } from 'apps/kanji.sh/i18n';
import { Footer } from 'apps/kanji.sh/src/components/layout/Footer';
import { Header } from 'apps/kanji.sh/src/components/layout/Header';
import { LocaleParams } from 'apps/kanji.sh/src/types/LocaleParams';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { pdfjs } from 'react-pdf';

import '../tailwind.css';

type PageProps = {
    children: React.ReactNode;
} & LocaleParams;

export const generateStaticParams = () => Locale.locales.map((locale) => ({ locale }));

export default function RootLayout({ children, params: { locale } }: PageProps) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    unstable_setRequestLocale(locale);
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
            </body>
        </html>
    );
}
