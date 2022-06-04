import type { LoaderFunction } from '@remix-run/node';
import { json, Response } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import { createWorksheet } from 'app/routes/write/generate/index.server';

export const loader: LoaderFunction = async () => {
    try {
        const result = await createWorksheet();
        return json(result, { status: 201 });
    } catch (error) {
        throw new Response();
    }
};

export default function GenerateRoute() {
    const data = useLoaderData();
    return <div>${JSON.stringify(data)}</div>;
}

export const CatchBoundary = () => {
    const { status } = useCatch();
    return <div>{status}</div>;
};
