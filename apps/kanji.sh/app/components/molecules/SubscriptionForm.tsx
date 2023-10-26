import { useFetcher } from '@remix-run/react';
import { SubscribedAnimation } from '../atoms/AnimatedImage';
import type { ActionData as SubscriptionFormResponse } from '../../routes/api/subscribe';
import React, { useEffect, useRef } from 'react';

export const SubscriptionForm = () => {
    const submission = useFetcher<SubscriptionFormResponse>();
    const isSubmitting = submission.state === 'submitting';
    const subResponse = submission.data;

    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (formRef.current && subResponse?.status === 'success') {
            formRef.current.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submission.data]);

    return (
        <div className="container max-w-[480px] grid grid-cols-1 grid-rows-1">
            <submission.Form
                ref={formRef}
                action="/api/subscribe"
                className="transition-all"
                method="post"
                hidden={subResponse?.status === 'success'}>
                <fieldset className="flex flex-col items-stretch gap-4" disabled={isSubmitting}>
                    <input
                        className="field"
                        name="name"
                        type="text"
                        placeholder="Taro"
                        aria-label="Name"
                    />
                    <em
                        aria-hidden={isSubmitting && !!subResponse?.errors?.name}
                        className="text-red-800 transition-all text-sm">
                        {subResponse?.errors?.name}
                    </em>
                    <input
                        className="field"
                        name="email"
                        type="email"
                        placeholder="taro@kanji.sh"
                        aria-label="Email"
                    />
                    <em
                        aria-hidden={isSubmitting && !!subResponse?.errors?.email}
                        className="text-red-800 transition-all text-sm">
                        {subResponse?.errors?.email}
                    </em>
                    <button type="submit" className="button px-6 mt-4">
                        {isSubmitting ? 'Submitting...' : 'Subscribe'}
                    </button>
                </fieldset>
            </submission.Form>

            {subResponse?.status === 'success' ? (
                <div className="relative transition-all">
                    <div className="absolute -bottom-8">
                        <SubscribedAnimation className={'w-full h-full'} />
                    </div>
                    <div className="h-40 grid align-middle place-items-center text-center">
                        <h4>Thanks for subscribing!!</h4>
                    </div>
                </div>
            ) : null}

            <em className="text-center text-red-800　select-none">{subResponse?.error ?? '　'}</em>
        </div>
    );
};
