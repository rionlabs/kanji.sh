import path from 'node:path';

import { Font } from '@react-pdf/renderer';

import { Config } from '../../config';
/**
 * Registers necessary font in ReactPDF for Node.js environment.
 */
export const registerNodeFonts = () => {
    Font.register({
        family: 'Montserrat',
        src: path.resolve(Config.assetsDirPath, './fonts/Montserrat-Light.ttf')
    });
    Font.register({
        family: 'Quicksand',
        src: path.resolve(Config.assetsDirPath, './fonts/Quicksand-Regular.ttf')
    });
};
