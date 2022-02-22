import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { FileData } from '../Metadata';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = {
    closeButton: {
        position: 'absolute',
        right: 'theme.spacing(1)',
        top: 'theme.spacing(1)',
        color: 'theme.palette.grey[500]'
    },
    dialogPaper: {
        height: '100vh',
        ["theme.breakpoints.down('xs')"]: {
            margin: 0
        }
    },
    pdfCanvas: {
        width: '100%',
        height: '100%',
        '& > .react-pdf__message': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center'
        }
    },
    pdfPage: {
        '& > canvas': {
            margin: 'auto'
        }
    }
};

export interface DialogTitleProps {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
    return (
        <div className="m-0 p-2" {...other}>
            <h6>{children}</h6>
            {onClose ? (
                <button aria-label="close" className="closeButton" onClick={onClose}>
                    close
                </button>
            ) : null}
        </div>
    );
};

const DialogContent = (props: PropsWithChildren<any>) => {
    return <div className="flex-1 flx-col p-2">{props.children}</div>;
};

const DialogActions = (props: PropsWithChildren<any>) => {
    return <div className="m-0 p-1">{props.children}</div>;
};

export interface FilePreviewProps {
    id: string;
    children: React.ReactNode;
    fileData: FileData;
    open: boolean;
    onClose: () => void;
}

const FilePreview: (props: FilePreviewProps) => JSX.Element = (props) => {
    const { id, fileData, children, onClose } = props;
    const [numPages, setNumPages] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageHeight, setPageHeight] = React.useState(0);
    const [loadDialog, setLoadDialog] = React.useState(false);

    const pdfDocument = useRef<HTMLDivElement>(null);
    const pdfPage = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoadDialog(true);
    }, []);

    useEffect(() => {
        if (pdfDocument.current) {
            setPageHeight(pdfDocument.current.clientHeight);
        }
        // Ignore this warning, else PDF document size doesn't fit in Dialog
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfDocument.current, pdfPage.current]);

    const handleClose: () => void = () => {
        onClose();
    };

    const loadPageNumbers: ({ numPages }: { numPages: number }) => void = ({ numPages }) => {
        setNumPages(numPages);
    };

    const previewDialog: () => JSX.Element = () => {
        return (
            <div
                id={id}
                className="paper:classes.dialogPaper max-w-screen-sm"
                aria-labelledby="pdf-preview-dialog-title">
                <DialogTitle id="pdf-preview-dialog-title" onClose={handleClose}>
                    {fileData.title}
                </DialogTitle>
                <DialogContent>
                    <Document
                        inputRef={pdfDocument}
                        className="{pdfCanvas}"
                        externalLinkTarget={'_blank'}
                        file={`/api/download?path=${fileData.filePath}&name=${fileData.title}`}
                        loading={
                            <div>
                                <progress />
                            </div>
                        }
                        noData={
                            <div>
                                <progress />
                            </div>
                        }
                        onLoadSuccess={(pdf) => loadPageNumbers(pdf)}>
                        <Page
                            className="{pdfPage}"
                            height={pageHeight}
                            pageNumber={pageNumber}
                            inputRef={pdfPage}
                        />
                    </Document>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        color="primary"
                        disabled={!numPages || pageNumber <= 1}>
                        Previous
                    </button>
                    <p />

                    <div hidden={!numPages}>
                        <div className="hidden sm:visible">
                            <p>
                                Page {pageNumber} of {numPages}
                            </p>
                        </div>
                        <div className="hidden sm:visible">
                            <p>
                                {pageNumber}/{numPages}
                            </p>
                        </div>
                    </div>
                    <p />
                    <button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        color="primary"
                        disabled={!numPages || pageNumber >= numPages}>
                        Next
                    </button>
                </DialogActions>
            </div>
        );
    };

    return (
        <div>
            {children}
            <>{loadDialog ? previewDialog() : <div />}</>
        </div>
    );
};

export default FilePreview;
