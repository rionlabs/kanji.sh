import { createWorksheetHash } from 'generator/src/hash';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import type { ConsoleMessage } from 'puppeteer';
import puppeteer from 'puppeteer';
import PQueue from 'p-queue';
import PDFMerger from 'pdf-merger-js';
import { ensureDirectoriesExist, logger } from './utils';
import type { Worksheet, WorksheetConfig } from '@common/models';
import { DefaultWorksheetConfig } from '@common/models';
import { Config } from './config';
import buildUrl from 'build-url-ts';

const sortByPage = (array: string[]): string[] => {
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

    // Do not proceed if file already exists
    const outputPdfFilePath = `${path.join(Config.outPdfPath, worksheetHash)}.pdf`;
    if (fs.existsSync(outputPdfFilePath)) {
        // return;
        // TODO どうしよか？
    }

    try {
        const timeout = 60 * 1000;
        const browser = await puppeteer.launch({
            timeout: timeout,
            args: ['--disable-web-security']
        });

        // To avoid timeout, if the number of pages are too much, 5 pages per core
        const browserPageQueue = new PQueue({
            concurrency: os.cpus().length * 100,
            autoStart: true
        });
        const generatedPDFPaths: string[] = [];

        let times = 0;
        for (let index = 0; index < data.length; index += 5) {
            const processing = async function(index: number, kanjiArray: string[]) {
                const page = await browser.newPage();
                page.setDefaultTimeout(timeout);

                page.on('console', (consoleObj: ConsoleMessage) => {
                    if (!consoleObj) return;
                    console.log(`[Browser][${consoleObj.type()}]${consoleObj.text()}`);
                    const location = consoleObj.location();
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

                const pdfName = path.join(tempDirPath, `${index}.pdf`);
                await page.pdf({
                    path: pdfName,
                    displayHeaderFooter: false,
                    printBackground: true,
                    format: 'A4'
                });

                generatedPDFPaths.push(pdfName);

                await page.close();
            };

            browserPageQueue
                .add(async () => processing(times++, data.slice(index, index + 5)))
                .then(() => {
                    // NoOp
                });
        }

        await browserPageQueue.onIdle();
        await browser.close();

        // Merge the generated PDFs
        const merger = new PDFMerger();
        for (const generatedPDFPath of sortByPage(generatedPDFPaths)) {
            merger.add(generatedPDFPath);
        }
        await merger.save(outputPdfFilePath);

        // Cleanup
        await fs.rmSync(path.join(Config.outPdfPath, worksheetHash), { recursive: true });

        return { hash: worksheetHash, pageCount: generatedPDFPaths.length };
    } catch (error) {
        logger.start(`Error on ${JSON.stringify(worksheetConfig)} : ${error}`);
        throw error;
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
    // Generate PDF
    const { hash, pageCount } = await generatePDF(data, worksheetTitle, worksheetConfig);

    const fileLocation = path.join(Config.outPdfPath, `${hash}.pdf`);
    // const storageFilePath = path.join(...parentDirectory, hash);
    // TODO: FixMe await StorageClient.instance.putFile(storageFilePath, localFilePath, {});

    // TODO: Do not remove files, instead use hash as cache fs.unlinkSync(localFilePath);

    // Return Worksheet
    return {
        name: worksheetTitle,
        kanji: data,
        config: worksheetConfig,
        hash, pageCount, fileLocation
    };
};
