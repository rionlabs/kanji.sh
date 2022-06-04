import type { CollectionType } from '@common/models';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getWorksheet } from 'app/routes/write/index.server';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }) => {
    const { collection, file } = params;
    invariant(typeof collection === 'string', "Collection must be string");
    invariant(typeof file === 'string', "Collection must be string");
    const worksheet = await getWorksheet(collection as CollectionType, file)
    return json({ worksheet })
}

export default function FileRoute() {
    const data = useLoaderData();
    return <div>{JSON.stringify(data, null, 3)}</div>
}
