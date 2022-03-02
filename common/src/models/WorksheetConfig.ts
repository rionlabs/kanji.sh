import { KanjiSize, PageType } from './Types';

export interface WorksheetConfig {
    pageType: PageType;
    kanjiSize: KanjiSize;
    tracerSize: KanjiSize;
    tracerCount: number;
}

export const DefaultWorksheetConfig: WorksheetConfig = {
    pageType: PageType.A4,
    kanjiSize: KanjiSize.MM13,
    tracerSize: KanjiSize.MM10,
    tracerCount: 10
};
