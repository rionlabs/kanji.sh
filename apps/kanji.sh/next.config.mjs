import process from 'node:process';

import createBundleAnalyzer from '@next/bundle-analyzer';
import createMDXPlugin from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
    requestConfig: './i18n/request.ts'
});
const withMDX = createMDXPlugin();
const withAnalyzer = createBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    reactStrictMode: false,
    distDir: '../../dist/apps/kanji.sh',
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
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js'
            }
        }
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
    },
    transpilePackages: ['@kanji-sh/models', '@kanji-sh/printer']
};

export default withMDX(withNextIntl(withAnalyzer(nextConfig)));
