import { join } from 'path';

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
};
