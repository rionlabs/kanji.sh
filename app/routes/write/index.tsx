import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionCard from 'app/components/molecules/CollectionCard';
import { WritingAnimation } from 'app/components/atoms/AnimatedImage';
import type { CollectionCardData } from 'app/metadata';
import { METADATA } from 'app/metadata';

type LoaderData = { collections: Omit<CollectionCardData, 'files' | 'heading'>[] };

export const loader: LoaderFunction = () => {
    const collections: Omit<CollectionCardData, 'files' | 'heading'>[] = [];
    METADATA.forEach((collectionData) => {
        const { files, heading, ...collection } = collectionData;
        collections.push(collection);
    });
    return json<LoaderData>({ collections });
};

const WritePage: React.FC = () => {
    const { collections } = useLoaderData<LoaderData>();
    const navigate = useNavigate();
    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-center gap-2'>
                {/* Text Content */}
                <div className='w-full sm:w-1/2'>
                    <div className='space-y-4 justify-center'>
                        <h4 className='mb-3'>Writing Matters.</h4>
                        <div>
                            Yes, you know hundreds of Kanji, and you can read a newspaper or your
                            favorite manga all the way to the end. But can you write? If you want to
                            learn Kanji by writing or learn writing Kanji, this is your one-stop
                            site for all the worksheets.
                        </div>
                        <div>
                            Download printable handwriting practice worksheets for Japanese Kanji by
                            JLPT level, Grade Level, Wanikani Level, and Frequency. Every sheet is
                            free, now and forever!
                        </div>
                    </div>
                </div>
                {/* Jumbo Image */}
                <div className='w-full sm:w-1/2 py-4'>
                    <div className='text-center'>
                        <WritingAnimation className='w-5/6 h-auto m-auto' />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 py-12'>
                {collections.map(collection =>
                    (<div
                        key={collection.key}
                        className='max-w-[320px] mx-auto cursor-pointer'
                        onClick={async () => {
                            navigate(`/write/${collection.key}`);
                        }}>
                        <CollectionCard {...collection} />
                    </div>)
                )}
            </div>
        </div>
    );
};

export default WritePage;
