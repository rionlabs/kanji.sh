import { LoaderFunction } from '@remix-run/node';
import { PrintingAnimation , SubscriptionForm } from '@kanji-sh/app/components';
import { useTranslation } from 'react-i18next';

export const loader: LoaderFunction = async () => {
    return null;
}

export default function ReadRoute() {
    const {t} = useTranslation('read', { keyPrefix: 'content' });
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
                    <SubscriptionForm />
                </div>
            </div>
        </div>
    );
}
