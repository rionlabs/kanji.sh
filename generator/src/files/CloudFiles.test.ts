import type { Worksheet } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import { afterEach, beforeEach, describe } from '@jest/globals';
import fs from 'fs';
import type { BucketItem } from 'minio';
import { Client } from 'minio';
import path from 'path';
import { createWorksheetHash } from '../hash';
import { CloudFiles } from './CloudFiles';

const testPdfBuffer = fs.readFileSync(path.resolve(__dirname, '../files/__tests__/blank.pdf'));
const testHash = createWorksheetHash({ data: [], worksheetConfig: DefaultWorksheetConfig, worksheetTitle: 'Blank' });
const testWorksheet: Worksheet = {
    hash: testHash,
    kanji: [],
    name: 'Blank',
    config: DefaultWorksheetConfig,
    pageCount: 1
};

const minIOClient = new Client({
    endPoint: 'localhost',
    port: 9007,
    accessKey: 'min-io-user',
    secretKey: 'min-io-password',
    useSSL: false
});

const config = {
    bucketName: 'test-bucket',
    bucketRegion: 'local',
    rootDirectory: 'test',
    cloudHost: 'http://localhost:9007'
};

describe('CloudFiles', () => {
    let cloudFiles: CloudFiles;

    beforeEach(async () => {
        // TODO Make sure Docker is running with docker-compose.test.yaml
        // Create bucket to operate on
        await minIOClient.makeBucket(config.bucketName, config.bucketRegion);

        cloudFiles = new CloudFiles(minIOClient, config);
    });

    afterEach(async () => {
        // Clear the test bucket after each test
        try {
            await clearBucket(config.bucketName);
            console.log('buket cleared');
        } catch (error) {
            console.log('error occured while clearning the bucket');
            console.error(error);
        }
        await minIOClient.removeBucket(config.bucketName);
    });

    it('should write PDF file', async () => {
        await cloudFiles.writePDF(testWorksheet, testPdfBuffer);

        const pdfStat = await minIOClient.statObject(config.bucketName, `${config.rootDirectory}/${testHash}.pdf`);
        expect(pdfStat).toBeDefined();
        expect(pdfStat.size).toBe(testPdfBuffer.length);

        const metaStat = await minIOClient.statObject(config.bucketName, `${config.rootDirectory}/${testHash}.json`);
        expect(metaStat).toBeDefined();
    });


    it('should read metadata', async () => {
        await cloudFiles.writePDF(testWorksheet, testPdfBuffer);

        const readMetadata = await cloudFiles.readMetaData(testHash);
        expect(readMetadata).toEqual(testWorksheet);
    });

    it('should read PDF', async () => {
        await cloudFiles.writePDF(testWorksheet, testPdfBuffer);

        const readPDF = await cloudFiles.readPDF(testHash);
        expect(readPDF).toEqual(testPdfBuffer);
    });

    it('should return URL as local file URL of PDF file', async () => {
        await cloudFiles.writePDF(testWorksheet, testPdfBuffer);

        const pdfURL = await cloudFiles.getUrl(testHash);
        expect(pdfURL.pathname).toEqual(`/${config.rootDirectory}/${testHash}.pdf`);
        expect(pdfURL.host).toEqual('localhost:9007');
    });

    it('should throw error if file does not exist', async () => {
        const getUrl = () => cloudFiles.getUrl(testHash);
        await expect(getUrl).rejects
    })

    it('exists should return true for written files', async () => {
        await cloudFiles.writePDF(testWorksheet, testPdfBuffer);
        const exists = await cloudFiles.exists(testHash);
        expect(exists).toBe(true);
    });

    it('exists should return false for absent hash', async () => {
        const exists = await cloudFiles.exists(testHash);
        expect(exists).toBe(false);
    });


    it('exists should return false for absent metadata', async () => {
        await cloudFiles.writePDF(testWorksheet, testPdfBuffer);

        await minIOClient.removeObject(config.bucketName, `${config.rootDirectory}/${testHash}.json`);

        const exists = await cloudFiles.exists(testHash);
        expect(exists).toBe(false);
    });

    it('exists should return false for absent PDF', async () => {
        await cloudFiles.writePDF(testWorksheet, testPdfBuffer);

        await minIOClient.removeObject(config.bucketName, `${config.rootDirectory}/${testHash}.pdf`);

        const exists = await cloudFiles.exists(testHash);
        expect(exists).toBe(false);
    });

});

const clearBucket = async (bucketName: string) => {
    const objectsStream = minIOClient.listObjects(bucketName, config.rootDirectory, true);

    const objects: BucketItem[] = await new Promise((resolve, reject) => {
        const objects: BucketItem[] = [];
        objectsStream.on('data', async (item: BucketItem) => {
            objects.push(item);
        });
        objectsStream.on('end', () => {
            resolve(objects);
        });
        objectsStream.on('error', reject);
    });

    for (let item of objects) {
        if (item && item.name) {
            await minIOClient.removeObject(config.bucketName, item.name);
        }
    }
};
