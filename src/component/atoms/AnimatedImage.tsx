import React, {HTMLAttributes} from 'react'
import Lottie from 'react-lottie';
import construction from "../../images/anim/construction_in_process.json";
import reading from '../../images/anim/reading_book.json';
import writing from '../../images/anim/writing.json';

type AnimationProps = {
    animationData: any
}

const AnimatedImage = (props: AnimationProps & HTMLAttributes<any>) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: props.animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <div className={props.className}><Lottie options={defaultOptions}/></div>
};

export const ReadingBookAnimation = (props: { className: string }) =>
    <AnimatedImage className={props.className} animationData={reading}/>

export const ConstructionAnimation = (props: { className: string }) =>
    <AnimatedImage className={props.className} animationData={construction}/>

export const WritingAnimation = (props: { className: string }) =>
    <AnimatedImage className={props.className} animationData={writing}/>