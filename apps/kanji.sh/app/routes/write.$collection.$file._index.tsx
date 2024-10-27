import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { FiDownload } from 'react-icons/fi';

import { PDFView } from '@kanji-sh/app/components';
import { CollectionType, Worksheet } from '@kanji-sh/models';

import { appOperations } from '../printer.server';

type LoaderData = {
    worksheet: Worksheet
}

export const loader: LoaderFunction = async ({ params }) => {
    const { collection, file } = params;
    if (!collection || !file) {
        throw new Error('Invalid collection or file');
    }
    try {
        const appOps = appOperations();
        const hash = await appOps.getWorksheetHash(collection as CollectionType, file);
        const worksheet = await appOps.getWorksheetMeta(hash);
        return json<LoaderData>( { worksheet });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default function WriteCollectionFileRoute() {
    const { worksheet } = useLoaderData<LoaderData>();
    return (
        <div className="flex flex-col sm:flex-row gap-8">
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
