import { LoaderFunction } from '@remix-run/node';
import { appOperations } from '../printer.server';

export const loader: LoaderFunction = async ({ request, params }) => {
    const hash = params.hash as string;
    const download = new URL(request.url).searchParams.has('download');

    const appOps = appOperations();

    if (!download) {
        const downloadUrl = await appOps.getWorksheetUrl(hash);
        return Response.redirect(downloadUrl, 302);
    } else {
        const downloadUrl = await appOps.getWorksheetDownloadUrl(hash);
        return Response.redirect(downloadUrl.toString());
    }

}
