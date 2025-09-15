import { NextRequest, NextResponse } from 'next/server';

import { appOperations } from '@kanji-sh/printer';

type Context = {
    params: Promise<{ hash: string }>;
};

const PDF_CACHE_CONTROL = 'public,max-age=604800;stale-while-revalidate=86400';

/**
 * API route that returns PDF file.
 */
export async function GET(request: NextRequest, context: Context): Promise<NextResponse> {
    const hash = (await context.params).hash;
    const download = new URL(request.url).searchParams.has('download');

    const appOps = appOperations();
    const worksheet = await appOps.getWorksheetMeta(hash);
    const pdfBuffer = await appOps.getWorksheetContents(hash);
    const contentDisposition = download ? `attachment; filename="${worksheet.name}.pdf"` : 'inline';

    return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length.toString(),
            'Content-Disposition': contentDisposition,
            'Cache-Control': PDF_CACHE_CONTROL,
            'CDN-Cache-Control': PDF_CACHE_CONTROL,
            'Vercel-CDN-Cache-Control': PDF_CACHE_CONTROL
        }
    });
}
