import React from 'react';
import { WritingAnimation } from './atoms/AnimatedImage';

const Jumbotron: React.FC = () => {
    return (
        <div className="flex-grow pt-4 pb-2 lighten">
            <div className="container">
                {/* Grid Container */}
                <div className="grid container direction-row justify-center gap-2">
                    {/* Text Content */}
                    <div className="w-full md:w-1/2">
                        <div className="direction-col justify-center">
                            <div>
                                <h4 className="mb-3">Writing Matters.</h4>
                            </div>
                            <div>
                                <div>
                                    Yes, you know hundreds of Kanji, and you can read a newspaper or
                                    your favorite manga all the way to the end. But can you write?
                                    If you want to learn Kanji by writing or learn writing Kanji,
                                    this is your one-stop site for all the worksheets.
                                </div>
                                <div>
                                    Download printable handwriting practice worksheets for Japanese
                                    Kanji by JLPT level, Grade Level, Wanikani Level, and Frequency.
                                    Every sheet is free, now and forever!
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Jumbo Image */}
                    <div className="w-full md:w-1/2">
                        <div className="text-center">
                            <WritingAnimation className="w-5/6 h-auto m-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jumbotron;
