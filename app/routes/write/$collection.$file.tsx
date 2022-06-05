import type { CollectionType, Worksheet } from '@common/models';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PDFView } from 'app/components/molecules/PDFView';
import { getWorksheet } from 'app/routes/write/index.server';
import invariant from 'tiny-invariant';

type LoaderData = {
    worksheet: Worksheet
}

export const loader: LoaderFunction = async ({ params }) => {
    const { collection, file } = params;
    invariant(typeof collection === 'string', 'Collection must be string');
    invariant(typeof file === 'string', 'Collection must be string');
    const worksheet = await getWorksheet(collection as CollectionType, file);
    return json<LoaderData>({ worksheet });
};

export default function CollectionFileRoute() {
    const { worksheet } = useLoaderData<LoaderData>();
    return (
        <div className='flex flex-col sm:flex-row gap-4'>
            <div className='w-full sm:w-1/2'>
                <h4>{worksheet.name}</h4>
                <text>{worksheet.pageCount} Pages</text>
                <div>
                    <pre>{JSON.stringify(worksheet.config, null, 3)}</pre>
                </div>
                <h6 className='mb-4'>Included Kanji</h6>
                <div className='flex flex-row flex-wrap gap-1 text-lg leading-none'>
                    {worksheet.kanji.map(kanji => (
                        <div key={kanji} className='p-2.5 bg-white bg-opacity-20 rounded font-light'>{kanji}</div>)
                    )}
                </div>
            </div>
            <div className='w-full sm:w-1/2'>
                <h6 className='text-center mb-4'>PDF Preview</h6>
                <div className='max-w-[420px] mx-auto'>
                    <PDFView pageCount={worksheet.pageCount} fileUrl={`/write/files/${worksheet.hash}`} />
                </div>
            </div>
        </div>
    );
}
