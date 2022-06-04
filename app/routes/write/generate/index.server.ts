import { DefaultWorksheetConfig } from '@common/models';
import { generateWorksheet } from '@generator';

export const createWorksheet = async () => {
    return await generateWorksheet('一二三四五六七八九十'.split(''), 'Numbers', DefaultWorksheetConfig);
};
