import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import construction from '../../assets/animations/construction_in_process.json';
import reading from '../../assets/animations/reading_book.json';
import writing from '../../assets/animations/writing.json';
import printing from '../../assets/animations/printing.json';

type AnimationProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animationData?: any;
    className: string;
    loop?: boolean | number;
};

const AnimatedImage: (props: AnimationProps) => JSX.Element = (props: AnimationProps) => {
    const element = useRef<HTMLDivElement>(null);
    const lottieInstance = useRef<any>();

    const { animationData, className, loop } = props;

    useEffect(() => {
        if (element.current) {
            lottieInstance.current = lottie.loadAnimation({
                animationData, loop,
                container: element.current
            });
        }
    }, [animationData]);

    return (
        <div className={props.className}>
            <div className={className} ref={element} />
        </div>
    );
};

export const ReadingBookAnimation: (props: { className: string }) => JSX.Element = (props: {
    className: string;
}) => <AnimatedImage className={props.className} animationData={reading} />;

export const ConstructionAnimation: (props: { className: string }) => JSX.Element = (props: {
    className: string;
}) => <AnimatedImage className={props.className} animationData={construction} />;

export const WritingAnimation: (props: { className: string }) => JSX.Element = (props: {
    className: string;
}) => <AnimatedImage className={props.className} animationData={writing} />;

export const PrintingAnimation: (props: { className: string }) => JSX.Element = (props: {
    className: string;
}) => <AnimatedImage className={props.className} loop={false} animationData={printing} />;
