import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { generatePreBuiltWorksheets } from '@generator';
import { renderToString } from 'react-dom/server';

// Run PDF worker
if (process.env.BUILD_WORKSHEETS === 'true') {
    (async () => {
        await generatePreBuiltWorksheets();
        process.exit(0);
    })();
}

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    let markup = renderToString(
        <RemixServer context={remixContext} url={request.url} />
    );

    responseHeaders.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup, {
        status: responseStatusCode,
        headers: responseHeaders
    });
}
