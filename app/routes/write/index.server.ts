import type { CollectionType} from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import { generateWorksheet, getPreBuiltWorksheet } from '@generator';

export const createWorksheet = async () => {
    return await generateWorksheet('一二三四五六七八九十'.split(''), 'Numbers', DefaultWorksheetConfig);
};

export const getWorksheet = async (collection: CollectionType, key: string) => {
    return await getPreBuiltWorksheet(collection, key);
};
