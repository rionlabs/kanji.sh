const { composePlugins, withNx } = require('@nx/next');
const withMDX = require('@next/mdx')();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    devIndicators: {
        buildActivityPosition: 'top-right'
    },
    experimental: {
        mdxRs: true,
        webpackBuildWorker: true
    },
    webpack: (config, options) => {
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

const plugins = [withMDX, withNx];

module.exports = composePlugins(...plugins)(nextConfig);
