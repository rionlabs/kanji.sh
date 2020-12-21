const PageConfig = require('./src/config/PageConfig.json')
/**
 * Generates dynamic sitemap for website on each build.
 */
module.exports = {
    siteUrl: 'https://kanji.sh',
    generateRobotsTxt: true,
    transform: (config, url) => {
        return {
            loc: url,
            changefreq: config.changefreq,
            priority: PageConfig[url].priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    },
    robotsTxtOptions: {
        policies: [
            {userAgent: '*', allow: '/'},
            {userAgent: '*', disallow: ['/pdf/', '/*.pdf$', '/api']}
        ]
    }
}