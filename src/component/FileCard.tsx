import React, { useState } from 'react';
import { FileData } from '../Metadata';
import { logEvent } from '../firebase';
import FilePreview from './FilePreview';

interface Props {
    fileData: FileData;
}

const FileCard: (props: Props) => JSX.Element = (props: Props) => {
    const { fileData } = props;
    const [open, setOpen] = useState(false);

    const _downloadFile: (fileData: FileData) => void = (fileData: FileData) => {
        logEvent('file_download', { file: fileData.title });
    };

    const _previewFile: (fileData: FileData) => void = (fileData: FileData) => {
        logEvent('file_preview', { file: fileData.title });
        setOpen(true);
    };

    return (
        <div className="flex-grow h-full m-auto shadow-none hover:shadow-md">
            {/* CardMedia */}
            <div
                className="h-20 clip-[polygon(0 0, 100% 0%, 100% 90%, 0% 100%)]"
                style={{ backgroundColor: fileData.metaColor }}>
                <h2 className="font-bold leading-8 text-white select-none">{fileData.title}</h2>
            </div>

            {/* CardContent */}
            <div>
                <div>{fileData.description}</div>

                <FilePreview
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
                </FilePreview>

                <button
                    className="self-center w-full mt-1"
                    color="primary"
                    onClick={() => _downloadFile(fileData)}>
                    Download
                </button>
            </div>
        </div>
    );
};

export default FileCard;
