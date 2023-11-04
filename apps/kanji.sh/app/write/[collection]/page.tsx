import { CollectionType, Worksheet } from '@kanji-sh/models';
import { appOps } from '@kanji-sh/printer';
import { FileCard } from 'apps/kanji.sh/src/components/molecules/FileCard';
import { CollectionCardData, FileCardData, METADATA } from 'apps/kanji.sh/src/metadata';
import React from 'react';

type CollectionData = {
    collectionData: Omit<CollectionCardData, 'files'>;
    worksheets: Array<{ worksheet: Worksheet; cardData: FileCardData }>;
};

async function getCollection(collection: string): Promise<CollectionData> {
    const collectionWorksheets = await appOps.getCollectionMeta(collection as CollectionType);

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
}

type PageProps = {
    params: {
        collection: string;
    };
};

export default async function CollectionPage(props: PageProps) {
    const { collection } = props.params;
    const { collectionData, worksheets } = await getCollection(collection);
    return (
        <div>
            <h3 className="p-4">{collectionData.heading}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-8 py-12">
                {worksheets.map(({ cardData, worksheet }) => (
                    <div className="" key={cardData.key}>
                        <FileCard cardData={cardData} worksheet={worksheet} />
                    </div>
                ))}
            </div>
        </div>
    );
}
