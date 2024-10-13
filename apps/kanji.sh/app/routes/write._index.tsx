import { LoaderFunction, MetaFunction } from '@remix-run/node';
import { CollectionCard , WritingAnimation } from '@kanji-sh/app/components';
import { CollectionType } from '@kanji-sh/models';
import { useTranslation } from 'react-i18next';

export const meta: MetaFunction = () => {
    // return {
    //     title: t('title'),
    //     description: t('description')
    // };
    return [];
};

export const loader: LoaderFunction = async () => {
    return null;
}

export default function WriteRoute() {
    const {t} = useTranslation('write', { keyPrefix: 'content' });
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
                        <WritingAnimation className="w-5/6 h-auto m-auto" />
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
