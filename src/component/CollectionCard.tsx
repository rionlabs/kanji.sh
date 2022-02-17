import React from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import Image from 'next/image';

interface Props extends WithRouterProps {
    collectionKey: string;
    title: string;
    description: string;
    metaColor: string;
    backgroundImageUrl: string | undefined;
}

const CollectionCard: (props: Props) => JSX.Element = (props: Props) => {
    const { title, description, metaColor, backgroundImageUrl } = props;
    return (
        <div className="flex-grow flex flex-col cursor-pointer max-w-screen-sm h-full mx-auto p-6 gap-6">
            {/* CardMedia */}
            <div
                className="relative h-40 w-auto rounded-lg p-4　pressed shadow-inner"
                style={{ backgroundColor: metaColor }}>
                <Image className="rounded-lg" layout="fill" src={backgroundImageUrl} />
            </div>

            {/* Card Content */}
            <div className="">
                <h5 className="text-center font-serif text-xl font-regular select-none">{title}</h5>
                <div className="mt-4">{description}</div>
            </div>
        </div>
    );
};

export default CollectionCard;
