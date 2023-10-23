import React, { useRef } from 'react';
import { Document, Page } from 'react-pdf';

type PDFViewProps = {
    fileUrl: string;
    pageCount: number;
}

const PagePlaceholder = () => {
    return <div className='w-full aspect-A4 bg-white rounded-md'>
        <div className='animate-pulse w-full h-full grid place-items-center'>
            <div className='w-5/6 flex flex-col items-stretch gap-4'>
                <div className='h-12 bg-slate-50 rounded' />
                <div className='h-12 bg-slate-50 rounded' />
                <div className='h-12 bg-slate-50 rounded' />
                <div className='h-12 bg-slate-50 rounded' />
            </div>
        </div>
    </div>;
};

export const PDFView = (props: PDFViewProps) => {
    let { fileUrl, pageCount: totalPageCount } = props;
    const [pageCount, setPageCount] = React.useState(totalPageCount);
    const [pageNumber, setPageNumber] = React.useState(1);
    const pdfDocument = useRef<HTMLDivElement>(null);
    const pdfPage = useRef<HTMLDivElement>(null);

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    return (
        <figure className='min-h-full'>
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
                onLoadProgress={(data) => {
                    const progress = data.loaded / data.total;
                    console.log(`${data.loaded}/${data.total} = ${progress}`);
                }}
                onLoadSuccess={(pdf) => {
                    setPageCount(pdf.numPages);
                }}>
                <Page
                    key={pageNumber}
                    className='drop-shadow-md transition-all'
                    pageNumber={pageNumber}
                    inputRef={pdfPage}
                    loading={<PagePlaceholder />}
                />
            </Document>
            <div className="mt-6 text-center text-xs">PAGES</div>
            <nav className='mt-2 grid grid-cols-3 items-center justify-evenly'>
                <button disabled={pageNumber <= 1} onClick={() => changePage(-1)}>Previous</button>
                <p className='text-center'>{pageNumber} / {pageCount}</p>
                <button disabled={pageNumber >= pageCount} onClick={() => changePage(1)}>Next</button>
            </nav>
        </figure>
    );
};
