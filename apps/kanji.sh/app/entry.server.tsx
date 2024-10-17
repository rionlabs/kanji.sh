import { RemixServer } from '@remix-run/react';
import { type EntryContext } from '@remix-run/node';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import * as i18n from './i18n/i18n';
import i18nServer from './i18n/i18n.server';
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { isbot } from "isbot";
import { createReadableStreamFromReadable } from "@remix-run/node";

const ABORT_DELAY = 5_000;

export default async (
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) => {
    const instance = createInstance();
    const lng = await i18nServer.getLocale(request);
    const ns = i18nServer.getRouteNamespaces(remixContext);

    await instance.use(initReactI18next).init({
        ...i18n,
        lng,
        ns
    });

    const remixServer = <I18nextProvider i18n={instance}>
        <RemixServer
            context={remixContext}
            url={request.url}
            abortDelay={ABORT_DELAY}
        />
    </I18nextProvider>;

    if (isbot(request.headers.get("user-agent"))) {
        return serveBots(responseStatusCode, responseHeaders, remixServer);
    }

    return serveBrowsers(responseStatusCode, responseHeaders, remixServer);
}

function serveBots(
    responseStatusCode: number,
    responseHeaders: Headers,
    remixServer: JSX.Element
) {
    return new Promise((resolve, reject) => {
        const { pipe, abort } = renderToPipeableStream(remixServer, {
            // Use onAllReady to wait for the entire document to be ready
            onAllReady() {
                responseHeaders.set("Content-Type", "text/html");
                const body = new PassThrough();
                const stream = createReadableStreamFromReadable(body);

                resolve(
                    new Response(stream, {
                        status: responseStatusCode,
                        headers: responseHeaders,
                    })
                );

                pipe(body);
            },
            onShellError(err) {
                reject(err);
            },
        });
        setTimeout(abort, ABORT_DELAY);
    });
}

function serveBrowsers(
    responseStatusCode: number,
    responseHeaders: Headers,
    remixServer: JSX.Element
) {
    return new Promise((resolve, reject) => {
        let didError = false;
        const { pipe, abort } = renderToPipeableStream(remixServer, {
            // use onShellReady to wait until a suspense boundary is triggered
            onShellReady() {
                responseHeaders.set("Content-Type", "text/html");
                const body = new PassThrough();
                const stream = createReadableStreamFromReadable(body);

                resolve(
                    new Response(stream, {
                        status: didError ? 500 : responseStatusCode,
                        headers: responseHeaders,
                    })
                );

                pipe(body);
            },
            onShellError(err) {
                reject(err);
            },
            onError(err) {
                didError = true;
                console.error(err);
            },
        });
        setTimeout(abort, ABORT_DELAY);
    });
}
