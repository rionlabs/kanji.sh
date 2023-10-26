import { CollectionType } from '@kanji-sh/models';
import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { generatePreBuiltWorksheets } from '@kanji-sh/printer';
import { renderToString } from 'react-dom/server';

// Run PDF Batch generation worker
if (process.env.BUILD_WORKSHEETS === 'true') {
    (async () => {
        let collectionType: CollectionType;
        try {
            const collectionString = process.env.COLLECTION as string;
            collectionType =
                CollectionType[collectionString.toUpperCase() as keyof typeof CollectionType];
        } catch (error) {
            console.error(
                'Type of collection must be specified as environment variable "COLLECTION". See enum CollectionType for values.'
            );
            process.exit(1);
        }
        await generatePreBuiltWorksheets(collectionType);
        process.exit(0);
    })();
}

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

    responseHeaders.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup, {
        status: responseStatusCode,
        headers: responseHeaders
    });
}
