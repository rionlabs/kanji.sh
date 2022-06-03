import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = ({params}) => {
    const { collection, file } = params;
    invariant(typeof collection === 'string', "Collection must be string");
    invariant(typeof file === 'string', "Collection must be string");
    return json({ collection, file })
}

export default function FileRoute() {
    return <div></div>
}
