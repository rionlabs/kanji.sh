import path from 'node:path';

import { Font } from '@react-pdf/renderer';

import { ConfigV2 } from '../../config';

/**
 * Registers necessary font in ReactPDF for Node.js environment.
 */
export const registerNodeFonts = (config: ConfigV2) => {
    Font.register({
        family: 'Montserrat',
        src: path.join(config.outDir, './fonts/Montserrat-Light.ttf')
    });
    Font.register({
        family: 'Quicksand',
        src: path.join(config.outDir, './fonts/Quicksand-Regular.ttf')
    });
};
