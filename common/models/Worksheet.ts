import type { WorksheetConfig } from './WorksheetConfig';

export type Worksheet = {
    hash: string;
    kanji: string[];
    name: string,
    config: WorksheetConfig;
    pageCount: number;
    fileLocation: string;
};
