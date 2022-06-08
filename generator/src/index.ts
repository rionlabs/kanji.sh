import type { CollectionType, Worksheet, WorksheetConfig } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import fs from 'fs';
import { generateSourceJson } from 'generator/script/sourcegenerator';
import { Config } from 'generator/src/config';
import { downloadKanjiData } from 'generator/src/download';
import { createWorksheet } from 'generator/src/generate';
import { createWorksheetHash } from 'generator/src/hash';
import { buildKanjiDiagrams } from 'generator/src/kanjivg';
import { logger, readFile } from 'generator/src/utils';
import path from 'path';

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

    logger.start(`Generating worksheet ${worksheetTitle} for ${data.length} kanji`)
    const hash = createWorksheetHash({ data, worksheetTitle, worksheetConfig });
    const metaFileLocation = path.join(Config.outMetadataPath, `${hash}.json`);
    const pdfFileLocation = path.join(Config.outPdfPath, `${hash}.pdf`);
    if (fs.existsSync(pdfFileLocation) && fs.existsSync(metaFileLocation)) {
        logger.done(`Worksheet ${worksheetTitle} already exists`)
        return getWorksheetMeta(hash);
    }

    const worksheet = await createWorksheet(data, worksheetTitle, worksheetConfig);
    logger.done(`Worksheet ${worksheetTitle} with ${worksheet.pageCount} pages`)
    return worksheet
};

/**
 * Returns prebuilt worksheet.
 */
export const getPreBuiltWorksheet = async (
    collection: CollectionType,
    key: string
): Promise<Worksheet> => {
    const collectionInfo = await generateSourceJson();
    const worksheetInfo = collectionInfo.find(col => col.type === collection)?.worksheets.find(w => w.key === key);
    if (!worksheetInfo || !worksheetInfo.kanji || !worksheetInfo.name) {
        throw Error('Worksheet information not found');
    }
    return generateWorksheet(worksheetInfo.kanji, worksheetInfo.name, worksheetInfo.config);
};

export const getWorksheetMeta = (hash: string): Worksheet => {
    const metaFilePath = path.join(Config.outMetadataPath, `${hash}.json`)
    return JSON.parse(readFile(metaFilePath).join()) as Worksheet
}
