import { Md5 } from 'ts-md5';
import type { WorksheetConfig } from '@common/models';

type HashInput = {
    data: string[];
    worksheetTitle: string;
    worksheetConfig: WorksheetConfig;
}

export const createWorksheetHash = (hashInput: HashInput): string => {
    const { data, worksheetTitle, worksheetConfig } = hashInput;
    const hash = new Md5()
        .appendStr(data.join(''))
        .appendStr(worksheetTitle)
        .appendStr(JSON.stringify(worksheetConfig))
        .end();
    if (hash === undefined) {
        throw new Error("Hash is undefined");
    }
    return hash.toString()
};
