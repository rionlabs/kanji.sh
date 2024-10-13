import { Link } from '@remix-run/react';
import clsx from 'clsx';
import React from 'react';

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

export const ServiceCard: React.FC<Props> = (props: Props) => {
    const { title, subtitle, buttonText, buttonLink, imageUrl, imageDirection } = props;
    return (
        <div className="grow min-h-80">
            <div
                className={clsx('container flex flex-col items-stretch gap-8', {
                    'sm:flex-row': imageDirection === 'start',
                    'sm:flex-row-reverse': imageDirection === 'end'
                })}>
                {/* Image */}
                <div className="flex flex-row items-center align-middle">
                    <img
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
                        <h3 className="font-semibold text-base-content/80 select-none lowercase">
                            {title}
                        </h3>
                        <div>{subtitle}</div>
                        <Link to={buttonLink} className="btn btn-primary">
                            {buttonText}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
