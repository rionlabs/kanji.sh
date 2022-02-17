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
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 items-center content-center justify-center py-12">
                {groupData.files.map((fileData) => (
                    <div className="w-full sm:w-1/2 md:w-1/3" key={fileData.filePath}>
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
