import { DefaultWorksheetConfig } from '@common/models';
import type { Worksheet} from '@common/models';
import { beforeEach, afterEach, describe } from '@jest/globals';
import fs from 'fs';
import { createWorksheetHash } from '../hash';
import path from 'path';
import { LocalFiles } from './LocalFiles';


const testPdfBuffer = fs.readFileSync(path.resolve(__dirname, '../files/__tests__/blank.pdf'));
const testHash = createWorksheetHash({ data: [], worksheetConfig: DefaultWorksheetConfig, worksheetTitle: "Blank" });
const testWorksheet: Worksheet = {
    hash: testHash,
    kanji: [],
    name: "Blank",
    config: DefaultWorksheetConfig,
    pageCount: 1
};

const testPdfPath = path.resolve(__dirname, '../files/__tests__/testPdfPath')
const testMetadataPath = path.resolve(__dirname, '../files/__tests__/testMetadataPath')

describe('LocalFiles', () => {
    let localFiles: LocalFiles;

    beforeEach(() => {
        localFiles = new LocalFiles(testPdfPath, testMetadataPath);
    });

    afterEach(() => {
        // Clear the test files after each test
        fs.rmSync(testPdfPath, { recursive: true });
        fs.rmSync(testMetadataPath, { recursive: true });
    })

    it('should write PDF file', async () => {
        await localFiles.writePDF(testWorksheet, testPdfBuffer);
        expect(fs.existsSync(path.resolve(testPdfPath, `${testHash}.pdf`))).toBe(true);
        expect(fs.existsSync(path.resolve(testMetadataPath, `${testHash}.json`))).toBe(true);
    })

    it('should read metadata', async () => {
        await localFiles.writePDF(testWorksheet, testPdfBuffer);

        const readMetadata = await localFiles.readMetaData(testHash);
        expect(readMetadata).toEqual(testWorksheet);
    })

    it('should read PDF', async () => {
        await localFiles.writePDF(testWorksheet, testPdfBuffer);

        const readPDF = await localFiles.readPDF(testHash);
        expect(readPDF).toEqual(testPdfBuffer);
    })

    it('should return URL as local file URL of PDF file', async () => {
        await localFiles.writePDF(testWorksheet, testPdfBuffer);

        const pdfURL = await localFiles.getUrl(testHash);
        expect(pdfURL.pathname).toEqual(path.resolve(testPdfPath, `${testHash}.pdf`));
    })

    it('should throw error if file does not exist', async () => {
        const getUrl = () => localFiles.getUrl(testHash);
        await expect(getUrl).rejects
    })

    it('exists should return true for written files', async () => {
        await localFiles.writePDF(testWorksheet, testPdfBuffer);
        const exists = await localFiles.exists(testHash)
        expect(exists).toBe(true);
    })

    it('exists should return false for absent hash', async () => {
        const exists = await localFiles.exists(testHash)
        expect(exists).toBe(false);
    })

    it('exists should return false for absent metadata', async () => {
        await localFiles.writePDF(testWorksheet, testPdfBuffer);
        fs.rmSync(path.join(testMetadataPath, `${testHash}.json`));

        const exists = await localFiles.exists(testHash)
        expect(exists).toBe(false);
    })

    it('exists should return false for absent PDF', async () => {
        await localFiles.writePDF(testWorksheet, testPdfBuffer);
        fs.rmSync(path.join(testPdfPath, `${testHash}.pdf`));

        const exists = await localFiles.exists(testHash)
        expect(exists).toBe(false);
    })
})
