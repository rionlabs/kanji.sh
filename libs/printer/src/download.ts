import fs from 'node:fs';
import path from 'node:path';

import fetch from 'node-fetch-commonjs';

import { ensureDirectoriesExist, logger } from './utils';

type Params = {
    outputDir: string;
    outputFileName: string;
};

/**
 * Downloads kanji data.
 * TODO: Make data available offline
 */
export const downloadKanjiData = async (params: Params): Promise<void> => {
    logger.start(`Downloading Kanji data, params${JSON.stringify(params)}`);
    // Make sure that the output directory exists
    ensureDirectoriesExist(params.outputDir);

    const outputDataLocation = path.join(params.outputDir.toString(), params.outputFileName);
    if (fs.existsSync(outputDataLocation)) {
        logger.done('Kanji data already downloaded');
        return;
    }

    const response = await fetch(
        'https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json'
    );
    const json = await response.arrayBuffer();
    fs.writeFileSync(outputDataLocation, Buffer.from(json));

    logger.done('Kanji data downloaded');
};
