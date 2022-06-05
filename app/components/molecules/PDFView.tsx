import React, { useRef } from 'react';
import { Document, Page } from 'react-pdf';

type PDFViewProps = {
    fileUrl: string;
    pageCount: number;
}

const PagePlaceholder = () => {
    return <div className='w-full aspect-A4 bg-white rounded-md'></div>;
};

export const PDFView = (props: PDFViewProps) => {
    let { fileUrl, pageCount: totalPageCount } = props;
    const [pageCount, setPageCount] = React.useState(totalPageCount);
    const [pageNumber, setPageNumber] = React.useState(1);
    const pdfDocument = useRef<HTMLDivElement>(null);
    const pdfPage = useRef<HTMLDivElement>(null);
    return (
        <figure>
            <Document
                className=''
                inputRef={pdfDocument}
                externalLinkTarget={'_blank'}
                file={fileUrl}
                loading={
                    <PagePlaceholder />
                }
                noData={
                    <PagePlaceholder />
                }
                onLoadSuccess={(pdf) => {
                    setPageCount(pdf.numPages);
                    console.log(`Loaded PDF`);
                }}>
                <Page
                    className='drop-shadow-md'
                    pageNumber={pageNumber}
                    inputRef={pdfPage}
                />
            </Document>
            <nav className='mt-2'>
                <button onClick={() => setPageNumber(pageNumber + 1)}>Previous</button>
                <p>
                    Page {pageNumber} of {pageCount}
                </p>
                <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
            </nav>
        </figure>
    );
};
