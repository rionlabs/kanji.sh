import React from 'react';
import { withRouter } from 'next/router';
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

    const _onClick: () => Promise<void> = async () => {
        await props.router.push(`write/collection/${props.collectionKey}`);
        window.scrollTo(0, 0);
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
        <div
            className="flex-grow cursor-pointer max-w-screen-sm h-full mx-auto shadow hover:shadow-md"
            role={'button'}
            onClick={_onClick}>
            {/* CardMedia */}
            <div className="relative h-40">
                <Image
                    className={` clip-[polygon(0 0, 100% 0%, 100% 90%, 0% 100%)] bg-[${metaColor}]`}
                    layout="fill"
                    src={backgroundImageUrl}
                />
            </div>

            {/* Card Content */}
            <div>
                <h5 className="text-center font-regular select-none">{title}</h5>
                <div className="text-center">{description}</div>
            </div>
        </div>
    );
};

export default withRouter(CollectionCard);
