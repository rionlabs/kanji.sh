import type { CollectionType, Worksheet, WorksheetConfig } from '@kanji-sh/models';
import { DefaultWorksheetConfig } from '@kanji-sh/models';
import { SupabaseClient } from '@supabase/supabase-js';
import { CloudFiles } from './files/CloudFiles';
import { CombinedFiles } from './files/CombinedFiles';
import { LocalFiles } from './files/LocalFiles';
import * as path from 'path';
import { buildWorksheetCollectionBatch } from './batch';
import { Config } from './config';
import { downloadKanjiData } from './download';
import { createWorksheetHash } from './hash';
import { buildKanjiDiagrams } from './kanjivg';
import { createWorksheet } from './pdf';
import { processSourceFiles } from './sources';
import { logger } from './utils';

const localFiles = new LocalFiles(
    path.join(Config.outDirPath, 'OUT/pdfs'),
    path.join(Config.outDirPath, 'OUT/jsons'),
    path.join(Config.outDirPath, 'OUT/collections')
);

const cloudFiles = new CloudFiles(
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

const files = new CombinedFiles(localFiles, cloudFiles);

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
        const { worksheet, contents } = await createWorksheet(
            data,
            worksheetTitle,
            worksheetConfig
        );
        await files.writePDF(worksheet, contents);
        logger.done(`Worksheet ${worksheetTitle} with ${worksheet.pageCount} pages`);
        return worksheet;
    }
};

/**
 *
 */
class AppOps {
    getCollectionMeta = async (collection: CollectionType): Promise<Record<string, Worksheet>> => {
        return cloudFiles.readCollectionMetaData(collection);
    };

    getWorksheetHash = async (collection: CollectionType, key: string): Promise<string> => {
        const collectionMeta = await this.getCollectionMeta(collection);
        return collectionMeta[key].hash;
    };

    getWorksheetMeta = async (hash: string): Promise<Worksheet> => {
        return cloudFiles.readMetaData(hash);
    };

    getWorksheetContents = async (hash: string): Promise<Buffer> => {
        return cloudFiles.readPDF(hash);
    };
}

export const appOps = new AppOps();

/**
 * Returns prebuilt worksheet.
 */
export const getPreBuiltWorksheet = async (
    collection: CollectionType,
    key: string
): Promise<Worksheet> => {
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
    const worksheetExists = await files.exists(hash);
    if (!worksheetExists) {
        throw Error('Worksheet not found. Is it built yet?');
    }
    return files.readMetaData(hash);
};

/**
 * Long-running function that generates worksheets for all kanji for given collection.
 * @param collectionType
 */
export const generatePreBuiltWorksheets = async (collectionType: CollectionType) => {
    logger.start(`Start generation for CollectionType ${collectionType}`);
    const result = await buildWorksheetCollectionBatch(collectionType);
    await files.writeCollection(collectionType, result);
    logger.done(`Finish prebuilt worksheets generation for CollectionType ${collectionType}`);
};
