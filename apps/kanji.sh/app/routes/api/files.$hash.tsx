import type { LoaderFunction } from '@remix-run/node';
import { getWorksheetFromHash, getWorksheetContentsFromHash } from '../index.server';
import invariant from 'tiny-invariant';

/**
 * API route that returns PDF file.
 */
export const loader: LoaderFunction = async ({ params, request }) => {
    const { hash } = params;
    invariant(typeof hash === 'string', 'Hash must be a string');

    const download = new URL(request.url).searchParams.has('download');

    const worksheet = await getWorksheetFromHash(hash);
    const pdfBuffer = await getWorksheetContentsFromHash(hash);
    const contentDisposition = download ? `attachment; filename="${worksheet.name}.pdf"` : 'inline';
    return new Response(pdfBuffer, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length.toString(),
            'Content-Disposition': contentDisposition
        }
    });
};
