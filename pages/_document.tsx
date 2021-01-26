/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';
import GoogleFonts from 'next-google-fonts';
import { ServerStyleSheet } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prefixer: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cleanCSS: any;

if (process.env.NODE_ENV === 'production') {
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    const CleanCSS = require('clean-css');

    prefixer = postcss([autoprefixer]);
    cleanCSS = new CleanCSS({ level: 2 });
}

export default class MyDocument extends Document {
    render(): JSX.Element {
        // ↓ https://err.sh/next.js/no-document-title
        // noinspection HtmlRequiredTitleElement
        return (
            <Html lang="en">
                <GoogleFonts href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Quicksand:wght@500;700&display=swap" />
                <Head>
                    {/* Meta Headers */}
                    <meta charSet="utf-8" />
                    <link rel="icon" href={'/favicon.ico'} />
                    <link rel="apple-touch-icon" href={'/logo192.png'} />
                    <link rel="manifest" href={'/manifest.json'} />
                    <meta name="theme-color" content={theme.palette.primary.dark} />
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

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const materialSheets = new ServerStyleSheets();
    const styledComponentsSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />))
            });

        const initialProps = await Document.getInitialProps(ctx);

        let css = materialSheets.toString();
        // It might be undefined, e.g. after an error.
        if (css && process.env.NODE_ENV === 'production') {
            const result1 = await prefixer.process(css, { from: undefined });
            css = result1.css;
            const minifiedCSS = cleanCSS.minify(css);
            css = minifiedCSS.styles;
        }

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [
                ...React.Children.toArray(initialProps.styles),
                <style
                    id="jss-server-side"
                    key="jss-server-side"
                    dangerouslySetInnerHTML={{ __html: css }}
                />,
                styledComponentsSheet.getStyleElement()
            ]
        };
    } finally {
        styledComponentsSheet.seal();
    }
};
