import fs from 'node:fs';
import * as path from 'path';

import { describe, expect } from '@jest/globals';
import fetch from 'node-fetch';


import { downloadKanjiData } from '../src/download';
import { readLinesInFile } from '../src/utils';

const TEST_DIR = path.resolve(__dirname, '__fixtures__');
const JSON_MOCK = { key: 'value' };

const { Response } = jest.requireActual('node-fetch');
jest.mock('node-fetch', () => jest.fn());

describe('Download', () => {
    it('Should download and save data to output file', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
            new Response(JSON.stringify(JSON_MOCK))
        );

        const outputDir = path.resolve(TEST_DIR, 'out');
        const outputFileName = 'data';

        await downloadKanjiData({ outputDir, outputFileName });

        // Confirm existence of files
        expect(fs.existsSync(outputDir));
        expect(fs.existsSync(path.join(outputDir, outputFileName)));

        // Confirm data
        const fileData = readLinesInFile(path.join(outputDir, outputFileName)).join();
        expect(fileData).toBe(JSON.stringify(JSON_MOCK));

        // Methods
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('Should skip download if existing output exists', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
            new Response(JSON.stringify(JSON_MOCK))
        );

        const outputDir = path.resolve(TEST_DIR, 'out');
        const outputFileName = 'data';

        await downloadKanjiData({ outputDir, outputFileName });
        await downloadKanjiData({ outputDir, outputFileName });

        // fetch should be called only 1 regardless of downloadKanjiData calls
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});

afterAll(() => {
    // Remove BASE_DIR used for testing
    fs.rmSync(TEST_DIR, { recursive: true });
});
