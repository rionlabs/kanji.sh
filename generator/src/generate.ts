import fs from 'fs';
import { createWorksheetHash } from './hash';
import * as os from 'os';
import * as path from 'path';
import type { ConsoleMessage } from 'puppeteer';
import puppeteer from 'puppeteer';
import PQueue from 'p-queue';
import PDFMerger from 'pdf-merger-js';
import { ensureDirectoriesExist, logger, writeFile } from './utils';
import type { Worksheet, WorksheetConfig } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import { Config } from './config';
import buildUrl from 'build-url-ts';

const sortByPageNumber = (array: string[]): string[] => {
    const getNumber = (path: string): number =>
        Number.parseInt(path.split('/').slice(-1)[0].split('.')[0]);
    return array.sort((pathA, pathB) => getNumber(pathA) - getNumber(pathB));
};

async function generatePDF(
    data: string[],
    worksheetTitle: string,
    worksheetConfig: WorksheetConfig
): Promise<{ hash: string; pageCount: number }> {
    // Calculate hash for as unique identifier for this Worksheet
    const worksheetHash: string = createWorksheetHash({ data, worksheetTitle, worksheetConfig });

    const tempDirPath = path.join(Config.outPdfPath, worksheetHash, 'pages');
    ensureDirectoriesExist(tempDirPath);

    try {
        const timeout = 180 * 1000;
        const browser = await puppeteer.launch({
            timeout: timeout,
            args: ['--disable-web-security']
        });

        // To avoid timeout, if the number of pages are too much, 5 pages per core
        const browserPageQueue = new PQueue({
            concurrency: os.cpus().length * 5,
            autoStart: true
        });
        const intermediatePages: string[] = [];

        for (let index = 0, pageIndex = 0; index < data.length; index += 5, pageIndex++) {
            const processing = async function(index: number, kanjiArray: string[]) {
                const page = await browser.newPage();
                page.setDefaultTimeout(timeout);

                // Log any output generated from puppeteer launched browser
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

            browserPageQueue.add(() => processing(pageIndex, data.slice(index, index + 5)));
        }

        await browserPageQueue.onIdle();

        // FixMe: Causes error
        // await browser.close();

        // Merge the generated PDFs
        const outputPdfFilePath = `${path.join(Config.outPdfPath, worksheetHash)}.pdf`;
        const merger = new PDFMerger();
        for (const generatedPDFPath of sortByPageNumber(intermediatePages)) {
            merger.add(generatedPDFPath);
        }
        await merger.save(outputPdfFilePath);

        return { hash: worksheetHash, pageCount: intermediatePages.length };
    } catch (error) {
        // Remove the file, because it is not a valid PDF
        fs.rmSync(path.join(Config.outPdfPath, `${worksheetHash}.pdf`));
        logger.error(`Error on ${JSON.stringify(worksheetConfig)} : ${error}`);
        throw error;
    } finally {
        // Cleanup of directory
        fs.rmSync(path.join(Config.outPdfPath, worksheetHash), { recursive: true });
    }
}

/**
 * Generates worksheet and uploads it to the storage. Returns Worksheet object.
 * @param data              Array of kanji
 * @param worksheetTitle    Title to put on every page of the worksheet
 * @param worksheetConfig   Configuration for the worksheet
 */
export const createWorksheet = async (
    data: string[],
    worksheetTitle: string,
    worksheetConfig: WorksheetConfig = DefaultWorksheetConfig
): Promise<Worksheet> => {
    logger.start(`Worksheet generation: ${worksheetTitle}`);

    // Ensure output directories
    ensureDirectoriesExist(Config.outPdfPath, Config.outMetadataPath);
    // Generate PDF
    const { hash, pageCount } = await generatePDF(data, worksheetTitle, worksheetConfig);
    // Get location of file as absolute path
    const fileLocation = path.join(Config.outPdfPath, `${hash}.pdf`);
    // Create Metadata
    const worksheetOutput = {
        name: worksheetTitle,
        kanji: data,
        config: worksheetConfig,
        hash, pageCount, fileLocation
    };
    // Write metadata file
    writeFile(path.join(Config.outMetadataPath, `${hash}.json`), JSON.stringify(worksheetOutput));
    logger.done(`Worksheet generation: ${worksheetTitle}`);

    // Return Worksheet
    return worksheetOutput;
};
