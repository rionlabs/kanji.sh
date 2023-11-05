import { SubscribedAnimation } from '../atoms/AnimatedImage';
import React, { useEffect, useRef } from 'react';

export const SubscriptionForm = () => {
    //const submission = useFetcher<SubscriptionFormResponse>();
    //const isSubmitting = submission.state === 'submitting';
    // const subResponse = submission.data;
    const isSubmitting = false;

    // const formRef = useRef<HTMLFormElement>(null);
    // useEffect(() => {
    //     if (formRef.current && subResponse?.status === 'success') {
    //         formRef.current.reset();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [submission.data]);

    return (
        <div className="container max-w-[480px] grid grid-cols-1 grid-rows-1">
            <form
                //                ref={formRef}
                action="/api/subscribe"
                className="transition-all"
                method="post">
                <fieldset className="flex flex-col items-stretch gap-4" disabled={isSubmitting}>
                    <input
                        className="field"
                        name="name"
                        type="text"
                        placeholder="Taro"
                        aria-label="Name"
                    />
                    <em
                        aria-hidden={isSubmitting}
                        className="text-red-800 transition-all text-sm"></em>
                    <input
                        className="field"
                        name="email"
                        type="email"
                        placeholder="taro@kanji.sh"
                        aria-label="Email"
                    />
                    <em
                        aria-hidden={isSubmitting}
                        className="text-red-800 transition-all text-sm"></em>
                    <button type="submit" className="btn px-6 mt-4">
                        {isSubmitting ? 'Submitting...' : 'Subscribe'}
                    </button>
                </fieldset>
            </form>

            <div className="relative transition-all">
                <div className="absolute -bottom-8">
                    <SubscribedAnimation className={'w-full h-full'} />
                </div>
                <div className="h-40 grid align-middle place-items-center text-center">
                    <h4>Thanks for subscribing!!</h4>
                </div>
            </div>

            <em className="text-center text-red-800　select-none">{'　'}</em>
        </div>
    );
};
