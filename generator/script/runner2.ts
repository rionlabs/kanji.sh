import type { CollectionType } from '@common/models';
import { getPreBuiltWorksheet } from '@generator';
import { sources } from 'generator/src/sources';
import PQueue from 'p-queue';

type ResultType = { key: string, collection: CollectionType }

export const buildWorksheetCollection = async (collection: CollectionType) => {
    const buildPdfQueue = new PQueue({
        concurrency: 1,
        autoStart: true
    });
    buildPdfQueue.addListener('active', () => {
        console.log('BuildPdfQueue: active');
    });
    buildPdfQueue.addListener('add', () => {
        console.log('BuildPdfQueue: add');
    });
    buildPdfQueue.addListener('next', () => {
        console.log('BuildPdfQueue: next');
    });
    buildPdfQueue.addListener('idle', () => {
        console.log('BuildPdfQueue: idle');
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
};
