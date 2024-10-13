import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import { default as ReadingSvg } from '../assets/vectors/reading.svg?react';
import { default as WritingSvg } from '../assets/vectors/writing.svg?react';
import { default as PrintingSvg } from '../assets/vectors/printing.svg?react';
import { default as SubscribedSvg } from '../assets/vectors/subscribed.svg?react';

type AnimationName = 'reading' | 'writing' | 'printing' | 'subscribed';

type AnimationProps = {
    animationName: AnimationName;
    className: string;
    loop?: boolean;
};

const SvgFallbacks: Record<AnimationName, React.FC<React.SVGProps<SVGSVGElement>>> = {
    reading: ReadingSvg,
    writing: WritingSvg,
    printing: PrintingSvg,
    subscribed: SubscribedSvg
};

export const AnimatedImage = ({ animationName, className, loop = false }: AnimationProps) => {
    const animationContainerRef = useRef<HTMLDivElement>(null);
    const [display, setDisplay] = React.useState<'anim' | 'svg'>('svg');

    const SvgFallback = SvgFallbacks[animationName];

    useEffect(() => {
        if (animationContainerRef.current) {
            const animationItem = Lottie.loadAnimation({
                path: `/assets/anim/${animationName}.json`,
                loop,
                renderer: 'svg',
                container: animationContainerRef.current
            });
            animationItem.addEventListener('data_ready', () => {
                setDisplay('anim');
            });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className={clsx(className)}>
            <div
                ref={animationContainerRef}
                className={clsx('w-full h-full', { hidden: display === 'svg' })}
            />
            <SvgFallback className={clsx('w-full h-full', { hidden: display === 'anim' })} />
        </div>
    );
};

export const ReadingAnimation = (props: { className: string }) => (
    <AnimatedImage className={props.className} loop={true} animationName={'reading'} />
);

export const WritingAnimation = (props: { className: string }) => (
    <AnimatedImage className={props.className} loop={true} animationName={'writing'} />
);

export const PrintingAnimation = (props: { className: string }) => (
    <AnimatedImage className={props.className} loop={false} animationName={'printing'} />
);

export const SubscribedAnimation = (props: { className: string }) => (
    <AnimatedImage className={props.className} loop={false} animationName={'subscribed'} />
);
