import { MetadataRoute } from 'next';

import { METADATA } from 'apps/kanji.sh/src/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // TODO: Read baseUrl from ${config('baseUrl')}
    const basePath = 'https://kanji.sh/write';

    const collectionPaths: string[] = [];
    const filePaths: string[] = [];

    METADATA.forEach((value, key) => {
        collectionPaths.push(key);
        value.files.map((file) => filePaths.push(`${key}/${file.key}`));
    });

    const collectionSitemap: MetadataRoute.Sitemap = collectionPaths.map((path) => ({
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        url: `${basePath}/${path}`
    }));
    const fileSitemap: MetadataRoute.Sitemap = filePaths.map((path) => ({
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        url: `${basePath}/${path}`
    }));

    return [...collectionSitemap, ...fileSitemap];
}
