import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

/**
 * Redirects old urls /write/collection/:collectionId to /write/:collectionId
 */
export const loader: LoaderFunction = ({ params }) => {
    const { redirectId } = params;
    invariant(typeof redirectId === 'string', 'Collection must be string');
    return redirect(`/write/${redirectId}`);
};
