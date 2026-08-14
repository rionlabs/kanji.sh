'use server';

import { getFileTree, renderAsciiFileTree } from 'apps/kanji.sh/app/api/fileTools';
import { pathConfig } from 'apps/kanji.sh/src/config';

import { prepareData } from '@kanji-sh/printer';

export default async function PreparePage() {
    // Workaround for preparing data during build phase
    await prepareData(pathConfig);

    // Render the file tree
    const currentDir = process.cwd();
    console.log(`Current working directory: ${currentDir}`);
    const fileTree = await getFileTree(currentDir);
    const asciiFileTree = renderAsciiFileTree(fileTree);
    console.log(`File tree:\n${asciiFileTree}`);
    return (
        <div>
            <pre>Current working directory: {currentDir}</pre>
            <pre>{asciiFileTree}</pre>
        </div>
    );
}
