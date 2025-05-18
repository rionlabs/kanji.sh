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
            className="p-4 sm:p-6 max-w-[320px] border rounded-xl shadow hover:shadow-md active:shadow-none transition-all group">
            <div className="flex flex-col mx-auto gap-4">
                {/* CardMedia */}
                <div
                    className={clsx(
                        'relative h-40 w-auto rounded-lg mix-blend-multiply',
                        `bg-${key}`
                    )}>
                    <Image
                        className="rounded-lg object-cover h-full w-full"
                        fill={true}
                        src={`/assets/png/${key}.png`}
                        alt={t('title')}
                    />
                </div>
                {/* Card Content */}
                <div className="opacity-90 group-hover:opacity-100 transition-all">
                    <div className="text-center uppercase font-serif text-xl select-none">
                        {t('title')}
                    </div>
                    <div className="mt-4">{t('description')}</div>
                </div>
            </div>
        </Link>
    );
};
