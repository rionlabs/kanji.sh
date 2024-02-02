'use client';

import { ErrorMessage } from 'apps/kanji.sh/src/components/atoms/ErrorMessage';
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
        <div className="flex flex-col items-stretch gap-4 justify-center">
            <h4 className="text-center">Work In Progress</h4>
            <div className="flex flex-col gap-8">
                <div className="max-w-[240px] sm:max-w-[320px] mx-auto">
                    <PrintingAnimation className="opacity-95" />
                </div>
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <div>Worksheets for reading practice will be available soon.</div>
                        <div>
                            If you would like to try, signup for the updates. No spams, We promise!
                        </div>
                    </div>
                    <div className="container max-w-[512px] grid grid-cols-1 grid-rows-1">
                        {formState !== 'submitted' ? (
                            <form
                                onSubmit={onSubmit}
                                className="flex flex-col items-stretch gap-4 transition-all duration-700"
                                method="post"
                                data-cy="subscribe"
                                noValidate>
                                <input
                                    className="field"
                                    name="name"
                                    type="text"
                                    placeholder="Taro"
                                    disabled={formState === 'submitting'}
                                    aria-label="Name"
                                    aria-invalid={actionData?.errors?.name !== undefined}
                                />
                                <ErrorMessage
                                    hidden={formState !== 'idle'}
                                    message={actionData?.errors?.name}
                                />
                                <input
                                    className="field"
                                    name="email"
                                    type="email"
                                    placeholder="taro@kanji.sh"
                                    disabled={formState === 'submitting'}
                                    aria-label="Email"
                                    aria-invalid={actionData?.errors?.email !== undefined}
                                />
                                <ErrorMessage
                                    hidden={formState !== 'idle'}
                                    message={actionData?.errors?.email}
                                />
                                <button type="submit" className="btn btn-primary px-6 mt-4">
                                    {formState === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                                </button>
                                <ErrorMessage
                                    hidden={formState !== 'idle'}
                                    message={actionData?.formError}
                                />
                            </form>
                        ) : (
                            <div className="relative transition-all">
                                <div
                                    className="absolute -bottom-8"
                                    data-cy="post-subscribe-animation">
                                    <SubscribedAnimation className={'w-full h-full'} />
                                </div>
                                <div className="h-40 grid align-middle place-items-center text-center">
                                    <h4 data-cy="post-subscribe-message">
                                        Thanks for subscribing!!
                                    </h4>
                                </div>
                            </div>
                        )}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}
