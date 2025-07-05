'use client';

import React, { useRef } from 'react';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PDFViewProps = {
    fileUrl: string;
    pageCount: number;
};

const PagePlaceholder = () => {
    return (
        <div className="aspect-a4 w-full rounded-md bg-white">
            <div className="grid h-full w-full animate-pulse place-items-center">
                <div className="flex w-5/6 flex-col items-stretch gap-4">
                    <div className="h-12 rounded bg-slate-50" />
                    <div className="h-12 rounded bg-slate-50" />
                    <div className="h-12 rounded bg-slate-50" />
                    <div className="h-12 rounded bg-slate-50" />
                </div>
            </div>
        </div>
    );
};

const PageError = () => {
    return (
        <div className="aspect-a4 w-full rounded-md bg-white">
            <div className="grid h-full w-full place-items-center">
                <div className="flex w-5/6 flex-col items-stretch gap-4 text-center">
                    <div className="text-red-700">Failed to load PDF file</div>
                    <div className="text-red-700">o(〒﹏〒)o</div>
                </div>
            </div>
        </div>
    );
};

export const PDFView = (props: PDFViewProps) => {
    const { fileUrl, pageCount: totalPageCount } = props;
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
            <div className="text-base-content/90 pt-5 pb-4 text-center">PAGES</div>

            <nav className="grid w-full grid-cols-3 items-stretch rounded-l-full rounded-r-full p-0">
                <button
                    className="btn btn-neutral rounded-r-none px-8 py-4"
                    disabled={pageNumber <= 1 || !pdfLoaded}
                    onClick={() => changePage(-1)}>
                    <FiChevronLeft className="h-5 w-5" /> Prev
                </button>
                <div className="bg-neutral text-neutral-content text-center font-serif text-xl leading-12 font-bold select-none">
                    {pageNumber} <span className="opacity-50">/</span> {pageCount}
                </div>
                <button
                    className="btn btn-neutral rounded-l-none px-8 py-4"
                    disabled={pageNumber >= pageCount || !pdfLoaded}
                    onClick={() => changePage(1)}>
                    Next
                    <FiChevronRight className="h-5 w-5" />
                </button>
            </nav>
        </div>
    );
};
