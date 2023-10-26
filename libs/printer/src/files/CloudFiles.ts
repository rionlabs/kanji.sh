import type { Worksheet } from '@kanji-sh/models';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Files } from './Files';

const DEFAULT_CACHE_CONTROL = 'public,max-age=604800;stale-while-revalidate=86400';

type Buckets = {
    pdfBucket: string;
    jsonBucket: string;
};

const defaultBuckets: Buckets = {
    pdfBucket: 'PDFs',
    jsonBucket: 'JSONs'
};

export class CloudFiles implements Files {
    // eslint-disable-next-line no-useless-constructor
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
        return JSON.parse(data.toString()) as Worksheet;
    }

    async readPDF(hash: string): Promise<Buffer> {
        const { data, error } = await this.supabaseClient.storage
            .from(this.buckets.pdfBucket)
            .download(`${hash}.pdf`);
        if (error || !data) {
            throw error;
        }
        return this.streamToBuffer(data.stream());
    }

    async writePDF(metadata: Worksheet, pdf: Buffer): Promise<void> {
        // Write PDF
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
        // Write Metadata
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

    /**
     * Converts [ReadableStream] to [Buffer].
     * @param readableStream
     * @private
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
