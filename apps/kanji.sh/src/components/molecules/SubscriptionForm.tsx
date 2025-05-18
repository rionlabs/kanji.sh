'use client';

import React, { FormEvent } from 'react';

import { useTranslations } from 'next-intl';

import { SubscribedAnimation } from 'apps/kanji.sh/src/components/atoms/AnimatedImage';
import { ErrorMessage } from 'apps/kanji.sh/src/components/atoms/ErrorMessage';
import { ActionData, FormState } from 'apps/kanji.sh/src/subscription/Types';

export type FormProps = {};

export const SubscriptionForm = () => {
    const [formState, setFormState] = React.useState<FormState>('idle');
    const [actionData, setActionData] = React.useState<ActionData | undefined>(undefined);
    const t = useTranslations('form');

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
                        placeholder={t('name-placeholder')}
                        disabled={formState === 'submitting'}
                        aria-label={t('name-label')}
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
                        placeholder={t('email-placeholder')}
                        disabled={formState === 'submitting'}
                        aria-label={t('email-label')}
                        aria-invalid={actionData?.errors?.email !== undefined}
                    />
                    <ErrorMessage
                        hidden={formState !== 'idle'}
                        message={actionData?.errors?.email}
                    />
                    <button type="submit" className="btn btn-primary px-6 mt-4">
                        {formState === 'submitting' ? t('button-loading') : t('button')}
                    </button>
                    <ErrorMessage hidden={formState !== 'idle'} message={actionData?.formError} />
                </form>
            ) : (
                <div className="relative transition-all">
                    <div className="absolute -bottom-8" data-cy="post-subscribe-animation">
                        <SubscribedAnimation className={'w-full h-full'} />
                    </div>
                    <div className="h-40 grid align-middle place-items-center text-center">
                        <h4 data-cy="post-subscribe-message">{t('post-subscribe-message')}</h4>
                    </div>
                </div>
            )}
            <br />
        </div>
    );
};
