import Image from 'next/image';
import Link from 'next/link';
import type { CollectionCardData } from '../..//metadata';
import React from 'react';

type CollectionCardProps = Pick<
    CollectionCardData,
    'title' | 'description' | 'metaColor' | 'backgroundImageUrl'
> & { href: string };

export const CollectionCard = (props: CollectionCardProps) => {
    const { href, title, description, metaColor, backgroundImageUrl } = props;
    return (
        <Link
            href={href}
            className="p-4 sm:p-6 max-w-[320px] border rounded-xl shadow hover:shadow-md active:shadow-none transition-all group">
            <div className="flex flex-col mx-auto gap-4">
                {/* CardMedia */}
                <div
                    className="relative h-40 w-auto rounded-lg mix-blend-multiply"
                    style={{ backgroundColor: metaColor }}>
                    <Image
                        className="rounded-lg object-cover h-full w-full"
                        fill={true}
                        layout={'fill'}
                        color={metaColor}
                        src={backgroundImageUrl}
                        alt={title}
                    />
                </div>
                {/* Card Content */}
                <div className="opacity-90 group-hover:opacity-100 transition-all">
                    <div className="text-center font-serif text-xl select-none">{title}</div>
                    <div className="mt-4">{description}</div>
                </div>
            </div>
        </Link>
    );
};
