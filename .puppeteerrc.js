const path = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    cacheDirectory: path.join(__dirname, '.cache', 'puppeteer'),
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
};
