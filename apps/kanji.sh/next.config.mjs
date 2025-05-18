import { composePlugins, withNx } from '@nx/next';
import createMDXPlugin from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import createBundleAnalyzer from '@next/bundle-analyzer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const withNextIntl = createNextIntlPlugin({
    requestConfig: path.resolve(__dirname, './i18n/request.ts'),
});
const withMDX = createMDXPlugin();
const withAnalyzer = createBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

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
        position: 'top-right'
    },
    headers: async () => [
        {
            source: '/assets/:path(json|jpg|png|svg)',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, stale-while-revalidate'
                }
            ]
        }
    ],
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

const plugins = [withMDX, withNextIntl, withNx, withAnalyzer];

export default composePlugins(...plugins)(nextConfig);
