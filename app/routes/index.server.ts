import type { CollectionType, Worksheet } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import { generateWorksheet, getPreBuiltWorksheet, getWorksheetContents, getWorksheetMeta } from '@generator';

export const createWorksheet = async () => {
    return await generateWorksheet('一二三四五六七八九十百千万'.split(''), 'Numbers', DefaultWorksheetConfig);
};

export const getWorksheet = async (collection: CollectionType, key: string) => {
    return await getPreBuiltWorksheet(collection, key);
};

export const getWorksheetFromHash = async (hash: string): Promise<Worksheet> => {
    return getWorksheetMeta(hash);
}

export const getWorksheetContentsFromHash = async (hash: string): Promise<Buffer> =>  {
    return getWorksheetContents(hash);
}
