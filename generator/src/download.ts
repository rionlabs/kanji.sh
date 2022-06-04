import fs from 'fs';
import { Config } from 'generator/src/config';
import { logger } from 'generator/src/utils';
import fetch from 'node-fetch';
import path from 'path';

/**
 * Downloads kanji data.
 * TODO: Make data available offline
 */
export const downloadKanjiData = async (): Promise<void> => {
    logger.start('Downloading Kanji data');
    const outputDataPath = path.join(Config.outDirPath, 'all-data.json');
    if (fs.existsSync(outputDataPath)) {
        logger.done('Kanji data already downloaded');
        return;
    }
    const response = await fetch(
        'https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json'
    );
    const json = await response.buffer();
    await fs.writeFileSync(outputDataPath, json);
    logger.done('Kanji data downloaded');
};
