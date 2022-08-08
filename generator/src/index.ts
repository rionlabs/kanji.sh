import type { CollectionType, Worksheet, WorksheetConfig } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import { CloudFiles } from 'generator/src/files/CloudFiles';
import { CombinedFiles } from 'generator/src/files/CombinedFiles';
import { LocalFiles } from 'generator/src/files/LocalFiles';
import { Client } from 'minio';
import path from 'path';
import { buildWorksheetCollectionBatch } from './batch';
import { Config } from './config';
import { downloadKanjiData } from './download';
import { createWorksheetHash } from './hash';
import { buildKanjiDiagrams } from './kanjivg';
import { createWorksheet } from './pdf';
import { sources } from './sources';
import { logger } from './utils';

const files = new CombinedFiles(
    new LocalFiles(
        path.join(Config.outDirPath, 'PDF'),
        path.join(Config.outDirPath, 'META')
    ),
    new CloudFiles(
        new Client({
            endPoint: process.env.STORAGE_ENDPOINT as string,
            port: +(process.env.STORAGE_PORT as string),
            accessKey: process.env.STORAGE_ACCESS_KEY as string,
            secretKey: process.env.STORAGE_SECRET_KEY as string,
            useSSL: process.env.STORAGE_USE_SSL as string == 'true'
        }),
        {
            bucketName: process.env.STORAGE_BUCKET_NAME as string,
            bucketRegion: process.env.STORAGE_BUCKET_REGION as string,
            rootDirectory: process.env.STORAGE_ROOT_DIR as string,
            cloudHost: process.env.STORAGE_CLOUD_HOST as string
        }
    )
);

/**
 * Generates worksheet from given data.
 * @param data
 * @param worksheetTitle
 * @param worksheetConfig
 */
export const generateWorksheet = async (
    data: string[],
    worksheetTitle: string,
    worksheetConfig: WorksheetConfig = DefaultWorksheetConfig
): Promise<Worksheet> => {
    await downloadKanjiData({ outputDir: Config.outDirPath, outputFileName: 'all-data.json' });
    await buildKanjiDiagrams();

    logger.start(`Generating worksheet ${worksheetTitle} for ${data.length} kanji`);
    const hash = createWorksheetHash({ data, worksheetTitle, worksheetConfig });
    const worksheetExists = await files.exists(hash);
    if (worksheetExists) {
        logger.done(`Worksheet ${worksheetTitle} already exists`);
        return files.readMetaData(hash);
    } else {
        const { worksheet, contents } = await createWorksheet(data, worksheetTitle, worksheetConfig);
        await files.writePDF(worksheet, contents);
        logger.done(`Worksheet ${worksheetTitle} with ${worksheet.pageCount} pages`);
        return worksheet;
    }
};

/**
 * Returns prebuilt worksheet.
 */
export const getPreBuiltWorksheet = async (
    collection: CollectionType,
    key: string
): Promise<Worksheet> => {
    const worksheetInfo = sources.find(col => col.type === collection)?.worksheets.find(w => w.key === key);
    if (!worksheetInfo || !worksheetInfo.kanji || !worksheetInfo.name) {
        throw Error('Worksheet information not found');
    }
    const hash = createWorksheetHash({
        data: worksheetInfo.kanji,
        worksheetTitle: worksheetInfo.name,
        worksheetConfig: worksheetInfo.config
    });
    const worksheetExists = await files.exists(hash);
    if (!worksheetExists) {
        throw Error('Worksheet not found. Is it built yet?');
    }
    return files.readMetaData(hash);
};

export const getWorksheetMeta = async (hash: string): Promise<Worksheet> => {
    return files.readMetaData(hash);
};

export const getWorksheetContents = async (hash: string): Promise<Buffer> => {
    return files.readPDF(hash);
};

/**
 * Long-running function that generates worksheets for all kanji for given collection.
 * @param collectionType
 */
export const generatePreBuiltWorksheets = async (collectionType: CollectionType) => {
    logger.start(`Start generation for CollectionType ${collectionType}`);
    await buildWorksheetCollectionBatch(collectionType);
    logger.done(`Finish prebuilt worksheets generation for CollectionType ${collectionType}`);
};
