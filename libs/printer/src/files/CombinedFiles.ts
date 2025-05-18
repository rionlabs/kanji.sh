import type { Worksheet } from '@kanji-sh/models';
import { CollectionType } from '@kanji-sh/models';

import type { Files } from './Files';

export class CombinedFiles implements Files {
    constructor(
        private local: Files,
        private cloud: Files
    ) {}

    /**
     * Checks if the file exists in the local filesystem or in the cloud.
     * To make this check faster, only check is performed.
     * @param hash The hash of the file to check. Same as {@link @common/models/Worksheet#hash}.
     */
    async exists(hash: string): Promise<boolean> {
        const existInCloud = await this.cloud.exists(hash);
        const existInLocal = await this.local.exists(hash);
        return existInCloud || existInLocal;
    }

    async getUrl(hash: string): Promise<URL> {
        const existInCloud = await this.cloud.exists(hash);
        if (existInCloud) {
            return this.cloud.getUrl(hash);
        } else {
            const existInLocal = await this.local.exists(hash);
            if (existInLocal) {
                await this.copyLocalToCloud(hash);
                return this.cloud.getUrl(hash);
            } else {
                throw new Error(`File ${hash} does not exist anywhere.`);
            }
        }
    }

    async readMetaData(hash: string): Promise<Worksheet> {
        const existInLocal = await this.local.exists(hash);

        if (!existInLocal) {
            const existInCloud = await this.cloud.exists(hash);
            if (existInCloud) {
                await this.copyCloudToLocal(hash);
            } else {
                throw new Error(`File ${hash} does not exist anywhere.`);
            }
        }

        // Local reads are faster
        return this.local.readMetaData(hash);
    }

    async readPDF(hash: string): Promise<Buffer> {
        const existInLocal = await this.local.exists(hash);

        if (!existInLocal) {
            const existInCloud = await this.cloud.exists(hash);
            if (existInCloud) {
                await this.copyCloudToLocal(hash);
            } else {
                throw new Error(`File ${hash} does not exist anywhere.`);
            }
        }

        // Local reads are faster
        return this.local.readPDF(hash);
    }

    async writePDF(metadata: Worksheet, pdf: Buffer): Promise<void> {
        await this.local.writePDF(metadata, pdf);
        await this.cloud.writePDF(metadata, pdf);
    }

    async readCollectionMetaData(collection: CollectionType): Promise<Record<string, Worksheet>> {
        const local = await this.local.readCollectionMetaData(collection);
        if (local) {
            return local;
        }
        const cloud = await this.cloud.readCollectionMetaData(collection);
        if (cloud) {
            await this.local.writeCollection(collection, cloud);
            return cloud;
        }

        throw new Error(`Collection file for ${collection} does not exist anywhere.`);
    }

    async writeCollection(
        collection: CollectionType,
        data: Record<string, Worksheet>
    ): Promise<void> {
        await this.local.writeCollection(collection, data);
        await this.cloud.writeCollection(collection, data);
    }

    private async copyLocalToCloud(hash: string) {
        await this.cloud.writePDF(
            await this.local.readMetaData(hash),
            await this.local.readPDF(hash)
        );
    }

    private async copyCloudToLocal(hash: string) {
        await this.local.writePDF(
            await this.cloud.readMetaData(hash),
            await this.cloud.readPDF(hash)
        );
    }
}
