import React, {HTMLAttributes} from 'react'
import Lottie from 'react-lottie';

type AnimationProps = {
    animationData: any
}

export const AnimatedImage = (props: AnimationProps & HTMLAttributes<any>) => {
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