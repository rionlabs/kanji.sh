import type { CollectionCardData } from 'app/metadata';
import React from 'react';

type CollectionCardProps = Pick<CollectionCardData, 'title' | 'description' | 'metaColor' | 'backgroundImageUrl'>;

const CollectionCard: (props: CollectionCardProps) => JSX.Element = (props) => {
    const { title, description, metaColor, backgroundImageUrl } = props;
    return (
        <div className='flex-grow flex flex-col cursor-pointer max-w-screen-sm h-full mx-auto p-6 gap-6'>
            {/* CardMedia */}
            <div
                className='relative h-40 w-auto rounded-lg p-4　pressed shadow-inner'
                style={{ backgroundColor: metaColor }}>
                <img className='rounded-lg' src={backgroundImageUrl} alt={title} />
            </div>

            {/* Card Content */}
            <div className=''>
                <h5 className='text-center font-serif text-xl font-regular select-none'>{title}</h5>
                <div className='mt-4'>{description}</div>
            </div>
        </div>
    );
};

export default CollectionCard;
