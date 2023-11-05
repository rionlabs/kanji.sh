import * as fs from 'fs';
import { createWorksheetHash } from './hash';
import * as os from 'os';
import * as path from 'path';
import type { ConsoleMessage } from 'puppeteer';
import puppeteer from 'puppeteer';
import PQueue from 'p-queue';
import buildUrl from 'build-url-ts';
import type { Worksheet, WorksheetConfig } from '@kanji-sh/models';
import { DefaultWorksheetConfig } from '@kanji-sh/models';

import { Config } from './config';
import { ensureDirectoriesExist, logger } from './utils';

// Import statement doesn't work for some reason
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFMerger = require('pdf-merger-js');

const sortByPageNumber = (array: string[]): string[] => {
    const getNumber = (path: string): number =>
        Number.parseInt(path.split('/').slice(-1)[0].split('.')[0]);
    return array.sort((pathA, pathB) => getNumber(pathA) - getNumber(pathB));
};

async function generatePDF(
    data: string[],
    worksheetTitle: string,
    worksheetConfig: WorksheetConfig
): Promise<{ hash: string; pageCount: number; contents: Buffer }> {
    // Calculate hash for as unique identifier for this Worksheet
    const worksheetHash: string = createWorksheetHash({ data, worksheetTitle, worksheetConfig });

    const tempDirPath = path.join(Config.tempDirPath, worksheetHash, 'pages');
    ensureDirectoriesExist(tempDirPath);

    try {
        const timeout = 180 * 1000;
        const browser = await puppeteer.launch({
            headless: false,
            timeout: timeout,
            args: ['--disable-web-security']
        });

        // To avoid timeout, limit the number of pages to five pages per core
        const browserPageQueue = new PQueue({
            concurrency: os.cpus().length * 5,
            autoStart: true
        });
        const intermediatePages: string[] = [];

        for (let index = 0, pageIndex = 0; index < data.length; index += 5, pageIndex++) {
            const processing = async function (index: number, kanjiArray: string[]) {
                const page = await browser.newPage();
                page.setDefaultTimeout(timeout);

                // Log any output generated from puppeteer-launched browser
                page.on('console', (consoleMessage: ConsoleMessage) => {
                    if (!consoleMessage) return;
                    console.log(`[Browser][${consoleMessage.type()}]${consoleMessage.text()}`);
                    const location = consoleMessage.location();
                    if (location) {
                        console.log(
                            `[Browser][@]${location.url}:${location.lineNumber}:${location.columnNumber}`
                        );
                    }
                });

                const urlToLoad = buildUrl(`file:///${Config.templatePath}`, {
                    queryParams: {
                        data: kanjiArray.join(''),
                        page: index + 1,
                        title: worksheetTitle
                    }
                });

                await page.goto(urlToLoad, {
                    waitUntil: ['load', 'networkidle0', 'networkidle2', 'domcontentloaded']
                });

                const pagePath = path.join(tempDirPath, `${pageIndex}.pdf`);
                await page.pdf({
                    path: pagePath,
                    displayHeaderFooter: false,
                    printBackground: true,
                    format: 'A4',
                    timeout: timeout
                });

                intermediatePages.push(pagePath);

                await page.close();
            };

            await browserPageQueue.add(() => processing(pageIndex, data.slice(index, index + 5)));
        }

        await browserPageQueue.onIdle();

        // FixMe: Causes error
        await browser.close();

        // Merge the generated PDFs
        const merger = new PDFMerger();
        for (const generatedPDFPath of sortByPageNumber(intermediatePages)) {
            await merger.add(generatedPDFPath);
        }
        const contentBuffer = await merger.saveAsBuffer();

        return {
            hash: worksheetHash,
            pageCount: intermediatePages.length,
            contents: contentBuffer
        };
    } catch (error) {
        logger.error(`Error on ${JSON.stringify(worksheetConfig)} : ${error}`);
        throw error;
    } finally {
        // Cleanup of directory
        fs.rmSync(path.join(Config.tempDirPath, worksheetHash), { recursive: true });
    }
}

/**
 * Generates worksheet and returns Worksheet object and contents.
 * @param data              Array of kanji
 * @param worksheetTitle    Title to put on every page of the worksheet
 * @param worksheetConfig   Configuration for the worksheet
 */
export const createWorksheet = async (
    data: string[],
    worksheetTitle: string,
    worksheetConfig: WorksheetConfig = DefaultWorksheetConfig
): Promise<{ worksheet: Worksheet; contents: Buffer }> => {
    logger.start(`Worksheet generation: ${worksheetTitle}`);
    // Generate PDF
    const { hash, pageCount, contents } = await generatePDF(data, worksheetTitle, worksheetConfig);
    // Create Metadata from generated content
    const worksheet: Worksheet = {
        name: worksheetTitle,
        kanji: data,
        config: worksheetConfig,
        hash,
        pageCount
    };
    logger.done(`Worksheet generation: ${worksheetTitle}`);
    // Return Worksheet
    return { worksheet, contents };
};
