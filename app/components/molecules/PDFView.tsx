import React, { useRef } from 'react';
import { Document, Page } from 'react-pdf';

type PDFViewProps = {
    fileUrl: string;
}

export const PDFView = (props: PDFViewProps) => {
    let { fileUrl } = props;
    const pdfDocument = useRef<HTMLDivElement>(null);
    const pdfPage = useRef<HTMLDivElement>(null);
    return (
        <Document
            inputRef={pdfDocument}
            className='{pdfCanvas}'
            externalLinkTarget={'_blank'}
            file={fileUrl}
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
            onLoadSuccess={(pdf) => {
                console.log(`Loaded PDF`);
            }}>
            <Page
                className=''
                pageNumber={1}
                inputRef={pdfPage}
            />
        </Document>
    );
};
