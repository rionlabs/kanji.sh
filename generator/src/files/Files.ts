import type { Worksheet } from '@common/models';

export interface Files {

    readMetaData(hash: string): Promise<Worksheet>;

    readPDF(hash: string): Promise<Buffer>;

    getUrl(hash: string): Promise<URL>;

    writePDF(metadata: Worksheet, pdf: Buffer): Promise<void>;

    exists(hash: string): Promise<boolean>;
}
