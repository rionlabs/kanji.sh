import type { CollectionType, Worksheet, WorksheetConfig } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import fs from 'fs';
import { generateSourceJson } from 'generator/script/sourcegenerator';
import { Config } from 'generator/src/config';
import { downloadKanjiData } from 'generator/src/download';
import { createWorksheet } from 'generator/src/generate';
import { createWorksheetHash } from 'generator/src/hash';
import { buildKanjiDiagrams } from 'generator/src/kanjivg';
import { readFile } from 'generator/src/utils';
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
    await downloadKanjiData();

    await buildKanjiDiagrams();

    const hash = createWorksheetHash({ data, worksheetTitle, worksheetConfig });
    const metaFileLocation = path.join(Config.outMetadataPath, `${hash}.json`);
    const pdfFileLocation = path.join(Config.outPdfPath, `${hash}.pdf`);
    if (fs.existsSync(pdfFileLocation) && fs.existsSync(metaFileLocation)) {
        return getWorksheetMeta(hash);
    }

    return await createWorksheet(data, worksheetTitle, worksheetConfig);
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
