import React from 'react';
import { useNavigate } from 'react-router-dom'
import CollectionCard from 'app/components/molecules/CollectionCard';
import { WritingAnimation } from 'app/components/atoms/AnimatedImage';
import { METADATA } from 'app/metadata';

const WritePage: React.FC = () => {
    const navigate = useNavigate();
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
            <div className="py-8 flex flex-col sm:flex-row sm:flex-wrap gap-16 justify-center items-stretch">
                {Object.keys(METADATA).map((key) => {
                    const object = METADATA[key];
                    return (
                        <div className="" key={key}>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                            <div
                                className="max-w-[320px] mx-auto sm:h-full button rounded-lg"
                                onClick={async () => {
                                    console.log(`/write/collection/${key}`);
                                    navigate(`/write/collection/${key}`);
                                    if (typeof window !== undefined) {
                                        window.scrollTo(0, 0);
                                    }
                                }}>
                                <CollectionCard collectionKey={key} {...object} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WritePage;
