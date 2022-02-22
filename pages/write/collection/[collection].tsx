import { GetStaticPaths, GetStaticProps } from 'next';
import PageLayout from '../../../src/PageLayout';
import { GroupData, mappedData } from '../../../src/Metadata';
import React from 'react';
import FileCard from '../../../src/component/FileCard';

type CollectionParam = { collection: string };

const CollectionPage: React.FC<{ collectionId: string }> = (pathParams) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const groupData: GroupData = mappedData!.get(pathParams.collectionId)!;
    return (
        <PageLayout>
            <h3 className="p-4">{groupData.heading}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-8 py-12">
                {groupData.files.map((fileData) => (
                    <div className="" key={fileData.filePath}>
                        <FileCard fileData={fileData} />
                    </div>
                ))}
            </div>
        </PageLayout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const collectionId = (params as CollectionParam).collection as string;
    return {
        props: {
            collectionId
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = new Array<{ params: CollectionParam }>();
    mappedData.forEach((groupData, key) => {
        paths.push({ params: { collection: key } });
    });
    return {
        paths,
        fallback: false
    };
};

export default CollectionPage;
