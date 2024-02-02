import { Metadata } from 'next';
import { CollectionCard } from '../../src/components/molecules/CollectionCard';
import { CollectionCardData, METADATA } from '../../src/metadata';
import { WritingAnimation } from '../../src/components/atoms/AnimatedImage';
import React from 'react';

export const metadata: Metadata = {
    title: 'Download Kanji worksheets for Free'
};

async function getCollections() {
    const collections: Omit<CollectionCardData, 'files' | 'heading'>[] = [];
    METADATA.forEach((collectionData) => {
        const { files, heading, ...collection } = collectionData;
        collections.push(collection);
    });
    return collections;
}

export default async function WritePage() {
    const collections = await getCollections();
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
                {/* Text Content */}
                <div className="w-full sm:w-1/2">
                    <div className="space-y-4 justify-center">
                        <h4 className="mb-3">Writing Matters.</h4>
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
                <div className="w-full sm:w-1/2 py-4">
                    <div className="text-center">
                        <WritingAnimation className="w-5/6 h-auto m-auto" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
                {collections.map(({ key, ...collection }) => (
                    <CollectionCard key={key} href={`/write/${key}`} {...collection} />
                ))}
            </div>
        </div>
    );
}
