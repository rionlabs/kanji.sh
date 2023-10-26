/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
    ignoredRouteFiles: ['**/.*'],
    appDirectory: 'app',
    tailwind: true,
    // assetsBuildDirectory: "public/build",
    // serverBuildPath: "build/index.js",
    // publicPath: "/build/",
    serverModuleFormat: 'cjs',
    serverDependenciesToBundle: 'all',
    watchPaths: () => require('@nx/remix').createWatchPaths(__dirname)
};
