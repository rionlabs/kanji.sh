import React, { useState } from 'react';
import type { FileData } from 'app/metadata';

interface Props {
    fileData: FileData;
}

const FileCard: (props: Props) => JSX.Element = (props: Props) => {
    const { fileData } = props;
    const [open, setOpen] = useState(false);

    const _downloadFile: (fileData: FileData) => void = (fileData: FileData) => {
        // FixMe: logEvent('file_download', { file: fileData.title });
    };

    const _previewFile: (fileData: FileData) => void = (fileData: FileData) => {
        // FixMe: logEvent('file_preview', { file: fileData.title });
        setOpen(true);
    };

    return (
        <div className="max-w-[320px] sm:h-full m-auto flex flex-col p-4 gap-4">
            {/* CardMedia */}
            <div className="h-40 rounded-md pressed shadow-inner paper mix-blend-multiply" style={{ backgroundColor: fileData.metaColor }}>
                <h2 className="text-center font-bold leading-[10rem] text-white select-none">
                    {fileData.title}
                </h2>
            </div>

            {/* CardContent */}
            <div className="flex flex-col gap-4">
                <div className="text-center">{fileData.description}</div>

                {/*<FilePreview
                    id={fileData.filePath}
                    fileData={fileData}
                    open={open}
                    onClose={() => setOpen(false)}>
                    <button
                        className="self-center w-full mt-2"
                        color="primary"
                        onClick={() => _previewFile(fileData)}>
                        Preview
                    </button>
                </FilePreview>*/}

                <button
                    className="button w-full mt-1"
                    color="primary"
                    onClick={() => _downloadFile(fileData)}>
                    Preview
                </button>

                <button
                    className="button w-full mt-1"
                    color="primary"
                    onClick={() => _downloadFile(fileData)}>
                    Download
                </button>
            </div>
        </div>
    );
};

export default FileCard;
