import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import type { FileData, GroupData } from 'app/metadata';
import React from 'react';
import FileCard from 'app/components/molecules/FileCard';
import { mappedData } from 'app/metadata';
import invariant from 'tiny-invariant';

type LoaderData = { groupData: GroupData };

export const loader: LoaderFunction = ({params}) => {
    const { collection } = params;
    invariant(typeof collection === 'string', "Collection must be string");
    const groupData = mappedData.get(collection)!!;
    return json<LoaderData>({ groupData })
}

function CollectionPage() {
    const { groupData } = useLoaderData<LoaderData>();
    return (
        <div>
            <h3 className="p-4">{groupData.heading}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-8 py-12">
                {groupData.files.map((fileData: FileData) => (
                    <div className="" key={fileData.filePath}>
                        <FileCard fileData={fileData} />
                        <Link to={`${fileData.title.toLowerCase()}`}>Link</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CollectionPage;
