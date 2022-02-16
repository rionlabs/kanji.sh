import React from 'react';
import PageLayout from '../src/PageLayout';
import ServiceCard, { Direction } from '../src/component/ServiceCard';
import { ReadingBookAnimation } from '../src/component/atoms/AnimatedImage';

const HomePage: React.FC = () => {
    return (
        <PageLayout>
            <div className="container min-h-40">
                <div className="container gap-4" style={{ minHeight: 'inherit' }}>
                    {/* READ */}
                    <div>
                        <div className="container">
                            <div className="container flex-col justify-center content-center items-center">
                                <div>
                                    <h4>Your one stop tool for practicing kanji.</h4>
                                </div>
                                <div>
                                    <p>
                                        It already has every kanji worksheet for writing, and soon
                                        it will have plenty to practice reading.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* WRITE */}
                    <div>
                        <div className="">
                            <ReadingBookAnimation className="" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <ServiceCard
                        title={'read'}
                        subtitle="What's the point of remembering kanji if you can't read them in a sentence, eh? Soon you will get practice sessions here for the kanjis you know so that you will be able to read 飛躍的に through anything."
                        imageUrl={'/assets/svg/undraw_book_lover.svg'}
                        imageDirection={Direction.end}
                    />
                </div>
                <div>
                    <ServiceCard
                        title={'write'}
                        subtitle={
                            'Although it seems old school, writing is still one of the best ways to improve language skills. Dive in the stroke orders, and make sense of complex kanjis.'
                        }
                        imageUrl={'/assets/svg/undraw_studying.svg'}
                        imageDirection={Direction.start}
                    />
                </div>
            </div>
        </PageLayout>
    );
};

export default HomePage;
