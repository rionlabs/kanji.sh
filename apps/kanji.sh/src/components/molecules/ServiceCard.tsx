import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface Props {
    title: string;
    subtitle: string;
    imageUrl: string;
    imageDirection: Direction;
}

export enum Direction {
    start = 'start',
    end = 'end'
}

const ServiceCard: React.FC<Props> = (props: Props) => {
    const { title, subtitle, imageUrl, imageDirection } = props;
    return (
        <div className="flex-grow min-h-80 rounded-lg sm:rounded-2xl">
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
                    <div className="py-4 space-y-8">
                        <h3 className="font-bold select-none lowercase">{title}</h3>
                        <div className="">{subtitle}</div>
                        <button className="btn">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
