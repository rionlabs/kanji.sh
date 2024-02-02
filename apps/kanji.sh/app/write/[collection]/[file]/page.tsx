import { CollectionType } from '@kanji-sh/models';
import { appOperations } from '@kanji-sh/printer';
import { FiDownload } from 'react-icons/fi';
import { PDFView } from '../../../../src/components/molecules/PDFView';
import React from 'react';
import { notFound } from 'next/navigation';

async function getWorksheet(collection: string, file: string) {
    try {
        const appOps = appOperations();
        const hash = await appOps.getWorksheetHash(collection as CollectionType, file);
        const worksheet = await appOps.getWorksheetMeta(hash);
        return { worksheet };
    } catch (error) {
        console.error(error);
        return { worksheet: null };
    }
}

type PageProps = {
    params: {
        collection: string;
        file: string;
    };
};

export default async function CollectionFilePage(props: PageProps) {
    const { collection, file } = props.params;
    const { worksheet } = await getWorksheet(collection, file);
    if (!worksheet) {
        return notFound();
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
                <h4>{worksheet.name}</h4>
                <div className="mb-4">
                    {worksheet.pageCount} Pages on {worksheet.config.pageType} layout.
                </div>
                <div className="my-12">
                    <a
                        href={`/api/files/${worksheet.hash}?download`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-wide btn-primary mt-1">
                        <FiDownload />
                        Download
                    </a>
                </div>
                <h6 className="mb-4">Included Kanji</h6>
                <div className="flex flex-row flex-wrap gap-1 text-lg leading-none">
                    {worksheet.kanji.map((kanji) => (
                        <div key={kanji} className="p-2.5 bg-base-200/10 rounded border">
                            {kanji}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full sm:w-1/2">
                <h6 className="text-center mb-4">PDF Preview</h6>
                <div className="max-w-[420px] mx-auto">
                    <PDFView
                        pageCount={worksheet.pageCount}
                        fileUrl={`/api/files/${worksheet.hash}`}
                    />
                </div>
            </div>
        </div>
    );
}
