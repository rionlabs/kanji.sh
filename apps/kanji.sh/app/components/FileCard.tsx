import type { Worksheet } from '@kanji-sh/models';
import { Link } from '@remix-run/react';
import type { FileCardData } from '../config/metadata';
import { FiDownload, FiEye } from 'react-icons/fi';

interface Props {
    worksheet: Worksheet;
    cardData: FileCardData;
}

export const FileCard = (props: Props) => {
    const { worksheet, cardData } = props;
    return (
        <div className="max-w-[320px] sm:h-full m-auto flex flex-col p-5 gap-5">
            {/* CardMedia */}
            <div
                className="h-40 rounded-md pressed shadow-inner paper bg-blend-multiply"
                style={{ backgroundColor: cardData.metaColor }}>
                <div className="text-center text-5xl font-serif font-bold leading-[10rem] text-white select-none">
                    {cardData.title}
                </div>
            </div>
            {/* CardContent */}
            <div className="flex flex-col items-center gap-5">
                <div className="grow text-center">{cardData.description}</div>
                <Link
                    to={`/write/${cardData.collectionKey}/${cardData.key}`}
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
