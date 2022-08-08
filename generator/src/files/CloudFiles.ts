import type { Worksheet } from '@common/models';
import type { Files } from './Files';
import type { Client as MinIOClient, ItemBucketMetadata } from 'minio';
import path from 'path';

export type CloudConfig = {
    bucketName: string;
    bucketRegion: string;
    rootDirectory: string;
    cloudHost: string;
}

export class CloudFiles implements Files {

    constructor(private minIOClient: MinIOClient, private config: CloudConfig) {
    }

    private pdfPath(hash: string): string {
        return path.join(this.config.rootDirectory, `${hash}.pdf`);
    }

    private metadataPath(hash: string): string {
        return path.join(this.config.rootDirectory, `${hash}.json`);
    }

    async getUrl(hash: string): Promise<URL> {
        if (await this.exists(hash)) {
            return new URL(`${this.config.cloudHost}/${this.pdfPath(hash)}`);
        }
        throw Error(`File ${hash} does not exist.`);
    }

    async readMetaData(hash: string): Promise<Worksheet> {
        const readableStream = await this.minIOClient.getObject(this.config.bucketName, this.metadataPath(hash));
        const buffer = await this.streamToBuffer(readableStream);
        return JSON.parse(buffer.toString()) as Worksheet;
    }

    async readPDF(hash: string): Promise<Buffer> {
        const readableStream = await this.minIOClient.getObject(this.config.bucketName, this.pdfPath(hash));
        return await this.streamToBuffer(readableStream);
    }

    async writePDF(metadata: Worksheet, pdf: Buffer): Promise<void> {
        // Put PDF file
        const pdfItemMetadata: ItemBucketMetadata = {
            'x-amz-acl': 'public-read' // Makes the file public READ in DO Spaces
        };
        await this.minIOClient.putObject(
            this.config.bucketName,
            this.pdfPath(metadata.hash),
            pdf,
            pdfItemMetadata
        );

        // Put Metadata file
        await this.minIOClient.putObject(
            this.config.bucketName,
            this.metadataPath(metadata.hash),
            JSON.stringify(metadata),
            {}
        );
    }

    async exists(hash: string): Promise<boolean> {
        try {
            const pdfFileStats = await this.minIOClient.statObject(this.config.bucketName, this.pdfPath(hash));
            const metaFileStats = await this.minIOClient.statObject(this.config.bucketName, this.metadataPath(hash));
            return !!(pdfFileStats && metaFileStats);
        } catch (error) {
            return false;
        }
    }

    /**
     * Converts [ReadableStream] to [Buffer].
     * @param readableStream
     */
    private async streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];
            readableStream.on('data', (data: Buffer | string) => {
                chunks.push(data instanceof Buffer ? data : Buffer.from(data));
            });
            readableStream.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
            readableStream.on('error', reject);
        });
    }
}
