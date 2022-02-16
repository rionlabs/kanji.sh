import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render(): JSX.Element {
        // ↓ https://err.sh/next.js/no-document-title
        // noinspection HtmlRequiredTitleElement
        return (
            <Html lang="en">
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Quicksand:wght@500;700&display=swap" />
                    {/* Meta Headers */}
                    <meta charSet="utf-8" />
                    <link rel="icon" href={'/favicon.ico'} />
                    <link rel="apple-touch-icon" href={'/logo192.png'} />
                    <link rel="manifest" href={'/manifest.json'} />
                    <meta name="theme-color" content="#000" />
                    {/* Site Verification */}
                    <meta
                        name="google-site-verification"
                        content="zJzDzuLG5I7xmNqDZzTCDwtmTP2243-WD_g6Hg4PDsk"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Quicksand:wght@500;700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
