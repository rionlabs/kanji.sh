import { composePlugins, withNx } from '@nx/next';
import createMDXPlugin from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDXPlugin();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    reactStrictMode: false,
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false
    },
    pageExtensions: ['ts', 'tsx', 'mdx'],
    devIndicators: {
        buildActivityPosition: 'top-right'
    },
    redirects: async () => {
        return [
            {
                source: '/write/collection/:key',
                destination: '/write/:key',
                permanent: true
            }
        ];
    },
    experimental: {
        mdxRs: true,
        webpackBuildWorker: true
    },
    webpack: (config) => {
        // https://github.com/wojtekmaj/react-pdf/blob/main/packages/react-pdf/README.md#nextjs
        config.resolve.alias.canvas = false;
        // SVGR
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        return config;
    }
};

const plugins = [withMDX, withNextIntl, withNx];

export default composePlugins(...plugins)(nextConfig);
