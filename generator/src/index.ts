import type { Worksheet, WorksheetConfig, CollectionType } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import { downloadKanjiData } from 'generator/src/download';
import { createWorksheet } from 'generator/src/generate';
import { buildKanjiDiagrams } from 'generator/src/kanjivg';

/**
 * Generates worksheet from given data.
 * @param data
 * @param worksheetTitle
 * @param worksheetConfig
 * @param parentDirectory
 */
export const generateWorksheet = async (
    data: string[],
    worksheetTitle: string,
    worksheetConfig: WorksheetConfig = DefaultWorksheetConfig,
    parentDirectory: string[] = []
): Promise<Worksheet> => {
    await downloadKanjiData();

    await buildKanjiDiagrams();

    return await createWorksheet(data, worksheetTitle, worksheetConfig, parentDirectory);
};

/**
 * Returns prebuilt worksheet.
 */
export const getPreBuiltWorksheet = async (
    collection: CollectionType,
    worksheetConfig: WorksheetConfig = DefaultWorksheetConfig
): Promise<Worksheet> => {
    throw Error('Implement getting prebuilt worksheet');
};
