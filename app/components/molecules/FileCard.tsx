import type { Worksheet } from '@common/models';
import { Link } from '@remix-run/react';
import React from 'react';
import type { FileCardData } from 'app/metadata';

interface Props {
    worksheet: Worksheet;
    cardData: FileCardData;
}

const FileCard: (props: Props) => JSX.Element = (props: Props) => {
    const { worksheet, cardData } = props;

    return (
        <div className='max-w-[320px] sm:h-full m-auto flex flex-col p-4 gap-4'>
            {/* CardMedia */}
            <div className='h-40 rounded-md pressed shadow-inner paper mix-blend-multiply'
                 style={{ backgroundColor: cardData.metaColor }}>
                <h2 className='text-center font-bold leading-[10rem] text-white select-none'>
                    {cardData.title}
                </h2>
            </div>

            {/* CardContent */}
            <div className='flex flex-col flex-grow gap-4'>
                <div className='flex-grow text-center'>{cardData.description}</div>

                <Link
                    to={cardData.key}
                    className='button w-full mt-1'
                    prefetch='intent'>
                    Preview
                </Link>

                <a
                    href={`/write/files/${worksheet.hash}?download`}
                    target='_blank'
                    rel='noreferrer'
                    className='button w-full mt-1'
                    download>
                    Download
                </a>
            </div>
        </div>
    );
};

export default FileCard;
