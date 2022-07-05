import type { CollectionCardData } from 'app/metadata';
import React from 'react';

type CollectionCardProps = Pick<CollectionCardData, 'title' | 'description' | 'metaColor' | 'backgroundImageUrl'>;

const CollectionCard: (props: CollectionCardProps) => JSX.Element = (props) => {
    const { title, description, metaColor, backgroundImageUrl } = props;
    return (
        <div className='flex flex-col max-w-screen-sm mx-auto gap-4'>
            {/* CardMedia */}
            <div
                className='h-40 w-auto rounded-lg shadow-inner paper mix-blend-multiply'
                style={{ backgroundColor: metaColor }}>
                <img className='rounded-lg object-cover h-full w-full' src={backgroundImageUrl} alt={title} />
            </div>

            {/* Card Content */}
            <div className='opacity-80 group-hover:opacity-95 transition-all'>
                <h5 className='text-center font-serif text-xl font-regular group-hover:font-medium select-none'>{title}</h5>
                <div className='mt-4'>{description}</div>
            </div>
        </div>
    );
};

export default CollectionCard;
