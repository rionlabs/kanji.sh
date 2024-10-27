import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { useTranslation } from 'react-i18next';

import { CollectionCardData, FileCardData, METADATA } from 'apps/kanji.sh/app/config/metadata';

import { FileCard } from '@kanji-sh/app/components';
import { CollectionType, Worksheet } from '@kanji-sh/models';

import { appOperations } from '../printer.server';

type LoaderData = {
    collectionData: Omit<CollectionCardData, 'files'>;
    worksheets: Array<{ worksheet: Worksheet; cardData: FileCardData }>;
};

export const loader: LoaderFunction = async ({params}) => {
    const { collection } = params;
    if (!collection) {
        return null;
    }
    try {
        const collectionWorksheets = await appOperations().getCollectionMeta(
            collection as CollectionType
        );
        const { files, ...collectionCardData } = METADATA.get(collection)!;
        // Merge object collectionWorksheets with collectionColors
        const worksheets: LoaderData['worksheets'] = [];
        for (const worksheetKey in collectionWorksheets) {
            const worksheet = collectionWorksheets[worksheetKey];
            const cardData = files.find((file) => file.key === worksheetKey);
            if (!cardData) {
                console.error(`Worksheet ${worksheetKey} not found in metadata`);
                return null;
            }
            worksheets.push({ worksheet, cardData });
        }

        return json<LoaderData>({ collectionData: collectionCardData, worksheets });
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default function WriteCollectionRoute() {
    const { collectionData, worksheets } = useLoaderData<LoaderData>();
    const { t } = useTranslation('collections', { keyPrefix: collectionData.key });
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
