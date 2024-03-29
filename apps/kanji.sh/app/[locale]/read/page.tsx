import { SubscriptionForm } from 'apps/kanji.sh/src/components/molecules/SubscriptionForm';
import { LocaleParams } from 'apps/kanji.sh/src/types/LocaleParams';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { pick } from 'next/dist/lib/pick';
import React from 'react';
import { PrintingAnimation } from '../../../src/components/atoms/AnimatedImage';

export const generateMetadata = async () => {
    const t = await getTranslations('read');
    return {
        title: t('title'),
        description: t('description')
    };
};

export default async function ReadPage({ params }: LocaleParams) {
    unstable_setRequestLocale(params.locale);
    const t = await getTranslations('read.content');
    const messages = await getMessages();

    return (
        <div className="flex flex-col items-stretch gap-4 justify-center">
            <h4 className="text-center">{t('title')}</h4>
            <div className="flex flex-col gap-8">
                <div className="max-w-[240px] sm:max-w-[320px] mx-auto">
                    <PrintingAnimation className="opacity-95" />
                </div>
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <div>{t('description-1')}</div>
                        <div>{t('description-2')}</div>
                    </div>
                    <NextIntlClientProvider messages={pick(messages, ['form'])}>
                        <SubscriptionForm />
                    </NextIntlClientProvider>
                </div>
            </div>
        </div>
    );
}
