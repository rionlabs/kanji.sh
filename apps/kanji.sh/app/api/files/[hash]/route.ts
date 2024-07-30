import { appOperations } from '@kanji-sh/printer';
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

    const appOps = appOperations();

    if (!download) {
        const downloadUrl = await appOps.getWorksheetUrl(hash);
        return NextResponse.redirect(downloadUrl, {
            status: 302
        });
    } else {
        const downloadUrl = await appOps.getWorksheetDownloadUrl(hash);
        return NextResponse.redirect(downloadUrl.toString());
    }
}
