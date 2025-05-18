import { pick } from 'lodash';
import { Md5 } from 'ts-md5';

import type { Worksheet, WorksheetConfig } from '@kanji-sh/models';

type HashInput = {
    data: string[];
    worksheetTitle: string;
    worksheetConfig: WorksheetConfig;
};

type HashInputV2 = Pick<Worksheet, 'kanji' | 'name' | 'config'>

export const createWorksheetHash = (hashInput: HashInput): string => {
    const { data, worksheetTitle, worksheetConfig } = hashInput;
    const hash = new Md5()
        .appendStr(data.join(''))
        .appendStr(worksheetTitle)
        .appendStr(JSON.stringify(worksheetConfig))
        .end();
    if (hash === undefined) {
        throw new Error('Hash is undefined');
    }
    return hash.toString();
};


export const createWorksheetHashV2 = (hashInput: HashInputV2): string => {
    const { kanji, name, config } = pick(hashInput, ['kanji', 'name', 'config']);

    const hash = new Md5()
        .appendStr(kanji.join(''))
        .appendStr(name)
        .appendStr(JSON.stringify(config))
        .end();
    if (hash === undefined) {
        throw new Error(`Error: Could not generate hash for worksheet with title ${name}.`);
    }
    return hash.toString();
};
