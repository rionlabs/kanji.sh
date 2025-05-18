import fs from 'node:fs';
import path from 'node:path';

import { afterEach, beforeEach, describe } from '@jest/globals';
import { SupabaseClient } from '@supabase/supabase-js';

import type { Worksheet } from '@kanji-sh/models';
import { DefaultWorksheetConfig } from '@kanji-sh/models';

import { createWorksheetHash } from '../hash';
import { CloudFiles } from './CloudFiles';

const testPdfBuffer = fs.readFileSync(path.resolve(__dirname, '../files/__tests__/blank.pdf'));
const testHash = createWorksheetHash({
    data: [],
    worksheetConfig: DefaultWorksheetConfig,
    worksheetTitle: 'Blank'
});
const testWorksheet: Worksheet = {
    hash: testHash,
    kanji: [],
    name: 'Blank',
    config: DefaultWorksheetConfig,
    pageCount: 1
};

const config = {
    bucketName: 'test-bucket',
    bucketRegion: 'local',
    rootDirectory: 'test',
    cloudHost: 'http://localhost:9007'
};

describe('CloudFiles', () => {
    let supabaseClient: SupabaseClient;
    let cloudFiles: CloudFiles;

    const pdfBucket = 'testPdfBucket';
    const jsonBucket = 'testJsonBucket';
    const collectionBucket = 'testCollectionBucket';

    beforeEach(async () => {
        supabaseClient = new SupabaseClient(
            process.env['SUPABASE_URL'] as string,
            process.env['SUPABASE_KEY'] as string
        );
        // Create bucket to operate on
        await supabaseClient.storage.createBucket(pdfBucket);
        await supabaseClient.storage.createBucket(jsonBucket);
        // Create instance
        cloudFiles = new CloudFiles(supabaseClient, { pdfBucket, jsonBucket, collectionBucket });
    });

    afterEach(async () => {
        // Clear the test bucket after each test
        try {
            await supabaseClient.storage.deleteBucket(pdfBucket);
            await supabaseClient.storage.deleteBucket(jsonBucket);
            console.log('Bucket cleared');
        } catch (error) {
            console.log('error occurred while deleting the bucket');
            console.error(error);
        }
    });

    it('should write PDF file', async () => {
        await cloudFiles.writePDF(testWorksheet, testPdfBuffer);

        // const pdfStat = await minIOClient.statObject(config.bucketName, `${config.rootDirectory}/${testHash}.pdf`);
        // expect(pdfStat).toBeDefined();
        // expect(pdfStat.size).toBe(testPdfBuffer.length);
        //
        // const metaStat = await minIOClient.statObject(config.bucketName, `${config.rootDirectory}/${testHash}.json`);
        // expect(metaStat).toBeDefined();
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
        await expect(getUrl).rejects.toThrow();
    });

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

        // await minIOClient.removeObject(config.bucketName, `${config.rootDirectory}/${testHash}.json`);

        const exists = await cloudFiles.exists(testHash);
        expect(exists).toBe(false);
    });

    it('exists should return false for absent PDF', async () => {
        await cloudFiles.writePDF(testWorksheet, testPdfBuffer);

        // await minIOClient.removeObject(config.bucketName, `${config.rootDirectory}/${testHash}.pdf`);

        const exists = await cloudFiles.exists(testHash);
        expect(exists).toBe(false);
    });
});
