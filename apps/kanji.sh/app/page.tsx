import { ReadingBookAnimation } from 'apps/kanji.sh/src/components/atoms/AnimatedImage';
import ServiceCard, { Direction } from 'apps/kanji.sh/src/components/molecules/ServiceCard';
import React from 'react';

export default async function Index() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="">
                    <div className="w-full flex flex-col gap-4 justify-center">
                        <div>
                            <h3>Your one stop tool for practicing kanji.</h3>
                        </div>
                        <div>
                            <h5>
                                It already has every kanji worksheet for writing, and soon it will
                                have plenty to practice reading.
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="w-full ">
                    <div className="max-w-screen-sm">
                        <ReadingBookAnimation className="p-4" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-16 py-8">
                <ServiceCard
                    title={'read'}
                    subtitle="What's the point of remembering kanji if you can't read them in a sentence, eh? Soon you will get practice sessions here for the kanjis you know so that you will be able to read 飛躍的に through anything."
                    imageUrl={'/assets/svg/undraw_book_lover.svg'}
                    imageDirection={Direction.start}
                />
                <ServiceCard
                    title={'write'}
                    subtitle={
                        'Although it seems old school, writing is still one of the best ways to improve language skills. Dive in the stroke orders, and make sense of complex kanjis.'
                    }
                    imageUrl={'/assets/svg/undraw_studying.svg'}
                    imageDirection={Direction.end}
                />
            </div>
        </div>
    );
}
