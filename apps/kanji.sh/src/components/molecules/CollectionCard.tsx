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
            className="p-4 sm:p-6 max-w-[320px] border rounded-xl shadow hover:elevated active:shadow-none transition-all group">
            <div className="flex flex-col max-w-screen-sm mx-auto gap-4">
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
                <div className="opacity-80 group-hover:opacity-95 transition-all">
                    <h5 className="text-center font-serif text-xl font-regular group-hover:font-medium select-none">
                        {title}
                    </h5>
                    <div className="mt-4">{description}</div>
                </div>
            </div>
        </Link>
    );
};
