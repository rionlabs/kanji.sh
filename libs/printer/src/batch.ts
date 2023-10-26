import type { CollectionType } from '@kanji-sh/models';
import { generateWorksheet } from './index';
import { logger } from './utils';
import PQueue from 'p-queue';

import { sources } from './sources';

type ResultType = { key: string; collection: CollectionType };

export const buildWorksheetCollectionBatch = async (collection: CollectionType) => {
    const timerLabel = `Build ${collection} Collection`;
    console.time(timerLabel);
    const buildPdfQueue = new PQueue({
        concurrency: 1,
        autoStart: true
    });

    const result: ResultType[] = sources
        .filter((data) => data.type === collection)
        .map((collection) =>
            collection.worksheets.map((worksheet) => ({
                key: worksheet.key,
                collection: collection.type
            }))
        )
        .reduce((previousValue, currentValue) =>
            previousValue.concat(currentValue)
        ) as ResultType[];

    result.forEach(({ collection, key }) => {
        buildPdfQueue.add(async () => {
            try {
                const worksheetInfo = sources
                    .find((col) => col.type === collection)
                    ?.worksheets.find((w) => w.key === key);
                if (!worksheetInfo || !worksheetInfo.kanji || !worksheetInfo.name) {
                    logger.error(`Worksheet information not found for ${collection} ${key}`);
                } else {
                    await generateWorksheet(
                        worksheetInfo.kanji,
                        worksheetInfo.name,
                        worksheetInfo.config
                    );
                }
            } catch (error) {
                console.log(`Failed to create worksheet for ${collection}/${key}`);
                console.error(error);
            }
        });
    });

    await buildPdfQueue.onIdle();
    console.timeEnd(timerLabel);
};
