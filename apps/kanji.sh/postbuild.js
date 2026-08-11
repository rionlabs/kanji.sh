import fs from 'node:fs';
import path from 'node:path';

/** @type {import('next').NextAdapter} */
const adapter = {
    name: 'kvg-assets-copy',
    async onBuildComplete({ projectDir, distDir }) {
        // Copy the processed data to output
        fs.cpSync(path.join(projectDir, 'dist'), path.join(distDir, 'dist'), {
            recursive: true
        });
    }
};

export default adapter;
