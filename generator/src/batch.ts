import type { CollectionType } from '@common/models';
import { getPreBuiltWorksheet } from '@generator';
import PQueue from 'p-queue';

import { sources } from './sources';

type ResultType = { key: string, collection: CollectionType }

export const buildWorksheetCollectionBatch = async (collection: CollectionType) => {
    const timerLabel = `Build ${collection} Collection`;
    console.time(timerLabel);
    const buildPdfQueue = new PQueue({
        concurrency: 1,
        autoStart: true
    });

    const result: ResultType[] = sources
        .filter(data => data.type === collection)
        .map(collection =>
            (collection.worksheets.map(worksheet => ({ key: worksheet.key, collection: collection.type }))))
        .reduce((previousValue, currentValue) => previousValue.concat(currentValue)) as ResultType[];

    result.forEach(({ collection, key }) => {
        buildPdfQueue.add(async () => {
            try {
                await getPreBuiltWorksheet(collection, key);
            } catch (error) {
                console.log(`Failed to create worksheet for ${collection}/${key}`);
            }
        });
    });

    await buildPdfQueue.onIdle();
    console.timeEnd(timerLabel);
};
