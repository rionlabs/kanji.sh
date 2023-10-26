import type { CollectionType, Worksheet } from '@kanji-sh/models';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { FileCardData } from '../../metadata';
import React from 'react';
import { FileCard } from '../../components/molecules/FileCard';
import { METADATA } from '../../metadata';
import invariant from 'tiny-invariant';
import { getWorksheet } from '../index.server';

type LoaderData = {
    heading: string;
    files: Array<{ cardData: FileCardData; worksheet: Worksheet }>;
};

export const loader: LoaderFunction = async ({ params }) => {
    const { collection } = params;
    invariant(typeof collection === 'string', 'Collection must be string');
    // eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
    const collectionData = METADATA.get(collection)!!;
    const files = await Promise.all(
        collectionData.files.map(async (cardData) => ({
            cardData,
            worksheet: await getWorksheet(collection as CollectionType, cardData.key)
        }))
    );
    return json<LoaderData>({ heading: collectionData.heading, files });
};

function CollectionPage() {
    const { heading, files } = useLoaderData<LoaderData>();
    return (
        <div>
            <h3 className="p-4">{heading}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-8 py-12">
                {files.map(({ cardData, worksheet }) => (
                    <div className="" key={cardData.key}>
                        <FileCard cardData={cardData} worksheet={worksheet} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CollectionPage;
