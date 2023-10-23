import React from 'react';

interface Props {
    title: string;
    subtitle: string;
    imageUrl: string;
    imageDirection: Direction;
}

export enum Direction {
    start = 'start',
    end = 'end',
}

const ServiceCard: React.FC<Props> = (props: Props) => {
    const { title, subtitle, imageUrl, imageDirection } = props;
    return (
        <div className="flex-grow min-h-80 p-8">
            <div className="container flex flex-col sm:flex-row items-stretch imageDirection">
                {/* Image */}
                <div className="flex flex-row items-center align-middle">
                    <img
                        style={{ width: '80%', height: '100%', margin: 'auto' }}
                        src={imageUrl}
                        alt={'Study Kanji!'}
                    />
                </div>

                {/* Text */}
                <div className="imageDirection" style={{ minHeight: 'inherit' }}>
                    <div className="py-4 space-y-4">
                        <h3 className="font-bold select-none lowercase">{title}</h3>
                        <div className="">{subtitle}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
