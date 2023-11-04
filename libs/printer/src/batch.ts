import type { CollectionType, Worksheet } from '@kanji-sh/models';
import { processSourceFiles } from './sources';
import PQueue from 'p-queue';
import * as process from 'process';
import { generateWorksheet } from './index';
import { logger } from './utils';

type ResultType = { key: string; collection: CollectionType };

type BatchWorksheetResult = Record<string, Worksheet>;

export const buildWorksheetCollectionBatch = async (
    collection: CollectionType
): Promise<BatchWorksheetResult> => {
    const timerLabel = `Build ${collection} Collection`;
    console.time(timerLabel);
    const buildPdfQueue = new PQueue({
        concurrency: 1,
        autoStart: true
    });

    const sources = processSourceFiles();
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

    const worksheetResults: BatchWorksheetResult = {};
    result.forEach(({ collection, key }) => {
        buildPdfQueue.add(async () => {
            try {
                const worksheetInfo = sources
                    .find((col) => col.type === collection)
                    ?.worksheets.find((w) => w.key === key);
                if (!worksheetInfo || !worksheetInfo.kanji || !worksheetInfo.name) {
                    logger.error(`Worksheet information not found for ${collection} ${key}`);
                } else {
                    const worksheet = await generateWorksheet(
                        worksheetInfo.kanji,
                        worksheetInfo.name,
                        worksheetInfo.config
                    );
                    worksheetResults[key] = worksheet;
                    console.log(
                        `Generated worksheet for ${collection}/${key} with ${worksheet.pageCount} pages`
                    );
                }
            } catch (error) {
                console.log(`Failed to create worksheet for ${collection}/${key}`);
                console.error(error);
                process.exit(1);
            }
        });
    });

    await buildPdfQueue.onIdle();
    console.timeEnd(timerLabel);
    return worksheetResults;
};
