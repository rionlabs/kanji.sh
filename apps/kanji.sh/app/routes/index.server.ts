import type { CollectionType, Worksheet } from '@kanji-sh/models';
import { DefaultWorksheetConfig } from '@kanji-sh/models';
import {
    generateWorksheet,
    getPreBuiltWorksheet,
    getWorksheetContents,
    getWorksheetMeta
} from '@kanji-sh/printer';

export const createWorksheet = async () => {
    return await generateWorksheet(
        '一二三四五六七八九十百千万'.split(''),
        'Numbers',
        DefaultWorksheetConfig
    );
};

export const getWorksheet = async (collection: CollectionType, key: string) => {
    return await getPreBuiltWorksheet(collection, key);
};

export const getWorksheetFromHash = async (hash: string): Promise<Worksheet> => {
    return getWorksheetMeta(hash);
};

export const getWorksheetContentsFromHash = async (hash: string): Promise<Buffer> => {
    return getWorksheetContents(hash);
};
