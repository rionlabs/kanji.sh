import type { SupabaseClient } from '@supabase/supabase-js';

import { CollectionType, Worksheet } from '@kanji-sh/models';

import type { Files } from './Files';

const DEFAULT_CACHE_CONTROL = 'public,max-age=604800;stale-while-revalidate=86400';

type Buckets = {
    pdfBucket: string;
    jsonBucket: string;
    collectionBucket: string;
};

const defaultBuckets: Buckets = {
    pdfBucket: 'pdfs',
    jsonBucket: 'jsons',
    collectionBucket: 'collections'
};

export class CloudFiles implements Files {

    constructor(
        private supabaseClient: SupabaseClient,
        private buckets: Buckets = defaultBuckets
    ) {}

    async exists(hash: string): Promise<boolean> {
        // FixMe: Find a better way to check if file exists
        try {
            const pdfFile = await this.readPDF(hash);
            const metaFile = await this.readMetaData(hash);
            return !!(pdfFile && metaFile);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getUrl(hash: string): Promise<URL> {
        const {
            data: { publicUrl }
        } = this.supabaseClient.storage
            .from(this.buckets.pdfBucket)
            .getPublicUrl(`${hash}.pdf`, { download: false });
        return new URL(publicUrl);
    }

    async readMetaData(hash: string): Promise<Worksheet> {
        const { data, error } = await this.supabaseClient.storage
            .from(this.buckets.jsonBucket)
            .download(`${hash}.json`);
        if (error || !data) {
            throw error;
        }
        const jsonString = await data.text();
        return JSON.parse(jsonString) as Worksheet;
    }

    async readPDF(hash: string): Promise<Buffer> {
        const { data, error } = await this.supabaseClient.storage
            .from(this.buckets.pdfBucket)
            .download(`${hash}.pdf`);
        if (error || !data) {
            throw error;
        }
        const arrayBuffer = await data.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }

    async writePDF(metadata: Worksheet, pdf: Buffer): Promise<void> {
        // Write Metadata
        const { error: metaError } = await this.supabaseClient.storage
            .from(this.buckets.jsonBucket)
            .upload(`${metadata.hash}.json`, JSON.stringify(metadata), {
                cacheControl: DEFAULT_CACHE_CONTROL,
                upsert: true,
                contentType: 'application/json'
            });
        if (metaError) {
            throw metaError;
        }
        // Write PDF
        const { error: pdfError } = await this.supabaseClient.storage
            .from(this.buckets.pdfBucket)
            .upload(`${metadata.hash}.pdf`, pdf, {
                cacheControl: DEFAULT_CACHE_CONTROL,
                upsert: true,
                contentType: 'application/pdf'
            });

        if (pdfError) {
            throw pdfError;
        }
    }

    async readCollectionMetaData(collection: CollectionType): Promise<Record<string, Worksheet>> {
        const { data, error } = await this.supabaseClient.storage
            .from(this.buckets.collectionBucket)
            .download(`${collection}.json`);
        if (error || !data) {
            throw error;
        }
        const jsonString = await data.text();
        return JSON.parse(jsonString) as Record<string, Worksheet>;
    }

    async writeCollection(
        collection: CollectionType,
        data: Record<string, Worksheet>
    ): Promise<void> {
        const { error } = await this.supabaseClient.storage
            .from(this.buckets.collectionBucket)
            .upload(`${collection}.json`, JSON.stringify(data), {
                cacheControl: DEFAULT_CACHE_CONTROL,
                upsert: true,
                contentType: 'application/json'
            });
        if (error) {
            throw error;
        }
    }
}
