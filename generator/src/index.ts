import type { CollectionType, Worksheet, WorksheetConfig } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import fs from 'fs';
import path from 'path';
import { Config } from './config';
import { downloadKanjiData } from './download';
import { createWorksheet } from './generate';
import { createWorksheetHash } from './hash';
import { buildKanjiDiagrams } from './kanjivg';
import { sources } from './sources';
import { logger, readFile } from './utils';

/**
 * Generates worksheet from given data.
 * @param data
 * @param worksheetTitle
 * @param worksheetConfig
 */
export const generateWorksheet = async (
    data: string[],
    worksheetTitle: string,
    worksheetConfig: WorksheetConfig = DefaultWorksheetConfig
): Promise<Worksheet> => {
    await downloadKanjiData({ outputDir: Config.outDirPath, outputFileName: 'all-data.json' });
    await buildKanjiDiagrams();

    logger.start(`Generating worksheet ${worksheetTitle} for ${data.length} kanji`);
    const hash = createWorksheetHash({ data, worksheetTitle, worksheetConfig });
    const metaFileLocation = path.join(Config.outMetadataPath, `${hash}.json`);
    const pdfFileLocation = path.join(Config.outPdfPath, `${hash}.pdf`);
    if (fs.existsSync(pdfFileLocation) && fs.existsSync(metaFileLocation)) {
        logger.done(`Worksheet ${worksheetTitle} already exists`);
        return getWorksheetMeta(hash);
    }

    const worksheet = await createWorksheet(data, worksheetTitle, worksheetConfig);
    logger.done(`Worksheet ${worksheetTitle} with ${worksheet.pageCount} pages`);
    return worksheet;
};

/**
 * Returns prebuilt worksheet.
 */
export const getPreBuiltWorksheet = async (
    collection: CollectionType,
    key: string
): Promise<Worksheet> => {
    const worksheetInfo = sources.find(col => col.type === collection)?.worksheets.find(w => w.key === key);
    if (!worksheetInfo || !worksheetInfo.kanji || !worksheetInfo.name) {
        throw Error('Worksheet information not found');
    }
    return generateWorksheet(worksheetInfo.kanji, worksheetInfo.name, worksheetInfo.config);
};

export const getWorksheetMeta = (hash: string): Worksheet => {
    const metaFilePath = path.join(Config.outMetadataPath, `${hash}.json`);
    return JSON.parse(readFile(metaFilePath).join()) as Worksheet;
};
