import { CollectionType } from '@kanji-sh/models';
import type { Worksheet } from '@kanji-sh/models';
import fs from 'node:fs';
import path from 'node:path';
import Url from 'node:url';
import { ensureDirectoriesExist, readLinesInFile } from '../utils';
import type { Files } from './Files';

export class LocalFiles implements Files {
    constructor(
        private pdfPath: string,
        private jsonPath: string,
        private collectionPath: string
    ) {
        ensureDirectoriesExist(pdfPath, jsonPath, collectionPath);
    }

    async getUrl(hash: string): Promise<URL> {
        if (await this.exists(hash)) {
            const fileLocation = path.join(this.pdfPath, `${hash}.pdf`);
            return URL.parse(Url.pathToFileURL(fileLocation).toString()) as URL;
        } else {
            throw Error(`File ${hash} does not exist.`);
        }
    }

    async readMetaData(hash: string): Promise<Worksheet> {
        const metaFilePath = path.join(this.jsonPath, `${hash}.json`);
        return JSON.parse(readLinesInFile(metaFilePath).join()) as Worksheet;
    }

    async readPDF(hash: string): Promise<Buffer> {
        const fileLocation = path.join(this.pdfPath, `${hash}.pdf`);
        return fs.readFileSync(fileLocation);
    }

    async writePDF(worksheet: Worksheet, pdf: Buffer): Promise<void> {
        const outputPdfFilePath = `${path.join(this.pdfPath, worksheet.hash)}.pdf`;
        fs.writeFileSync(outputPdfFilePath, pdf, { encoding: 'utf-8', flag: 'w+' });

        const outputMetaFilePath = path.join(this.jsonPath, `${worksheet.hash}.json`);
        fs.writeFileSync(outputMetaFilePath, JSON.stringify(worksheet), {
            encoding: 'utf-8',
            flag: 'w+'
        });
    }

    async readCollectionMetaData(collection: CollectionType): Promise<Record<string, Worksheet>> {
        const collectionFilePath = path.join(this.collectionPath, `${collection}.json`);
        return JSON.parse(readLinesInFile(collectionFilePath).join()) as Record<string, Worksheet>;
    }

    writeCollection(collection: CollectionType, data: Record<string, Worksheet>): Promise<void> {
        const collectionDataPath = path.join(this.collectionPath, `${collection}.json`);
        fs.writeFileSync(collectionDataPath, JSON.stringify(data), {
            encoding: 'utf-8',
            flag: 'w+'
        });
        return Promise.resolve(undefined);
    }

    async exists(hash: string): Promise<boolean> {
        const pdfFilePath = path.join(this.pdfPath, `${hash}.pdf`);
        const metaFilePath = path.join(this.jsonPath, `${hash}.json`);
        return fs.existsSync(pdfFilePath) && fs.existsSync(metaFilePath);
    }
}
