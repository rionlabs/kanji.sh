import type { CollectionType, Worksheet } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import { generateWorksheet, getPreBuiltWorksheet, getWorksheetMeta } from '@generator';
import fs from 'fs';

export const createWorksheet = async () => {
    return await generateWorksheet('一二三四五六七八九十'.split(''), 'Numbers', DefaultWorksheetConfig);
};

export const getWorksheet = async (collection: CollectionType, key: string) => {
    return await getPreBuiltWorksheet(collection, key);
};

export const getWorksheetFromHash = (hash: string): Worksheet => {
    return getWorksheetMeta(hash);
}

export const readPdfFile = (fileLocation: string) =>  {
    // TODO: Remove fs dependency
    return fs.readFileSync(fileLocation);
}
