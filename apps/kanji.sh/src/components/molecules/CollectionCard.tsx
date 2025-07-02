import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type CollectionCardProps = {
    collectionKey: string;
};

export const CollectionCard = (props: CollectionCardProps) => {
    const { collectionKey: key } = props;
    const t = useTranslations(`collections.${key}`);
    return (
        <Link
            href={`/write/${key}`}
            className="group max-w-[320px] rounded-xl border border-gray-200 p-4 shadow-sm transition-all hover:shadow-md active:shadow-none sm:p-6">
            <div className="mx-auto flex flex-col gap-4">
                {/* CardMedia */}
                <div
                    className={clsx(
                        'relative h-40 w-auto rounded-lg mix-blend-multiply',
                        `bg-${key}`
                    )}>
                    <Image
                        className="h-full w-full rounded-lg object-cover"
                        fill={true}
                        src={`/assets/png/${key}.png`}
                        alt={t('title')}
                    />
                </div>
                {/* Card Content */}
                <div className="opacity-90 transition-all group-hover:opacity-100">
                    <div className="text-center font-serif text-xl uppercase select-none">
                        {t('title')}
                    </div>
                    <div className="mt-4">{t('description')}</div>
                </div>
            </div>
        </Link>
    );
};
