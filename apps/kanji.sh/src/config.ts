import path from 'node:path';
import process from 'node:process';

import { configV2 } from '@kanji-sh/printer';

/**
 * Common configuration.
 */
export const Config = {
    publicUrl: 'https://kanji.sh',
    githubUrl: 'https://github.com/rionlabs/kanji.sh',
    supportEmail: 'mail@kanji.sh',
    contactEmail: 'mail@kanji.sh',
    bmcUrl: 'https://www.buymeacoffee.com/aruke',
    maintainer: 'RionLabs',
    ShareURLs: {
        twitter:
            'https://twitter.com/intent/tweet/?text=Check%20this%20awesome%20website%20to%20practice%20Japanese%20Kanji.&amp;url=https%3A%2F%2Fkanji.sh',
        facebook: 'https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fkanji.sh',
        reddit: 'https://reddit.com/submit/?url=https%3A%2F%2Fkanji.sh&amp;resubmit=true&amp;title=Check%20this%20awesome%20website%20to%20practice%20Japanese%20Kanji.'
    }
};

export const pathConfig = configV2({
    sourceDir: path.resolve(process.cwd(), '../../dist/libs/printer/assets'),
    outDir: path.resolve(process.cwd(), 'print-assets')
});
