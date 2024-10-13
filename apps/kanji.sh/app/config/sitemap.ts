import { createSitemapGenerator } from 'remix-sitemap';

export const { experimental_sitemap, robots } = createSitemapGenerator({
    siteUrl: 'https://example.com',
    // configure other things here
})
