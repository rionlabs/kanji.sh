import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { PageLayout } from './components/layout/PageLayout';
import { PageConfig } from './page.config';
import React from 'react';
import { pdfjs } from 'react-pdf';

import styles from './tailwind.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/logo192.png' },
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Quicksand:wght@500;700&display=swap'
    }
];

export const meta: MetaFunction = ({ location }) => {
    const pageTitle = PageConfig[location.pathname]?.title;
    const title = pageTitle?.concat(' | Kanji.sh') ?? '';
    const pageDescription = PageConfig[location.pathname]?.description;
    const description = pageDescription ?? '';
    return {
        charset: 'utf-8',
        'theme-color': '#000',
        viewport: 'minimum-scale=1,initial-scale=1,width=device-width',
        title,
        description
    };
};

export default function App() {
    // Loads PDF.js worker for previews
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <PageLayout>
                    <Outlet />
                </PageLayout>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
