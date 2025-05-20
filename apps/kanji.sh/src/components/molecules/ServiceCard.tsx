import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    title: string;
    subtitle: string;
    imageUrl: string;
    buttonText: string;
    buttonLink: string;
    imageDirection: Direction;
}

export enum Direction {
    start = 'start',
    end = 'end'
}

const ServiceCard: React.FC<Props> = (props: Props) => {
    const { title, subtitle, buttonText, buttonLink, imageUrl, imageDirection } = props;
    return (
        <div className="min-h-80 grow">
            <div
                className={clsx('container flex flex-col items-stretch gap-8', {
                    'sm:flex-row': imageDirection === 'start',
                    'sm:flex-row-reverse': imageDirection === 'end'
                })}>
                {/* Image */}
                <div className="flex flex-row items-center align-middle">
                    <Image
                        width={1024}
                        height={800}
                        style={{ width: '80%', height: '100%', margin: 'auto' }}
                        src={imageUrl}
                        alt={'Study Kanji!'}
                    />
                </div>
                {/* Text */}
                <div
                    className={clsx({
                        'text-start': imageDirection === 'end',
                        'text-end': imageDirection === 'start'
                    })}
                    style={{ minHeight: 'inherit' }}>
                    <div className="space-y-8 py-4">
                        <h3 className="text-base-content/80 font-semibold lowercase select-none">
                            {title}
                        </h3>
                        <div>{subtitle}</div>
                        <Link href={buttonLink} className="btn btn-primary">
                            {buttonText}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
