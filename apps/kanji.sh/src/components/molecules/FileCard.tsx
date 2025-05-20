import React from 'react';

import Link from 'next/link';
import { FiDownload, FiEye } from 'react-icons/fi';

import type { Worksheet } from '@kanji-sh/models';

import type { FileCardData } from '../../metadata';

interface Props {
    worksheet: Worksheet;
    cardData: FileCardData;
}

export const FileCard = (props: Props) => {
    const { worksheet, cardData } = props;
    return (
        <div className="m-auto flex max-w-[320px] flex-col gap-5 p-5 sm:h-full">
            {/* CardMedia */}
            <div
                className="pressed paper h-40 rounded-md bg-blend-multiply shadow-inner"
                style={{ backgroundColor: cardData.metaColor }}>
                <div className="text-center font-serif text-5xl leading-40 font-bold text-white select-none">
                    {cardData.title}
                </div>
            </div>
            {/* CardContent */}
            <div className="flex flex-col items-center gap-5">
                <div className="grow text-center">{cardData.description}</div>
                <Link
                    href={`/write/${cardData.collectionKey}/${cardData.key}`}
                    className={`btn btn-wide btn-neutral`}>
                    <FiEye />
                    Preview
                </Link>
                <a
                    href={`/api/files/${worksheet.hash}?download`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-wide btn-primary">
                    <FiDownload />
                    Download
                </a>
            </div>
        </div>
    );
};
