import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // TODO: Read baseUrl from ${config('baseUrl')}
    const baseUrl = 'https://kanji.sh';
    return ['', 'about', 'read', 'write'].map((page) => ({
        url: `${baseUrl}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1
    }));
}
