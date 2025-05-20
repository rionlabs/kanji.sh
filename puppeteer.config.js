import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @type {import("puppeteer").Configuration}
 */
export default {
    cacheDirectory: path.join(__dirname, '.cache', 'puppeteer'),
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
};
