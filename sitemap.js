/**
 * Generates dynamic sitemap for website on each build.
 */
module.exports = {
    siteUrl: 'https://kanji.sh',
    generateRobotsTxt: true,
    priority: 0.5,
    transform: (config, url) => {
        const defaultConfig = {
            loc: url,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
        switch (url) {
            case "/":
                return Object.assign(defaultConfig, {priority: 1.0});
            case "/read":
            case "/write":
            case "/about":
                return Object.assign(defaultConfig, {priority: 0.8});
            default:
                if (url.includes("collection"))
                    return Object.assign(defaultConfig, {priority: 0.7});
                else
                    return defaultConfig;
        }
    },
    robotsTxtOptions: {
        policies: [
            {userAgent: '*', allow: '/'},
            {userAgent: '*', disallow: ['/pdf/', '/*.pdf$', '/api']}
        ]
    }
}