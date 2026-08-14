'use server';

import { readdir } from 'node:fs/promises';
import path from 'node:path';

import { pathConfig } from 'apps/kanji.sh/src/config';

import { prepareData } from '@kanji-sh/printer';

type FileNode = {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileNode[];
};

export async function getFileTree(dir: string): Promise<FileNode> {
    const entries = await readdir(dir, { withFileTypes: true });

    const children = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                return getFileTree(fullPath);
            }

            return {
                name: entry.name,
                path: fullPath,
                type: 'file' as const
            };
        })
    );

    return {
        name: path.basename(dir),
        path: dir,
        type: 'directory',
        children
    };
}

export default async function PareparePage() {
    // Workaround for preparing data during build phase
    await prepareData(pathConfig);

    // Render the file tree
    const currentDir = process.cwd();
    console.log(`Current working directory: ${currentDir}`);
    const fileTree = await getFileTree(currentDir);
    console.log('File tree:', JSON.stringify(fileTree, null, 2));
    return (
        <div>
            <pre>Current working directory: {currentDir}</pre>
            <pre>{JSON.stringify(fileTree, null, 2)}</pre>
        </div>
    );
}
