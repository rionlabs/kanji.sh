import { CollectionType } from '@kanji-sh/models';
import ClientOnly from 'apps/kanji.sh/src/components/atoms/ClientOnly';
import { LocaleParams } from 'apps/kanji.sh/src/types/LocaleParams';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';
import { WritingAnimation } from '../../../src/components/atoms/AnimatedImage';
import { CollectionCard } from '../../../src/components/molecules/CollectionCard';

export const generateMetadata = async () => {
    const t = await getTranslations('write');
    return {
        title: t('title'),
        description: t('description')
    };
};

export default async function WritePage({ params }: LocaleParams) {
    const locale = (await params).locale;
    setRequestLocale(locale);
    const t = await getTranslations('write.content');
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row justify-center gap-2">
                {/* Text Content */}
                <div className="w-full sm:w-1/2">
                    <div className="space-y-4 justify-center">
                        <h4>{t('title')}</h4>
                        <div>{t('description-1')}</div>
                        <div>{t('description-2')}</div>
                    </div>
                </div>
                {/* Jumbo Image */}
                <div className="w-full sm:w-1/2 py-4">
                    <div className="text-center">
                        <ClientOnly>
                            <WritingAnimation className="w-5/6 h-auto m-auto" />
                        </ClientOnly>
                    </div>
                </div>
            </div>
            {/* Collections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12">
                {Object.values(CollectionType).map((key) => (
                    <CollectionCard key={key} collectionKey={key} />
                ))}
            </div>
        </div>
    );
}
