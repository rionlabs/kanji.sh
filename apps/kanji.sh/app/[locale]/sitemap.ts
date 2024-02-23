import { getTranslations } from 'next-intl/server';
import { Config } from '../../src/config';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const config = await getTranslations('config');
    return ['about', 'read', 'write'].map((page) => ({
        url: `${config('baseUrl')}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1
    }));
}
