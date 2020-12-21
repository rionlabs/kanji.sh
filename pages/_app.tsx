import React from 'react';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import {useRouter} from 'next/router';
import Config from '../src/config/Config';
import SEO from '../next-seo.config';
import {DefaultSeo} from 'next-seo';
import PageConfig from '../src/config/PageConfig.json';

export default function MyApp(props: AppProps) {
    const {Component, pageProps} = props;
    const {asPath} = useRouter();

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    // @ts-ignore
    const {title, description} = PageConfig[asPath];

    return (
        <React.Fragment>
            <DefaultSeo
                {...SEO}
                canonical={`${Config.publicUrl}${asPath}`}
                title={title}
                description={description}
                additionalMetaTags={[
                    {name: 'viewport', content: 'minimum-scale=1, initial-scale=1, width=device-width'}
                ]}
            />
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    );
}
