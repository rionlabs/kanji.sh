import { NextRequest, NextResponse } from 'next/server';

import { appOperations } from '@kanji-sh/printer';

type Context = {
    params: Promise<{ hash: string }>;
};

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
            'Cache-Control': 'public, s-maxage=3600',
            'CDN-Cache-Control': 'public, s-maxage=604800',
            'Vercel-CDN-Cache-Control': 'public, s-maxage=2419200'
        }
    });
}
