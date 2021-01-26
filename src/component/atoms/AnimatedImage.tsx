import React from 'react';
import Lottie from 'react-lottie';
import construction from '../../images/anim/construction_in_process.json';
import reading from '../../images/anim/reading_book.json';
import writing from '../../images/anim/writing.json';

type AnimationProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animationData?: any;
    className: string;
};

const AnimatedImage: (props: AnimationProps) => JSX.Element = (props: AnimationProps) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: props.animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={props.className}>
            <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
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
