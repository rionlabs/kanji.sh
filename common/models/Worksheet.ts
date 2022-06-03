import { WorksheetConfig } from './WorksheetConfig';

export type Worksheet = {
    hash: string;
    kanjis: string[];
    config: WorksheetConfig;
    pageCount: number;
    kanjiCount: number;
    fileLocation: string;
};
