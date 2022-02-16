import React from 'react';
import PageLayout from '../../src/PageLayout';
import Jumbotron from '../../src/component/Jumbotron';
import CollectionCard from '../../src/component/CollectionCard';

const WritePage: React.FC = () => {
    return (
        <PageLayout>
            <Jumbotron />
            <div className="container justify-center items-stretch gap-4">
                <div className="w-full sm:w-1/2 md:w-1/3">
                    <CollectionCard
                        collectionKey="jlpt"
                        title={'JLPT'}
                        description={
                            'The Official Worldwide Japanese-Language Proficiency Test, operated by the Japan Foundation and JEES.'
                        }
                        metaColor={'#1A7EC3'}
                        backgroundImageUrl={'/assets/png/jlpt.png'}
                    />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                    <CollectionCard
                        collectionKey={'grade'}
                        title={'GRADE'}
                        description={
                            'List of 1,026 kanji for Japanese students in elementary school, from 1st grade to sixth grade.'
                        }
                        metaColor={'#5C9F4F'}
                        backgroundImageUrl={'/assets/png/grade.png'}
                    />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                    <CollectionCard
                        collectionKey={'wanikani'}
                        title={'WANIKANI'}
                        description={
                            'WaniKani is a Japanese radicals, kanji, and vocabulary learning web app that uses mnemonics and SRS to make kanji learning simple.'
                        }
                        metaColor={'#00AAFF'}
                        backgroundImageUrl={'/assets/png/wanikani.png'}
                    />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                    <CollectionCard
                        collectionKey={'kanjigarden'}
                        title={'KANJI GARDEN'}
                        description={
                            'Kanji Garden is a free mnemonic-based SRS kanji learning tool that features about 2600 kanji. '
                        }
                        metaColor={'#e2506d'}
                        backgroundImageUrl={'/assets/png/kanjigarden.png'}
                    />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                    <CollectionCard
                        collectionKey={'frequency'}
                        title={'FREQUENCY'}
                        description={
                            'Kanji list ordered by the frequency they are used in the Japanese Language.'
                        }
                        metaColor={'#0D2542'}
                        backgroundImageUrl={'/assets/png/frequency.png'}
                    />
                </div>
            </div>
        </PageLayout>
    );
};

export default WritePage;
