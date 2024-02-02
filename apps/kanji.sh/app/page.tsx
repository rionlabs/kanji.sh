import { ReadingBookAnimation } from 'apps/kanji.sh/src/components/atoms/AnimatedImage';
import ServiceCard, { Direction } from 'apps/kanji.sh/src/components/molecules/ServiceCard';
import { Config } from '../src/config';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL(Config.publicUrl),
    alternates: {
        canonical: '/'
    },
    title: 'Your one-stop tool for practicing Kanji',
    description: 'Practice the Kanji you learned over the years with distraction-free sheets.',
    openGraph: {
        locale: 'en_US',
        url: 'https://kanji.sh',
        title: 'Kanji.sh',
        siteName: 'Kanji.sh',
        description: 'Free tool to practice reading & writing Japanese kanji.',
        images: [
            {
                url: '/poster.png',
                width: 512,
                height: 300,
                alt: 'Kanji.sh Poster'
            }
        ]
    }
};

export default async function Index() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="w-full">
                    <div className="w-full flex flex-col gap-4 justify-center">
                        <div>
                            <h4>Your one stop tool for practicing kanji.</h4>
                        </div>
                        <div className="text-lg">
                            It already has every kanji worksheet for writing, and soon it will have
                            plenty to practice reading.
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="max-w-[420px] w-[420px] h-[420px]">
                        <ReadingBookAnimation className="p-4" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-16 py-8">
                <ServiceCard
                    title={'read'}
                    subtitle="What's the point of remembering kanji if you can't read them in a sentence, eh? Soon you will get practice sessions here for the kanjis you know so that you will be able to read 飛躍的に through anything."
                    buttonText={'Join the Waitlist'}
                    buttonLink={'/read'}
                    imageUrl={'/assets/svg/undraw_book_lover.svg'}
                    imageDirection={Direction.start}
                />
                <ServiceCard
                    title={'write'}
                    subtitle={
                        'Although it seems old school, writing is still one of the best ways to improve language skills. Dive in the stroke orders, and make sense of complex kanjis.'
                    }
                    buttonText={'Download Worksheets'}
                    buttonLink={'/write'}
                    imageUrl={'/assets/svg/undraw_studying.svg'}
                    imageDirection={Direction.end}
                />
            </div>
        </div>
    );
}
