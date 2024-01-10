import type { Worksheet } from '@kanji-sh/models';
import Link from 'next/link';
import React from 'react';
import type { FileCardData } from '../../metadata';
import { FiDownload, FiEye } from 'react-icons/fi';

interface Props {
    worksheet: Worksheet;
    cardData: FileCardData;
}

export const FileCard = (props: Props) => {
    const { worksheet, cardData } = props;

    return (
        <div className="max-w-[480px] sm:h-full m-auto flex flex-col p-4 gap-4">
            {/* CardMedia */}
            <div
                className="h-40 rounded-md pressed shadow-inner paper mix-blend-multiply"
                style={{ backgroundColor: cardData.metaColor }}>
                <h2 className="text-center font-bold leading-[10rem] text-white select-none">
                    {cardData.title}
                </h2>
            </div>

            {/* CardContent */}
            <div className="flex flex-col flex-grow gap-4">
                <div className="flex-grow text-center">{cardData.description}</div>

                <Link
                    href={`/write/${cardData.collectionKey}/${cardData.key}`}
                    className="btn w-full mt-1">
                    <FiEye />
                    Preview
                </Link>

                <a
                    href={`/api/files/${worksheet.hash}?download`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn w-full mt-1"
                    download>
                    <FiDownload />
                    Download
                </a>
            </div>
        </div>
    );
};