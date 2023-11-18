import { CollectionType, Worksheet } from '@kanji-sh/models';
import { appOperations } from '@kanji-sh/printer';
import { FileCard } from 'apps/kanji.sh/src/components/molecules/FileCard';
import { CollectionCardData, FileCardData, METADATA } from 'apps/kanji.sh/src/metadata';
import React from 'react';

import { notFound } from 'next/navigation';

type CollectionData = {
    collectionData: Omit<CollectionCardData, 'files'>;
    worksheets: Array<{ worksheet: Worksheet; cardData: FileCardData }>;
};

async function getCollection(collection: string): Promise<CollectionData | null> {
    try {
        const collectionWorksheets = await appOperations().getCollectionMeta(
            collection as CollectionType
        );
        const { files, ...collectionCardData } = METADATA.get(collection)!!;
        console.log(collectionWorksheets);
        // Merge object collectionWorksheets with collectionColors
        const worksheets: CollectionData['worksheets'] = [];
        for (let worksheetKey in collectionWorksheets) {
            const worksheet = collectionWorksheets[worksheetKey];
            const cardData = files.find((file) => file.key === worksheetKey);
            if (!cardData) throw new Error(`Worksheet ${worksheetKey} not found in metadata`);
            worksheets.push({ worksheet, cardData });
        }
        console.log(JSON.stringify(collectionWorksheets, null, 2));

        return { collectionData: collectionCardData, worksheets };
    } catch (error) {
        console.error(error);
        return null;
    }
}

type PageProps = {
    params: {
        collection: string;
    };
};

export default async function CollectionPage(props: PageProps) {
    const { collection } = props.params;
    const data = await getCollection(collection);
    if (!data) {
        return notFound();
    }
    const { collectionData, worksheets } = data;
    return (
        <div>
            <h3 className="p-4">{collectionData.heading}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 py-12">
                {worksheets.map(({ cardData, worksheet }) => (
                    <div className="" key={cardData.key}>
                        <FileCard cardData={cardData} worksheet={worksheet} />
                    </div>
                ))}
            </div>
        </div>
    );
}
