'use client';

import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PDFViewProps = {
    fileUrl: string;
    pageCount: number;
};

const PagePlaceholder = () => {
    return (
        <div className="w-full aspect-A4 bg-white rounded-md">
            <div className="animate-pulse w-full h-full grid place-items-center">
                <div className="w-5/6 flex flex-col items-stretch gap-4">
                    <div className="h-12 bg-slate-50 rounded" />
                    <div className="h-12 bg-slate-50 rounded" />
                    <div className="h-12 bg-slate-50 rounded" />
                    <div className="h-12 bg-slate-50 rounded" />
                </div>
            </div>
        </div>
    );
};

const PageError = () => {
    return (
        <div className="w-full aspect-A4 bg-white rounded-md">
            <div className="w-full h-full grid place-items-center">
                <div className="w-5/6 flex flex-col items-stretch gap-4 text-center">
                    <div className="text-red-700">Failed to load PDF file</div>
                    <div className="text-red-700">o(〒﹏〒)o</div>
                </div>
            </div>
        </div>
    );
};

export const PDFView = (props: PDFViewProps) => {
    let { fileUrl, pageCount: totalPageCount } = props;
    const [pageCount, setPageCount] = React.useState(totalPageCount);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pdfLoaded, setPdfLoaded] = React.useState(false);
    const pdfDocument = useRef<HTMLDivElement>(null);
    const pdfPage = useRef<HTMLDivElement>(null);

    function changePage(offset: number) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }

    return (
        <div className="min-h-full">
            <Document
                inputRef={pdfDocument}
                externalLinkTarget={'_blank'}
                file={fileUrl}
                loading={<PagePlaceholder />}
                noData={<PagePlaceholder />}
                error={<PageError />}
                onLoadProgress={(data) => {
                    const progress = data.loaded / data.total;
                    console.log(`${data.loaded}/${data.total} = ${progress}`);
                }}
                onLoadSuccess={(pdf) => {
                    setPdfLoaded(true);
                    setPageCount(pdf.numPages);
                }}
                onLoadError={(error) => {
                    console.error(error);
                    setPdfLoaded(false);
                }}>
                <Page
                    key={pageNumber}
                    className="drop-shadow-md transition-all"
                    pageNumber={pageNumber}
                    inputRef={pdfPage}
                    loading={<PagePlaceholder />}
                />
            </Document>
            <div className="py-4 text-center text-xs text-base-content/90">PAGES</div>

            <nav className="join w-full grid grid-cols-3 items-center justify- border rounded-l-full rounded-r-full btn p-0">
                <button
                    className="join-item flex flex-col items-start px-8 py-4"
                    disabled={pageNumber <= 1 || !pdfLoaded}
                    onClick={() => changePage(-1)}>
                    {!(pageNumber <= 1 || !pdfLoaded) && <FiChevronLeft className="w-5 h-5" />}
                </button>
                <div className="join-item text-center cursor-auto">
                    {pageNumber} <span className="opacity-50">/</span> {pageCount}
                </div>
                <button
                    className="join-item flex flex-col items-end px-8 py-4"
                    disabled={pageNumber >= pageCount || !pdfLoaded}
                    onClick={() => changePage(1)}>
                    {!(pageNumber >= pageCount || !pdfLoaded) && (
                        <FiChevronRight className="w-5 h-5" />
                    )}
                </button>
            </nav>
        </div>
    );
};
