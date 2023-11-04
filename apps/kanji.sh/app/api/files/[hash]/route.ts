import { appOps } from '@kanji-sh/printer';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
    params: { hash: string };
};

/**
 * API route that returns PDF file.
 */
export async function GET(request: NextRequest, context: Context): Promise<NextResponse> {
    const hash = context.params.hash;
    const download = new URL(request.url).searchParams.has('download');

    const worksheet = await appOps.getWorksheetMeta(hash);
    const pdfBuffer = await appOps.getWorksheetContents(hash);
    const contentDisposition = download ? `attachment; filename="${worksheet.name}.pdf"` : 'inline';
    return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length.toString(),
            'Content-Disposition': contentDisposition
        }
    });
}
