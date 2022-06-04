import type { WorksheetConfig } from '@common/models';
import { Md5 } from 'ts-md5';

type HashInput = {
    data: string[];
    worksheetTitle: string;
    worksheetConfig: WorksheetConfig;
}

export const createWorksheetHash = (hashInput: HashInput): string => {
    const { data, worksheetTitle, worksheetConfig } = hashInput;
    return new Md5()
        .appendStr(data.join(''))
        .appendStr(worksheetTitle)
        .appendStr(JSON.stringify(worksheetConfig))
        .end()
        .toString();
};
