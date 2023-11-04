import { CollectionType } from '@kanji-sh/models';
import type { Worksheet } from '@kanji-sh/models';

export interface Files {
    readMetaData(hash: string): Promise<Worksheet>;

    readPDF(hash: string): Promise<Buffer>;

    getUrl(hash: string): Promise<URL>;

    writePDF(metadata: Worksheet, pdf: Buffer): Promise<void>;

    readCollectionMetaData(collection: CollectionType): Promise<Record<string, Worksheet>>;

    writeCollection(collection: CollectionType, data: Record<string, Worksheet>): Promise<void>;

    exists(hash: string): Promise<boolean>;
}
