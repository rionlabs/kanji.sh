// noinspection HtmlRequiredTitleElement

import { json, LoaderFunctionArgs } from '@remix-run/node';

import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useRouteLoaderData } from '@remix-run/react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useChangeLanguage } from 'remix-i18next/react';
import i18nServer from './i18n/i18n.server';
import { Analytics } from '@vercel/analytics/react';

import './tailwind.css';

// We'll configure the namespace to use here
export const handle = { i18n: ['translation', 'x'] };

export async function loader({ request }: LoaderFunctionArgs) {
    const locale = await i18nServer.getLocale(request); // get the locale
    return json({ locale });
}

export function Layout() {
    const loaderData = useRouteLoaderData<typeof loader>('root');
    return (
        <html lang={loaderData?.locale ?? 'en'} data-theme='light' className='light'>
        <head>
            <meta charSet="utf-8" />
            <link rel='icon' href='/favicon.ico' />
            <link rel='apple-touch-icon' href='/logo192.png' />
            <link rel='manifest' href='/manifest.json' />
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
            <meta name='theme-color' content='#000' />
            <meta
                name='viewport'
                content='minimum-scale=1,initial-scale=1,width=device-width'
            />
            <Meta />
            <Links />
        </head>
        <body className='grid grid-rows-sandwich min-h-screen'>
        <Header />
        <main className='py-12 container'>
            <Outlet />
        </main>
        <Footer />
        <Analytics />
        <Scripts />
        <ScrollRestoration />
        </body>
        </html>
    );
}

export default function App() {
    const { locale } = useLoaderData<typeof loader>();
    useChangeLanguage(locale); // Change i18next language if locale changes
    return <Outlet />;
}
