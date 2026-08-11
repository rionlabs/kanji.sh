import path from 'path';
import { fileURLToPath } from 'url';

import createMDXPlugin from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withNextIntl = createNextIntlPlugin({
    requestConfig: './i18n/request.ts'
});
const withMDX = createMDXPlugin();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    reactStrictMode: false,
    distDir: '../../dist/apps/kanji.sh',
    adapterPath: path.resolve(__dirname, './postbuild.js'),
    outputFileTracingIncludes: {
        '/api/**/*': ['./dist/**/*']
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
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js'
            }
        }
    },
    transpilePackages: ['@kanji-sh/models', '@kanji-sh/printer']
};

export default withMDX(withNextIntl(nextConfig));
