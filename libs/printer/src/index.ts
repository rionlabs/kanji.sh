import type { CollectionType, Worksheet, WorksheetConfig } from '@kanji-sh/models';
import { DefaultWorksheetConfig } from '@kanji-sh/models';
import { SupabaseClient } from '@supabase/supabase-js';
import { Files } from 'libs/printer/src/files/Files';
import PQueue from 'p-queue';
import * as process from 'process';
import { CloudFiles } from './files/CloudFiles';
import { CombinedFiles } from './files/CombinedFiles';
import { LocalFiles } from './files/LocalFiles';
import * as path from 'path';
import { Config } from './config';
import { downloadKanjiData } from './download';
import { createWorksheetHash } from './hash';
import { buildKanjiDiagrams } from './kanjivg';
import { createWorksheet } from './pdf';
import { processSourceFiles } from './sources';
import { logger } from './utils';

type ResultType = { key: string; collection: CollectionType };

type BatchWorksheetResult = Record<string, Worksheet>;

/**
 * Operations exported for Next.js app.
 * Only use cloud storage in these operations because the local file system is not available in Next.js.
 */
class AppOps {
    constructor(private files: CloudFiles) {}

    getCollectionMeta = async (collection: CollectionType): Promise<Record<string, Worksheet>> => {
        return this.files.readCollectionMetaData(collection);
    };

    getWorksheetHash = async (collection: CollectionType, key: string): Promise<string> => {
        const collectionMeta = await this.getCollectionMeta(collection);
        return collectionMeta[key].hash;
    };

    getWorksheetMeta = async (hash: string): Promise<Worksheet> => {
        return this.files.readMetaData(hash);
    };

    getWorksheetContents = async (hash: string): Promise<Buffer> => {
        return this.files.readPDF(hash);
    };

    getWorksheetUrl = async (hash: string): Promise<URL> => {
        return this.files.getUrl(hash);
    };

    getWorksheetDownloadUrl = async (hash: string): Promise<URL> => {
        const metaFile = await this.files.readMetaData(hash);
        const expiresIn = 24 * 60 * 60;
        return this.files.getDownloadUrl(hash, expiresIn, metaFile.name);
    };
}

/**
 * Operations exported for CLI.
 */
class CLIOps {
    constructor(private files: Files) {}

    /**
     * Generates worksheet from given data.
     * @param data
     * @param worksheetTitle
     * @param worksheetConfig
     */
    generateWorksheet = async (
        data: string[],
        worksheetTitle: string,
        worksheetConfig: WorksheetConfig = DefaultWorksheetConfig
    ): Promise<Worksheet> => {
        await downloadKanjiData({ outputDir: Config.outDirPath, outputFileName: 'all-data.json' });
        await buildKanjiDiagrams();

        logger.start(`Generating worksheet ${worksheetTitle} for ${data.length} kanji`);
        const hash = createWorksheetHash({ data, worksheetTitle, worksheetConfig });
        const worksheetExists = await this.files.exists(hash);
        if (worksheetExists) {
            logger.done(`Worksheet ${worksheetTitle} already exists`);
            return this.files.readMetaData(hash);
        } else {
            const { worksheet, contents } = await createWorksheet(
                data,
                worksheetTitle,
                worksheetConfig
            );
            await this.files.writePDF(worksheet, contents);
            logger.done(`Worksheet ${worksheetTitle} with ${worksheet.pageCount} pages`);
            return worksheet;
        }
    };

    /**
     * Returns prebuilt worksheet.
     */
    getPreBuiltWorksheet = async (collection: CollectionType, key: string): Promise<Worksheet> => {
        const worksheetInfo = processSourceFiles()
            .find((col) => col.type === collection)
            ?.worksheets.find((w) => w.key === key);
        if (!worksheetInfo || !worksheetInfo.kanji || !worksheetInfo.name) {
            throw Error('Worksheet information not found');
        }
        const hash = createWorksheetHash({
            data: worksheetInfo.kanji,
            worksheetTitle: worksheetInfo.name,
            worksheetConfig: worksheetInfo.config
        });
        const worksheetExists = await this.files.exists(hash);
        if (!worksheetExists) {
            throw Error('Worksheet not found. Is it built yet?');
        }
        return this.files.readMetaData(hash);
    };

    /**
     * Long-running function that generates worksheets for all kanji for given collection.
     * @param collectionType
     */
    generatePreBuiltWorksheets = async (collectionType: CollectionType) => {
        logger.start(`Start generation for CollectionType ${collectionType}`);
        const result = await this.buildWorksheetCollectionBatch(collectionType);
        await this.files.writeCollection(collectionType, result);
        logger.done(`Finish prebuilt worksheets generation for CollectionType ${collectionType}`);
    };

    buildWorksheetCollectionBatch = async (
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
                        const worksheet = await this.generateWorksheet(
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
}

const createCloudFiles = () =>
    new CloudFiles(
        new SupabaseClient(
            process.env['SUPABASE_URL'] as string,
            process.env['SUPABASE_KEY'] as string,
            {
                global: {
                    headers: {}
                }
            }
        )
    );

export const appOperations = () => {
    const cloudFiles = createCloudFiles();
    return new AppOps(cloudFiles);
};

export const cliOperations = () => {
    const cloudFiles = createCloudFiles();
    const localFiles = new LocalFiles(
        path.join(Config.outDirPath, 'OUT/pdfs'),
        path.join(Config.outDirPath, 'OUT/jsons'),
        path.join(Config.outDirPath, 'OUT/collections')
    );
    return new CLIOps(new CombinedFiles(localFiles, cloudFiles));
};
