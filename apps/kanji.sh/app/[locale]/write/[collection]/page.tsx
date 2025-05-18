import React, { cache } from 'react';

import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { FileCard } from 'apps/kanji.sh/src/components/molecules/FileCard';
import { CollectionCardData, FileCardData, METADATA } from 'apps/kanji.sh/src/metadata';
import { LocaleParams } from 'apps/kanji.sh/src/types/LocaleParams';

import { CollectionType, Worksheet } from '@kanji-sh/models';
import { appOperations } from '@kanji-sh/printer';

type PageProps = {
    params: Promise<{
        collection: string;
    }>;
} & LocaleParams;

export const generateStaticParams = async () => {
    const collectionKeys = Object.values(CollectionType);
    return collectionKeys.map((key) => ({ collection: key }));
};

export async function generateMetadata({ params }: PageProps) {
    const { collection, locale } = await params;
    const t = await getTranslations({ locale, namespace: `collections.${collection}` });
    return {
        title: t('heading')
    };
}

const cachedCollection = cache(getCollection);

export default async function CollectionPage(props: PageProps) {
    const { collection, locale } = await props.params;
    setRequestLocale(locale);
    const data = await cachedCollection(collection);
    const t = await getTranslations({
        locale,
        namespace: `collections.${collection}`
    });
    if (!data) {
        return notFound();
    }
    const { worksheets } = data;
    return (
        <div className="flex flex-col gap-4">
            <div className="p-4">
                <h3>{t('heading')}</h3>
                <p>{t('description')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
                {worksheets.map(({ cardData, worksheet }) => (
                    <FileCard key={cardData.key} cardData={cardData} worksheet={worksheet} />
                ))}
            </div>
        </div>
    );
}

type CollectionData = {
    collectionData: Omit<CollectionCardData, 'files'>;
    worksheets: Array<{ worksheet: Worksheet; cardData: FileCardData }>;
};

async function getCollection(collection: string): Promise<CollectionData | null> {
    try {
        const collectionWorksheets = await appOperations().getCollectionMeta(
            collection as CollectionType
        );
        const { files, ...collectionCardData } = METADATA.get(collection)!;
        // Merge object collectionWorksheets with collectionColors
        const worksheets: CollectionData['worksheets'] = [];
        for (const worksheetKey in collectionWorksheets) {
            const worksheet = collectionWorksheets[worksheetKey];
            const cardData = files.find((file) => file.key === worksheetKey);
            if (!cardData) {
                console.error(`Worksheet ${worksheetKey} not found in metadata`);
                return null;
            }
            worksheets.push({ worksheet, cardData });
        }

        return { collectionData: collectionCardData, worksheets };
    } catch (error) {
        console.error(error);
        return null;
    }
}
