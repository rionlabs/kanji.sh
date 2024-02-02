'use client';

import { ActionData, FormState } from 'apps/kanji.sh/src/subscription/Types';
import React, { FormEvent } from 'react';
import { PrintingAnimation, SubscribedAnimation } from '../../src/components/atoms/AnimatedImage';

export default function ReadPage() {
    const [formState, setFormState] = React.useState<FormState>('idle');
    const [actionData, setActionData] = React.useState<ActionData | undefined>(undefined);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormState('submitting');

        try {
            const formData = new FormData(event.currentTarget);
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                body: formData
            });
            // Handle response if necessary
            const actionData: ActionData = await response.json();
            switch (actionData.status) {
                case 'success': {
                    setFormState('submitted');
                    break;
                }
                case 'error': {
                    setFormState('idle');
                    break;
                }
            }
            setActionData(actionData);
        } catch (error) {
            // Handle error if necessary
            console.error(error);
            setFormState('idle');
        }
    }

    return (
        <div className="container flex flex-col items-stretch gap-4 justify-center">
            <div className="text-center">
                <h4>Work In Progress!</h4>
            </div>
            <div className="max-w-[320px] mx-auto">
                <PrintingAnimation className="opacity-95" />
            </div>
            <div className="text-center">
                <div>We haven&apos;t started adding reading worksheets yet.</div>
                <div>If you would like it, signup for the updates. No spams, I promise!</div>
            </div>
            <div className="mt-8">
                <div className="container max-w-[480px] grid grid-cols-1 grid-rows-1">
                    {formState !== 'submitted' ? (
                        <form
                            onSubmit={onSubmit}
                            className="transition-all"
                            method="post"
                            data-cy="subscribe"
                            noValidate>
                            <fieldset
                                className="flex flex-col items-stretch gap-4"
                                disabled={formState === 'submitting'}>
                                <input
                                    className="field"
                                    name="name"
                                    type="text"
                                    placeholder="Taro"
                                    aria-label="Name"
                                />
                                <em
                                    hidden={
                                        formState !== 'idle' &&
                                        actionData?.errors?.name === undefined
                                    }
                                    aria-hidden={formState !== 'idle'}
                                    className="text-red-800 transition-all text-sm"
                                    data-cy="name-error">
                                    {actionData?.errors?.name}
                                </em>
                                <input
                                    className="field"
                                    name="email"
                                    type="email"
                                    placeholder="taro@kanji.sh"
                                    aria-label="Email"
                                />
                                <em
                                    hidden={formState !== 'idle'}
                                    aria-hidden={formState !== 'idle'}
                                    className="text-red-800 transition-all text-sm"
                                    data-cy="email-error">
                                    {actionData?.errors?.email}
                                </em>
                                <button type="submit" className="btn px-6 mt-4">
                                    {formState === 'submitting' ? 'Submitting...' : 'Subscribe'}
                                </button>
                                <em
                                    hidden={
                                        formState !== 'idle' && actionData?.formError === undefined
                                    }
                                    aria-hidden={
                                        formState !== 'idle' && actionData?.formError === undefined
                                    }
                                    className="text-red-800 transition-all text-sm"
                                    data-cy="form-error">
                                    {actionData?.formError}
                                </em>
                            </fieldset>
                        </form>
                    ) : (
                        <div className="relative transition-all">
                            <div className="absolute -bottom-8" data-cy="post-subscribe-animation">
                                <SubscribedAnimation className={'w-full h-full'} />
                            </div>
                            <div className="h-40 grid align-middle place-items-center text-center">
                                <h4 data-cy="post-subscribe-message">Thanks for subscribing!!</h4>
                            </div>
                        </div>
                    )}

                    <em className="text-center text-red-800　select-none">{'　'}</em>
                </div>
            </div>
        </div>
    );
}
