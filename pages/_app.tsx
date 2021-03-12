import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { useRouter } from 'next/router';
import Config from '../src/config/Config';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import pageConfigs from '../src/config/PageConfig.json';

type PageConfig = {
    priority: number;
    title: string;
    description: string;
};

const KanjiApp: (props: AppProps) => JSX.Element = (props: AppProps) => {
    const { Component, pageProps } = props;
    const { asPath } = useRouter();

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { title, description } = (pageConfigs as Record<string, PageConfig>)[asPath]!;

    return (
        <React.Fragment>
            <DefaultSeo
                {...SEO}
                canonical={`${Config.publicUrl}${asPath}`}
                title={title}
                description={description}
                additionalMetaTags={[
                    {
                        name: 'viewport',
                        content: 'minimum-scale=1, initial-scale=1, width=device-width'
                    }
                ]}
            />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    );
};

export default KanjiApp;
